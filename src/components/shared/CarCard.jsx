import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MapPin, Users, Car } from "lucide-react";
import { formatPrice } from "../../utils/helpers.js";

export default function CarCard({ car, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      className="df-card"
      style={{ display: "flex", flexDirection: "column" }}
    >
      {/* Image */}
      <div style={{ position: "relative", overflow: "hidden" }}>
        <img
          src={car.image}
          alt={car.carName}
          style={{
            width: "100%",
            height: 200,
            objectFit: "cover",
            transition: "transform 0.4s ease",
          }}
          onError={(e) => {
            e.target.src = `https://placehold.co/600x400/1a1a2e/f97316?text=${encodeURIComponent(car.carName)}`;
          }}
          onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
          onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
        />
        {/* Availability badge */}
        <div
          style={{ position: "absolute", top: 12, right: 12 }}
        >
          <span className={`df-badge ${car.availability ? "df-badge-available" : "df-badge-unavailable"}`}>
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                backgroundColor: car.availability ? "var(--success)" : "var(--error)",
                display: "inline-block",
              }}
            />
            {car.availability ? "Available" : "Unavailable"}
          </span>
        </div>
        {/* Type badge */}
        <div style={{ position: "absolute", top: 12, left: 12 }}>
          <span
            style={{
              backgroundColor: "var(--accent)",
              color: "#fff",
              fontSize: "0.75rem",
              fontWeight: 600,
              padding: "0.2rem 0.6rem",
              borderRadius: 100,
              fontFamily: "var(--font-display)",
            }}
          >
            {car.carType}
          </span>
        </div>
      </div>

      {/* Content */}
      <div
        style={{
          padding: "1.25rem",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
        }}
      >
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "1.0625rem",
            color: "var(--foreground)",
          }}
        >
          {car.carName}
        </h3>

        <div style={{ display: "flex", gap: "1rem", marginBottom: "0.25rem" }}>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.3rem",
              color: "var(--foreground-muted)",
              fontSize: "0.8125rem",
            }}
          >
            <Users size={13} />
            {car.seatCapacity} seats
          </span>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.3rem",
              color: "var(--foreground-muted)",
              fontSize: "0.8125rem",
            }}
          >
            <MapPin size={13} />
            {car.pickupLocation}
          </span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: "auto",
            paddingTop: "0.75rem",
            borderTop: "1px solid var(--border-subtle)",
          }}
        >
          <div>
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                fontSize: "1.1875rem",
                color: "var(--accent)",
              }}
            >
              {formatPrice(car.dailyRentPrice)}
            </span>
            <span style={{ color: "var(--foreground-muted)", fontSize: "0.8125rem" }}>
              /day
            </span>
          </div>

          <Link to={`/cars/${car._id}`}>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="df-btn-primary"
              style={{ padding: "0.5rem 1rem", fontSize: "0.875rem" }}
            >
              View Details
            </motion.button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
