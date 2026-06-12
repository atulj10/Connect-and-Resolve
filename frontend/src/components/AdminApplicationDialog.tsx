import { useCallback, useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StatusBadge } from "@/components/StatusBadge";
import { DEPARTMENTS, STATUSES, formatDate, type AppStatus } from "@/lib/applications";
import { applicationsApi, type ApplicationDto, type TimelineEntry } from "@/lib/api/applications";
import { getApiError } from "@/lib/api/client";
import { ExternalLink, FileText, Image, Paperclip, Upload, User, Phone, MapPin, Clock, X } from "lucide-react";
import { toast } from "sonner";

const MAX_FILES = 5;
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_MIME = "application/pdf,image/jpeg,image/jpg,image/png";

export function AdminApplicationDialog({
  app,
  open,
  onOpenChange,
  onSuccess,
}: {
  app: ApplicationDto | null;
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onSuccess?: () => void;
}) {
  const [status, setStatus] = useState<AppStatus>("Submitted");
  const [department, setDepartment] = useState<string>("");
  const [remarks, setRemarks] = useState("");
  const [notes, setNotes] = useState("");
  const [attachments, setAttachments] = useState<ApplicationDto["attachments"]>([]);
  const [timeline, setTimeline] = useState<TimelineEntry[]>([]);
  const [newFiles, setNewFiles] = useState<File[]>([]);
  const [dragging, setDragging] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const fetchedRef = useRef(false);
  const fetchIdRef = useRef<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (app) {
      setStatus((app.status as AppStatus) || "Submitted");
      setDepartment(app.department || "");
      setRemarks(app.adminRemarks || "");
      setNotes(app.internalNotes || "");
      setAttachments(app.attachments ?? []);
      setNewFiles([]);
      setTimeline([]);
      fetchedRef.current = false;
    }
  }, [app]);

  useEffect(() => {
    if (app && open && !fetchedRef.current) {
      fetchedRef.current = true;
      fetchIdRef.current = app.id;
      setLoadingDetails(true);
      applicationsApi.getById(app.id).then((res) => {
        if (fetchIdRef.current !== app.id) return;
        setTimeline(res.timeline ?? []);
        setStatus((res.application.status as AppStatus) || "Submitted");
        setDepartment(res.application.department || "");
        setRemarks(res.application.adminRemarks || "");
        setNotes(res.application.internalNotes || "");
        setAttachments(res.application.attachments ?? []);
      }).catch((err) => {
        if (fetchIdRef.current !== app.id) return;
        toast.error(getApiError(err, "Failed to load application details"));
      }).finally(() => {
        if (fetchIdRef.current === app.id) setLoadingDetails(false);
      });
    }
  }, [app?.id, open]);

  const addFiles = useCallback((incoming: FileList | File[]) => {
    const arr = Array.from(incoming);
    const accepted: File[] = [];
    for (const f of arr) {
      const ext = f.name.split(".").pop()?.toLowerCase() ?? "";
      if (!["pdf", "jpg", "jpeg", "png"].includes(ext)) {
        toast.error(`"${f.name}" — only PDF, JPG, JPEG, PNG allowed`);
        continue;
      }
      if (f.size > MAX_FILE_SIZE) {
        toast.error(`"${f.name}" exceeds 5 MB limit`);
        continue;
      }
      accepted.push(f);
    }
    setNewFiles((prev) => {
      const space = MAX_FILES - prev.length;
      if (space <= 0) {
        toast.error(`Maximum ${MAX_FILES} files allowed`);
        return prev;
      }
      const next = accepted.slice(0, space);
      if (accepted.length > space) toast.error(`Only ${space} more file(s) can be added`);
      return [...prev, ...next];
    });
  }, []);

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files?.length) addFiles(e.dataTransfer.files);
  };

  const removeFile = (i: number) => setNewFiles((f) => f.filter((_, idx) => idx !== i));

  if (!app) return null;

  const handleSave = async () => {
    setSaving(true);
    try {
      const result: any = await applicationsApi.updateApplication(app.id, {
        status,
        department,
        adminRemarks: remarks,
        internalNotes: notes,
      });

      const timelineEntryId = result?.timelineEntry?.id;

      if (newFiles.length > 0) {
        await Promise.all(
          newFiles.map((f) => applicationsApi.uploadAttachment(app.id, f, timelineEntryId))
        );
      }

      toast.success("Application updated successfully");
      onSuccess?.();
      onOpenChange(false);
    } catch (err: unknown) {
      toast.error(getApiError(err, "Failed to update application"));
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <p className="text-xs font-mono text-muted-foreground">{app.referenceNumber}</p>
              <DialogTitle className="text-xl mt-1">{app.subject}</DialogTitle>
              <p className="text-xs text-muted-foreground mt-1">
                Filed on {formatDate(app.createdAt)} &bull; Category: {app.category}
              </p>
            </div>
            <StatusBadge status={status} />
          </div>
          <DialogDescription className="sr-only">Manage application</DialogDescription>
        </DialogHeader>

        <div className="rounded-xl border border-border bg-secondary/30 p-4">
          <h3 className="text-sm font-semibold mb-3">Personal Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <Info icon={User} text={`${app.applicantName} S/O ${app.fatherName}`} />
            <Info icon={Phone} text={app.user?.mobileNumber ?? "—"} />
          </div>
        </div>

        <div className="rounded-xl border border-border bg-secondary/30 p-4">
          <h3 className="text-sm font-semibold mb-3">Address Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <Info icon={MapPin} text={`${app.villageMohalla}, ${app.panchayat}`} />
            <Info icon={MapPin} text={`PS: ${app.policeStation}, Block: ${app.block}`} />
            {app.assemblyConstituency && <Info icon={MapPin} text={`Assembly: ${app.assemblyConstituency}`} />}
            <Info icon={MapPin} text={`${app.district} - ${app.pincode}`} />
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold mb-2">Description</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {app.description || "No description provided."}
          </p>
        </div>

        <Separator />

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Assign Department</Label>
            <Select value={department} onValueChange={setDepartment}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {DEPARTMENTS.map((d) => (
                  <SelectItem key={d} value={d}>
                    {d}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Update Status</Label>
            <Select value={status} onValueChange={(v) => setStatus(v as AppStatus)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {STATUSES.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="remarks">
            Admin Remarks{" "}
            <span className="text-xs text-muted-foreground font-normal">(visible to citizen)</span>
          </Label>
          <Textarea
            id="remarks"
            rows={3}
            maxLength={1000}
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            placeholder="Provide an update or resolution remark for the citizen..."
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="notes">
            Internal Notes{" "}
            <span className="text-xs text-muted-foreground font-normal">(office only)</span>
          </Label>
          <Textarea
            id="notes"
            rows={3}
            maxLength={1000}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add internal notes for office reference..."
          />
        </div>

        <div className="space-y-3">
          <Label className="flex items-center gap-2">
            <Paperclip className="h-3.5 w-3.5" /> Attachments
          </Label>

          {attachments.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {attachments.map((a) => (
                <a
                  key={a.id}
                  href={a.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs rounded-md border border-border bg-secondary/40 px-2.5 py-1.5 hover:bg-secondary/70 transition-colors"
                >
                  {a.mimeType.startsWith("image/") ? (
                    <Image className="h-3.5 w-3.5 text-muted-foreground" />
                  ) : (
                    <FileText className="h-3.5 w-3.5 text-muted-foreground" />
                  )}
                  {a.fileName}
                  <ExternalLink className="h-3 w-3 text-muted-foreground" />
                </a>
              ))}
            </div>
          )}

          <div
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={onDrop}
            onClick={() => inputRef.current?.click()}
            role="button"
            tabIndex={0}
            className={`cursor-pointer rounded-xl border-2 border-dashed p-4 text-center transition-colors ${
              dragging
                ? "border-primary bg-primary/5"
                : "border-border bg-secondary/30 hover:bg-secondary/50 hover:border-primary/50"
            }`}
          >
            <Upload className="mx-auto h-5 w-5 text-muted-foreground mb-1" />
            <p className="text-xs text-muted-foreground">
              Drop files or <span className="text-primary">browse</span> &bull; PDF, JPG, PNG &bull; Max 5 MB
            </p>
            <input
              ref={inputRef}
              type="file"
              multiple
              accept={ACCEPTED_MIME}
              className="hidden"
              onChange={(e) => {
                if (e.target.files) addFiles(e.target.files);
                e.target.value = "";
              }}
            />
          </div>

          {newFiles.length > 0 && (
            <ul className="space-y-1.5">
              {newFiles.map((f, i) => (
                <li key={`${f.name}-${i}`} className="flex items-center gap-2 rounded-lg border border-border bg-card p-2">
                  {f.name.toLowerCase().endsWith(".pdf") ? (
                    <FileText className="h-4 w-4 text-primary shrink-0" />
                  ) : (
                    <Image className="h-4 w-4 text-primary shrink-0" />
                  )}
                  <span className="text-xs truncate flex-1">{f.name}</span>
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); removeFile(i); }}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <Separator />

        <div>
          <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
            <Clock className="h-4 w-4 text-primary" /> Application Timeline
          </h3>
          {loadingDetails ? (
            <p className="text-sm text-muted-foreground">Loading timeline...</p>
          ) : (
            <div className="space-y-3">
              {timeline.length === 0 ? (
                <p className="text-sm text-muted-foreground">No timeline entries.</p>
              ) : (
                timeline.map((entry, idx) => (
                  <AdminTimelineCard key={entry.id} entry={entry} isFirst={idx === 0} />
                ))
              )}
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-2 sm:justify-end pt-2">
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={saving}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={saving}>
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function AdminTimelineCard({
  entry,
  isFirst,
}: {
  entry: TimelineEntry;
  isFirst?: boolean;
}) {
  return (
    <div className="relative pl-6 border-l-2 border-border pb-3 last:pb-0">
      <div className="absolute -left-[9px] top-1 h-4 w-4 rounded-full border-2 border-primary bg-card" />

      <div className="rounded-lg border border-border bg-card p-3 space-y-2 text-sm">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2 flex-wrap">
            {entry.oldStatus && entry.oldStatus !== entry.status ? (
              <span className="flex items-center gap-1 text-xs font-medium">
                <StatusBadge status={entry.oldStatus} />
                <span className="text-muted-foreground">→</span>
                <StatusBadge status={entry.status} />
              </span>
            ) : (
              <span className="flex items-center gap-1 text-xs font-medium">
                <StatusBadge status={entry.status} />
              </span>
            )}
            {entry.department && (
              <span className="text-xs text-muted-foreground bg-secondary/50 px-2 py-0.5 rounded">
                {entry.oldDepartment && entry.oldDepartment !== entry.department
                  ? `${entry.oldDepartment} → ${entry.department}`
                  : entry.department}
              </span>
            )}
          </div>
          <span className="text-xs text-muted-foreground whitespace-nowrap">
            {formatDate(entry.createdAt)}
          </span>
        </div>

        {entry.adminRemarks && (
          <p className="text-xs text-muted-foreground leading-relaxed">
            <span className="font-medium text-foreground">Remarks: </span>{entry.adminRemarks}
          </p>
        )}

        {entry.internalNotes && (
          <p className="text-xs text-muted-foreground leading-relaxed">
            <span className="font-medium text-foreground">Internal Notes: </span>{entry.internalNotes}
          </p>
        )}

        {entry.changedBy && (
          <p className="text-xs text-muted-foreground">
            <span className="font-medium text-foreground">By: </span>{entry.changedBy.fullName}
          </p>
        )}

        {entry.attachments && entry.attachments.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {entry.attachments.map((a) => (
              <a
                key={a.id}
                href={a.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs rounded border border-border bg-secondary/40 px-2 py-1 hover:bg-secondary/70 transition-colors"
              >
                {a.mimeType.startsWith("image/") ? (
                  <Image className="h-3 w-3 text-muted-foreground" />
                ) : (
                  <FileText className="h-3 w-3 text-muted-foreground" />
                )}
                {a.fileName}
                <ExternalLink className="h-3 w-3 text-muted-foreground" />
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Info({
  icon: Icon,
  text,
}: {
  icon: React.ComponentType<{ className?: string }>;
  text: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <Icon className="h-4 w-4 text-primary" />
      <span>{text}</span>
    </div>
  );
}
