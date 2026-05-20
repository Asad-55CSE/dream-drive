import { motion } from "framer-motion";
import { ShieldCheck, Zap, HeadphonesIcon, MapPin, CreditCard, Star } from "lucide-react";

const features = [
  {
    icon: <ShieldCheck size={24} />,
    title: "Fully Insured Fleet",
    description:
      "Every vehicle in our fleet comes with comprehensive insurance coverage for your complete peace of mind.",
  },
  {
    icon: <Zap size={24} />,
    title: "Instant Booking",
    description:
      "Book your dream car in under two minutes. No paperwork, no waiting — just confirm and drive.",
  },
  {
    icon: <HeadphonesIcon size={24} />,
    title: "24/7 Support",
    description:
      "Our dedicated support team is available around the clock to assist you wherever your journey takes you.",
  },
  {
    icon: <MapPin size={24} />,
    title: "Flexible Pickup",
    description:
      "Multiple pickup locations across the city. Choose the most convenient spot for you.",
  },
  {
    icon: <CreditCard size={24} />,
    title: "Transparent Pricing",
    description:
      "No hidden fees, no surprise charges. The price you see is the price you pay — always.",
  },
  {
    icon: <Star size={24} />,
    title: "Premium Quality",
    description:
      "Every vehicle is meticulously maintained and inspected to guarantee an exceptional driving experience.",
  },
];

export default function WhyChooseUs() {
  return (
    <section
      style={{
        padding: "5rem 0",
        backgroundColor: "var(--background-secondary)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* BG accent */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 800,
          height: 800,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(249,115,22,0.04) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem", position: "relative" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: "center", marginBottom: "3.5rem" }}
        >
          <span className="section-label">Why Us</span>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
              fontWeight: 800,
              color: "var(--foreground)",
              letterSpacing: "-0.02em",
              marginBottom: "0.875rem",
            }}
          >
            Why Choose DriveFleet?
          </h2>
          <p style={{ color: "var(--foreground-muted)", fontSize: "1rem", maxWidth: 520, margin: "0 auto" }}>
            We go beyond just renting cars — we deliver an experience built on trust, convenience, and excellence.
          </p>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {features.map(({ icon, title, description }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.07 }}
              whileHover={{ y: -4 }}
              style={{
                backgroundColor: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: "16px",
                padding: "1.75rem",
                transition: "border-color 0.3s ease, box-shadow 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--accent)";
                e.currentTarget.style.boxShadow = "var(--shadow-hover)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 52,
                  height: 52,
                  borderRadius: "14px",
                  backgroundColor: "var(--accent-muted)",
                  color: "var(--accent)",
                  marginBottom: "1.25rem",
                }}
              >
                {icon}
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "1.0625rem",
                  color: "var(--foreground)",
                  marginBottom: "0.625rem",
                }}
              >
                {title}
              </h3>
              <p style={{ color: "var(--foreground-muted)", fontSize: "0.875rem", lineHeight: 1.7 }}>
                {description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
