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
import type { ApplicationDto } from "@/lib/api/applications";
import { Paperclip, User, Phone, MapPin, Building2 } from "lucide-react";

export function ApplicationDetailsDialog({
  app,
  open,
  onOpenChange,
}: {
  app: ApplicationDto | null;
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
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
            <InfoRow icon={MapPin} text={`${app.villageMohalla}, ${app.panchayat}`} />
            <InfoRow icon={MapPin} text={`PS: ${app.policeStation}, Block: ${app.block}`} />
            <InfoRow icon={MapPin} text={`${app.district} - ${app.pincode}`} />
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="text-sm font-semibold mb-2">Description</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {app.description || "No description provided."}
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
            <Building2 className="h-4 w-4 text-primary" /> Departmental Remarks
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed bg-secondary/40 rounded-lg p-3 border border-border">
            {app.adminRemarks || "No remarks yet."}
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
            <Paperclip className="h-4 w-4 text-primary" /> Attachments
          </h3>
          <div className="flex flex-wrap gap-2">
            {!app.attachments || app.attachments.length === 0 ? (
              <p className="text-sm text-muted-foreground">No attachments</p>
            ) : (
              app.attachments.map((a) => (
                <div
                  key={a.id}
                  className="text-xs rounded-md border border-border bg-secondary/40 px-2.5 py-1.5 flex items-center gap-1.5"
                >
                  <Paperclip className="h-3 w-3 text-muted-foreground" />
                  {a.fileName}
                </div>
              ))
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
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
