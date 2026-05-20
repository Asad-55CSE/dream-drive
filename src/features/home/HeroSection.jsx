import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, Star, Clock } from "lucide-react";

const stats = [
  { icon: <Star size={18} />, value: "500+", label: "Premium Cars" },
  { icon: <ShieldCheck size={18} />, value: "99%", label: "Satisfaction" },
  { icon: <Clock size={18} />, value: "24/7", label: "Support" },
];

export default function HeroSection() {
  return (
    <section
      style={{
        position: "relative",
        minHeight: "calc(100vh - 68px)",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        paddingTop: "2rem",
        paddingBottom: "4rem",
      }}
    >
      {/* Background gradient */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "var(--gradient-hero)",
          pointerEvents: "none",
        }}
      />

      {/* Decorative orbs */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          right: "-5%",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(249,115,22,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "5%",
          left: "-8%",
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(249,115,22,0.05) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 1.5rem",
          width: "100%",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "4rem",
          alignItems: "center",
        }}
        className="hero-grid"
      >
        {/* Text Column */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="section-label">Premium Car Rental</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              fontWeight: 800,
              color: "var(--foreground)",
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              marginBottom: "1.25rem",
            }}
          >
            Drive Your{" "}
            <span
              style={{
                background: "linear-gradient(135deg, var(--accent), #fb923c)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Perfect
            </span>
            <br />
            Journey Today
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              color: "var(--foreground-muted)",
              fontSize: "1.0625rem",
              lineHeight: 1.7,
              marginBottom: "2.25rem",
              maxWidth: 480,
            }}
          >
            Discover premium vehicles for every occasion. From city cruisers to off-road warriors — book in minutes, drive in style.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            style={{ display: "flex", gap: "0.875rem", flexWrap: "wrap", marginBottom: "3rem" }}
          >
            <Link to="/explore">
              <motion.button
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="df-btn-primary"
                style={{ fontSize: "1rem", padding: "0.875rem 2rem" }}
              >
                Explore Cars
                <ArrowRight size={18} />
              </motion.button>
            </Link>
            <Link to="/add-car">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="df-btn-ghost"
                style={{ fontSize: "1rem", padding: "0.875rem 2rem" }}
              >
                List Your Car
              </motion.button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            style={{
              display: "flex",
              gap: "1.5rem",
              flexWrap: "wrap",
            }}
          >
            {stats.map(({ icon, value, label }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 + i * 0.08 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.625rem",
                  padding: "0.625rem 1rem",
                  borderRadius: "12px",
                  backgroundColor: "var(--card)",
                  border: "1px solid var(--border)",
                }}
              >
                <span style={{ color: "var(--accent)" }}>{icon}</span>
                <div>
                  <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1rem", color: "var(--foreground)", lineHeight: 1 }}>
                    {value}
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "var(--foreground-muted)" }}>
                    {label}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Image Column */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, x: 30 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          style={{ position: "relative" }}
          className="hero-image-col"
        >
          <div
            style={{
              borderRadius: "24px",
              overflow: "hidden",
              border: "1px solid var(--border)",
              boxShadow: "0 32px 80px rgba(0,0,0,0.3), 0 0 0 1px var(--border)",
              position: "relative",
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800&q=80"
              alt="Premium Car"
              style={{ width: "100%", height: 420, objectFit: "cover", display: "block" }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to top, rgba(0,0,0,0.4), transparent)",
              }}
            />
          </div>

          {/* Floating card */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            style={{
              position: "absolute",
              bottom: -20,
              left: -24,
              backgroundColor: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: "16px",
              padding: "1rem 1.25rem",
              boxShadow: "var(--shadow-card)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <div style={{ width: 40, height: 40, borderRadius: "10px", backgroundColor: "var(--accent-muted)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <ShieldCheck size={20} color="var(--accent)" />
              </div>
              <div>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.9375rem", color: "var(--foreground)" }}>
                  Fully Insured
                </div>
                <div style={{ color: "var(--foreground-muted)", fontSize: "0.75rem" }}>
                  All vehicles covered
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
          .hero-image-col { display: none; }
        }
      `}</style>
    </section>
  );
}
