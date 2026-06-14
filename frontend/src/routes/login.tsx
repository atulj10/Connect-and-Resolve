import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { ArrowLeft, ArrowRight, Mail, Smartphone, ShieldCheck, BadgeCheck } from "lucide-react";
import logoSrc from "@/assets/logo.png";
import { toast } from "sonner";
import { isAxiosError } from "axios";
import authIllustration from "@/assets/auth-illustration.png";
import { authApi } from "@/lib/api/auth";
import { getApiError } from "@/lib/api/client";
import { setStoredUser } from "@/lib/auth";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Citizen Login — Citizen Connect" },
      {
        name: "description",
        content:
          "Securely log in to the Citizen Connect grievance portal using mobile or email OTP.",
      },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [method, setMethod] = useState<"mobile" | "email">("mobile");
  const [contact, setContact] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);

  const handleSendOtp = async () => {
    if (!contact.trim()) {
      toast.error(method === "mobile" ? "Enter your mobile number" : "Enter your email");
      return;
    }
    setSendingOtp(true);
    try {
      await authApi.sendOtp(contact.trim(), "LOGIN");
      setOtpSent(true);
      setStep(1);
      toast.success(`OTP sent to your ${method === "mobile" ? "mobile" : "email"}`);
    } catch (err: unknown) {
      if (isAxiosError(err) && (!err.response || err.code === "ECONNABORTED")) {
        toast.error("Server is not responding. Please try again.");
      } else {
        toast.error(getApiError(err, "Failed to send OTP"));
      }
    } finally {
      setSendingOtp(false);
    }
  };

  const handleVerify = async () => {
    if (otp.length !== 6) {
      toast.error("Enter the 6-digit OTP");
      return;
    }
    setVerifyingOtp(true);
    try {
      const result = await authApi.login(contact.trim(), otp);
      setStoredUser(result.user, result.token);
      toast.success("Login successful");
      navigate({ to: "/dashboard" });
    } catch (err: unknown) {
      if (isAxiosError(err) && (!err.response || err.code === "ECONNABORTED")) {
        toast.error("Server is not responding. Please try again.");
      } else {
        toast.error(getApiError(err, "Invalid or expired OTP"));
      }
    } finally {
      setVerifyingOtp(false);
    }
  };

  const canProceedFromStep0 = method === "mobile"
    ? /^\d{10}$/.test(contact)
    : /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact);

  const stepContent = (s: number) => {
    switch (s) {
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
                  {method === "mobile" ? (
                    <Smartphone className="h-5 w-5 text-primary" />
                  ) : (
                    <Mail className="h-5 w-5 text-primary" />
                  )}
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Step 1 of 2</p>
                  <h2 className="text-lg font-semibold">How would you like to log in?</h2>
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
                  setContact("");
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
                <p className="text-xs text-muted-foreground mt-0.5">Login via SMS OTP</p>
              </button>
              <button
                type="button"
                onClick={() => {
                  setMethod("email");
                  setContact("");
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
                <p className="text-xs text-muted-foreground mt-0.5">Login via email OTP</p>
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
                value={contact}
                onChange={(e) => {
                  setContact(method === "mobile" ? e.target.value.replace(/\D/g, "") : e.target.value);
                }}
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === "Enter" && canProceedFromStep0) {
                    e.preventDefault();
                    handleSendOtp();
                  }
                }}
              />
            </div>

            <div className="flex justify-end">
              <Button
                type="button"
                onClick={handleSendOtp}
                disabled={!canProceedFromStep0 || sendingOtp}
                className="gap-1.5"
              >
                {sendingOtp ? "Sending..." : "Send OTP"} <ArrowRight className="h-4 w-4" />
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
                  <BadgeCheck className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Step 2 of 2</p>
                  <h2 className="text-lg font-semibold">Verify your {method === "mobile" ? "mobile number" : "email address"}</h2>
                </div>
              </div>
              <p className="text-sm text-muted-foreground ml-[3.25rem]">
                We've sent a 6-digit code to{" "}
                <span className="font-medium text-foreground">
                  {method === "mobile" ? `+91 ${contact}` : contact}
                </span>
                . Enter it below to log in.
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
                onClick={handleSendOtp}
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
                onClick={() => setStep(0)}
              >
                <ArrowLeft className="h-4 w-4 mr-1.5" /> Back
              </Button>
              <Button
                type="button"
                onClick={handleVerify}
                disabled={verifyingOtp || otp.length !== 6}
                className="gap-1.5"
              >
                {verifyingOtp ? "Verifying..." : "Verify & Login"}
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
        className="grid min-h-screen lg:grid-cols-2"
      >
        <div className="hidden lg:flex flex-col justify-between gradient-primary-soft p-12">
          <Link to="/" className="flex items-center gap-2.5 w-fit">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg">
              <img src={logoSrc} alt="Citizen Connect" className="h-9 w-9" />
            </div>
            <span className="text-lg font-bold tracking-tight">Citizen Connect</span>
          </Link>
          <div className="flex flex-col items-center text-center">
            <img
              src={authIllustration}
              alt=""
              width={1024}
              height={1024}
              loading="lazy"
              className="w-full max-w-md"
            />
            <h2 className="mt-6 text-2xl font-bold tracking-tight text-foreground">
              Your voice. Better governance.
            </h2>
            <p className="mt-2 max-w-sm text-muted-foreground">
              Submit, track and connect applications directly with your representatives.
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <ShieldCheck className="h-4 w-4 text-primary" />
            <span>Secured by Government-grade encryption</span>
          </div>
        </div>

        <div className="flex flex-col px-6 py-10 sm:px-12 lg:px-16">
          <div className="lg:hidden mb-8 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg">
                <img src={logoSrc} alt="Citizen Connect" className="h-9 w-9" />
              </div>
              <span className="text-lg font-bold">Citizen Connect</span>
            </Link>
          </div>

          <div className="mx-auto w-full max-w-md flex-1 flex flex-col justify-center">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-8 w-fit"
            >
              <ArrowLeft className="h-4 w-4" /> Back to Home
            </Link>

            <h1 className="text-3xl font-bold tracking-tight text-foreground">Welcome back</h1>
            <p className="mt-2 text-muted-foreground">Login to access your citizen dashboard</p>

            <div className="mt-8 rounded-2xl border border-border bg-card p-6 shadow-card">
              <AnimatePresence mode="wait">
                {stepContent(step)}
              </AnimatePresence>
            </div>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              New to Citizen Connect?{" "}
              <Link to="/register" className="font-semibold text-primary hover:underline">
                Create an account
              </Link>
            </p>
            <p className="mt-2 text-center text-xs text-muted-foreground">
              Administrator?{" "}
              <Link to="/admin/login" className="text-primary hover:underline">
                Minister Office Login
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
