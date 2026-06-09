import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StatusBadge } from "@/components/StatusBadge";
import { ApplicationDetailsDialog } from "@/components/ApplicationDetailsDialog";
import { NewApplicationDialog } from "@/components/NewApplicationDialog";
import {
  CATEGORIES,
  STATUSES,
  formatDate,
  generateApplications,
  type Application,
} from "@/lib/applications";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Eye,
  FileText,
  Landmark,
  LogOut,
  Plus,
  Search,
  CheckCircle2,
  Clock,
} from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Citizen Dashboard — Citizen Connect" },
      { name: "description", content: "Track your applications, grievances, and engagement with the government." },
    ],
  }),
  component: CitizenDashboard,
});

const PAGE_SIZE = 8;
const CITIZEN_NAME = "Aarav Sharma";

function CitizenDashboard() {
  const all = useMemo(() => generateApplications(24), []);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string>("all");
  const [status, setStatus] = useState<string>("all");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Application | null>(null);
  const [createOpen, setCreateOpen] = useState(false);

  const filtered = useMemo(() => {
    return all.filter((a) => {
      if (category !== "all" && a.category !== category) return false;
      if (status !== "all" && a.status !== status) return false;
      if (search) {
        const q = search.toLowerCase();
        if (
          !a.refNo.toLowerCase().includes(q) &&
          !a.subject.toLowerCase().includes(q)
        )
          return false;
      }
      return true;
    });
  }, [all, category, status, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageRows = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const stats = useMemo(() => {
    const total = all.length;
    const resolved = all.filter((a) => a.status === "Resolved" || a.status === "Closed").length;
    const active = total - resolved;
    return { total, active, resolved };
  }, [all]);

  return (
    <div className="min-h-screen bg-secondary/30">
      {/* Top bar */}
      <header className="sticky top-0 z-40 bg-background/85 backdrop-blur border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <Landmark className="h-5 w-5 text-primary-foreground" />
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="text-base font-bold leading-tight">Citizen Connect</span>
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
                Citizen Dashboard
              </span>
            </div>
          </Link>
          <div className="flex items-center gap-2">
            <Link to="/" className="hidden sm:inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mr-2">
              <ArrowLeft className="h-4 w-4" /> Home
            </Link>
            <div className="h-9 w-9 rounded-full bg-primary/10 text-primary font-semibold flex items-center justify-center text-sm">
              AS
            </div>
            <Button variant="ghost" size="sm" className="text-muted-foreground" asChild>
              <Link to="/login"><LogOut className="h-4 w-4 mr-1.5" /> Logout</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Welcome */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Welcome back,</p>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">{CITIZEN_NAME} 👋</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Here's an overview of all your grievances and applications.
            </p>
          </div>
          <Button size="lg" className="gap-2" onClick={() => setCreateOpen(true)}>
            <Plus className="h-4 w-4" /> New Application
          </Button>
        </div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <StatCard
            label="Total Applications"
            value={stats.total}
            icon={FileText}
            tint="bg-primary/10 text-primary"
          />
          <StatCard
            label="Active Applications"
            value={stats.active}
            icon={Clock}
            tint="bg-amber-100 text-amber-700"
          />
          <StatCard
            label="Resolved Applications"
            value={stats.resolved}
            icon={CheckCircle2}
            tint="bg-emerald-100 text-emerald-700"
          />
        </div>

        {/* Table card */}
        <section className="rounded-2xl border border-border bg-card shadow-card overflow-hidden">
          <div className="p-4 sm:p-6 border-b border-border">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold">My Applications</h2>
                <p className="text-xs text-muted-foreground">{filtered.length} application{filtered.length !== 1 && "s"} found</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 lg:gap-3 sm:items-center">
                <div className="relative">
                  <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search ref no or subject..."
                    value={search}
                    onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                    className="pl-9 sm:w-64"
                  />
                </div>
                <Select value={category} onValueChange={(v) => { setCategory(v); setPage(1); }}>
                  <SelectTrigger className="sm:w-44"><SelectValue placeholder="Category" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                  </SelectContent>
                </Select>
                <Select value={status} onValueChange={(v) => { setStatus(v); setPage(1); }}>
                  <SelectTrigger className="sm:w-44"><SelectValue placeholder="Status" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    {STATUSES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-secondary/40 hover:bg-secondary/40">
                  <TableHead className="font-semibold">Reference No.</TableHead>
                  <TableHead className="font-semibold">Subject</TableHead>
                  <TableHead className="font-semibold">Category</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold">Created</TableHead>
                  <TableHead className="font-semibold">Last Updated</TableHead>
                  <TableHead className="font-semibold text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pageRows.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-12 text-muted-foreground">
                      No applications match your filters.
                    </TableCell>
                  </TableRow>
                ) : (
                  pageRows.map((a) => (
                    <TableRow key={a.refNo} className="hover:bg-secondary/30">
                      <TableCell className="font-mono text-xs text-primary">{a.refNo}</TableCell>
                      <TableCell className="max-w-xs truncate font-medium">{a.subject}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{a.category}</TableCell>
                      <TableCell><StatusBadge status={a.status} /></TableCell>
                      <TableCell className="text-sm text-muted-foreground whitespace-nowrap">{formatDate(a.createdAt)}</TableCell>
                      <TableCell className="text-sm text-muted-foreground whitespace-nowrap">{formatDate(a.updatedAt)}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" className="gap-1.5" onClick={() => setSelected(a)}>
                          <Eye className="h-4 w-4" /> View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          <div className="p-4 sm:px-6 flex flex-col sm:flex-row gap-3 items-center justify-between border-t border-border">
            <p className="text-xs text-muted-foreground">
              Showing {(filtered.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1)}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length}
            </p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
                <ChevronLeft className="h-4 w-4" /> Prev
              </Button>
              <span className="text-xs text-muted-foreground px-2">
                Page {page} of {totalPages}
              </span>
              <Button variant="outline" size="sm" disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)}>
                Next <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>
      </main>

      <ApplicationDetailsDialog app={selected} open={!!selected} onOpenChange={(o) => !o && setSelected(null)} />
      <NewApplicationDialog mode="citizen" open={createOpen} onOpenChange={setCreateOpen} />
    </div>
  );
}

function StatCard({
  label,
  value,
  icon: Icon,
  tint,
}: {
  label: string;
  value: number;
  icon: React.ComponentType<{ className?: string }>;
  tint: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-card hover:shadow-card-hover transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="mt-2 text-3xl font-bold tracking-tight">{value}</p>
        </div>
        <div className={`h-11 w-11 rounded-xl flex items-center justify-center ${tint}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}
