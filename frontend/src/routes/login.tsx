import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { ArrowLeft, Landmark, Mail, Smartphone, ShieldCheck } from "lucide-react";
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
  const [method, setMethod] = useState<"mobile" | "email">("mobile");
  const [contact, setContact] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

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
    } catch (err: unknown) {
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
      navigate({ to: "/dashboard" });
    } catch (err: unknown) {
      if (isAxiosError(err) && (!err.response || err.code === "ECONNABORTED")) {
        toast.error("Server is not responding. Please try again.");
      } else {
        toast.error(getApiError(err, "Invalid or expired OTP"));
      }
    } finally {
      setLoading(false);
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
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <Landmark className="h-5 w-5 text-primary-foreground" />
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
              Submit grievances, track applications, and connect directly with your representatives.
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
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <Landmark className="h-5 w-5 text-primary-foreground" />
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
              <Tabs
                value={method}
                onValueChange={(v) => {
                  setMethod(v as "mobile" | "email");
                  setOtpSent(false);
                  setContact("");
                  setOtp("");
                }}
              >
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="mobile" className="gap-2">
                    <Smartphone className="h-4 w-4" /> Mobile OTP
                  </TabsTrigger>
                  <TabsTrigger value="email" className="gap-2">
                    <Mail className="h-4 w-4" /> Email OTP
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="mobile" className="mt-6 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="mobile">Mobile Number</Label>
                    <Input
                      id="mobile"
                      type="tel"
                      inputMode="numeric"
                      maxLength={10}
                      placeholder="98765 43210"
                      value={contact}
                      onChange={(e) => setContact(e.target.value.replace(/\D/g, ""))}
                      disabled={otpSent}
                    />
                  </div>
                </TabsContent>
                <TabsContent value="email" className="mt-6 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      maxLength={255}
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      disabled={otpSent}
                    />
                  </div>
                  {otpSent && (
                    <p className="text-xs text-muted-foreground">
                      Didn't receive the email? Check your spam/promotions folder.
                    </p>
                  )}
                </TabsContent>
              </Tabs>

              {!otpSent ? (
                <Button
                  onClick={handleSendOtp}
                  className="mt-6 w-full"
                  size="lg"
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Send OTP"}
                </Button>
              ) : (
                <div className="mt-6 space-y-4">
                  <div className="space-y-2">
                    <Label>Enter 6-digit OTP</Label>
                    <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                      <InputOTPGroup>
                        {[0, 1, 2, 3, 4, 5].map((i) => (
                          <InputOTPSlot key={i} index={i} />
                        ))}
                      </InputOTPGroup>
                    </InputOTP>
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      className="text-xs text-primary hover:underline"
                    >
                      Resend OTP
                    </button>
                  </div>
                  <Button onClick={handleVerify} className="w-full" size="lg" disabled={loading}>
                    {loading ? "Verifying..." : "Verify & Login"}
                  </Button>
                </div>
              )}
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
