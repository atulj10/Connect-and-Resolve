import { Badge } from "@/components/ui/badge";
import { STATUS_STYLES, type AppStatus } from "@/lib/applications";
import { cn } from "@/lib/utils";

export function StatusBadge({ status, className }: { status: AppStatus; className?: string }) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "font-medium rounded-full px-2.5 py-0.5 text-xs whitespace-nowrap",
        STATUS_STYLES[status],
        className,
      )}
    >
      <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-current opacity-70" />
      {status}
    </Badge>
  );
}
