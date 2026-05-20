import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "Business Traveler",
    avatar: "https://i.pravatar.cc/80?img=5",
    rating: 5,
    text: "DriveFleet completely transformed my business travel. The booking process was seamless and the car was immaculate. I've been a loyal customer for over a year now.",
  },
  {
    name: "James Rodriguez",
    role: "Weekend Explorer",
    avatar: "https://i.pravatar.cc/80?img=12",
    rating: 5,
    text: "Finally a car rental platform that actually delivers on its promises. Clean cars, transparent pricing, and incredible customer support. Highly recommend to everyone.",
  },
  {
    name: "Emma Thompson",
    role: "Road Trip Enthusiast",
    avatar: "https://i.pravatar.cc/80?img=9",
    rating: 5,
    text: "I rented an SUV for a cross-country trip and it was perfect. The vehicle was in excellent condition, pickup was easy, and the whole experience exceeded my expectations.",
  },
  {
    name: "David Chen",
    role: "Event Planner",
    avatar: "https://i.pravatar.cc/80?img=15",
    rating: 5,
    text: "DriveFleet is my go-to for event transportation. They have a great selection of luxury vehicles and the driver service option is a game-changer for important events.",
  },
];

function StarRating({ count = 5 }) {
  return (
    <div style={{ display: "flex", gap: "0.25rem" }}>
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={14} fill="var(--accent)" color="var(--accent)" />
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section style={{ padding: "5rem 0", backgroundColor: "var(--background)" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: "center", marginBottom: "3.5rem" }}
        >
          <span className="section-label">Reviews</span>
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
            Loved by Drivers
          </h2>
          <p style={{ color: "var(--foreground-muted)", fontSize: "1rem", maxWidth: 480, margin: "0 auto" }}>
            Don't take our word for it — hear from the thousands of satisfied customers who trust DriveFleet
          </p>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {testimonials.map(({ name, role, avatar, rating, text }, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              whileHover={{ y: -3 }}
              style={{
                backgroundColor: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: "16px",
                padding: "1.75rem",
                position: "relative",
                transition: "border-color 0.3s, box-shadow 0.3s",
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
              {/* Quote icon */}
              <div style={{ position: "absolute", top: "1.25rem", right: "1.25rem", opacity: 0.15 }}>
                <Quote size={36} color="var(--accent)" />
              </div>

              <StarRating count={rating} />

              <p
                style={{
                  color: "var(--foreground-muted)",
                  fontSize: "0.9rem",
                  lineHeight: 1.75,
                  margin: "1rem 0 1.5rem",
                }}
              >
                "{text}"
              </p>

              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <img
                  src={avatar}
                  alt={name}
                  style={{ width: 42, height: 42, borderRadius: "50%", objectFit: "cover", border: "2px solid var(--accent)" }}
                />
                <div>
                  <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.9375rem", color: "var(--foreground)" }}>
                    {name}
                  </div>
                  <div style={{ color: "var(--foreground-muted)", fontSize: "0.8125rem" }}>
                    {role}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
