import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { ArrowLeft, ArrowRight, Smartphone, Mail, ShieldCheck, User, BadgeCheck } from "lucide-react";
import logoSrc from "@/assets/logo.png";
import { toast } from "sonner";
import { isAxiosError } from "axios";
import { authApi } from "@/lib/api/auth";
import { getApiError } from "@/lib/api/client";
import { setStoredUser } from "@/lib/auth";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Create Account — Citizen Connect" },
      {
        name: "description",
        content:
          "Register on Citizen Connect to submit grievances, track applications and engage with your government.",
      },
    ],
  }),
  component: RegisterPage,
});

const STEPS = [
  { label: "Welcome", subtitle: "Your name" },
  { label: "Verify", subtitle: "Choose method" },
  { label: "OTP", subtitle: "Confirm" },
];

function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-center justify-center gap-0">
      {STEPS.map((step, i) => (
        <div key={i} className="flex items-center">
          <div className="flex flex-col items-center gap-1.5">
            <div
              className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold transition-colors ${
                i <= current
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground"
              }`}
            >
              {i + 1}
            </div>
            <span
              className={`hidden sm:block text-xs font-medium ${
                i <= current ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              {step.label}
            </span>
          </div>
          {i < STEPS.length - 1 && (
            <div
              className={`mx-3 sm:mx-6 h-0.5 w-12 sm:w-20 rounded transition-colors ${
                i < current ? "bg-primary" : "bg-border"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

function RegisterPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [fullName, setFullName] = useState("");
  const [method, setMethod] = useState<"mobile" | "email">("mobile");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [verified, setVerified] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [sendingOtp, setSendingOtp] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);

  const identifier = method === "mobile" ? mobile : email;

  const sendOtp = async () => {
    if (method === "mobile") {
      if (!/^\d{10}$/.test(mobile)) return toast.error("Enter a valid 10-digit mobile number");
    } else {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
        return toast.error("Enter a valid email address");
    }
    setSendingOtp(true);
    try {
      await authApi.sendOtp(identifier, "REGISTER");
      setOtpSent(true);
      setStep(2);
      setOtp("");
      toast.success(`OTP sent to your ${method === "mobile" ? "mobile" : "email"}`);
    } catch (err: unknown) {
      if (isAxiosError(err) && (!err.response || err.code === "ECONNABORTED")) {
        toast.error("Server is not responding. Please try again.");
      } else {
        const message = getApiError(err, "Failed to send OTP");
        if (message.toLowerCase().includes("already registered")) {
          toast.error(`${method === "mobile" ? "Mobile number" : "Email"} already registered. Redirecting to login...`);
          setTimeout(() => navigate({ to: "/login" }), 1500);
        } else {
          toast.error(message);
        }
      }
    } finally {
      setSendingOtp(false);
    }
  };

  const confirmOtp = async () => {
    if (otp.length !== 6) return toast.error("Enter the 6-digit OTP");
    if (!fullName.trim()) return toast.error("Full name is required");
    setVerifyingOtp(true);
    try {
      const result = await authApi.verifyOtpAndRegister(identifier, otp, {
        fullName,
        mobileNumber: method === "mobile" ? mobile : "",
        email: method === "email" ? email : undefined,
      });
      setStoredUser(result.user, result.token);
      toast.success("Account created successfully!");
      navigate({ to: "/dashboard" });
    } catch (err: unknown) {
      if (isAxiosError(err) && (!err.response || err.code === "ECONNABORTED")) {
        toast.error("Server is not responding. Please try again.");
      } else {
        toast.error(getApiError(err, "Verification failed"));
      }
    } finally {
      setVerifyingOtp(false);
    }
  };

  const canProceedFromStep0 = fullName.trim().length > 0;
  const canProceedFromStep1 = method === "mobile"
    ? /^\d{10}$/.test(mobile)
    : /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const stepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <motion.div
            key="step0"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Step 1 of 3</p>
                  <h2 className="text-lg font-semibold">Welcome! Let's get started</h2>
                </div>
              </div>
              <p className="text-sm text-muted-foreground ml-[3.25rem]">
                To create your account, we first need your name.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="fullName">
                What's your full name? <span className="text-destructive">*</span>
              </Label>
              <Input
                id="fullName"
                placeholder="Aarav Sharma"
                maxLength={100}
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === "Enter" && canProceedFromStep0) {
                    e.preventDefault();
                    setStep(1);
                  }
                }}
              />
            </div>

            <div className="flex justify-end">
              <Button
                type="button"
                onClick={() => setStep(1)}
                disabled={!canProceedFromStep0}
                className="gap-1.5"
              >
                Continue <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        );

      case 1:
        return (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  {method === "mobile" ? (
                    <Smartphone className="h-5 w-5 text-primary" />
                  ) : (
                    <Mail className="h-5 w-5 text-primary" />
                  )}
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Step 2 of 3</p>
                  <h2 className="text-lg font-semibold">How would you like to verify?</h2>
                </div>
              </div>
              <p className="text-sm text-muted-foreground ml-[3.25rem]">
                Choose a method to receive your one-time verification code.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => {
                  setMethod("mobile");
                  setOtpSent(false);
                  setVerified(false);
                  setOtp("");
                }}
                className={`rounded-xl border-2 p-4 text-left transition-all ${
                  method === "mobile"
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50 hover:bg-secondary/30"
                }`}
              >
                <Smartphone
                  className={`h-5 w-5 mb-2 ${method === "mobile" ? "text-primary" : "text-muted-foreground"}`}
                />
                <p className={`text-sm font-semibold ${method === "mobile" ? "text-primary" : ""}`}>
                  Mobile
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">Receive OTP via SMS</p>
              </button>
              <button
                type="button"
                onClick={() => {
                  setMethod("email");
                  setOtpSent(false);
                  setVerified(false);
                  setOtp("");
                }}
                className={`rounded-xl border-2 p-4 text-left transition-all ${
                  method === "email"
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50 hover:bg-secondary/30"
                }`}
              >
                <Mail
                  className={`h-5 w-5 mb-2 ${method === "email" ? "text-primary" : "text-muted-foreground"}`}
                />
                <p className={`text-sm font-semibold ${method === "email" ? "text-primary" : ""}`}>
                  Email
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">Receive OTP via email</p>
              </button>
            </div>

            <div className="space-y-2">
              <Label htmlFor={method}>
                {method === "mobile" ? "Mobile Number" : "Email Address"}
                <span className="text-destructive"> *</span>
              </Label>
              <Input
                id={method}
                type={method === "mobile" ? "tel" : "email"}
                inputMode={method === "mobile" ? "numeric" : "email"}
                maxLength={method === "mobile" ? 10 : 255}
                placeholder={method === "mobile" ? "98765 43210" : "you@example.com"}
                value={method === "mobile" ? mobile : email}
                onChange={(e) => {
                  if (method === "mobile") {
                    setMobile(e.target.value.replace(/\D/g, ""));
                  } else {
                    setEmail(e.target.value);
                  }
                }}
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === "Enter" && canProceedFromStep1) {
                    e.preventDefault();
                    sendOtp();
                  }
                }}
              />
              {verified && (
                <div className="flex items-center gap-1.5 text-xs font-medium text-primary">
                  <BadgeCheck className="h-3.5 w-3.5" /> Verified
                </div>
              )}
            </div>

            {otpSent && !verified && (
              <div className="rounded-xl border border-border bg-secondary/40 p-4 space-y-3">
                <p className="text-xs text-muted-foreground">
                  Enter the 6-digit code sent to{" "}
                  <span className="font-medium text-foreground">
                    {method === "mobile" ? `+91 ${mobile}` : email}
                  </span>
                </p>
                {method === "email" && (
                  <p className="text-xs text-muted-foreground">
                    Didn't receive it? Check your spam/promotions folder.
                  </p>
                )}
                <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                  <InputOTPGroup>
                    {[0, 1, 2, 3, 4, 5].map((i) => (
                      <InputOTPSlot key={i} index={i} />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
                <Button
                  type="button"
                  size="sm"
                  onClick={confirmOtp}
                  className="w-full"
                  disabled={verifyingOtp || otp.length !== 6}
                >
                  {verifyingOtp ? "Verifying..." : `Verify ${method === "mobile" ? "Mobile" : "Email"} OTP`}
                </Button>
              </div>
            )}

            <div className="flex justify-between">
              <Button type="button" variant="ghost" onClick={() => setStep(0)}>
                <ArrowLeft className="h-4 w-4 mr-1.5" /> Back
              </Button>
              {!otpSent && (
                <Button
                  type="button"
                  onClick={sendOtp}
                  disabled={!canProceedFromStep1 || sendingOtp}
                  className="gap-1.5"
                >
                  {sendingOtp ? "Sending..." : "Send OTP"} <ArrowRight className="h-4 w-4" />
                </Button>
              )}
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <BadgeCheck className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Step 3 of 3</p>
                  <h2 className="text-lg font-semibold">Verify your {method === "mobile" ? "mobile number" : "email address"}</h2>
                </div>
              </div>
              <p className="text-sm text-muted-foreground ml-[3.25rem]">
                We've sent a 6-digit code to{" "}
                <span className="font-medium text-foreground">
                  {method === "mobile" ? `+91 ${mobile}` : email}
                </span>
                . Enter it below to complete registration.
              </p>
              {method === "email" && (
                <p className="text-sm text-muted-foreground ml-[3.25rem]">
                  Didn't receive it? Check your spam/promotions folder.
                </p>
              )}
            </div>

            <div className="flex flex-col items-center gap-4 py-4">
              <InputOTP maxLength={6} value={otp} onChange={setOtp} autoFocus>
                <InputOTPGroup>
                  {[0, 1, 2, 3, 4, 5].map((i) => (
                    <InputOTPSlot key={i} index={i} />
                  ))}
                </InputOTPGroup>
              </InputOTP>

              <button
                type="button"
                onClick={sendOtp}
                disabled={sendingOtp}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                {sendingOtp ? "Resending..." : "Resend code"}
              </button>
            </div>

            <div className="flex justify-between">
              <Button
                type="button"
                variant="ghost"
                onClick={() => {
                  setStep(1);
                  setOtpSent(true);
                }}
              >
                <ArrowLeft className="h-4 w-4 mr-1.5" /> Back
              </Button>
              <Button
                type="button"
                onClick={confirmOtp}
                disabled={verifyingOtp || otp.length !== 6}
                className="gap-1.5"
              >
                {verifyingOtp ? "Verifying..." : "Create Account"}
                {!verifyingOtp && <ArrowRight className="h-4 w-4" />}
              </Button>
            </div>
          </motion.div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto flex min-h-screen max-w-xl flex-col px-6 py-10 sm:px-8"
      >
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg">
              <img src={logoSrc} alt="Citizen Connect" className="h-9 w-9" />
            </div>
            <span className="text-lg font-bold tracking-tight">Citizen Connect</span>
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" /> Home
          </Link>
        </div>

        <div className="mt-10 mb-8">
          <StepIndicator current={step} />
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-card sm:p-8">
          <AnimatePresence mode="wait">
            {stepContent(step)}
          </AnimatePresence>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <ShieldCheck className="h-3.5 w-3.5 text-primary" />
          Your data is protected under the Digital Personal Data Protection Act.
        </div>

        <p className="mt-4 text-center text-sm text-muted-foreground">
          Already registered?{" "}
          <Link to="/login" className="font-semibold text-primary hover:underline">
            Login here
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
