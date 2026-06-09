import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CATEGORIES,
  DEPARTMENTS,
  generateApplications,
} from "@/lib/applications";
import {
  CheckCircle2,
  Clock,
  FileText,
  Gauge,
  XCircle,
} from "lucide-react";
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
      { name: "description", content: "Analytics and insights for citizen grievances and applications." },
    ],
  }),
  component: AdminAnalytics,
});

const DATE_RANGES = ["Today", "Last 7 Days", "Last 30 Days", "This Year", "Custom Range"];
const PIE_COLORS = ["#5147F3", "#7C73FF", "#A39CFF", "#06B6D4", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"];

function AdminAnalytics() {
  const all = useMemo(() => generateApplications(48), []);
  const [range, setRange] = useState("Last 30 Days");

  const stats = useMemo(() => {
    const total = all.length;
    const pending = all.filter((a) => a.status === "Submitted").length;
    const review = all.filter((a) => a.status === "Under Review").length;
    const resolved = all.filter((a) => a.status === "Resolved").length;
    const closed = all.filter((a) => a.status === "Closed").length;
    const disposal = Math.round(((resolved + closed) / total) * 100);
    return { total, pending, review, resolved, closed, disposal };
  }, [all]);

  const categoryData = useMemo(
    () => CATEGORIES.map((c) => ({ name: c, value: all.filter((a) => a.category === c).length })).filter((d) => d.value > 0),
    [all],
  );
  const departmentData = useMemo(
    () => DEPARTMENTS.map((d) => ({
      department: d.replace(" Department", "").replace(" Corporation", ""),
      pending: all.filter((a) => a.department === d && (a.status === "Submitted" || a.status === "Under Review" || a.status === "In Process")).length,
      resolved: all.filter((a) => a.department === d && (a.status === "Resolved" || a.status === "Closed")).length,
    })),
    [all],
  );
  const districtData = useMemo(() => {
    const map = new Map<string, number>();
    all.forEach((a) => map.set(a.district, (map.get(a.district) ?? 0) + 1));
    return Array.from(map.entries()).map(([district, count]) => ({ district, count }));
  }, [all]);
  const topIssuesData = useMemo(() => [...categoryData].sort((a, b) => b.value - a.value).slice(0, 6), [categoryData]);

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
          <SelectTrigger className="w-44 bg-card"><SelectValue /></SelectTrigger>
          <SelectContent>
            {DATE_RANGES.map((r) => <SelectItem key={r} value={r}>{r}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      {/* KPIs */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-4">
          <KpiCard label="Total Applications" value={stats.total} icon={FileText} tint="bg-primary/10 text-primary" />
          <KpiCard label="Pending" value={stats.pending} icon={Clock} tint="bg-amber-100 text-amber-700" />
          <KpiCard label="Under Review" value={stats.review} icon={Gauge} tint="bg-violet-100 text-violet-700" />
          <KpiCard label="Resolved" value={stats.resolved} icon={CheckCircle2} tint="bg-emerald-100 text-emerald-700" />
          <KpiCard label="Closed" value={stats.closed} icon={XCircle} tint="bg-slate-100 text-slate-700" />
          <DisposalCard rate={stats.disposal} />
        </div>

        <ChartCard title="Category Distribution" subtitle="Applications by category">
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={categoryData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={90} paddingAngle={2}>
                {categoryData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: 8 }} />
              <Legend iconType="circle" wrapperStyle={{ fontSize: 11 }} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Analytics row */}
      <div className="grid gap-6 lg:grid-cols-3">
        <ChartCard title="Department-wise Pendency" subtitle="Pending vs resolved per department">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={departmentData} margin={{ left: -10, right: 8 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eef0f4" />
              <XAxis dataKey="department" tick={{ fontSize: 10 }} interval={0} angle={-15} textAnchor="end" height={50} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip contentStyle={{ borderRadius: 8 }} />
              <Legend iconType="circle" wrapperStyle={{ fontSize: 11 }} />
              <Bar dataKey="pending" stackId="a" fill="#F59E0B" />
              <Bar dataKey="resolved" stackId="a" fill="#5147F3" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="District-wise Analysis" subtitle="Applications received per district">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={districtData} layout="vertical" margin={{ left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#eef0f4" />
              <XAxis type="number" tick={{ fontSize: 11 }} />
              <YAxis dataKey="district" type="category" tick={{ fontSize: 11 }} width={80} />
              <Tooltip contentStyle={{ borderRadius: 8 }} />
              <Bar dataKey="count" fill="#5147F3" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Top Citizen Issues" subtitle="Most reported categories">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={topIssuesData} margin={{ left: -10, right: 8 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eef0f4" />
              <XAxis dataKey="name" tick={{ fontSize: 10 }} interval={0} angle={-15} textAnchor="end" height={50} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip contentStyle={{ borderRadius: 8 }} />
              <Bar dataKey="value" fill="#7C73FF" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </AdminLayout>
  );
}

function KpiCard({
  label, value, icon: Icon, tint,
}: { label: string; value: number; icon: React.ComponentType<{ className?: string }>; tint: string }) {
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

function ChartCard({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
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
