import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useState, useEffect, useRef } from "react";
import {
  Search,
  Zap,
  Users,
  Send,
  Building2,
  Briefcase,
  CheckCircle2,
  FileText,
  Shield,
  BarChart3,
} from "lucide-react";
import heroIllustration from "@/assets/hero-illustration.png";

function parseMetricValue(value: string): { target: number; suffix: string } {
  const cleaned = value.replace(/,/g, "");
  const match = cleaned.match(/^([\d.]+)(.*)$/);
  if (!match) return { target: 0, suffix: "" };
  return { target: parseInt(match[1], 10), suffix: match[2] };
}

function useCountUp(target: number, duration: number, start: boolean): number {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) {
      setCount(0);
      return;
    }

    let startTime: number | null = null;
    let animationId: number;

    const animate = (timestamp: number) => {
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

function AnimatedMetric({ value, visible }: { value: string; visible: boolean }) {
  const { target, suffix } = parseMetricValue(value);
  const count = useCountUp(target, 2000, visible);

  return (
    <>{count.toLocaleString("en-US")}{suffix}</>
  );
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Citizen Connect — Grievance Management Portal" },
      {
        name: "description",
        content:
          "Connecting citizens with better governance. Submit complaints, grievances, suggestions, and assistance requests.",
      },
      { property: "og:title", content: "Citizen Connect — Grievance Management Portal" },
      {
        property: "og:description",
        content:
          "Connecting citizens with better governance. Submit complaints, grievances, suggestions, and assistance requests.",
      },
    ],
  }),
  component: Index,
});

const metrics = [
  { label: "Total Applications", value: "25,000+", icon: FileText },
  { label: "Resolved Cases", value: "15,000+", icon: CheckCircle2 },
  { label: "Active Cases", value: "10,000+", icon: BarChart3 },
  { label: "Citizen Satisfaction", value: "90%", icon: Users },
];

const features = [
  {
    title: "Transparent Tracking",
    description:
      "Track your application status in real-time with detailed progress updates at every stage of the resolution process.",
    icon: Search,
  },
  {
    title: "Faster Resolution",
    description:
      "Our streamlined workflow ensures complaints and grievances are routed to the right department for swift action.",
    icon: Zap,
  },
  {
    title: "Citizen Engagement",
    description:
      "Engage directly with government officials, provide feedback, and stay informed about policy updates.",
    icon: Users,
  },
];

const steps = [
  {
    title: "Submit Application",
    description:
      "File complaints, grievances, suggestions, or assistance requests through our easy-to-use digital portal.",
    icon: Send,
  },
  {
    title: "Review by Minister Office",
    description:
      "Every application is reviewed by the concerned minister's office for authenticity and relevance.",
    icon: Building2,
  },
  {
    title: "Department Action",
    description:
      "Relevant departments are assigned to investigate and take necessary action on your submission.",
    icon: Briefcase,
  },
  {
    title: "Resolution & Updates",
    description:
      "Receive timely updates and final resolution with full transparency on the actions taken.",
    icon: CheckCircle2,
  },
];

function Index() {
  const metricsRef = useRef<HTMLDivElement>(null);
  const [metricsVisible, setMetricsVisible] = useState(false);

  useEffect(() => {
    const el = metricsRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMetricsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero" />
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="relative z-10 max-w-xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
                <Shield className="h-3.5 w-3.5" />
                Government of India Initiative
              </div>
              <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                Connecting Citizens with <span className="text-primary">Better Governance</span>
              </h1>
              <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
                A unified digital platform empowering citizens to submit complaints, grievances,
                suggestions, and assistance requests directly to government departments — ensuring
                transparency, accountability, and faster resolution.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button
                  size="lg"
                  className="bg-primary px-8 text-primary-foreground shadow-lg shadow-primary/25 hover:bg-primary/90"
                >
                  Register
                </Button>
                <Button variant="outline" size="lg" className="border-border px-8 hover:bg-accent">
                  Login
                </Button>
              </div>
            </div>
            <div className="relative flex items-center justify-center">
              <div className="absolute -inset-4 rounded-full bg-primary/5 blur-3xl" />
              <img
                src={heroIllustration}
                alt="Citizens interacting with government services"
                width={640}
                height={320}
                className="relative z-10 w-full max-w-lg rounded-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section ref={metricsRef} className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-card transition-all duration-300 hover:shadow-card-hover"
            >
              <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-primary/5 transition-transform duration-300 group-hover:scale-150" />
              <div className="relative">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                  <metric.icon className="h-5 w-5 text-primary" />
                </div>
                <p className="mt-4 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                  <AnimatedMetric value={metric.value} visible={metricsVisible} />
                </p>
                <p className="mt-1 text-sm font-medium text-muted-foreground">{metric.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About Portal */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            About the Portal
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground">
            Built with modern technology to ensure every citizen's voice is heard, tracked, and
            resolved with the utmost transparency.
          </p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-2xl border border-border bg-card p-8 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 ring-1 ring-primary/10 transition-transform duration-300 group-hover:scale-110">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-5 text-xl font-semibold text-foreground">{feature.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="absolute inset-0 -z-10 gradient-primary-soft rounded-3xl" />
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            How It Works
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground">
            A simple four-step process to ensure your concerns reach the right hands and get
            resolved efficiently.
          </p>
        </div>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div key={step.title} className="relative">
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="absolute left-1/2 top-16 hidden h-12 w-px bg-primary/20 lg:left-full lg:top-8 lg:h-px lg:w-full lg:-translate-y-1/2" />
              )}
              <div className="flex flex-col items-center text-center">
                <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-primary shadow-lg shadow-primary/25">
                  <step.icon className="h-7 w-7 text-primary-foreground" />
                  <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-foreground text-xs font-bold text-background">
                    {index + 1}
                  </span>
                </div>
                <h3 className="mt-5 text-lg font-semibold text-foreground">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-primary px-6 py-14 sm:px-12 sm:py-16 lg:py-20">
          <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/10" />
          <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-white/10" />
          <div className="relative mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
              Ready to Get Started?
            </h2>
            <p className="mt-4 text-base leading-relaxed text-primary-foreground/80">
              Join thousands of citizens who are already using Citizen Connect to raise their
              concerns and contribute to better governance.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button
                size="lg"
                className="bg-background px-8 font-semibold text-primary hover:bg-background/90"
              >
                Register Now
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground/30 bg-transparent px-8 text-primary-foreground hover:bg-primary-foreground/10"
              >
                Login
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
