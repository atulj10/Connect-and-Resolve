import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState, useEffect, useCallback } from "react";
import { CitizenLayout } from "@/components/CitizenLayout";
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
import { formatDate } from "@/lib/applications";
import type { ApplicationDto } from "@/lib/api/applications";
import { applicationsApi } from "@/lib/api/applications";
import { analyticsApi, type CitizenAnalytics } from "@/lib/api/analytics";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import {
  CheckCircle2,
  Clock,
  Eye,
  FileText,
  Plus,
  Search,
  XCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Citizen Dashboard — Citizen Connect" },
      {
        name: "description",
        content: "Track your applications, grievances, and engagement with the government.",
      },
    ],
  }),
  component: CitizenDashboard,
});

const PIE_COLORS = [
  "#5147F3",
  "#7C73FF",
  "#A39CFF",
  "#06B6D4",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
];
const PAGE_SIZE_OPTIONS = [5, 10, 20, 50];

function CitizenDashboard() {
  const [tab, setTab] = useState<"analytics" | "applications">("analytics");
  const [selected, setSelected] = useState<ApplicationDto | null>(null);
  const [createOpen, setCreateOpen] = useState(false);
  const [loadingAnalytics, setLoadingAnalytics] = useState(true);
  const [loadingApps, setLoadingApps] = useState(true);
  const [analytics, setAnalytics] = useState<CitizenAnalytics | null>(null);
  const [dateRange, setDateRange] = useState("year");

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState("all");
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);
  const [appData, setAppData] = useState<{
    applications: ApplicationDto[];
    total: number;
    totalPages: number;
  }>({ applications: [], total: 0, totalPages: 0 });

  const rangeMap: Record<string, string> = {
    "This Week": "week",
    "This Month": "month",
    "This Year": "year",
  };
  const analyticsRange = rangeMap[dateRange] || "year";

  useEffect(() => {
    setLoadingAnalytics(true);
    analyticsApi
      .citizen(analyticsRange)
      .then(setAnalytics)
      .catch(console.error)
      .finally(() => setLoadingAnalytics(false));
  }, [analyticsRange]);

  const fetchApps = useCallback(() => {
    setLoadingApps(true);
    const params: Record<string, string | number | undefined> = { page, pageSize };
    if (search) params.search = search;
    if (category !== "all") params.category = category;
    if (status !== "all") params.status = status;
    applicationsApi
      .list(params)
      .then((r) =>
        setAppData({ applications: r.applications, total: r.total, totalPages: r.totalPages }),
      )
      .catch(console.error)
      .finally(() => setLoadingApps(false));
  }, [page, pageSize, search, category, status]);

  useEffect(() => {
    fetchApps();
  }, [fetchApps]);

  const monthlyTrendData = useMemo(() => {
    if (!analytics?.monthlyTrend) return [];
    return analytics.monthlyTrend.map((m) => ({ month: m.month, applications: m.count }));
  }, [analytics]);

  return (
    <CitizenLayout
      activeTab={tab}
      onTabChange={setTab}
      title={tab === "analytics" ? "Analytics" : "Applications"}
    >
      {tab === "analytics" ? (
        <AnalyticsView
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
          analytics={analytics}
          loading={loadingAnalytics}
          monthlyTrendData={monthlyTrendData}
        />
      ) : (
        <ApplicationsView
          search={search}
          onSearchChange={(v) => {
            setSearch(v);
            setPage(1);
          }}
          category={category}
          onCategoryChange={(v) => {
            setCategory(v);
            setPage(1);
          }}
          status={status}
          onStatusChange={(v) => {
            setStatus(v);
            setPage(1);
          }}
          page={page}
          totalPages={appData.totalPages}
          pageSize={pageSize}
          onPageSizeChange={(v) => {
            setPageSize(Number(v));
            setPage(1);
          }}
          onPrevPage={() => setPage((p) => Math.max(1, p - 1))}
          onNextPage={() => setPage((p) => Math.min(appData.totalPages, p + 1))}
          total={appData.total}
          pageRows={appData.applications}
          loading={loadingApps}
          onCreateClick={() => setCreateOpen(true)}
          onViewClick={(a) => setSelected(a)}
        />
      )}

      <ApplicationDetailsDialog
        app={selected}
        open={!!selected}
        onOpenChange={(o) => !o && setSelected(null)}
      />
      <NewApplicationDialog mode="citizen" open={createOpen} onOpenChange={setCreateOpen} />
    </CitizenLayout>
  );
}

