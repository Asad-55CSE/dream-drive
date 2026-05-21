import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Calendar, Users, FileText, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import api from "../../lib/axios.js";
import { formatPrice, formatDate, getStatusBadge } from "../../utils/helpers.js";
import PageTransition from "../../components/ui/PageTransition.jsx";
import ConfirmModal from "../../components/ui/ConfirmModal.jsx";
import LoadingSpinner from "../../components/ui/LoadingSpinner.jsx";
import EmptyState from "../../components/shared/EmptyState.jsx";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancelTarget, setCancelTarget] = useState(null);

  const fetchBookings = async () => {
    try {
      const res = await api.get("/bookings/my-bookings");
      setBookings(res.data.data || []);
    } catch {
      toast.error("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCancel = async () => {
    if (!cancelTarget) return;
    try {
      await api.delete(`/bookings/${cancelTarget}`);
      toast.success("Booking cancelled");
      setBookings((prev) => prev.filter((b) => b._id !== cancelTarget));
    } catch (err) {
      toast.error(err.message || "Failed to cancel booking");
    } finally {
      setCancelTarget(null);
    }
  };

  return (
    <PageTransition>
      <div style={{ backgroundColor: "var(--background)", minHeight: "calc(100vh - 68px)" }}>
        {/* Header */}
        <div style={{ background: "var(--gradient-hero)", borderBottom: "1px solid var(--border)", padding: "3rem 1.5rem 2.5rem" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
              <span className="section-label">Dashboard</span>
              <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.875rem, 4vw, 2.75rem)", fontWeight: 800, color: "var(--foreground)", letterSpacing: "-0.02em" }}>
                My Bookings
              </h1>
              <p style={{ color: "var(--foreground-muted)", fontSize: "0.9375rem", marginTop: "0.25rem" }}>
                {bookings.length} booking{bookings.length !== 1 ? "s" : ""} total
              </p>
            </motion.div>
          </div>
        </div>

        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2.5rem 1.5rem" }}>
          {loading ? (
            <div style={{ display: "flex", justifyContent: "center", padding: "5rem" }}>
              <LoadingSpinner size="lg" text="Loading bookings…" />
            </div>
          ) : bookings.length === 0 ? (
            <EmptyState
              icon={BookOpen}
              title="No bookings yet"
              message="You haven't made any bookings. Explore available cars to get started."
              action={
                <a href="/explore">
                  <button className="df-btn-primary">Explore Cars</button>
                </a>
              }
            />
          ) : (
            <>
              {/* Desktop Table */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="bookings-table-wrap"
                style={{
                  backgroundColor: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "20px",
                  overflow: "hidden",
                  boxShadow: "var(--shadow-card)",
                }}
              >
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                      <tr style={{ borderBottom: "1px solid var(--border)" }}>
                        {["Car", "Total Price", "Booking Date", "Driver", "Status", "Action"].map((h) => (
                          <th
                            key={h}
                            style={{
                              padding: "1rem 1.25rem",
                              textAlign: "left",
                              fontFamily: "var(--font-display)",
                              fontWeight: 600,
                              fontSize: "0.8125rem",
                              color: "var(--foreground-muted)",
                              letterSpacing: "0.04em",
                              textTransform: "uppercase",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <AnimatePresence>
                        {bookings.map((booking, i) => {
                          const badge = getStatusBadge(booking.status);
                          return (
                            <motion.tr
                              key={booking._id}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: 10 }}
                              transition={{ duration: 0.3, delay: i * 0.04 }}
                              style={{
                                borderBottom: "1px solid var(--border-subtle)",
                                transition: "background-color 0.2s ease",
                              }}
                              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--card-hover)")}
                              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                            >
                              {/* Car */}
                              <td style={{ padding: "1rem 1.25rem" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                                  <img
                                    src={booking.carImage || "https://placehold.co/80x60/1a1a2e/f97316?text=Car"}
                                    alt={booking.carName}
                                    style={{ width: 52, height: 40, objectFit: "cover", borderRadius: "8px", flexShrink: 0 }}
                                    onError={(e) => (e.target.src = "https://placehold.co/80x60/1a1a2e/f97316?text=Car")}
                                  />
                                  <span style={{ fontWeight: 600, color: "var(--foreground)", fontSize: "0.9375rem", whiteSpace: "nowrap" }}>
                                    {booking.carName}
                                  </span>
                                </div>
                              </td>

                              {/* Price */}
                              <td style={{ padding: "1rem 1.25rem" }}>
                                <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: "var(--accent)", fontSize: "1rem" }}>
                                  {formatPrice(booking.totalPrice)}
                                </span>
                              </td>

                              {/* Date */}
                              <td style={{ padding: "1rem 1.25rem" }}>
                                <span style={{ display: "flex", alignItems: "center", gap: "0.375rem", color: "var(--foreground-muted)", fontSize: "0.875rem", whiteSpace: "nowrap" }}>
                                  <Calendar size={13} />
                                  {formatDate(booking.bookingDate)}
                                </span>
                              </td>

                              {/* Driver */}
                              <td style={{ padding: "1rem 1.25rem" }}>
                                <span style={{ display: "flex", alignItems: "center", gap: "0.375rem", color: "var(--foreground-muted)", fontSize: "0.875rem" }}>
                                  <Users size={13} />
                                  {booking.driverNeeded ? "Yes" : "No"}
                                </span>
                              </td>

                              {/* Status */}
                              <td style={{ padding: "1rem 1.25rem" }}>
                                <span
                                  style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    padding: "0.25rem 0.75rem",
                                    borderRadius: 100,
                                    fontSize: "0.8125rem",
                                    fontWeight: 600,
                                    backgroundColor: badge.bg,
                                    color: badge.color,
                                    textTransform: "capitalize",
                                    whiteSpace: "nowrap",
                                  }}
                                >
                                  {booking.status}
                                </span>
                              </td>

                              {/* Action */}
                              <td style={{ padding: "1rem 1.25rem" }}>
                                {booking.status !== "completed" && booking.status !== "cancelled" && (
                                  <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setCancelTarget(booking._id)}
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: "0.35rem",
                                      padding: "0.4rem 0.875rem",
                                      borderRadius: "8px",
                                      border: "1px solid rgba(239,68,68,0.3)",
                                      backgroundColor: "rgba(239,68,68,0.06)",
                                      color: "var(--error)",
                                      cursor: "pointer",
                                      fontSize: "0.8125rem",
                                      fontWeight: 500,
                                      whiteSpace: "nowrap",
                                      transition: "background-color 0.2s ease",
                                    }}
                                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(239,68,68,0.14)")}
                                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "rgba(239,68,68,0.06)")}
                                  >
                                    <Trash2 size={13} />
                                    Cancel
                                  </motion.button>
                                )}
                              </td>
                            </motion.tr>
                          );
                        })}
                      </AnimatePresence>
                    </tbody>
                  </table>
                </div>
              </motion.div>

              {/* Mobile Cards */}
              <div className="bookings-cards" style={{ display: "none", flexDirection: "column", gap: "1rem" }}>
                {bookings.map((booking, i) => {
                  const badge = getStatusBadge(booking.status);
                  return (
                    <motion.div
                      key={booking._id}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="df-card"
                      style={{ padding: "1.25rem" }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
                        <div>
                          <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: "var(--foreground)", fontSize: "1rem" }}>{booking.carName}</h3>
                          <p style={{ color: "var(--accent)", fontWeight: 700, fontSize: "1.0625rem", fontFamily: "var(--font-display)" }}>{formatPrice(booking.totalPrice)}</p>
                        </div>
                        <span style={{ display: "inline-flex", padding: "0.2rem 0.625rem", borderRadius: 100, fontSize: "0.75rem", fontWeight: 600, backgroundColor: badge.bg, color: badge.color, textTransform: "capitalize" }}>
                          {booking.status}
                        </span>
                      </div>
                      <div style={{ display: "flex", gap: "1rem", color: "var(--foreground-muted)", fontSize: "0.8125rem", marginBottom: "1rem", flexWrap: "wrap" }}>
                        <span style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}><Calendar size={12} />{formatDate(booking.bookingDate)}</span>
                        <span style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}><Users size={12} />Driver: {booking.driverNeeded ? "Yes" : "No"}</span>
                      </div>
                      {booking.status !== "completed" && booking.status !== "cancelled" && (
                        <button
                          onClick={() => setCancelTarget(booking._id)}
                          style={{ display: "flex", alignItems: "center", gap: "0.35rem", padding: "0.5rem 1rem", borderRadius: "8px", border: "1px solid rgba(239,68,68,0.3)", backgroundColor: "rgba(239,68,68,0.06)", color: "var(--error)", cursor: "pointer", fontSize: "0.875rem", fontWeight: 500 }}
                        >
                          <Trash2 size={13} />
                          Cancel Booking
                        </button>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>

      <ConfirmModal
        isOpen={!!cancelTarget}
        title="Cancel Booking?"
        message="Are you sure you want to cancel this booking? This action cannot be undone."
        confirmLabel="Yes, Cancel"
        onConfirm={handleCancel}
        onCancel={() => setCancelTarget(null)}
      />

      <style>{`
        @media (max-width: 640px) {
          .bookings-table-wrap { display: none !important; }
          .bookings-cards { display: flex !important; }
        }
      `}</style>
    </PageTransition>
  );
}
