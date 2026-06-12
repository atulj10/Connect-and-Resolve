import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import logoSrc from "@/assets/logo.png";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2.5 transition-opacity hover:opacity-80">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg">
            <img src={logoSrc} alt="Citizen Connect" className="h-9 w-9" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold leading-tight tracking-tight text-foreground">
              Citizen Connect
            </span>
            <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
              Grievance Portal
            </span>
          </div>
        </Link>

        <nav className="flex items-center gap-3">
          <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
            <Link to="/login">Login</Link>
          </Button>
          <Button
            asChild
            size="sm"
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Link to="/register">Register</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
