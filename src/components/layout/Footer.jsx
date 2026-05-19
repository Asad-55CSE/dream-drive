import { Link } from "react-router-dom";
import { Car, Mail, Phone, MapPin, Github, Linkedin } from "lucide-react";

const XIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        backgroundColor: "var(--background-secondary)",
        borderTop: "1px solid var(--border)",
        paddingTop: "3.5rem",
        paddingBottom: "2rem",
        marginTop: "auto",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 1.5rem",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "2.5rem",
            marginBottom: "3rem",
          }}
        >
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
              <div style={{ width: 32, height: 32, borderRadius: "8px", backgroundColor: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Car size={16} color="#fff" />
              </div>
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.1rem", color: "var(--foreground)", letterSpacing: "-0.03em" }}>
                Drive<span style={{ color: "var(--accent)" }}>Fleet</span>
              </span>
            </div>
            <p style={{ color: "var(--foreground-muted)", fontSize: "0.875rem", lineHeight: 1.7, maxWidth: 240 }}>
              Premium car rental marketplace. Find and book the perfect vehicle for every journey.
            </p>
            <div style={{ display: "flex", gap: "0.625rem", marginTop: "1.25rem" }}>
              {[
                { icon: <XIcon />, href: "#", label: "X" },
                { icon: <Github size={16} />, href: "#", label: "GitHub" },
                { icon: <Linkedin size={16} />, href: "#", label: "LinkedIn" },
              ].map(({ icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 36,
                    height: 36,
                    borderRadius: "8px",
                    border: "1px solid var(--border)",
                    color: "var(--foreground-muted)",
                    textDecoration: "none",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "var(--accent)";
                    e.currentTarget.style.color = "var(--accent)";
                    e.currentTarget.style.backgroundColor = "var(--accent-muted)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--border)";
                    e.currentTarget.style.color = "var(--foreground-muted)";
                    e.currentTarget.style.backgroundColor = "transparent";
                  }}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.9375rem", color: "var(--foreground)", marginBottom: "1.25rem" }}>
              Quick Links
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.625rem" }}>
              {[
                { to: "/", label: "Home" },
                { to: "/explore", label: "Explore Cars" },
                { to: "/add-car", label: "Add Your Car" },
                { to: "/my-bookings", label: "My Bookings" },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    style={{
                      color: "var(--foreground-muted)",
                      textDecoration: "none",
                      fontSize: "0.875rem",
                      transition: "color 0.2s ease",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--foreground-muted)")}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.9375rem", color: "var(--foreground)", marginBottom: "1.25rem" }}>
              Contact
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {[
                { icon: <Mail size={14} />, label: "hello@drivefleet.com" },
                { icon: <Phone size={14} />, label: "+1 (555) 123-4567" },
                { icon: <MapPin size={14} />, label: "123 Fleet Ave, Auto City" },
              ].map(({ icon, label }) => (
                <li
                  key={label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    color: "var(--foreground-muted)",
                    fontSize: "0.875rem",
                  }}
                >
                  <span style={{ color: "var(--accent)", flexShrink: 0 }}>{icon}</span>
                  {label}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            borderTop: "1px solid var(--border-subtle)",
            paddingTop: "1.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <p style={{ color: "var(--foreground-muted)", fontSize: "0.8125rem" }}>
            © {year} DriveFleet. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
