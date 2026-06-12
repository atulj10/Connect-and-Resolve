import { Q as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { Q as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { c as createRouter, a as createRootRouteWithContext, u as useRouter, L as Link, b as useRouterState, O as Outlet, H as HeadContent, S as Scripts, d as createFileRoute, l as lazyRouteComponent } from "../_libs/tanstack__react-router.mjs";
import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { T as Toaster$1 } from "../_libs/sonner.mjs";
import { A as AnimatePresence, m as motion } from "../_libs/framer-motion.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
const Toaster = ({ ...props }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Toaster$1,
    {
      className: "toaster group",
      toastOptions: {
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
        }
      },
      ...props
    }
  );
};
const appCss = "/assets/styles-CXyzta1D.css";
function reportLovableError(error, context = {}) {
  if (typeof window === "undefined") return;
  window.__lovableEvents?.captureException?.(
    error,
    {
      source: "react_error_boundary",
      route: window.location.pathname,
      ...context
    },
    {
      mechanism: "react_error_boundary",
      handled: false,
      severity: "error"
    }
  );
}
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", delay }
  })
};
function AnimatedSection({ children, delay = 0, ...rest }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: "hidden",
      whileInView: "visible",
      viewport: { once: true, margin: "-60px" },
      variants: fadeUp,
      custom: delay,
      ...rest,
      children
    }
  );
}
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 }
  }
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};
function AnimatedGrid({ children, ...rest }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: "hidden",
      whileInView: "visible",
      viewport: { once: true, margin: "-40px" },
      variants: containerVariants,
      ...rest,
      children
    }
  );
}
function AnimatedItem({ children, ...rest }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { variants: itemVariants, ...rest, children });
}
const fadeInPage = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" }
  }
};
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-7xl font-bold text-foreground", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 text-xl font-semibold text-foreground", children: "Page not found" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "The page you're looking for doesn't exist or has been moved." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/",
        className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
        children: "Go home"
      }
    ) })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router2 = useRouter();
  reactExports.useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-semibold tracking-tight text-foreground", children: "This page didn't load" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Something went wrong on our end. You can try refreshing or head back home." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap justify-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
            reset();
          },
          className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: "/",
          className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
          children: "Go home"
        }
      )
    ] })
  ] }) });
}
const Route$8 = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Citizen Connect — Grievance Management Portal" },
      {
        name: "description",
        content: "Connecting citizens with better governance. Submit complaints, grievances, suggestions, and assistance requests."
      },
      { name: "author", content: "Citizen Connect" },
      { property: "og:title", content: "Citizen Connect — Grievance Management Portal" },
      {
        property: "og:description",
        content: "Connecting citizens with better governance. Submit complaints, grievances, suggestions, and assistance requests."
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@CitizenConnect" }
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss
      },
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com"
      },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous"
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
      }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { className: "font-sans antialiased", children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Toaster, { richColors: true }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$8.useRouteContext();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      variants: fadeInPage,
      initial: "initial",
      animate: "animate",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {})
    },
    pathname
  ) }) });
}
const $$splitComponentImporter$7 = () => import("./register-CNjafxnS.mjs");
const Route$7 = createFileRoute("/register")({
  head: () => ({
    meta: [{
      title: "Create Account — Citizen Connect"
    }, {
      name: "description",
      content: "Register on Citizen Connect to submit grievances, track applications and engage with your government."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./login-CN3bfADW.mjs");
const Route$6 = createFileRoute("/login")({
  head: () => ({
    meta: [{
      title: "Citizen Login — Citizen Connect"
    }, {
      name: "description",
      content: "Securely log in to the Citizen Connect grievance portal using mobile or email OTP."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./dashboard-DryDJoj4.mjs");
const Route$5 = createFileRoute("/dashboard")({
  head: () => ({
    meta: [{
      title: "Citizen Dashboard — Citizen Connect"
    }, {
      name: "description",
      content: "Track your applications, grievances, and engagement with the government."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./index-B_G2kjAu.mjs");
const Route$4 = createFileRoute("/")({
  head: () => ({
    meta: [{
      title: "Citizen Connect — Grievance Management Portal"
    }, {
      name: "description",
      content: "Connecting citizens with better governance. Submit complaints, grievances, suggestions, and assistance requests."
    }, {
      property: "og:title",
      content: "Citizen Connect — Grievance Management Portal"
    }, {
      property: "og:description",
      content: "Connecting citizens with better governance. Submit complaints, grievances, suggestions, and assistance requests."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./admin.login-DH9N73OP.mjs");
const Route$3 = createFileRoute("/admin/login")({
  head: () => ({
    meta: [{
      title: "Admin Login — Minister Office Dashboard"
    }, {
      name: "description",
      content: "Secure administrative login for Minister Office personnel managing citizen grievances."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./admin.dashboard-Ctsb8i-A.mjs");
const Route$2 = createFileRoute("/admin/dashboard")({
  head: () => ({
    meta: [{
      title: "Analytics — Minister Office Admin"
    }, {
      name: "description",
      content: "Analytics and insights for citizen grievances and applications."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./admin.citizens-CLNn2SNb.mjs");
const Route$1 = createFileRoute("/admin/citizens")({
  head: () => ({
    meta: [{
      title: "Citizens — Minister Office Admin"
    }, {
      name: "description",
      content: "Search, filter and manage registered citizens."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./admin.applications-BmeLS9VX.mjs");
const Route = createFileRoute("/admin/applications")({
  head: () => ({
    meta: [{
      title: "Applications — Minister Office Admin"
    }, {
      name: "description",
      content: "Review, assign and manage citizen applications and grievances."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const RegisterRoute = Route$7.update({
  id: "/register",
  path: "/register",
  getParentRoute: () => Route$8
});
const LoginRoute = Route$6.update({
  id: "/login",
  path: "/login",
  getParentRoute: () => Route$8
});
const DashboardRoute = Route$5.update({
  id: "/dashboard",
  path: "/dashboard",
  getParentRoute: () => Route$8
});
const IndexRoute = Route$4.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$8
});
const AdminLoginRoute = Route$3.update({
  id: "/admin/login",
  path: "/admin/login",
  getParentRoute: () => Route$8
});
const AdminDashboardRoute = Route$2.update({
  id: "/admin/dashboard",
  path: "/admin/dashboard",
  getParentRoute: () => Route$8
});
const AdminCitizensRoute = Route$1.update({
  id: "/admin/citizens",
  path: "/admin/citizens",
  getParentRoute: () => Route$8
});
const AdminApplicationsRoute = Route.update({
  id: "/admin/applications",
  path: "/admin/applications",
  getParentRoute: () => Route$8
});
const rootRouteChildren = {
  IndexRoute,
  DashboardRoute,
  LoginRoute,
  RegisterRoute,
  AdminApplicationsRoute,
  AdminCitizensRoute,
  AdminDashboardRoute,
  AdminLoginRoute
};
const routeTree = Route$8._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  AnimatedGrid as A,
  AnimatedItem as a,
  AnimatedSection as b,
  router as r
};
