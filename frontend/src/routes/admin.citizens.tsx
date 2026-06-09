import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CitizenDetailsDialog } from "@/components/CitizenDetailsDialog";
import { CITIZEN_DISTRICTS, formatDate, generateCitizens, type Citizen } from "@/lib/citizens";
import {
  ChevronLeft, ChevronRight, Eye, Mail, Phone, Search, UserCheck, Users, FileText,
} from "lucide-react";

export const Route = createFileRoute("/admin/citizens")({
  head: () => ({
    meta: [
      { title: "Citizens — Minister Office Admin" },
      { name: "description", content: "Search, filter and manage registered citizens." },
    ],
  }),
  component: CitizensPage,
});

type SortDir = "newest" | "oldest";

function CitizensPage() {
  const all = useMemo(() => generateCitizens(56), []);

  const [emailQ, setEmailQ] = useState("");
  const [mobileQ, setMobileQ] = useState("");
  const [district, setDistrict] = useState("all");
  const [sortDir, setSortDir] = useState<SortDir>("newest");
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Citizen | null>(null);

  const stats = useMemo(() => ({
    total: all.length,
    active: all.filter((c) => c.active).length,
    withApps: all.filter((c) => c.totalApplications > 0).length,
  }), [all]);

  const filtered = useMemo(() => {
    const rows = all.filter((c) => {
      if (district !== "all" && c.district !== district) return false;
      if (emailQ && !c.email.toLowerCase().includes(emailQ.toLowerCase())) return false;
      if (mobileQ && !c.mobile.includes(mobileQ.trim())) return false;
      return true;
    });
    rows.sort((a, b) => {
      const cmp = new Date(a.registeredAt).getTime() - new Date(b.registeredAt).getTime();
      return sortDir === "newest" ? -cmp : cmp;
    });
    return rows;
  }, [all, district, emailQ, mobileQ, sortDir]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageRows = filtered.slice((page - 1) * pageSize, page * pageSize);

  return (
    <AdminLayout title="Citizens">
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Citizens Management</h1>
          <p className="text-sm text-muted-foreground mt-1">
            View, search and manage registered citizen profiles.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
        <StatCard label="Total Registered" value={stats.total} icon={Users} tint="bg-primary/10 text-primary" />
        <StatCard label="Active Citizens" value={stats.active} icon={UserCheck} tint="bg-emerald-100 text-emerald-700" />
        <StatCard label="With Applications" value={stats.withApps} icon={FileText} tint="bg-violet-100 text-violet-700" />
      </div>

      {/* Table */}
      <section className="rounded-2xl border border-border bg-card shadow-card overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-border">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold">All Citizens</h2>
              <p className="text-xs text-muted-foreground">{filtered.length} of {all.length} citizens</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-wrap gap-2">
              <div className="relative">
                <Mail className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search by email"
                  value={emailQ}
                  onChange={(e) => { setEmailQ(e.target.value); setPage(1); }}
                  className="pl-9 lg:w-56"
                />
              </div>
              <div className="relative">
                <Phone className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search by mobile"
                  value={mobileQ}
                  onChange={(e) => { setMobileQ(e.target.value); setPage(1); }}
                  className="pl-9 lg:w-48"
                />
              </div>
              <Select value={district} onValueChange={(v) => { setDistrict(v); setPage(1); }}>
                <SelectTrigger className="lg:w-44"><SelectValue placeholder="District" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Districts</SelectItem>
                  {CITIZEN_DISTRICTS.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                </SelectContent>
              </Select>
              <Select value={sortDir} onValueChange={(v) => setSortDir(v as SortDir)}>
                <SelectTrigger className="lg:w-44"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-secondary/40 hover:bg-secondary/40">
                <TableHead className="font-semibold">Full Name</TableHead>
                <TableHead className="font-semibold">Email</TableHead>
                <TableHead className="font-semibold">Mobile</TableHead>
                <TableHead className="font-semibold">State</TableHead>
                <TableHead className="font-semibold">District</TableHead>
                <TableHead className="font-semibold text-center">Applications</TableHead>
                <TableHead className="font-semibold">Registered</TableHead>
                <TableHead className="font-semibold text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pageRows.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-12 text-muted-foreground">
                    No citizens match your filters.
                  </TableCell>
                </TableRow>
              ) : pageRows.map((c) => (
                <TableRow key={c.id} className="hover:bg-secondary/30">
                  <TableCell className="whitespace-nowrap">
                    <div className="flex items-center gap-2.5">
                      <div className="h-8 w-8 rounded-full bg-primary/10 text-primary text-xs font-semibold flex items-center justify-center">
                        {c.fullName.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                      </div>
                      <div>
                        <p className="font-medium leading-tight">{c.fullName}</p>
                        <p className="text-[11px] text-muted-foreground font-mono">{c.id}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground whitespace-nowrap">{c.email}</TableCell>
                  <TableCell className="text-sm text-muted-foreground whitespace-nowrap">{c.mobile}</TableCell>
                  <TableCell className="text-sm text-muted-foreground whitespace-nowrap">{c.state}</TableCell>
                  <TableCell className="text-sm text-muted-foreground whitespace-nowrap">{c.district}</TableCell>
                  <TableCell className="text-center">
                    <Badge variant={c.totalApplications > 0 ? "default" : "secondary"} className="font-mono">
                      {c.totalApplications}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground whitespace-nowrap">{formatDate(c.registeredAt)}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" className="gap-1.5" onClick={() => setSelected(c)}>
                      <Eye className="h-4 w-4" /> View
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

      <CitizenDetailsDialog citizen={selected} open={!!selected} onOpenChange={(o) => !o && setSelected(null)} />
    </AdminLayout>
  );
}

function StatCard({
  label, value, icon: Icon, tint,
}: { label: string; value: number; icon: React.ComponentType<{ className?: string }>; tint: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs text-muted-foreground">{label}</p>
          <p className="mt-1.5 text-3xl font-bold tracking-tight">{value}</p>
        </div>
        <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${tint}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}
