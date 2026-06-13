import { Link } from "@tanstack/react-router";
import { Mail, Phone, MapPin } from "lucide-react";
import logoSrc from "@/assets/logo.png";

export function Footer() {
  return (
    <footer className="w-full border-t border-border bg-[#4e148c]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg">
                <img src={logoSrc} alt="Citizen Connect" className="h-9 w-9" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold leading-tight tracking-tight text-white">
                  Citizen Connect
                </span>
                <span className="text-[10px] font-medium uppercase tracking-widest text-white/60">
                  For Better Governance
                </span>
              </div>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/70">
              Empowering citizens with a transparent, efficient, and accessible platform for
              submitting grievances, suggestions, and assistance requests directly to government
              departments.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Contact Us
            </h3>
            <ul className="mt-4 space-y-3">
              <li className="flex items-start gap-3 text-sm text-white/70">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-white/80" />
                <span>admincitizenconnect@gmail.com</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-white/70">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-white/80" />
                <span>+91 1800-123-4567</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-white/70">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-white/80" />
                <span>Minister'S Office Department of UDHD & IT, Govt. of Bihar</span>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Legal
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link
                  to="/"
                  className="text-sm text-white/70 transition-colors hover:text-white"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-sm text-white/70 transition-colors hover:text-white"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-sm text-white/70 transition-colors hover:text-white"
                >
                  Accessibility Statement
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-sm text-white/70 transition-colors hover:text-white"
                >
                  Help Center
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-xs text-white/60">
            &copy; {new Date().getFullYear()} Citizen Connect Portal. All rights reserved.
          </p>
          <p className="text-xs text-white/60">A Government of India Initiative</p>
        </div>
      </div>
    </footer>
  );
}
