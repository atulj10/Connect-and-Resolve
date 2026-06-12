import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AnimatedSection, AnimatedGrid, AnimatedItem } from "@/components/AnimatedSection";
import { AdminLayout } from "@/components/AdminLayout";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { getApiError } from "@/lib/api/client";
import { analyticsApi, type AdminAnalytics } from "@/lib/api/analytics";
import { CheckCircle2, Clock, FileText, Gauge, XCircle } from "lucide-react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";

export const Route = createFileRoute("/admin/dashboard")({
  head: () => ({
    meta: [
      { title: "Analytics — Minister Office Admin" },
      {
        name: "description",
        content: "Analytics and insights for citizen grievances and applications.",
      },
    ],
  }),
  component: AdminAnalytics,
});

const RANGE_OPTIONS = [
  { label: "This Week", value: "week" },
  { label: "This Month", value: "month" },
  { label: "This Year", value: "year" },
] as const;

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

function AdminAnalytics() {
  const [range, setRange] = useState("year");
  const [analytics, setAnalytics] = useState<AdminAnalytics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    analyticsApi
      .admin(range)
      .then(setAnalytics)
      .catch((err) => toast.error(getApiError(err, "Failed to load analytics")))
      .finally(() => setLoading(false));
  }, [range]);

  const stats = analytics
    ? {
        total: analytics.total,
        pending: analytics.pending,
        resolved: analytics.resolved,
        closed: analytics.closed,
        disposal:
          analytics.total > 0
            ? Math.round(((analytics.resolved + analytics.closed) / analytics.total) * 100)
            : 0,
      }
    : { total: 0, pending: 0, resolved: 0, closed: 0, disposal: 0 };

  const topIssuesData = (analytics?.categoryDistribution ?? [])
    .slice()
    .sort((a, b) => b.value - a.value)
    .slice(0, 6);

  return (
    <AdminLayout title="Analytics">
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Dashboard Overview</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Monitor grievances, track disposal rates and measure performance.
          </p>
        </div>
        <Select value={range} onValueChange={setRange}>
          <SelectTrigger className="w-44 bg-card">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {RANGE_OPTIONS.map((r) => (
              <SelectItem key={r.value} value={r.value}>
                {r.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {loading ? (
        <>
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-border bg-card p-4 shadow-card animate-pulse"
                >
                  <div className="h-10 bg-secondary/50 rounded" />
                </div>
              ))}
            </div>
            <div className="rounded-2xl border border-border bg-card p-5 shadow-card animate-pulse">
              <div className="h-[260px] bg-secondary/50 rounded" />
            </div>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="rounded-2xl border border-border bg-card p-5 shadow-card animate-pulse"
              >
                <div className="h-[260px] bg-secondary/50 rounded" />
              </div>
            ))}
          </div>
        </>
      ) : analytics && analytics.total === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <FileText className="h-16 w-16 text-muted-foreground/40 mb-4" />
          <h3 className="text-lg font-semibold text-muted-foreground">No applications to show</h3>
          <p className="text-sm text-muted-foreground/60 mt-1">
            No applications were found in the selected time range.
          </p>
        </div>
      ) : (
        <>
          <AnimatedGrid className="grid gap-6 lg:grid-cols-3">
            <AnimatedGrid className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-4">
              <AnimatedItem>
                <KpiCard
                  label="Total Applications"
                  value={stats.total}
                  icon={FileText}
                  tint="bg-primary/10 text-primary"
                />
              </AnimatedItem>
              <AnimatedItem>
                <KpiCard
                  label="Pending"
                  value={stats.pending}
                  icon={Clock}
                  tint="bg-amber-100 text-amber-700"
                />
              </AnimatedItem>
              <AnimatedItem>
                <KpiCard
                  label="Rejected"
                  value={stats.closed}
                  icon={XCircle}
                  tint="bg-red-100 text-red-700"
                />
              </AnimatedItem>
              <AnimatedItem>
                <KpiCard
                  label="Resolved"
                  value={stats.resolved}
                  icon={CheckCircle2}
                  tint="bg-emerald-100 text-emerald-700"
                />
              </AnimatedItem>
              <AnimatedItem>
                <DisposalCard rate={stats.disposal} />
              </AnimatedItem>
            </AnimatedGrid>

            <AnimatedItem>
              <ChartCard title="Category Distribution" subtitle="Applications by category">
              <ResponsiveContainer width="100%" height={260}>
                <PieChart>
                  <Pie
                    data={analytics?.categoryDistribution ?? []}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={90}
                    paddingAngle={2}
                  >
                    {(analytics?.categoryDistribution ?? []).map((_, i) => (
                      <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: 8 }} />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: 11 }} />
                </PieChart>
              </ResponsiveContainer>
            </ChartCard>
            </AnimatedItem>
          </AnimatedGrid>

          <AnimatedGrid className="grid gap-6 lg:grid-cols-3">
            <AnimatedItem>
              <ChartCard
                title="Department-wise Pendency"
                subtitle="Pending vs resolved per department"
              >
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart
                    data={analytics?.departmentPendency ?? []}
                    margin={{ left: -10, right: 8 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eef0f4" />
                    <XAxis
                      dataKey="department"
                      tick={{ fontSize: 10 }}
                      interval={0}
                      angle={-15}
                      textAnchor="end"
                      height={50}
                    />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip contentStyle={{ borderRadius: 8 }} />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: 11 }} />
                    <Bar dataKey="pending" stackId="a" fill="#F59E0B" />
                    <Bar dataKey="resolved" stackId="a" fill="#5147F3" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartCard>
            </AnimatedItem>

            <AnimatedItem>
              <ChartCard title="District-wise Analysis" subtitle="Applications received per district">
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart
                    data={analytics?.districtAnalysis ?? []}
                    layout="vertical"
                    margin={{ left: 10 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#eef0f4" />
                    <XAxis type="number" tick={{ fontSize: 11 }} />
                    <YAxis dataKey="district" type="category" tick={{ fontSize: 11 }} width={80} />
                    <Tooltip contentStyle={{ borderRadius: 8 }} />
                    <Bar dataKey="count" fill="#5147F3" radius={[0, 6, 6, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartCard>
            </AnimatedItem>

            <AnimatedItem>
              <ChartCard title="Top Citizen Issues" subtitle="Most reported categories">
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart data={topIssuesData} margin={{ left: -10, right: 8 }}>
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
                    <Bar dataKey="value" fill="#7C73FF" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartCard>
            </AnimatedItem>
          </AnimatedGrid>
        </>
      )}
    </AdminLayout>
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

function DisposalCard({ rate }: { rate: number }) {
  return (
    <div className="rounded-2xl border border-border bg-gradient-to-br from-primary to-[#7C73FF] p-4 shadow-card text-primary-foreground">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs opacity-90">Disposal Rate</p>
          <p className="mt-1.5 text-2xl font-bold tracking-tight">{rate}%</p>
        </div>
        <div className="h-9 w-9 rounded-lg flex items-center justify-center bg-white/15">
          <Gauge className="h-4 w-4" />
        </div>
      </div>
      <div className="mt-3 h-1.5 bg-white/20 rounded-full overflow-hidden">
        <div className="h-full bg-white/90" style={{ width: `${rate}%` }} />
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
