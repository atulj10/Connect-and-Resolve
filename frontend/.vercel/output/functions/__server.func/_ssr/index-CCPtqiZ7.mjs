import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { B as Button } from "./button-DjOZMqFS.mjs";
import { b as AnimatedSection, A as AnimatedGrid, a as AnimatedItem } from "./router-CoMPG7UP.mjs";
import "../_libs/sonner.mjs";
import { m as motion } from "../_libs/framer-motion.mjs";
import { o as Shield, F as FileText, f as CircleCheck, m as ChartColumn, p as Users, h as Search, Z as Zap, q as Send, k as Building2, r as Briefcase, L as Landmark, M as Mail, i as Phone, j as MapPin } from "../_libs/lucide-react.mjs";
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
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
function Navbar() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-2.5 transition-opacity hover:opacity-80", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-9 w-9 items-center justify-center rounded-lg bg-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Landmark, { className: "h-5 w-5 text-primary-foreground" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg font-bold leading-tight tracking-tight text-foreground", children: "Citizen Connect" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-medium uppercase tracking-widest text-muted-foreground", children: "Grievance Portal" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "ghost", size: "sm", className: "hidden sm:inline-flex", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/login", children: "Login" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          asChild: true,
          size: "sm",
          className: "bg-primary text-primary-foreground hover:bg-primary/90",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/register", children: "Register" })
        }
      )
    ] })
  ] }) });
}
function Footer() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "w-full border-t border-border bg-muted/40", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-8 sm:grid-cols-2 lg:grid-cols-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-9 w-9 items-center justify-center rounded-lg bg-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Landmark, { className: "h-5 w-5 text-primary-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg font-bold leading-tight tracking-tight text-foreground", children: "Citizen Connect" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-medium uppercase tracking-widest text-muted-foreground", children: "Grievance Portal" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground", children: "Empowering citizens with a transparent, efficient, and accessible platform for submitting grievances, suggestions, and assistance requests directly to government departments." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold uppercase tracking-wider text-foreground", children: "Contact Us" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "mt-4 space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-3 text-sm text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "mt-0.5 h-4 w-4 shrink-0 text-primary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "admincitizenconnect@gmail.com" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-3 text-sm text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "mt-0.5 h-4 w-4 shrink-0 text-primary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "+91 1800-123-4567" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-3 text-sm text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "mt-0.5 h-4 w-4 shrink-0 text-primary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Minister'S Office Department of UDHD & IT, Govt. of Bihar" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold uppercase tracking-wider text-foreground", children: "Legal" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "mt-4 space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/",
              className: "text-sm text-muted-foreground transition-colors hover:text-foreground",
              children: "Privacy Policy"
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/",
              className: "text-sm text-muted-foreground transition-colors hover:text-foreground",
              children: "Terms & Conditions"
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/",
              className: "text-sm text-muted-foreground transition-colors hover:text-foreground",
              children: "Accessibility Statement"
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/",
              className: "text-sm text-muted-foreground transition-colors hover:text-foreground",
              children: "Help Center"
            }
          ) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " Citizen Connect Portal. All rights reserved."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "A Government of India Initiative" })
    ] })
  ] }) });
}
const heroIllustration = "/assets/hero-illustration-BVXmcrlp.png";
const bannerImage = "/assets/banner-Clalf5JK.png";
function parseMetricValue(value) {
  const cleaned = value.replace(/,/g, "");
  const match = cleaned.match(/^([\d.]+)(.*)$/);
  if (!match) return {
    target: 0,
    suffix: ""
  };
  return {
    target: parseInt(match[1], 10),
    suffix: match[2]
  };
}
function useCountUp(target, duration, start) {
  const [count, setCount] = reactExports.useState(0);
  reactExports.useEffect(() => {
    if (!start) {
      setCount(0);
      return;
    }
    let startTime = null;
    let animationId;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) {
        animationId = requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };
    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [target, duration, start]);
  return count;
}
function AnimatedMetric({
  value,
  visible
}) {
  const {
    target,
    suffix
  } = parseMetricValue(value);
  const count = useCountUp(target, 2e3, visible);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    count.toLocaleString("en-US"),
    suffix
  ] });
}
const metrics = [{
  label: "Total Applications",
  value: "25,000+",
  icon: FileText
}, {
  label: "Resolved Cases",
  value: "15,000+",
  icon: CircleCheck
}, {
  label: "Active Cases",
  value: "10,000+",
  icon: ChartColumn
}, {
  label: "Citizen Satisfaction",
  value: "90%",
  icon: Users
}];
const features = [{
  title: "Transparent Tracking",
  description: "Track your application status in real-time with detailed progress updates at every stage of the resolution process.",
  icon: Search
}, {
  title: "Faster Resolution",
  description: "Our streamlined workflow ensures complaints and grievances are routed to the right department for swift action.",
  icon: Zap
}, {
  title: "Citizen Engagement",
  description: "Engage directly with government officials, provide feedback, and stay informed about policy updates.",
  icon: Users
}];
const steps = [{
  title: "Submit Application",
  description: "File complaints, grievances, suggestions, or assistance requests through our easy-to-use digital portal.",
  icon: Send
}, {
  title: "Review by Minister Office",
  description: "Every application is reviewed by the concerned minister's office for authenticity and relevance.",
  icon: Building2
}, {
  title: "Department Action",
  description: "Relevant departments are assigned to investigate and take necessary action on your submission.",
  icon: Briefcase
}, {
  title: "Resolution & Updates",
  description: "Receive timely updates and final resolution with full transparency on the actions taken.",
  icon: CircleCheck
}];
function Index() {
  const metricsRef = reactExports.useRef(null);
  const [metricsVisible, setMetricsVisible] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const el = metricsRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setMetricsVisible(true);
        observer.disconnect();
      }
    }, {
      threshold: 0.3
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full bg-gradient-to-r  from-primary/5 via-primary/10 to-primary/5 border-b border-primary/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto  ", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: bannerImage, alt: "Government of India", className: "w-full lg:h-60 lg:hidden object-fill md:h-20" }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedSection, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 gradient-hero" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-20 lg:px-8 lg:py-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid items-center gap-12 lg:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
          opacity: 0,
          x: -40
        }, animate: {
          opacity: 1,
          x: 0
        }, transition: {
          duration: 0.7,
          ease: "easeOut"
        }, className: "relative z-10 max-w-xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "h-3.5 w-3.5" }),
            "Government of Bihar Initiative"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "mt-6 text-4xl font-extrabold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl", children: [
            "Connecting Citizens with ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "Better Governance" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg", children: "A unified digital platform empowering citizens to submit complaints, grievances, suggestions, and assistance requests directly to government departments — ensuring transparency, accountability, and faster resolution." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex flex-wrap gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "lg", className: "bg-primary px-8 text-primary-foreground shadow-lg shadow-primary/25 hover:bg-primary/90", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/register", children: "Register" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "outline", size: "lg", className: "border-border px-8 hover:bg-accent", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/login", children: "Login" }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
          opacity: 0,
          x: 40
        }, animate: {
          opacity: 1,
          x: 0
        }, transition: {
          duration: 0.7,
          ease: "easeOut",
          delay: 0.15
        }, className: "relative flex items-center justify-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -inset-4 rounded-full bg-primary/5 blur-3xl" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: heroIllustration, alt: "Citizens interacting with government services", width: 640, height: 320, className: "relative z-10 w-full max-w-lg rounded-2xl" })
        ] })
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedSection, { delay: 0.1, children: /* @__PURE__ */ jsxRuntimeExports.jsx("section", { ref: metricsRef, className: "mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedGrid, { className: "grid gap-5 sm:grid-cols-2 lg:grid-cols-4", children: metrics.map((metric) => /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedItem, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-card transition-all duration-300 hover:shadow-card-hover", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -right-4 -top-4 h-24 w-24 rounded-full bg-primary/5 transition-transform duration-300 group-hover:scale-150" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(metric.icon, { className: "h-5 w-5 text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedMetric, { value: metric.value, visible: metricsVisible }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm font-medium text-muted-foreground", children: metric.label })
      ] })
    ] }) }, metric.label)) }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedSection, { delay: 0.1, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
        opacity: 0,
        y: 20
      }, whileInView: {
        opacity: 1,
        y: 0
      }, viewport: {
        once: true
      }, transition: {
        duration: 0.5
      }, className: "text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-bold tracking-tight text-foreground sm:text-4xl", children: "About the Portal" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mx-auto mt-4 max-w-2xl text-base text-muted-foreground", children: "Built with modern technology to ensure every citizen's voice is heard, tracked, and resolved with the utmost transparency." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedGrid, { className: "mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3", children: features.map((feature) => /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedItem, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group rounded-2xl border border-border bg-card p-8 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 ring-1 ring-primary/10 transition-transform duration-300 group-hover:scale-110", children: /* @__PURE__ */ jsxRuntimeExports.jsx(feature.icon, { className: "h-6 w-6 text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-5 text-xl font-semibold text-foreground", children: feature.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm leading-relaxed text-muted-foreground", children: feature.description })
      ] }) }, feature.title)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedSection, { delay: 0.1, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 -z-10 gradient-primary-soft rounded-3xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
        opacity: 0,
        y: 20
      }, whileInView: {
        opacity: 1,
        y: 0
      }, viewport: {
        once: true
      }, transition: {
        duration: 0.5
      }, className: "text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-bold tracking-tight text-foreground sm:text-4xl", children: "How It Works" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mx-auto mt-4 max-w-2xl text-base text-muted-foreground", children: "A simple four-step process to ensure your concerns reach the right hands and get resolved efficiently." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedGrid, { className: "mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4", children: steps.map((step, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedItem, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        index < steps.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-1/2 top-16 hidden h-12 w-px bg-primary/20 lg:left-full lg:top-8 lg:h-px lg:w-full lg:-translate-y-1/2" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex h-16 w-16 items-center justify-center rounded-2xl bg-primary shadow-lg shadow-primary/25", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(step.icon, { className: "h-7 w-7 text-primary-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-foreground text-xs font-bold text-background", children: index + 1 })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-5 text-lg font-semibold text-foreground", children: step.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm leading-relaxed text-muted-foreground", children: step.description })
        ] })
      ] }) }, step.title)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedSection, { delay: 0.1, children: /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group relative overflow-hidden rounded-3xl bg-primary px-6 py-14 sm:px-12 sm:py-16 lg:py-20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/10 transition-transform duration-500 group-hover:scale-150" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-white/10 transition-transform duration-500 group-hover:scale-150" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
        opacity: 0,
        scale: 0.95
      }, whileInView: {
        opacity: 1,
        scale: 1
      }, viewport: {
        once: true
      }, transition: {
        duration: 0.5
      }, className: "relative mx-auto max-w-2xl text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl", children: "Ready to Get Started?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-base leading-relaxed text-primary-foreground/80", children: "Join thousands of citizens who are already using Citizen Connect to raise their concerns and contribute to better governance." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex flex-wrap justify-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "lg", className: "bg-background px-8 font-semibold text-primary hover:bg-background/90", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/register", children: "Register Now" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "lg", variant: "outline", className: "border-primary-foreground/30 bg-transparent px-8 text-primary-foreground hover:bg-primary-foreground/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/login", children: "Login" }) })
        ] })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
export {
  Index as component
};
