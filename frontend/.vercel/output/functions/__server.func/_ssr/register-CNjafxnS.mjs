import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { e as useNavigate, u as useRouter, L as Link } from "../_libs/tanstack__react-router.mjs";
import { B as Button } from "./button-DjOZMqFS.mjs";
import { I as Input } from "./input-D_U8fI25.mjs";
import { L as Label } from "./label-C8WJLhmR.mjs";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent, I as InputOTP, d as InputOTPGroup, e as InputOTPSlot } from "./input-otp-CC5PZ2Ax.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { i as isAxiosError } from "../_libs/axios.mjs";
import { a as authApi } from "./auth-xvQjo-za.mjs";
import { g as getApiError, s as setStoredUser } from "./auth-tLLzOFk4.mjs";
import "../_libs/input-otp.mjs";
import { m as motion } from "../_libs/framer-motion.mjs";
import { L as Landmark, A as ArrowLeft, B as BadgeCheck, S as ShieldCheck } from "../_libs/lucide-react.mjs";
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
function RegisterPage() {
  const navigate = useNavigate();
  const router = useRouter();
  const [fullName, setFullName] = reactExports.useState("");
  const [method, setMethod] = reactExports.useState("mobile");
  const [mobile, setMobile] = reactExports.useState("");
  const [email, setEmail] = reactExports.useState("");
  const [verified, setVerified] = reactExports.useState(false);
  const [otpSent, setOtpSent] = reactExports.useState(false);
  const [otp, setOtp] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(false);
  const identifier = method === "mobile" ? mobile : email;
  const sendOtp = async () => {
    if (method === "mobile") {
      if (!/^\d{10}$/.test(mobile)) return toast.error("Enter a valid 10-digit mobile number");
    } else {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return toast.error("Enter a valid email address");
    }
    setLoading(true);
    try {
      await authApi.sendOtp(identifier, "REGISTER");
      setOtpSent(true);
      setOtp("");
      toast.success(`OTP sent to your ${method === "mobile" ? "mobile" : "email"}`);
    } catch (err) {
      if (isAxiosError(err) && (!err.response || err.code === "ECONNABORTED")) {
        toast.error("Server is not responding. Please try again.");
      } else {
        const message = getApiError(err, "Failed to send OTP");
        if (message.toLowerCase().includes("already registered")) {
          toast.error(`${method === "mobile" ? "Mobile number" : "Email"} already registered. Redirecting to login...`);
          setTimeout(() => router.navigate({
            to: "/login"
          }), 1500);
        } else {
          toast.error(message);
        }
      }
    } finally {
      setLoading(false);
    }
  };
  const confirmOtp = async () => {
    if (otp.length !== 6) return toast.error("Enter the 6-digit OTP");
    if (!fullName.trim()) return toast.error("Full name is required");
    setLoading(true);
    try {
      const result = await authApi.verifyOtpAndRegister(identifier, otp, {
        fullName,
        mobileNumber: method === "mobile" ? mobile : "",
        email: method === "email" ? email : void 0
      });
      setStoredUser(result.user, result.token);
      toast.success("Account created successfully!");
      navigate({
        to: "/dashboard"
      });
    } catch (err) {
      if (isAxiosError(err) && (!err.response || err.code === "ECONNABORTED")) {
        toast.error("Server is not responding. Please try again.");
      } else {
        toast.error(getApiError(err, "Verification failed"));
      }
    } finally {
      setLoading(false);
    }
  };
  const handleTabChange = (v) => {
    setMethod(v);
    setVerified(false);
    setOtpSent(false);
    setOtp("");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fullName.trim()) return toast.error("Full name is required");
    if (!identifier) return toast.error("Provide your mobile or email");
    if (!verified) {
      sendOtp();
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
  }, className: "mx-auto flex min-h-screen max-w-3xl flex-col px-6 py-10 sm:px-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-2.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-9 w-9 items-center justify-center rounded-lg bg-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Landmark, { className: "h-5 w-5 text-primary-foreground" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg font-bold tracking-tight", children: "Citizen Connect" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
        " Home"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold tracking-tight", children: "Create your citizen account" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-muted-foreground", children: "Register to submit applications, track grievances, and stay connected with your representatives." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "mt-8 rounded-2xl border border-border bg-card p-6 shadow-card sm:p-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "fullName", children: [
            "Full Name ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "fullName", placeholder: "Aarav Sharma", maxLength: 100, value: fullName, onChange: (e) => setFullName(e.target.value), required: true })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { value: method, onValueChange: handleTabChange, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "w-full", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "mobile", className: "flex-1", children: "Mobile" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "email", className: "flex-1", children: "Email" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "mobile", className: "space-y-3 mt-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "mobile", children: "Mobile Number" }),
              verified && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 text-xs font-medium text-primary", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(BadgeCheck, { className: "h-3.5 w-3.5" }),
                " Verified"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "mobile", type: "tel", inputMode: "numeric", maxLength: 10, placeholder: "98765 43210", value: mobile, onChange: (e) => {
                setMobile(e.target.value.replace(/\D/g, ""));
                setVerified(false);
                setOtpSent(false);
              }, disabled: verified || otpSent }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "outline", onClick: sendOtp, disabled: verified || !mobile || loading, children: otpSent ? "Resend" : "Send OTP" })
            ] }),
            otpSent && !verified && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-secondary/40 p-3 space-y-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                "Enter the 6-digit code sent to +91 ",
                mobile
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(InputOTP, { maxLength: 6, value: otp, onChange: setOtp, children: /* @__PURE__ */ jsxRuntimeExports.jsx(InputOTPGroup, { children: [0, 1, 2, 3, 4, 5].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(InputOTPSlot, { index: i }, i)) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", size: "sm", onClick: confirmOtp, className: "w-full", disabled: loading, children: loading ? "Verifying..." : "Verify Mobile OTP" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "email", className: "space-y-3 mt-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "email", children: "Email Address" }),
              verified && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 text-xs font-medium text-primary", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(BadgeCheck, { className: "h-3.5 w-3.5" }),
                " Verified"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "email", type: "email", placeholder: "you@example.com", maxLength: 255, value: email, onChange: (e) => {
                setEmail(e.target.value);
                setVerified(false);
                setOtpSent(false);
              }, disabled: verified || otpSent }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "outline", onClick: sendOtp, disabled: verified || !email || loading, children: otpSent ? "Resend" : "Send OTP" })
            ] }),
            otpSent && !verified && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-secondary/40 p-3 space-y-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                "Enter the 6-digit code sent to ",
                email
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Didn't receive the email? Check your spam/promotions folder." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(InputOTP, { maxLength: 6, value: otp, onChange: setOtp, children: /* @__PURE__ */ jsxRuntimeExports.jsx(InputOTPGroup, { children: [0, 1, 2, 3, 4, 5].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(InputOTPSlot, { index: i }, i)) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", size: "sm", onClick: confirmOtp, className: "w-full", disabled: loading, children: loading ? "Verifying..." : "Verify Email OTP" })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", size: "lg", className: "mt-8 w-full", disabled: loading, children: loading ? "Sending..." : verified ? "Verified ✓" : otpSent ? "Resend OTP" : "Send OTP" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-3.5 w-3.5 text-primary" }),
        "Your data is protected under the Digital Personal Data Protection Act."
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-6 text-center text-sm text-muted-foreground", children: [
      "Already registered?",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/login", className: "font-semibold text-primary hover:underline", children: "Login here" })
    ] })
  ] }) });
}
export {
  RegisterPage as component
};
