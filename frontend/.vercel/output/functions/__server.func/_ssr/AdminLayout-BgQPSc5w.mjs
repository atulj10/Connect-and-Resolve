import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { b as useRouterState, e as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { c as cn, B as Button } from "./button-DjOZMqFS.mjs";
import { S as Sheet, a as SheetTrigger, b as SheetContent, c as SheetTitle, d as SheetDescription } from "./select-JCJ1co2s.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { a as getStoredUser, c as clearStoredAuth } from "./auth-tLLzOFk4.mjs";
import { C as ChevronRight, c as ChevronLeft, d as Menu, L as Landmark, m as ChartColumn, F as FileText, p as Users, n as LogOut } from "../_libs/lucide-react.mjs";
const NAV = [
  { label: "Analytics", to: "/admin/dashboard", icon: ChartColumn },
  { label: "Applications", to: "/admin/applications", icon: FileText },
  { label: "Citizens", to: "/admin/citizens", icon: Users }
];
function AdminLayout({ children, title }) {
  const [collapsed, setCollapsed] = reactExports.useState(false);
  const [mobileOpen, setMobileOpen] = reactExports.useState(false);
  const [user, setUser] = reactExports.useState(null);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  reactExports.useEffect(() => {
    setUser(getStoredUser());
  }, []);
  const initials = user?.fullName ? user.fullName.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase() : "AD";
  user?.fullName ?? "Admin";
  user?.email ?? "admin@gov.in";
  const handleLogout = () => {
    clearStoredAuth();
    toast.success("Logged out successfully");
    navigate({ to: "/admin/login" });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-secondary/30 flex", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "aside",
      {
        className: cn(
          "hidden md:flex flex-col sticky top-0 h-screen bg-card border-r border-border transition-[width] duration-200 ease-out",
          collapsed ? "w-[76px]" : "w-[260px]"
        ),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            SidebarInner,
            {
              collapsed,
              pathname,
              user,
              onLogout: handleLogout
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-3 pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setCollapsed((c) => !c),
              className: "w-full inline-flex items-center justify-center gap-1.5 h-8 rounded-md text-xs text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-colors",
              "aria-label": "Toggle sidebar",
              children: collapsed ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-4 w-4" }),
                " Collapse"
              ] })
            }
          ) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0 flex flex-col", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "sticky top-0 z-40 bg-background/85 backdrop-blur border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Sheet, { open: mobileOpen, onOpenChange: setMobileOpen, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SheetTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", className: "md:hidden", "aria-label": "Open menu", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "h-5 w-5" }) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetContent, { side: "left", className: "p-0 w-[280px]", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SheetTitle, { className: "sr-only", children: "Admin navigation" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SheetDescription, { className: "sr-only", children: "Navigate the admin dashboard" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                SidebarInner,
                {
                  collapsed: false,
                  pathname,
                  user,
                  onLogout: handleLogout,
                  onNavigate: () => setMobileOpen(false)
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden sm:flex items-center gap-2.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-9 w-9 items-center justify-center rounded-lg bg-primary md:hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Landmark, { className: "h-5 w-5 text-primary-foreground" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-base sm:text-lg font-semibold leading-tight truncate", children: title ?? "Minister Office" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-widest text-muted-foreground", children: "Admin Console" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-9 w-9 rounded-full bg-primary/10 text-primary font-semibold flex items-center justify-center text-sm", children: initials }) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1 px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 max-w-[1400px] w-full mx-auto", children })
    ] })
  ] });
}
function SidebarInner({
  collapsed,
  pathname,
  user,
  onLogout,
  onNavigate
}) {
  const initials = user?.fullName ? user.fullName.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase() : "AD";
  const displayName = user?.fullName ?? "Admin";
  const displayEmail = user?.email ?? "admin@gov.in";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col h-full min-h-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: cn(
          "flex items-center gap-2.5 px-4 h-16 border-b border-border",
          collapsed && "justify-center px-2"
        ),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Landmark, { className: "h-5 w-5 text-primary-foreground" }) }),
          !collapsed && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-bold leading-tight truncate", children: "Minister Office" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] uppercase tracking-widest text-muted-foreground", children: "Admin Portal" })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: cn("px-3 pt-4 pb-4 border-b border-border", collapsed && "flex justify-center"),
        children: collapsed ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "h-10 w-10 rounded-full bg-gradient-to-br from-primary to-[#7C73FF] text-primary-foreground font-semibold flex items-center justify-center text-sm",
            title: `${displayName} — ${displayEmail}`,
            children: initials
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 rounded-xl bg-secondary/50 p-2.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-10 rounded-full bg-gradient-to-br from-primary to-[#7C73FF] text-primary-foreground font-semibold flex items-center justify-center text-sm shrink-0", children: initials }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold truncate", children: displayName }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: displayEmail })
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "flex-1 overflow-y-auto px-3 py-4 space-y-1", children: [
      !collapsed && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "px-2 pb-1 text-[10px] uppercase tracking-widest text-muted-foreground/70 font-semibold", children: "Main" }),
      NAV.map((item) => {
        const active = pathname === item.to || pathname.startsWith(`${item.to}/`);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: item.to,
            onClick: onNavigate,
            className: cn(
              "group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
              active ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:bg-secondary/70 hover:text-foreground",
              collapsed && "justify-center px-0"
            ),
            title: collapsed ? item.label : void 0,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(item.icon, { className: "h-4 w-4 shrink-0" }),
              !collapsed && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: item.label })
            ]
          },
          item.to
        );
      })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-3 py-3 border-t border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => {
          onLogout();
          onNavigate?.();
        },
        className: cn(
          "w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors",
          collapsed && "justify-center px-0"
        ),
        title: collapsed ? "Logout" : void 0,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "h-4 w-4 shrink-0" }),
          !collapsed && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Logout" })
        ]
      }
    ) })
  ] });
}
export {
  AdminLayout as A
};
