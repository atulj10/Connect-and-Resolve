import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { ArrowLeft, BadgeCheck, Landmark, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { isAxiosError } from "axios";
import { authApi } from "@/lib/api/auth";
import { getApiError } from "@/lib/api/client";
import { setStoredUser } from "@/lib/auth";
import { useRouter } from "@tanstack/react-router";

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

function RegisterPage() {
  const navigate = useNavigate();
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [method, setMethod] = useState<"mobile" | "email">("mobile");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [verified, setVerified] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const identifier = method === "mobile" ? mobile : email;

  const sendOtp = async () => {
    if (method === "mobile") {
      if (!/^\d{10}$/.test(mobile)) return toast.error("Enter a valid 10-digit mobile number");
    } else {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
        return toast.error("Enter a valid email address");
    }
    setLoading(true);
    try {
      await authApi.sendOtp(identifier, "REGISTER");
      setOtpSent(true);
      setOtp("");
      toast.success(`OTP sent to your ${method === "mobile" ? "mobile" : "email"}`);
    } catch (err: unknown) {
      if (isAxiosError(err) && (!err.response || err.code === "ECONNABORTED")) {
        toast.error("Server is not responding. Please try again.");
      } else {
        const message = getApiError(err, "Failed to send OTP");
        if (message.toLowerCase().includes("already registered")) {
          toast.error(`${method === "mobile" ? "Mobile number" : "Email"} already registered. Redirecting to login...`);
          setTimeout(() => router.navigate({ to: "/login" }), 1500);
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
      setLoading(false);
    }
  };

  const handleTabChange = (v: string) => {
    setMethod(v as "mobile" | "email");
    setVerified(false);
    setOtpSent(false);
    setOtp("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) return toast.error("Full name is required");
    if (!identifier) return toast.error("Provide your mobile or email");
    if (!verified) {
      sendOtp();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto flex min-h-screen max-w-3xl flex-col px-6 py-10 sm:px-8">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <Landmark className="h-5 w-5 text-primary-foreground" />
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

        <div className="mt-10">
          <h1 className="text-3xl font-bold tracking-tight">Create your citizen account</h1>
          <p className="mt-2 text-muted-foreground">
            Register to submit applications, track grievances, and stay connected with your
            representatives.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-8 rounded-2xl border border-border bg-card p-6 shadow-card sm:p-8"
        >
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="fullName">
                Full Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="fullName"
                placeholder="Aarav Sharma"
                maxLength={100}
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>

            <Tabs value={method} onValueChange={handleTabChange}>
              <TabsList className="w-full">
                <TabsTrigger value="mobile" className="flex-1">
                  Mobile
                </TabsTrigger>
                <TabsTrigger value="email" className="flex-1">
                  Email
                </TabsTrigger>
              </TabsList>

              <TabsContent value="mobile" className="space-y-3 mt-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="mobile">Mobile Number</Label>
                  {verified && (
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-primary">
                      <BadgeCheck className="h-3.5 w-3.5" /> Verified
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  <Input
                    id="mobile"
                    type="tel"
                    inputMode="numeric"
                    maxLength={10}
                    placeholder="98765 43210"
                    value={mobile}
                    onChange={(e) => {
                      setMobile(e.target.value.replace(/\D/g, ""));
                      setVerified(false);
                      setOtpSent(false);
                    }}
                    disabled={verified || otpSent}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={sendOtp}
                    disabled={verified || !mobile || loading}
                  >
                    {otpSent ? "Resend" : "Send OTP"}
                  </Button>
                </div>
                {otpSent && !verified && (
                  <div className="rounded-lg border border-border bg-secondary/40 p-3 space-y-3">
                    <p className="text-xs text-muted-foreground">
                      Enter the 6-digit code sent to +91 {mobile}
                    </p>
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
                      disabled={loading}
                    >
                      {loading ? "Verifying..." : "Verify Mobile OTP"}
                    </Button>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="email" className="space-y-3 mt-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="email">Email Address</Label>
                  {verified && (
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-primary">
                      <BadgeCheck className="h-3.5 w-3.5" /> Verified
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    maxLength={255}
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setVerified(false);
                      setOtpSent(false);
                    }}
                    disabled={verified || otpSent}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={sendOtp}
                    disabled={verified || !email || loading}
                  >
                    {otpSent ? "Resend" : "Send OTP"}
                  </Button>
                </div>
                {otpSent && !verified && (
                  <div className="rounded-lg border border-border bg-secondary/40 p-3 space-y-3">
                    <p className="text-xs text-muted-foreground">
                      Enter the 6-digit code sent to {email}
                    </p>
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
                      disabled={loading}
                    >
                      {loading ? "Verifying..." : "Verify Email OTP"}
                    </Button>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>

          <Button type="submit" size="lg" className="mt-8 w-full" disabled={loading}>
            {loading ? "Sending..." : verified ? "Verified ✓" : otpSent ? "Resend OTP" : "Send OTP"}
          </Button>

          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <ShieldCheck className="h-3.5 w-3.5 text-primary" />
            Your data is protected under the Digital Personal Data Protection Act.
          </div>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already registered?{" "}
          <Link to="/login" className="font-semibold text-primary hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
