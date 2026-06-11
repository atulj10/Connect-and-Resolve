import { useState, useEffect, type ComponentType } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import {
  BarChart3,
  ChevronLeft,
  ChevronRight,
  FileText,
  Landmark,
  LogOut,
  Menu,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { getStoredUser, clearStoredAuth } from "@/lib/auth";

type Tab = "analytics" | "applications";

type NavItem = {
  label: string;
  tab: Tab;
  icon: ComponentType<{ className?: string }>;
};

const NAV: NavItem[] = [
  { label: "Analytics", tab: "analytics", icon: BarChart3 },
  { label: "Applications", tab: "applications", icon: FileText },
];

export function CitizenLayout({
  children,
  activeTab,
  onTabChange,
  title,
}: {
  children: React.ReactNode;
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
  title?: string;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState({ name: "Citizen", email: "", initials: "CI", subtitle: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const u = getStoredUser();
    const name = u?.fullName ?? "Citizen";
    const email = u?.email ?? "";
    const mobile = u?.mobileNumber ?? "";
    const initials = name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
    setUser({ name, email, initials, subtitle: email || mobile });
  }, []);

  const handleLogout = () => {
    clearStoredAuth();
    toast.success("Logged out successfully");
    navigate({ to: "/" });
  };

  return (
    <div className="min-h-screen bg-secondary/30 flex">
      {/* Desktop sidebar */}
      <aside
        className={cn(
          "hidden md:flex flex-col sticky top-0 h-screen bg-card border-r border-border transition-[width] duration-200 ease-out",
          collapsed ? "w-[76px]" : "w-[260px]",
        )}
      >
        <SidebarInner
          collapsed={collapsed}
          activeTab={activeTab}
          onTabChange={onTabChange}
          user={user}
          onLogout={handleLogout}
        />
        <div className="px-3 pb-3">
          <button
            type="button"
            onClick={() => setCollapsed((c) => !c)}
            className="w-full inline-flex items-center justify-center gap-1.5 h-8 rounded-md text-xs text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-colors"
            aria-label="Toggle sidebar"
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <>
                <ChevronLeft className="h-4 w-4" /> Collapse
              </>
            )}
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
                  <SheetTitle className="sr-only">Citizen navigation</SheetTitle>
                  <SheetDescription className="sr-only">
                    Navigate the citizen dashboard
                  </SheetDescription>
                  <SidebarInner
                    collapsed={false}
                    activeTab={activeTab}
                    onTabChange={(tab) => {
                      onTabChange(tab);
                      setMobileOpen(false);
                    }}
                    user={user}
                    onLogout={handleLogout}
                  />
                </SheetContent>
              </Sheet>
              <div className="hidden sm:flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary md:hidden">
                  <Landmark className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-base sm:text-lg font-semibold leading-tight truncate">
                    {title ?? "Citizen Dashboard"}
                  </h1>
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                    Citizen Portal
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-full bg-primary/10 text-primary font-semibold flex items-center justify-center text-sm">
                {user.initials}
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
  activeTab,
  onTabChange,
  user,
  onLogout,
}: {
  collapsed: boolean;
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
  user: { name: string; email: string; initials: string; subtitle: string };
  onLogout: () => void;
}) {
  return (
    <div className="flex flex-col h-full min-h-0">
      {/* Logo */}
      <div
        className={cn(
          "flex items-center gap-2.5 px-4 h-16 border-b border-border",
          collapsed && "justify-center px-2",
        )}
      >
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary">
          <Landmark className="h-5 w-5 text-primary-foreground" />
        </div>
        {!collapsed && (
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-bold leading-tight truncate">Citizen Connect</span>
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
              Citizen Portal
            </span>
          </div>
        )}
      </div>

      {/* Citizen profile */}
      <div
        className={cn("px-3 pt-4 pb-4 border-b border-border", collapsed && "flex justify-center")}
      >
        {collapsed ? (
          <div
            className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-[#7C73FF] text-primary-foreground font-semibold flex items-center justify-center text-sm"
            title={`${user.name} — ${user.subtitle}`}
          >
            {user.initials}
          </div>
        ) : (
          <div className="flex items-center gap-3 rounded-xl bg-secondary/50 p-2.5">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-[#7C73FF] text-primary-foreground font-semibold flex items-center justify-center text-sm shrink-0">
              {user.initials}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold truncate">{user.name}</p>
              <p className="text-xs text-muted-foreground truncate">{user.subtitle}</p>
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
          const active = activeTab === item.tab;
          return (
            <button
              key={item.tab}
              type="button"
              onClick={() => onTabChange(item.tab)}
              className={cn(
                "group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors w-full text-left",
                active
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-secondary/70 hover:text-foreground",
                collapsed && "justify-center px-0",
              )}
              title={collapsed ? item.label : undefined}
            >
              <item.icon className="h-4 w-4 shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </button>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="px-3 py-3 border-t border-border">
        <button
          type="button"
          onClick={onLogout}
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors w-full text-left",
            collapsed && "justify-center px-0",
          )}
          title={collapsed ? "Logout" : undefined}
        >
          <LogOut className="h-4 w-4 shrink-0" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
}
