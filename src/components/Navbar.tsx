import { Link, useLocation } from "react-router-dom";
import { Leaf } from "lucide-react";

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="gradient-dark text-primary-foreground sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg gradient-hero flex items-center justify-center group-hover:shadow-glow transition-shadow">
            <Leaf className="w-4.5 h-4.5" />
          </div>
          <span className="font-display font-bold text-lg tracking-tight">GreenCode AI</span>
        </Link>
        <div className="flex items-center gap-1 font-body text-sm">
          <Link
            to="/"
            className={`px-4 py-2 rounded-lg transition-colors ${
              location.pathname === "/" ? "bg-primary/20" : "hover:bg-primary/10"
            }`}
          >
            Home
          </Link>
          <Link
            to="/dashboard"
            className={`px-4 py-2 rounded-lg transition-colors ${
              location.pathname === "/dashboard" ? "bg-primary/20" : "hover:bg-primary/10"
            }`}
          >
            Dashboard
          </Link>
          <Link
            to="/history"
            className={`px-4 py-2 rounded-lg transition-colors ${
              location.pathname === "/history" ? "bg-primary/20" : "hover:bg-primary/10"
            }`}
          >
            History
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
