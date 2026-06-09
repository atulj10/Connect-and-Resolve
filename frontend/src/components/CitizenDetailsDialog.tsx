import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { formatDate, type Citizen } from "@/lib/citizens";
import { Mail, MapPin, Phone, User, FileText, Calendar } from "lucide-react";

export function CitizenDetailsDialog({
  citizen,
  open,
  onOpenChange,
}: {
  citizen: Citizen | null;
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  if (!citizen) return null;
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-full bg-gradient-to-br from-primary to-[#7C73FF] text-primary-foreground font-semibold flex items-center justify-center text-lg">
              {citizen.fullName.split(" ").map((n) => n[0]).join("").slice(0, 2)}
            </div>
            <div className="min-w-0">
              <DialogTitle className="text-xl">{citizen.fullName}</DialogTitle>
              <p className="text-xs font-mono text-muted-foreground mt-0.5">{citizen.id}</p>
            </div>
            <Badge variant={citizen.active ? "default" : "secondary"} className="ml-auto">
              {citizen.active ? "Active" : "Inactive"}
            </Badge>
          </div>
          <DialogDescription className="sr-only">Citizen details</DialogDescription>
        </DialogHeader>

        <Separator />

        <div className="space-y-3 text-sm">
          <Row icon={Mail} label="Email" value={citizen.email} />
          <Row icon={Phone} label="Mobile" value={citizen.mobile} />
          <Row icon={MapPin} label="Location" value={`${citizen.district}, ${citizen.state}`} />
          <Row icon={User} label="Address" value={citizen.address} />
          <Row icon={FileText} label="Total Applications" value={String(citizen.totalApplications)} />
          <Row icon={Calendar} label="Registered On" value={formatDate(citizen.registeredAt)} />
        </div>
      </DialogContent>
    </Dialog>
  );
}

function Row({
  icon: Icon, label, value,
}: { icon: React.ComponentType<{ className?: string }>; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="h-8 w-8 rounded-md bg-secondary/60 text-primary flex items-center justify-center shrink-0">
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0">
        <p className="text-[11px] uppercase tracking-wider text-muted-foreground">{label}</p>
        <p className="font-medium break-words">{value}</p>
      </div>
    </div>
  );
}
