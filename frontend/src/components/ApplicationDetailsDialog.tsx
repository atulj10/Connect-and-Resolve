import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { StatusBadge } from "@/components/StatusBadge";
import { formatDate, type Application } from "@/lib/applications";
import { Paperclip, MapPin, User, Phone, Building2 } from "lucide-react";

export function ApplicationDetailsDialog({
  app,
  open,
  onOpenChange,
}: {
  app: Application | null;
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
              <p className="text-xs font-mono text-muted-foreground">{app.refNo}</p>
              <DialogTitle className="text-xl mt-1">{app.subject}</DialogTitle>
            </div>
            <StatusBadge status={app.status} />
          </div>
          <DialogDescription className="sr-only">Application details</DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <Field label="Category" value={app.category} />
          <Field label="Department" value={app.department} />
          <Field label="Created" value={formatDate(app.createdAt)} />
          <Field label="Last Updated" value={formatDate(app.updatedAt)} />
        </div>

        <Separator />

        <div>
          <h3 className="text-sm font-semibold mb-2">Citizen Details</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
            <InfoRow icon={User} text={app.citizenName} />
            <InfoRow icon={Phone} text={app.mobile} />
            <InfoRow icon={MapPin} text={app.district} />
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="text-sm font-semibold mb-2">Description</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{app.description}</p>
        </div>

        <div>
          <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
            <Building2 className="h-4 w-4 text-primary" /> Departmental Remarks
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed bg-secondary/40 rounded-lg p-3 border border-border">
            {app.remarks}
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold mb-2 flex items-center gap-2">
            <Paperclip className="h-4 w-4 text-primary" /> Attachments
          </h3>
          <div className="flex flex-wrap gap-2">
            {app.attachments.map((a) => (
              <div
                key={a}
                className="text-xs rounded-md border border-border bg-secondary/40 px-2.5 py-1.5 flex items-center gap-1.5"
              >
                <Paperclip className="h-3 w-3 text-muted-foreground" />
                {a}
              </div>
            ))}
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

function InfoRow({ icon: Icon, text }: { icon: React.ComponentType<{ className?: string }>; text: string }) {
  return (
    <div className="flex items-center gap-2">
      <Icon className="h-4 w-4 text-primary" />
      <span>{text}</span>
    </div>
  );
}
