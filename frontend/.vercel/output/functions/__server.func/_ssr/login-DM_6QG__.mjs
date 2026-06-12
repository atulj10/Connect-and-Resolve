import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { e as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { B as Button } from "./button-DjOZMqFS.mjs";
import { I as Input } from "./input-D_U8fI25.mjs";
import { L as Label } from "./label-C8WJLhmR.mjs";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent, I as InputOTP, d as InputOTPGroup, e as InputOTPSlot } from "./input-otp-CC5PZ2Ax.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { i as isAxiosError } from "../_libs/axios.mjs";
import { a as authApi } from "./auth-DyioGOTH.mjs";
import { g as getApiError, s as setStoredUser } from "./auth-DbCn25DT.mjs";
import "../_libs/input-otp.mjs";
import { m as motion } from "../_libs/framer-motion.mjs";
import { L as Landmark, S as ShieldCheck, A as ArrowLeft, a as Smartphone, M as Mail } from "../_libs/lucide-react.mjs";
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
import "../_libs/radix-ui__react-label.mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/radix-ui__react-tabs.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-roving-focus.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/form-data.mjs";
import "fs";
import "../_libs/combined-stream.mjs";
import "../_libs/delayed-stream.mjs";
import "path";
import "http";
import "https";
import "url";
import "../_libs/mime-types.mjs";
import "../_libs/mime-db.mjs";
import "../_libs/asynckit.mjs";
import "../_libs/es-set-tostringtag.mjs";
import "../_libs/get-intrinsic.mjs";
import "../_libs/es-object-atoms.mjs";
import "../_libs/es-errors.mjs";
import "../_libs/math-intrinsics.mjs";
import "../_libs/gopd.mjs";
import "../_libs/es-define-property.mjs";
import "../_libs/has-symbols.mjs";
import "../_libs/get-proto.mjs";
import "../_libs/dunder-proto.mjs";
import "../_libs/call-bind-apply-helpers.mjs";
import "../_libs/function-bind.mjs";
import "../_libs/hasown.mjs";
import "../_libs/has-tostringtag.mjs";
import "../_libs/proxy-from-env.mjs";
import "../_libs/https-proxy-agent.mjs";
import "net";
import "tls";
import "assert";
import "../_libs/debug.mjs";
import "../_libs/ms.mjs";
import "tty";
import "../_libs/supports-color.mjs";
import "os";
import "../_libs/has-flag.mjs";
import "../_libs/agent-base.mjs";
import "events";
import "http2";
import "../_libs/follow-redirects.mjs";
import "zlib";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
const authIllustration = "/assets/auth-illustration-BCUxO9uU.png";
function LoginPage() {
  const navigate = useNavigate();
  const [method, setMethod] = reactExports.useState("mobile");
  const [contact, setContact] = reactExports.useState("");
  const [otp, setOtp] = reactExports.useState("");
  const [otpSent, setOtpSent] = reactExports.useState(false);
  const [loading, setLoading] = reactExports.useState(false);
  const handleSendOtp = async () => {
    if (!contact.trim()) {
      toast.error(method === "mobile" ? "Enter your mobile number" : "Enter your email");
      return;
    }
    setLoading(true);
    try {
      await authApi.sendOtp(contact.trim(), "LOGIN");
      setOtpSent(true);
      toast.success(`OTP sent to your ${method === "mobile" ? "mobile" : "email"}`);
    } catch (err) {
      if (isAxiosError(err) && (!err.response || err.code === "ECONNABORTED")) {
        toast.error("Server is not responding. Please try again.");
      } else {
        toast.error(getApiError(err, "Failed to send OTP"));
      }
    } finally {
      setLoading(false);
    }
  };
  const handleVerify = async () => {
    if (otp.length !== 6) {
      toast.error("Enter the 6-digit OTP");
      return;
    }
    setLoading(true);
    try {
      const result = await authApi.login(contact.trim(), otp);
      setStoredUser(result.user, result.token);
      toast.success("Login successful");
      navigate({
        to: "/dashboard"
      });
    } catch (err) {
      if (isAxiosError(err) && (!err.response || err.code === "ECONNABORTED")) {
        toast.error("Server is not responding. Please try again.");
      } else {
        toast.error(getApiError(err, "Invalid or expired OTP"));
      }
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
    opacity: 0,
    y: 20
  }, animate: {
    opacity: 1,
    y: 0
  }, transition: {
    duration: 0.5
  }, className: "grid min-h-screen lg:grid-cols-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden lg:flex flex-col justify-between gradient-primary-soft p-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-2.5 w-fit", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-9 w-9 items-center justify-center rounded-lg bg-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Landmark, { className: "h-5 w-5 text-primary-foreground" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg font-bold tracking-tight", children: "Citizen Connect" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: authIllustration, alt: "", width: 1024, height: 1024, loading: "lazy", className: "w-full max-w-md" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-6 text-2xl font-bold tracking-tight text-foreground", children: "Your voice. Better governance." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 max-w-sm text-muted-foreground", children: "Submit grievances, track applications, and connect directly with your representatives." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-4 w-4 text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Secured by Government-grade encryption" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col px-6 py-10 sm:px-12 lg:px-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:hidden mb-8 flex items-center justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-2.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-9 w-9 items-center justify-center rounded-lg bg-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Landmark, { className: "h-5 w-5 text-primary-foreground" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg font-bold", children: "Citizen Connect" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto w-full max-w-md flex-1 flex flex-col justify-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-8 w-fit", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
          " Back to Home"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold tracking-tight text-foreground", children: "Welcome back" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-muted-foreground", children: "Login to access your citizen dashboard" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 rounded-2xl border border-border bg-card p-6 shadow-card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { value: method, onValueChange: (v) => {
            setMethod(v);
            setOtpSent(false);
            setContact("");
            setOtp("");
          }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "grid w-full grid-cols-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "mobile", className: "gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Smartphone, { className: "h-4 w-4" }),
                " Mobile OTP"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "email", className: "gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "h-4 w-4" }),
                " Email OTP"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "mobile", className: "mt-6 space-y-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "mobile", children: "Mobile Number" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "mobile", type: "tel", inputMode: "numeric", maxLength: 10, placeholder: "98765 43210", value: contact, onChange: (e) => setContact(e.target.value.replace(/\D/g, "")), disabled: otpSent })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "email", className: "mt-6 space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "email", children: "Email Address" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "email", type: "email", placeholder: "you@example.com", maxLength: 255, value: contact, onChange: (e) => setContact(e.target.value), disabled: otpSent })
              ] }),
              otpSent && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Didn't receive the email? Check your spam/promotions folder." })
            ] })
          ] }),
          !otpSent ? /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: handleSendOtp, className: "mt-6 w-full", size: "lg", disabled: loading, children: loading ? "Sending..." : "Send OTP" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Enter 6-digit OTP" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(InputOTP, { maxLength: 6, value: otp, onChange: setOtp, children: /* @__PURE__ */ jsxRuntimeExports.jsx(InputOTPGroup, { children: [0, 1, 2, 3, 4, 5].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(InputOTPSlot, { index: i }, i)) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: handleSendOtp, className: "text-xs text-primary hover:underline", children: "Resend OTP" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: handleVerify, className: "w-full", size: "lg", disabled: loading, children: loading ? "Verifying..." : "Verify & Login" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-6 text-center text-sm text-muted-foreground", children: [
          "New to Citizen Connect?",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/register", className: "font-semibold text-primary hover:underline", children: "Create an account" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 text-center text-xs text-muted-foreground", children: [
          "Administrator?",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin/login", className: "text-primary hover:underline", children: "Minister Office Login" })
        ] })
      ] })
    ] })
  ] }) });
}
export {
  LoginPage as component
};
