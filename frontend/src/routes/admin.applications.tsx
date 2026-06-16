import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { AnimatedSection, AnimatedGrid, AnimatedItem } from "@/components/AnimatedSection";
import { AdminLayout } from "@/components/AdminLayout";
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
import { toast } from "sonner";
import { getApiError } from "@/lib/api/client";
import { StatusBadge } from "@/components/StatusBadge";
import { AdminApplicationDialog } from "@/components/AdminApplicationDialog";
import { NewApplicationDialog } from "@/components/NewApplicationDialog";
import { CATEGORIES, DEPARTMENTS, STATUSES, formatDate } from "@/lib/applications";
import { applicationsApi, type ApplicationDto } from "@/lib/api/applications";
import subDepartmentsData from "@/assets/sub_departments.json";
import { ChevronLeft, ChevronRight, Eye, Plus, Search } from "lucide-react";

export const Route = createFileRoute("/admin/applications")({
  head: () => ({
    meta: [
      { title: "Applications — Minister Office Admin" },
      {
        name: "description",
        content: "Review, assign and manage citizen applications and grievances.",
      },
    ],
  }),
  component: AdminApplications,
});

function AdminApplications() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [department, setDepartment] = useState("all");
  const [subDepartment, setSubDepartment] = useState("");
  const [area, setArea] = useState("");
  const [status, setStatus] = useState("all");
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<ApplicationDto | null>(null);
  const [createOpen, setCreateOpen] = useState(false);
  const subDeptOptions = useMemo(
    () => (department !== "all" ? subDepartmentsData.find((d) => d.department === department)?.subDepartments ?? [] : []),
    [department],
  );
  const areaOptions = useMemo(
    () => subDeptOptions.find((sd) => sd.name === subDepartment)?.areas ?? [],
    [subDeptOptions, subDepartment],
  );

  const [loading, setLoading] = useState(true);
  const [appData, setAppData] = useState<{
    applications: ApplicationDto[];
    total: number;
    totalPages: number;
  }>({ applications: [], total: 0, totalPages: 0 });

  const fetchApps = useCallback(() => {
    setLoading(true);
    const params: Record<string, string | number | undefined> = { page, pageSize };
    if (search) params.search = search;
    if (category !== "all") params.category = category;
    if (department === "others") params.department = "others";
    else if (department !== "all") params.department = department;
    if (subDepartment) params.subDepartment = subDepartment;
    if (area) params.area = area;
    if (status !== "all") params.status = status;
    applicationsApi
      .list(params)
      .then((r) =>
        setAppData({ applications: r.applications, total: r.total, totalPages: r.totalPages }),
      )
      .catch((err) => toast.error(getApiError(err, "Failed to load applications")))
      .finally(() => setLoading(false));
  }, [page, pageSize, search, category, department, subDepartment, area, status]);

  useEffect(() => {
    fetchApps();
  }, [fetchApps]);

  return (
    <AdminLayout title="Applications">
      <AnimatedSection>
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Applications</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Review, assign and manage all citizen applications.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Button className="gap-2" onClick={() => setCreateOpen(true)}>
              <Plus className="h-4 w-4" /> Create Application
            </Button>
          </motion.div>
        </div>
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <section className="rounded-2xl border border-border bg-card shadow-card overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-border">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold">All Applications</h2>
              <p className="text-xs text-muted-foreground">
                {appData.total} application{appData.total !== 1 && "s"} found
              </p>
            </div>
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2">
              <div className="relative col-span-2 sm:col-span-1">
                <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search ref no, name, mobile, email..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                  className="pl-9 sm:w-72"
                />
              </div>
              <Select
                value={category}
                onValueChange={(v) => {
                  setCategory(v);
                  setPage(1);
                }}
              >
                <SelectTrigger className="sm:w-40">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {CATEGORIES.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                value={department}
                onValueChange={(v) => {
                  setDepartment(v);
                  setSubDepartment("");
                  setArea("");
                  setPage(1);
                }}
              >
                <SelectTrigger className="sm:w-56">
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="Urban Development & Housing Department">Urban Development & Housing Department</SelectItem>
                  <SelectItem value="others">Others</SelectItem>
                </SelectContent>
              </Select>
              {department !== "all" && subDeptOptions.length > 0 && (
                <>
                  <Select
                    value={subDepartment}
                    onValueChange={(v) => {
                      setSubDepartment(v);
                      setArea("");
                      setPage(1);
                    }}
                  >
                    <SelectTrigger className="sm:w-48">
                      <SelectValue placeholder="Sub Department" />
                    </SelectTrigger>
                    <SelectContent>
                      {subDeptOptions.map((sd) => (
                        <SelectItem key={sd.name} value={sd.name}>
                          {sd.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select
                    value={area}
                    onValueChange={(v) => {
                      setArea(v);
                      setPage(1);
                    }}
                    disabled={!subDepartment || areaOptions.length === 0}
                  >
                    <SelectTrigger className="sm:w-44">
                      <SelectValue
                        placeholder={
                          !subDepartment
                            ? "Select sub dept first"
                            : areaOptions.length === 0
                              ? "No areas"
                              : "Area"
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {areaOptions.map((a) => (
                        <SelectItem key={a} value={a}>
                          {a}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </>
              )}
              <Select
                value={status}
                onValueChange={(v) => {
                  setStatus(v);
                  setPage(1);
                }}
              >
                <SelectTrigger className="sm:w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  {STATUSES.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-secondary/40 hover:bg-secondary/40">
                <TableHead className="font-semibold whitespace-nowrap">Created</TableHead>
                <TableHead className="font-semibold whitespace-nowrap">Reference No.</TableHead>
                <TableHead className="font-semibold">Applicant</TableHead>
                <TableHead className="font-semibold">Subject</TableHead>
                <TableHead className="font-semibold">Category</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
                <TableHead className="font-semibold text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-12 text-muted-foreground">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : appData.applications.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-12 text-muted-foreground">
                    No applications match your filters.
                  </TableCell>
                </TableRow>
              ) : (
                appData.applications.map((a) => (
                  <TableRow key={a.id} className="hover:bg-secondary/30">
                    <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                      {formatDate(a.createdAt)}
                    </TableCell>
                    <TableCell className="font-mono text-xs text-primary whitespace-nowrap">
                      {a.referenceNumber}
                    </TableCell>
                    <TableCell className="font-medium whitespace-nowrap">
                      {a.user?.fullName ?? a.applicantName}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground max-w-[300px] truncate">
                      {a.subject.length > 100 ? a.subject.slice(0, 100) + "..." : a.subject}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                      {a.category}
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={a.status} />
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="gap-1.5"
                        onClick={() => setSelected(a)}
                      >
                        <Eye className="h-4 w-4" /> Manage
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        <div className="p-4 sm:px-6 flex flex-col sm:flex-row gap-3 items-center justify-between border-t border-border">
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span>Rows per page</span>
            <Select
              value={String(pageSize)}
              onValueChange={(v) => {
                setPageSize(Number(v));
                setPage(1);
              }}
            >
              <SelectTrigger className="h-8 w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[5, 10, 20, 50].map((n) => (
                  <SelectItem key={n} value={String(n)}>
                    {n}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <span>
              Showing {appData.total === 0 ? 0 : (page - 1) * pageSize + 1}–
              {Math.min(page * pageSize, appData.total)} of {appData.total}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
            >
              <ChevronLeft className="h-4 w-4" /> Prev
            </Button>
            <span className="text-xs text-muted-foreground px-2">
              Page {page} of {appData.totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              disabled={page >= appData.totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              Next <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
      </AnimatedSection>

      <AdminApplicationDialog
        app={selected}
        open={!!selected}
        onOpenChange={(o) => !o && setSelected(null)}
        onSuccess={fetchApps}
      />
      <NewApplicationDialog mode="admin" open={createOpen} onOpenChange={setCreateOpen} onSuccess={fetchApps} />
    </AdminLayout>
  );
}
