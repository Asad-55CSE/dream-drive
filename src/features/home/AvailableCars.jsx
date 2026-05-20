import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import api from "../../lib/axios.js";
import CarCard from "../../components/shared/CarCard.jsx";
import SkeletonCard from "../../components/ui/SkeletonCard.jsx";
import EmptyState from "../../components/shared/EmptyState.jsx";

export default function AvailableCars() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/cars/available")
      .then((res) => setCars(res.data.data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <section style={{ padding: "5rem 0", backgroundColor: "var(--background)" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: "center", marginBottom: "3rem" }}
        >
          <span className="section-label">Fleet</span>
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
            Available Vehicles
          </h2>
          <p style={{ color: "var(--foreground-muted)", fontSize: "1rem", maxWidth: 500, margin: "0 auto" }}>
            Handpicked premium vehicles ready for your next adventure
          </p>
        </motion.div>

        {/* Grid */}
        {loading ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : cars.length === 0 ? (
          <EmptyState title="No cars available" message="Check back soon for new listings." />
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {cars.map((car, i) => (
              <CarCard key={car._id} car={car} index={i} />
            ))}
          </div>
        )}

        {/* CTA */}
        {!loading && cars.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: "center", marginTop: "3rem" }}
          >
            <Link to="/explore">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="df-btn-primary"
                style={{ fontSize: "0.9375rem" }}
              >
                View All Cars
                <ArrowRight size={16} />
              </motion.button>
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}