function AnalyticsView({
  dateRange,
  onDateRangeChange,
  analytics,
  loading,
  monthlyTrendData,
}: {
  dateRange: string;
  onDateRangeChange: (v: string) => void;
  analytics: CitizenAnalytics | null;
  loading: boolean;
  monthlyTrendData: { month: string; applications: number }[];
}) {
  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">My Analytics</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Track your application activity and resolution trends.
          </p>
        </div>
        <Select value={dateRange} onValueChange={onDateRangeChange}>
          <SelectTrigger className="w-44 bg-card">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="This Week">This Week</SelectItem>
            <SelectItem value="This Month">This Month</SelectItem>
            <SelectItem value="This Year">This Year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {loading ? (
        <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="rounded-2xl border border-border bg-card p-4 shadow-card animate-pulse"
            >
              <div className="h-10 bg-secondary/50 rounded" />
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
            <KpiCard
              label="Total Applications"
              value={analytics?.total ?? 0}
              icon={FileText}
              tint="bg-primary/10 text-primary"
            />
            <KpiCard
              label="Pending"
              value={analytics?.pending ?? 0}
              icon={Clock}
              tint="bg-amber-100 text-amber-700"
            />
            <KpiCard
              label="Resolved"
              value={analytics?.resolved ?? 0}
              icon={CheckCircle2}
              tint="bg-emerald-100 text-emerald-700"
            />
            <KpiCard
              label="Closed"
              value={analytics?.closed ?? 0}
              icon={XCircle}
              tint="bg-slate-100 text-slate-700"
            />
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <ChartCard title="Status Distribution" subtitle="Applications by current status">
              <ResponsiveContainer width="100%" height={260}>
                <PieChart>
                  <Pie
                    data={analytics?.statusDistribution ?? []}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={90}
                    paddingAngle={2}
                  >
                    {(analytics?.statusDistribution ?? []).map((_, i) => (
                      <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: 8 }} />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: 11 }} />
                </PieChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title="Applications by Category" subtitle="Breakdown across categories">
              <ResponsiveContainer width="100%" height={260}>
                <BarChart
                  data={analytics?.categoryDistribution ?? []}
                  margin={{ left: -10, right: 8 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eef0f4" />
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 10 }}
                    interval={0}
                    angle={-15}
                    textAnchor="end"
                    height={50}
                  />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip contentStyle={{ borderRadius: 8 }} />
                  <Bar dataKey="value" fill="#5147F3" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title="Monthly Trend" subtitle="Applications filed per month">
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={monthlyTrendData} margin={{ left: -10, right: 8 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eef0f4" />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} interval={0} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip contentStyle={{ borderRadius: 8 }} />
                  <Bar dataKey="applications" fill="#7C73FF" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>
        </>
      )}
    </>
  );
}

function ApplicationsView({
  search,
  onSearchChange,
  category,
  onCategoryChange,
  status,
  onStatusChange,
  page,
  totalPages,
  pageSize,
  onPageSizeChange,
  onPrevPage,
  onNextPage,
  total,
  pageRows,
  loading,
  onCreateClick,
  onViewClick,
}: {
  search: string;
  onSearchChange: (v: string) => void;
  category: string;
  onCategoryChange: (v: string) => void;
  status: string;
  onStatusChange: (v: string) => void;
  page: number;
  totalPages: number;
  pageSize: number;
  onPageSizeChange: (v: string) => void;
  onPrevPage: () => void;
  onNextPage: () => void;
  total: number;
  pageRows: ApplicationDto[];
  loading: boolean;
  onCreateClick: () => void;
  onViewClick: (a: ApplicationDto) => void;
}) {
  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">My Applications</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Track, search and manage all your applications.
          </p>
        </div>
        <Button className="gap-2" onClick={onCreateClick}>
          <Plus className="h-4 w-4" /> New Application
        </Button>
      </div>

      <section className="rounded-2xl border border-border bg-card shadow-card overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-border">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold">All Applications</h2>
              <p className="text-xs text-muted-foreground">
                {total} application{total !== 1 && "s"} found
              </p>
            </div>
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2">
              <div className="relative col-span-2 sm:col-span-1">
                <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search ref no or subject..."
                  value={search}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="pl-9 sm:w-64"
                />
              </div>
              <Select value={category} onValueChange={onCategoryChange}>
                <SelectTrigger className="sm:w-40">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {[
                    "Water Supply",
                    "Electricity",
                    "Roads & Infrastructure",
                    "Sanitation",
                    "Healthcare",
                    "Education",
                    "Public Safety",
                    "Revenue",
                  ].map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={status} onValueChange={onStatusChange}>
                <SelectTrigger className="sm:w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  {[
                    "Submitted",
                    "Under Review",
                    "Forwarded to Department",
                    "In Process",
                    "Action Taken",
                    "Resolved",
                    "Closed",
                  ].map((s) => (
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
              {loading ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-12 text-muted-foreground">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : pageRows.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-12 text-muted-foreground">
                    No applications match your filters.
                  </TableCell>
                </TableRow>
              ) : (
                pageRows.map((a) => (
                  <TableRow key={a.id} className="hover:bg-secondary/30">
                    <TableCell className="font-mono text-xs text-primary whitespace-nowrap">
                      {a.referenceNumber}
                    </TableCell>
                    <TableCell className="max-w-xs truncate font-medium">{a.subject}</TableCell>
                    <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                      {a.category}
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={a.status} />
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                      {formatDate(a.createdAt)}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                      {formatDate(a.updatedAt)}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="gap-1.5"
                        onClick={() => onViewClick(a)}
                      >
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
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span>Rows per page</span>
            <Select value={String(pageSize)} onValueChange={onPageSizeChange}>
              <SelectTrigger className="h-8 w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {PAGE_SIZE_OPTIONS.map((n) => (
                  <SelectItem key={n} value={String(n)}>
                    {n}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <span>
              Showing {total === 0 ? 0 : (page - 1) * pageSize + 1}–
              {Math.min(page * pageSize, total)} of {total}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled={page === 1} onClick={onPrevPage}>
              <ChevronLeft className="h-4 w-4" /> Prev
            </Button>
            <span className="text-xs text-muted-foreground px-2">
              Page {page} of {totalPages}
            </span>
            <Button variant="outline" size="sm" disabled={page >= totalPages} onClick={onNextPage}>
              Next <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

function KpiCard({
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
    <div className="rounded-2xl border border-border bg-card p-4 shadow-card">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-xs text-muted-foreground">{label}</p>
          <p className="mt-1.5 text-2xl font-bold tracking-tight">{value}</p>
        </div>
        <div className={`h-9 w-9 rounded-lg flex items-center justify-center ${tint}`}>
          <Icon className="h-4 w-4" />
        </div>
      </div>
    </div>
  );
}

function ChartCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
      <div className="mb-3">
        <h3 className="text-sm font-semibold">{title}</h3>
        {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}
