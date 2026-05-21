import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Users, Tag, Calendar, TrendingUp, ArrowLeft, Car } from "lucide-react";
import toast from "react-hot-toast";
import api from "../../lib/axios.js";
import { useAuth } from "../../context/AuthContext.jsx";
import { formatPrice, formatDate } from "../../utils/helpers.js";
import PageTransition from "../../components/ui/PageTransition.jsx";
import Modal from "../../components/ui/Modal.jsx";
import LoadingSpinner from "../../components/ui/LoadingSpinner.jsx";

function BookingForm({ car, onSuccess, onClose }) {
  const [driverNeeded, setDriverNeeded] = useState(false);
  const [specialNote, setSpecialNote] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [loading, setLoading] = useState(false);

  const driverFee = 50;
  const total = car.dailyRentPrice + (driverNeeded ? driverFee : 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!bookingDate) {
      toast.error("Please select a booking date");
      return;
    }
    setLoading(true);
    try {
      await api.post("/bookings", {
        carId: car._id,
        driverNeeded,
        specialNote,
        bookingDate,
      });
      toast.success("Car booked successfully! 🎉");
      onSuccess();
    } catch (err) {
      toast.error(err.message || "Booking failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      {/* Price summary */}
      <div
        style={{
          backgroundColor: "var(--background-secondary)",
          borderRadius: "12px",
          padding: "1rem 1.25rem",
          border: "1px solid var(--border)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
          <span style={{ color: "var(--foreground-muted)", fontSize: "0.875rem" }}>Daily rate</span>
          <span style={{ color: "var(--foreground)", fontWeight: 600 }}>{formatPrice(car.dailyRentPrice)}</span>
        </div>
        {driverNeeded && (
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
            <span style={{ color: "var(--foreground-muted)", fontSize: "0.875rem" }}>Driver fee</span>
            <span style={{ color: "var(--foreground)", fontWeight: 600 }}>+{formatPrice(driverFee)}</span>
          </div>
        )}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: "1px solid var(--border)",
            paddingTop: "0.5rem",
            marginTop: "0.25rem",
          }}
        >
          <span style={{ color: "var(--foreground)", fontWeight: 700, fontFamily: "var(--font-display)" }}>Total</span>
          <span style={{ color: "var(--accent)", fontWeight: 800, fontFamily: "var(--font-display)", fontSize: "1.125rem" }}>
            {formatPrice(total)}
          </span>
        </div>
      </div>

      {/* Booking Date */}
      <div>
        <label style={{ display: "block", color: "var(--foreground)", fontSize: "0.875rem", fontWeight: 500, marginBottom: "0.4rem" }}>
          Pickup Date
        </label>
        <input
          type="date"
          value={bookingDate}
          onChange={(e) => setBookingDate(e.target.value)}
          min={new Date().toISOString().split("T")[0]}
          className="df-input"
          required
        />
      </div>

      {/* Driver Needed */}
      <div>
        <label style={{ display: "block", color: "var(--foreground)", fontSize: "0.875rem", fontWeight: 500, marginBottom: "0.625rem" }}>
          Driver Needed? <span style={{ color: "var(--foreground-muted)", fontWeight: 400 }}>(+{formatPrice(driverFee)}/day)</span>
        </label>
        <div style={{ display: "flex", gap: "0.75rem" }}>
          {[{ value: false, label: "No, self-drive" }, { value: true, label: "Yes, with driver" }].map(({ value, label }) => (
            <button
              key={String(value)}
              type="button"
              onClick={() => setDriverNeeded(value)}
              style={{
                flex: 1,
                padding: "0.625rem 1rem",
                borderRadius: "10px",
                border: `1px solid ${driverNeeded === value ? "var(--accent)" : "var(--border)"}`,
                backgroundColor: driverNeeded === value ? "var(--accent-muted)" : "transparent",
                color: driverNeeded === value ? "var(--accent)" : "var(--foreground-muted)",
                cursor: "pointer",
                fontWeight: driverNeeded === value ? 600 : 400,
                fontSize: "0.875rem",
                transition: "all 0.2s ease",
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Special Note */}
      <div>
        <label style={{ display: "block", color: "var(--foreground)", fontSize: "0.875rem", fontWeight: 500, marginBottom: "0.4rem" }}>
          Special Note <span style={{ color: "var(--foreground-muted)", fontWeight: 400 }}>(optional)</span>
        </label>
        <textarea
          value={specialNote}
          onChange={(e) => setSpecialNote(e.target.value)}
          placeholder="Any special requests or notes…"
          rows={3}
          className="df-input"
          style={{ resize: "vertical" }}
        />
      </div>

      <div style={{ display: "flex", gap: "0.75rem" }}>
        <button type="button" onClick={onClose} className="df-btn-ghost" style={{ flex: 1 }}>
          Cancel
        </button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={loading}
          className="df-btn-primary"
          style={{ flex: 2, opacity: loading ? 0.75 : 1, cursor: loading ? "not-allowed" : "pointer" }}
        >
          {loading ? "Booking…" : `Book Now — ${formatPrice(total)}`}
        </motion.button>
      </div>
    </form>
  );
}

export default function CarDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingOpen, setBookingOpen] = useState(false);

  useEffect(() => {
    api
      .get(`/cars/${id}`)
      .then((res) => setCar(res.data.data))
      .catch(() => toast.error("Car not found"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div style={{ minHeight: "calc(100vh - 68px)", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "var(--background)" }}>
        <LoadingSpinner size="lg" text="Loading car details…" />
      </div>
    );
  }

  if (!car) {
    return (
      <div style={{ minHeight: "calc(100vh - 68px)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", backgroundColor: "var(--background)", gap: "1.5rem" }}>
        <Car size={48} color="var(--foreground-muted)" />
        <h2 style={{ fontFamily: "var(--font-display)", color: "var(--foreground)", fontSize: "1.5rem" }}>Car not found</h2>
        <Link to="/explore"><button className="df-btn-primary">Back to Explore</button></Link>
      </div>
    );
  }

  const specs = [
    { icon: <Tag size={16} />, label: "Type", value: car.carType },
    { icon: <Users size={16} />, label: "Seats", value: `${car.seatCapacity} passengers` },
    { icon: <MapPin size={16} />, label: "Pickup", value: car.pickupLocation },
    { icon: <TrendingUp size={16} />, label: "Bookings", value: `${car.bookingCount} trips` },
    { icon: <Calendar size={16} />, label: "Listed", value: formatDate(car.createdAt) },
  ];

  return (
    <PageTransition>
      <div style={{ backgroundColor: "var(--background)", minHeight: "calc(100vh - 68px)", paddingBottom: "5rem" }}>
        {/* Back Button */}
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem 1.5rem 0" }}>
          <button
            onClick={() => navigate(-1)}
            className="df-btn-ghost"
            style={{ marginBottom: "1.5rem", display: "inline-flex" }}
          >
            <ArrowLeft size={16} />
            Back
          </button>
        </div>

        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 380px",
              gap: "2.5rem",
              alignItems: "start",
            }}
            className="car-detail-grid"
          >
            {/* Left: Image + Description */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                style={{
                  borderRadius: "20px",
                  overflow: "hidden",
                  border: "1px solid var(--border)",
                  marginBottom: "2rem",
                }}
              >
                <img
                  src={car.image}
                  alt={car.carName}
                  style={{ width: "100%", height: 380, objectFit: "cover", display: "block" }}
                  onError={(e) => {
                    e.target.src = `https://placehold.co/800x400/1a1a2e/f97316?text=${encodeURIComponent(car.carName)}`;
                  }}
                />
              </motion.div>

              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.15 }}
              >
                <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.1875rem", color: "var(--foreground)", marginBottom: "0.75rem" }}>
                  About this Vehicle
                </h2>
                <p style={{ color: "var(--foreground-muted)", lineHeight: 1.75, fontSize: "0.9375rem" }}>
                  {car.description}
                </p>
              </motion.div>
            </div>

            {/* Right: Info Card */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45, delay: 0.1 }}
              style={{
                backgroundColor: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: "20px",
                padding: "1.75rem",
                position: "sticky",
                top: "88px",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem" }}>
                <span
                  style={{
                    backgroundColor: "var(--accent)",
                    color: "#fff",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    padding: "0.2rem 0.7rem",
                    borderRadius: 100,
                    fontFamily: "var(--font-display)",
                  }}
                >
                  {car.carType}
                </span>
                <span className={`df-badge ${car.availability ? "df-badge-available" : "df-badge-unavailable"}`}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: car.availability ? "var(--success)" : "var(--error)", display: "inline-block" }} />
                  {car.availability ? "Available" : "Unavailable"}
                </span>
              </div>

              <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.625rem", color: "var(--foreground)", letterSpacing: "-0.02em", marginBottom: "0.25rem", marginTop: "0.75rem" }}>
                {car.carName}
              </h1>

              <div style={{ marginBottom: "1.5rem" }}>
                <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "2rem", color: "var(--accent)" }}>
                  {formatPrice(car.dailyRentPrice)}
                </span>
                <span style={{ color: "var(--foreground-muted)", fontSize: "0.9rem" }}>/day</span>
              </div>

              {/* Specs */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "1.75rem" }}>
                {specs.map(({ icon, label, value }) => (
                  <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "var(--foreground-muted)", fontSize: "0.875rem" }}>
                      <span style={{ color: "var(--accent)" }}>{icon}</span>
                      {label}
                    </span>
                    <span style={{ color: "var(--foreground)", fontSize: "0.875rem", fontWeight: 500 }}>{value}</span>
                  </div>
                ))}
              </div>

              {/* Book Button */}
              {car.availability ? (
                isAuthenticated ? (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setBookingOpen(true)}
                    className="df-btn-primary"
                    style={{ width: "100%", fontSize: "1rem", padding: "0.875rem" }}
                  >
                    Book Now
                  </motion.button>
                ) : (
                  <Link to="/login" state={{ from: { pathname: `/cars/${id}` } }}>
                    <button className="df-btn-primary" style={{ width: "100%", fontSize: "1rem", padding: "0.875rem" }}>
                      Sign In to Book
                    </button>
                  </Link>
                )
              ) : (
                <button disabled style={{ width: "100%", padding: "0.875rem", borderRadius: "10px", backgroundColor: "var(--border)", color: "var(--foreground-muted)", border: "none", fontSize: "1rem", cursor: "not-allowed" }}>
                  Currently Unavailable
                </button>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      <Modal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        title={`Book — ${car.carName}`}
      >
        <BookingForm
          car={car}
          onSuccess={() => {
            setBookingOpen(false);
            navigate("/my-bookings");
          }}
          onClose={() => setBookingOpen(false)}
        />
      </Modal>

      <style>{`
        @media (max-width: 768px) {
          .car-detail-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </PageTransition>
  );
}
