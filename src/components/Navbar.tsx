import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const { pathname } = useLocation();

  return (
    <nav style={{ background: "#e0e5ec", boxShadow: "0 4px 10px #a3b1c6, 0 -2px 6px #ffffff" }}>
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <span className="text-sm font-bold tracking-widest uppercase" style={{ color: "#2d3748", letterSpacing: "0.12em" }}>
          College Admin
        </span>
        <div className="flex gap-3">
          <Link
            to="/"
            className={`px-4 py-2 text-sm font-medium transition-all ${
              pathname === "/" ? "neu-pressed" : "neu-btn"
            }`}
            style={{ color: "#4a5568", textDecoration: "none" }}
          >
            Dashboard
          </Link>
          <Link
            to="/add"
            className={`px-4 py-2 text-sm font-medium transition-all ${
              pathname === "/add" ? "neu-pressed" : "neu-btn"
            }`}
            style={{ color: "#4a5568", textDecoration: "none" }}
          >
            Add Student
          </Link>
        </div>
      </div>
    </nav>
  );
}
