import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { StatusBadge } from "@/components/StatusBadge";
import { AdminApplicationDialog } from "@/components/AdminApplicationDialog";
import { NewApplicationDialog } from "@/components/NewApplicationDialog";
import {
  CATEGORIES, DEPARTMENTS, STATUSES, formatDate, generateApplications, type Application,
} from "@/lib/applications";
import {
  ArrowUpDown, ChevronLeft, ChevronRight, Eye, Plus, Search,
} from "lucide-react";

export const Route = createFileRoute("/admin/applications")({
  head: () => ({
    meta: [
      { title: "Applications — Minister Office Admin" },
      { name: "description", content: "Review, assign and manage citizen applications and grievances." },
    ],
  }),
  component: AdminApplications,
});

type SortKey = "createdAt" | "assignedAt" | "citizenName" | "status";
type SortDir = "asc" | "desc";

function AdminApplications() {
  const all = useMemo(() => generateApplications(48), []);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [department, setDepartment] = useState("all");
  const [status, setStatus] = useState("all");
  const [sortKey, setSortKey] = useState<SortKey>("createdAt");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Application | null>(null);
  const [createOpen, setCreateOpen] = useState(false);

  const filtered = useMemo(() => {
    const rows = all.filter((a) => {
      if (category !== "all" && a.category !== category) return false;
      if (department !== "all" && a.department !== department) return false;
      if (status !== "all" && a.status !== status) return false;
      if (search) {
        const q = search.toLowerCase();
        if (
          !a.refNo.toLowerCase().includes(q) &&
          !a.subject.toLowerCase().includes(q) &&
          !a.citizenName.toLowerCase().includes(q) &&
          !a.mobile.includes(q)
        ) return false;
      }
      return true;
    });
    rows.sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      const cmp = av < bv ? -1 : av > bv ? 1 : 0;
      return sortDir === "asc" ? cmp : -cmp;
    });
    return rows;
  }, [all, category, department, status, search, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageRows = filtered.slice((page - 1) * pageSize, page * pageSize);

  const toggleSort = (k: SortKey) => {
    if (k === sortKey) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortKey(k); setSortDir("desc"); }
  };

  return (
    <AdminLayout title="Applications">
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Applications</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Review, assign and manage all citizen applications.
          </p>
        </div>
        <Button className="gap-2" onClick={() => setCreateOpen(true)}>
          <Plus className="h-4 w-4" /> Create Application
        </Button>
      </div>

      <section className="rounded-2xl border border-border bg-card shadow-card overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-border">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold">All Applications</h2>
              <p className="text-xs text-muted-foreground">{filtered.length} of {all.length} applications</p>
            </div>
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2">
              <div className="relative col-span-2 sm:col-span-1">
                <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search ref no, citizen, mobile..."
                  value={search}
                  onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                  className="pl-9 sm:w-72"
                />
              </div>
              <Select value={category} onValueChange={(v) => { setCategory(v); setPage(1); }}>
                <SelectTrigger className="sm:w-40"><SelectValue placeholder="Category" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
              <Select value={department} onValueChange={(v) => { setDepartment(v); setPage(1); }}>
                <SelectTrigger className="sm:w-44"><SelectValue placeholder="Department" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  {DEPARTMENTS.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                </SelectContent>
              </Select>
              <Select value={status} onValueChange={(v) => { setStatus(v); setPage(1); }}>
                <SelectTrigger className="sm:w-40"><SelectValue placeholder="Status" /></SelectTrigger>
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
                <TableHead className="font-semibold">
                  <SortBtn label="Citizen" active={sortKey === "citizenName"} dir={sortDir} onClick={() => toggleSort("citizenName")} />
                </TableHead>
                <TableHead className="font-semibold">Mobile</TableHead>
                <TableHead className="font-semibold">Category</TableHead>
                <TableHead className="font-semibold">Department</TableHead>
                <TableHead className="font-semibold">
                  <SortBtn label="Status" active={sortKey === "status"} dir={sortDir} onClick={() => toggleSort("status")} />
                </TableHead>
                <TableHead className="font-semibold">
                  <SortBtn label="Created" active={sortKey === "createdAt"} dir={sortDir} onClick={() => toggleSort("createdAt")} />
                </TableHead>
                <TableHead className="font-semibold">
                  <SortBtn label="Assigned" active={sortKey === "assignedAt"} dir={sortDir} onClick={() => toggleSort("assignedAt")} />
                </TableHead>
                <TableHead className="font-semibold text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pageRows.length === 0 ? (
                <TableRow><TableCell colSpan={9} className="text-center py-12 text-muted-foreground">No applications match your filters.</TableCell></TableRow>
              ) : pageRows.map((a) => (
                <TableRow key={a.refNo} className="hover:bg-secondary/30">
                  <TableCell className="font-mono text-xs text-primary whitespace-nowrap">{a.refNo}</TableCell>
                  <TableCell className="font-medium whitespace-nowrap">{a.citizenName}</TableCell>
                  <TableCell className="text-sm text-muted-foreground whitespace-nowrap">{a.mobile}</TableCell>
                  <TableCell className="text-sm text-muted-foreground whitespace-nowrap">{a.category}</TableCell>
                  <TableCell className="text-sm text-muted-foreground whitespace-nowrap">{a.department}</TableCell>
                  <TableCell><StatusBadge status={a.status} /></TableCell>
                  <TableCell className="text-sm text-muted-foreground whitespace-nowrap">{formatDate(a.createdAt)}</TableCell>
                  <TableCell className="text-sm text-muted-foreground whitespace-nowrap">{formatDate(a.assignedAt)}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" className="gap-1.5" onClick={() => setSelected(a)}>
                      <Eye className="h-4 w-4" /> Manage
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="p-4 sm:px-6 flex flex-col sm:flex-row gap-3 items-center justify-between border-t border-border">
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span>Rows per page</span>
            <Select value={String(pageSize)} onValueChange={(v) => { setPageSize(Number(v)); setPage(1); }}>
              <SelectTrigger className="h-8 w-20"><SelectValue /></SelectTrigger>
              <SelectContent>
                {[5, 10, 20, 50].map((n) => <SelectItem key={n} value={String(n)}>{n}</SelectItem>)}
              </SelectContent>
            </Select>
            <span>
              Showing {filtered.length === 0 ? 0 : (page - 1) * pageSize + 1}–{Math.min(page * pageSize, filtered.length)} of {filtered.length}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
              <ChevronLeft className="h-4 w-4" /> Prev
            </Button>
            <span className="text-xs text-muted-foreground px-2">Page {page} of {totalPages}</span>
            <Button variant="outline" size="sm" disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)}>
              Next <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      <AdminApplicationDialog app={selected} open={!!selected} onOpenChange={(o) => !o && setSelected(null)} />
      <NewApplicationDialog mode="admin" open={createOpen} onOpenChange={setCreateOpen} />
    </AdminLayout>
  );
}

function SortBtn({
  label, active, dir, onClick,
}: { label: string; active: boolean; dir: SortDir; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="inline-flex items-center gap-1 hover:text-foreground">
      {label}
      <ArrowUpDown className={`h-3 w-3 ${active ? "text-primary" : "text-muted-foreground/60"} ${active && dir === "asc" ? "rotate-180" : ""}`} />
    </button>
  );
}
