import { useEffect, useState } from "react";
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
import { applicationsApi, type ApplicationDto } from "@/lib/api/applications";
import { getApiError } from "@/lib/api/client";
import { ExternalLink, FileText, Image, Paperclip, User, Phone, MapPin } from "lucide-react";
import { toast } from "sonner";

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
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (app) {
      setStatus((app.status as AppStatus) || "Submitted");
      setDepartment(app.department || "");
      setRemarks(app.adminRemarks || "");
      setNotes(app.internalNotes || "");
      setAttachments(app.attachments ?? []);
    }
  }, [app]);

  if (!app) return null;

  const handleSave = async () => {
    setSaving(true);
    try {
      await Promise.all([
        applicationsApi.updateStatus(app.id, status),
        applicationsApi.updateDepartment(app.id, department),
        applicationsApi.addRemarks(app.id, { adminRemarks: remarks, internalNotes: notes }),
      ]);
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

        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <Paperclip className="h-3.5 w-3.5" /> Attachments
          </Label>
          <div className="flex flex-wrap gap-2">
            {attachments.length === 0 ? (
              <p className="text-sm text-muted-foreground">No attachments</p>
            ) : (
              attachments.map((a) => (
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
              ))
            )}
          </div>
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
