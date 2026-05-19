import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon, ChevronDown, Car, LogOut, PlusCircle, BookOpen, ListOrdered } from "lucide-react";
import { useTheme } from "../../hooks/useTheme.js";
import { useAuth } from "../../context/AuthContext.jsx";
import { signOut } from "../../lib/auth-client.js";
import toast from "react-hot-toast";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/explore", label: "Explore Cars" },
  { to: "/add-car", label: "Add Car" },
  { to: "/my-bookings", label: "My Bookings" },
];

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("Signed out successfully");
      navigate("/");
      setDropdownOpen(false);
      setMenuOpen(false);
    } catch {
      toast.error("Failed to sign out");
    }
  };

  const activeStyle = {
    color: "var(--accent)",
    fontWeight: 600,
  };

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: "all 0.3s ease",
        backgroundColor: scrolled
          ? "color-mix(in srgb, var(--background) 90%, transparent)"
          : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid var(--border-subtle)" : "none",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 1.5rem",
          height: 68,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            textDecoration: "none",
          }}
        >
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: "10px",
              backgroundColor: "var(--accent)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Car size={18} color="#fff" />
          </div>
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "1.1875rem",
              color: "var(--foreground)",
              letterSpacing: "-0.03em",
            }}
          >
            Drive<span style={{ color: "var(--accent)" }}>Fleet</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.25rem",
          }}
          className="hidden-mobile"
        >
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              style={({ isActive }) => ({
                padding: "0.5rem 0.875rem",
                borderRadius: "8px",
                fontFamily: "var(--font-body)",
                fontWeight: 500,
                fontSize: "0.9375rem",
                textDecoration: "none",
                color: isActive ? "var(--accent)" : "var(--foreground-muted)",
                backgroundColor: isActive ? "var(--accent-muted)" : "transparent",
                transition: "all 0.2s ease",
              })}
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Right Side */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          {/* Theme Toggle */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 38,
              height: 38,
              borderRadius: "10px",
              border: "1px solid var(--border)",
              backgroundColor: "transparent",
              color: "var(--foreground-muted)",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
            aria-label="Toggle theme"
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </motion.button>

          {/* Auth Section */}
          {isAuthenticated ? (
            <div style={{ position: "relative" }} className="hidden-mobile">
              <button
                onClick={() => setDropdownOpen((v) => !v)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.375rem 0.75rem",
                  borderRadius: "10px",
                  border: "1px solid var(--border)",
                  backgroundColor: "var(--card)",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
              >
                <img
                  src={user?.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || "U")}&background=f97316&color=fff`}
                  alt={user?.name}
                  style={{ width: 28, height: 28, borderRadius: "50%", objectFit: "cover" }}
                />
                <span style={{ color: "var(--foreground)", fontSize: "0.875rem", fontWeight: 500, maxWidth: 100, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {user?.name?.split(" ")[0]}
                </span>
                <ChevronDown size={14} color="var(--foreground-muted)" />
              </button>

              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    style={{
                      position: "absolute",
                      top: "calc(100% + 8px)",
                      right: 0,
                      backgroundColor: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: "14px",
                      padding: "0.5rem",
                      minWidth: 200,
                      boxShadow: "var(--shadow-card)",
                      zIndex: 200,
                    }}
                  >
                    {[
                      { to: "/add-car", label: "Add Car", icon: PlusCircle },
                      { to: "/my-added-cars", label: "My Added Cars", icon: ListOrdered },
                      { to: "/my-bookings", label: "My Bookings", icon: BookOpen },
                    ].map(({ to, label, icon: Icon }) => (
                      <Link
                        key={to}
                        to={to}
                        onClick={() => setDropdownOpen(false)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.625rem",
                          padding: "0.625rem 0.75rem",
                          borderRadius: "8px",
                          color: "var(--foreground-muted)",
                          textDecoration: "none",
                          fontSize: "0.875rem",
                          fontWeight: 500,
                          transition: "all 0.15s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = "var(--accent-muted)";
                          e.currentTarget.style.color = "var(--accent)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = "transparent";
                          e.currentTarget.style.color = "var(--foreground-muted)";
                        }}
                      >
                        <Icon size={15} />
                        {label}
                      </Link>
                    ))}
                    <div style={{ height: 1, backgroundColor: "var(--border)", margin: "0.5rem 0" }} />
                    <button
                      onClick={handleSignOut}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.625rem",
                        width: "100%",
                        padding: "0.625rem 0.75rem",
                        borderRadius: "8px",
                        color: "var(--error)",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        fontSize: "0.875rem",
                        fontWeight: 500,
                        textAlign: "left",
                        transition: "background-color 0.15s ease",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(239,68,68,0.08)")}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                    >
                      <LogOut size={15} />
                      Sign Out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div style={{ display: "flex", gap: "0.5rem" }} className="hidden-mobile">
              <Link to="/login">
                <button className="df-btn-ghost" style={{ padding: "0.5rem 1.125rem", fontSize: "0.875rem" }}>
                  Login
                </button>
              </Link>
              <Link to="/register">
                <button className="df-btn-primary" style={{ padding: "0.5rem 1.125rem", fontSize: "0.875rem" }}>
                  Register
                </button>
              </Link>
            </div>
          )}

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            style={{
              display: "none",
              alignItems: "center",
              justifyContent: "center",
              width: 38,
              height: 38,
              borderRadius: "10px",
              border: "1px solid var(--border)",
              backgroundColor: "transparent",
              color: "var(--foreground)",
              cursor: "pointer",
            }}
            className="show-mobile"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              backgroundColor: "var(--card)",
              borderTop: "1px solid var(--border)",
              overflow: "hidden",
            }}
          >
            <div style={{ padding: "1rem 1.5rem", display: "flex", flexDirection: "column", gap: "0.375rem" }}>
              {navLinks.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === "/"}
                  onClick={() => setMenuOpen(false)}
                  style={({ isActive }) => ({
                    padding: "0.625rem 0.75rem",
                    borderRadius: "8px",
                    fontWeight: 500,
                    fontSize: "0.9375rem",
                    textDecoration: "none",
                    color: isActive ? "var(--accent)" : "var(--foreground)",
                    backgroundColor: isActive ? "var(--accent-muted)" : "transparent",
                  })}
                >
                  {label}
                </NavLink>
              ))}

              <div style={{ height: 1, backgroundColor: "var(--border)", margin: "0.375rem 0" }} />

              {isAuthenticated ? (
                <>
                  <Link to="/my-added-cars" onClick={() => setMenuOpen(false)} style={{ padding: "0.625rem 0.75rem", color: "var(--foreground)", textDecoration: "none", fontWeight: 500 }}>
                    My Added Cars
                  </Link>
                  <button
                    onClick={handleSignOut}
                    style={{ padding: "0.625rem 0.75rem", color: "var(--error)", background: "none", border: "none", cursor: "pointer", fontWeight: 500, textAlign: "left" }}
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <div style={{ display: "flex", gap: "0.5rem", paddingTop: "0.25rem" }}>
                  <Link to="/login" style={{ flex: 1 }} onClick={() => setMenuOpen(false)}>
                    <button className="df-btn-ghost" style={{ width: "100%" }}>Login</button>
                  </Link>
                  <Link to="/register" style={{ flex: 1 }} onClick={() => setMenuOpen(false)}>
                    <button className="df-btn-primary" style={{ width: "100%" }}>Register</button>
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
        }
      `}</style>
    </header>
  );
}
