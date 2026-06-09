import { Link, useRouterState } from "@tanstack/react-router";
import { useState, type ComponentType } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import {
  BarChart3,
  ChevronLeft,
  ChevronRight,
  FileText,
  Landmark,
  LogOut,
  Menu,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";

type NavItem = {
  label: string;
  to: "/admin/dashboard" | "/admin/applications" | "/admin/citizens";
  icon: ComponentType<{ className?: string }>;
};

const NAV: NavItem[] = [
  { label: "Analytics", to: "/admin/dashboard", icon: BarChart3 },
  { label: "Applications", to: "/admin/applications", icon: FileText },
  { label: "Citizens", to: "/admin/citizens", icon: Users },
];

const ADMIN = {
  name: "Rajeev Menon",
  email: "rajeev.menon@minister.gov.in",
  initials: "RM",
};

export function AdminLayout({ children, title }: { children: React.ReactNode; title?: string }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-screen bg-secondary/30 flex">
      {/* Desktop sidebar */}
      <aside
        className={cn(
          "hidden md:flex flex-col sticky top-0 h-screen bg-card border-r border-border transition-[width] duration-200 ease-out",
          collapsed ? "w-[76px]" : "w-[260px]",
        )}
      >
        <SidebarInner collapsed={collapsed} pathname={pathname} />
        <div className="px-3 pb-3">
          <button
            type="button"
            onClick={() => setCollapsed((c) => !c)}
            className="w-full inline-flex items-center justify-center gap-1.5 h-8 rounded-md text-xs text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-colors"
            aria-label="Toggle sidebar"
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <><ChevronLeft className="h-4 w-4" /> Collapse</>}
          </button>
        </div>
      </aside>

      {/* Main column */}
      <div className="flex-1 min-w-0 flex flex-col">
        <header className="sticky top-0 z-40 bg-background/85 backdrop-blur border-b border-border">
          <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="p-0 w-[280px]">
                  <SheetTitle className="sr-only">Admin navigation</SheetTitle>
                  <SheetDescription className="sr-only">Navigate the admin dashboard</SheetDescription>
                  <SidebarInner collapsed={false} pathname={pathname} onNavigate={() => setMobileOpen(false)} />
                </SheetContent>
              </Sheet>
              <div className="hidden sm:flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary md:hidden">
                  <Landmark className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-base sm:text-lg font-semibold leading-tight truncate">
                    {title ?? "Minister Office"}
                  </h1>
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                    Admin Console
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-full bg-primary/10 text-primary font-semibold flex items-center justify-center text-sm">
                {ADMIN.initials}
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 max-w-[1400px] w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

function SidebarInner({
  collapsed,
  pathname,
  onNavigate,
}: {
  collapsed: boolean;
  pathname: string;
  onNavigate?: () => void;
}) {
  return (
    <div className="flex flex-col h-full min-h-0">
      {/* Logo */}
      <div className={cn("flex items-center gap-2.5 px-4 h-16 border-b border-border", collapsed && "justify-center px-2")}>
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary">
          <Landmark className="h-5 w-5 text-primary-foreground" />
        </div>
        {!collapsed && (
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-bold leading-tight truncate">Minister Office</span>
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Admin Portal</span>
          </div>
        )}
      </div>

      {/* Admin profile */}
      <div className={cn("px-3 pt-4 pb-4 border-b border-border", collapsed && "flex justify-center")}>
        {collapsed ? (
          <div
            className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-[#7C73FF] text-primary-foreground font-semibold flex items-center justify-center text-sm"
            title={`${ADMIN.name} — ${ADMIN.email}`}
          >
            {ADMIN.initials}
          </div>
        ) : (
          <div className="flex items-center gap-3 rounded-xl bg-secondary/50 p-2.5">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-[#7C73FF] text-primary-foreground font-semibold flex items-center justify-center text-sm shrink-0">
              {ADMIN.initials}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold truncate">{ADMIN.name}</p>
              <p className="text-xs text-muted-foreground truncate">{ADMIN.email}</p>
            </div>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {!collapsed && (
          <p className="px-2 pb-1 text-[10px] uppercase tracking-widest text-muted-foreground/70 font-semibold">
            Main
          </p>
        )}
        {NAV.map((item) => {
          const active = pathname === item.to || pathname.startsWith(`${item.to}/`);
          return (
            <Link
              key={item.to}
              to={item.to}
              onClick={onNavigate}
              className={cn(
                "group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-secondary/70 hover:text-foreground",
                collapsed && "justify-center px-0",
              )}
              title={collapsed ? item.label : undefined}
            >
              <item.icon className="h-4 w-4 shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="px-3 py-3 border-t border-border">
        <Link
          to="/admin/login"
          onClick={onNavigate}
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors",
            collapsed && "justify-center px-0",
          )}
          title={collapsed ? "Logout" : undefined}
        >
          <LogOut className="h-4 w-4 shrink-0" />
          {!collapsed && <span>Logout</span>}
        </Link>
      </div>
    </div>
  );
}
