import { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { StatusBadge } from "@/components/StatusBadge";
import { formatDate } from "@/lib/applications";
import { applicationsApi, type ApplicationDto, type TimelineEntry } from "@/lib/api/applications";
import { Paperclip, FileText, Image, ExternalLink, User, Phone, MapPin, Building2, Clock, ArrowRight } from "lucide-react";

export function ApplicationDetailsDialog({
  app,
  open,
  onOpenChange,
}: {
  app: ApplicationDto | null;
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const [timeline, setTimeline] = useState<TimelineEntry[]>([]);
  const fetchIdRef = useRef<string | null>(null);

  useEffect(() => {
    if (app && open) {
      fetchIdRef.current = app.id;
      applicationsApi.getById(app.id).then((res) => {
        if (fetchIdRef.current !== app.id) return;
        setTimeline(res.timeline ?? []);
      }).catch(() => {});
    }
  }, [app?.id, open]);

  if (!app) return null;
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <p className="text-xs font-mono text-muted-foreground">{app.referenceNumber}</p>
              <DialogTitle className="text-xl mt-1">{app.subject}</DialogTitle>
            </div>
            <StatusBadge status={app.status} />
          </div>
          <DialogDescription className="sr-only">Application details</DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <Field label="Category" value={app.category} />
          <Field label="Department" value={app.department || "—"} />
          <Field label="Created" value={formatDate(app.createdAt)} />
          <Field label="Last Updated" value={formatDate(app.updatedAt)} />
        </div>

        <Separator />

        <div>
          <h3 className="text-sm font-semibold mb-3">Personal Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <InfoRow icon={User} text={`${app.applicantName} S/O ${app.fatherName}`} />
            <InfoRow icon={Phone} text={app.user?.mobileNumber ?? "—"} />
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="text-sm font-semibold mb-3">Address Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <InfoRow icon={MapPin} text={`Village: ${app.villageMohalla || "Not provided"}`} />
            <InfoRow icon={MapPin} text={`Panchayat: ${app.panchayat || "Not provided"}`} />
            <InfoRow icon={MapPin} text={`Police Station: ${app.policeStation || "Not provided"}`} />
            <InfoRow icon={MapPin} text={`Block: ${app.block}`} />
            <InfoRow icon={MapPin} text={`Assembly Constituency: ${app.assemblyConstituency || "Not provided"}`} />
            <InfoRow icon={MapPin} text={`District: ${app.district}`} />
            <InfoRow icon={MapPin} text={`Pincode: ${app.pincode || "Not provided"}`} />
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="text-sm font-semibold mb-2">Description</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {app.description || "No description provided."}
          </p>
        </div>

        <Separator />

        <div>
          <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
            <Clock className="h-4 w-4 text-primary" /> Application Timeline
          </h3>
          <div className="space-y-3">
            {timeline.length === 0 ? (
              <p className="text-sm text-muted-foreground">No timeline entries.</p>
            ) : (
              timeline.map((entry, idx) => (
                <TimelineCard key={entry.id} entry={entry} isFirst={idx === 0} isCitizen />
              ))
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function TimelineCard({
  entry,
  isFirst,
  isCitizen,
}: {
  entry: TimelineEntry;
  isFirst?: boolean;
  isCitizen?: boolean;
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
                <ArrowRight className="h-3 w-3 text-muted-foreground" />
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
                <Paperclip className="h-3 w-3 text-muted-foreground" />
                {a.fileName}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-muted-foreground uppercase tracking-wider">{label}</p>
      <p className="mt-0.5 font-medium text-foreground">{value}</p>
    </div>
  );
}

function InfoRow({
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
