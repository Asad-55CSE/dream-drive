import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Pencil, Trash2, Car } from "lucide-react";
import toast from "react-hot-toast";
import api from "../../lib/axios.js";
import { formatPrice, formatDate } from "../../utils/helpers.js";
import PageTransition from "../../components/ui/PageTransition.jsx";
import ConfirmModal from "../../components/ui/ConfirmModal.jsx";
import Modal from "../../components/ui/Modal.jsx";
import LoadingSpinner from "../../components/ui/LoadingSpinner.jsx";
import EmptyState from "../../components/shared/EmptyState.jsx";
import UpdateCarForm from "./UpdateCarForm.jsx";

export default function MyAddedCars() {
  const navigate = useNavigate();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [editTarget, setEditTarget] = useState(null);

  const fetchMyCars = async () => {
    try {
      const res = await api.get("/cars/my-cars");
      setCars(res.data.data || []);
    } catch {
      toast.error("Failed to load your cars");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyCars();
  }, []);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await api.delete(`/cars/${deleteTarget}`);
      toast.success("Car deleted successfully");
      setCars((prev) => prev.filter((c) => c._id !== deleteTarget));
    } catch (err) {
      toast.error(err.message || "Failed to delete car");
    } finally {
      setDeleteTarget(null);
    }
  };

  const handleUpdateSuccess = (updatedCar) => {
    setCars((prev) =>
      prev.map((c) => (c._id === updatedCar._id ? updatedCar : c))
    );
    setEditTarget(null);
    toast.success("Car updated successfully");
  };

  return (
    <PageTransition>
      <div style={{ backgroundColor: "var(--background)", minHeight: "calc(100vh - 68px)" }}>
        {/* Header */}
        <div style={{ background: "var(--gradient-hero)", borderBottom: "1px solid var(--border)", padding: "3rem 1.5rem 2.5rem" }}>
          <div
            style={{
              maxWidth: "1200px",
              margin: "0 auto",
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "1rem",
            }}
          >
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
              <span className="section-label">Dashboard</span>
              <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.875rem, 4vw, 2.75rem)", fontWeight: 800, color: "var(--foreground)", letterSpacing: "-0.02em" }}>
                My Added Cars
              </h1>
              <p style={{ color: "var(--foreground-muted)", fontSize: "0.9375rem", marginTop: "0.25rem" }}>
                {cars.length} vehicle{cars.length !== 1 ? "s" : ""} listed
              </p>
            </motion.div>

            <motion.button
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate("/add-car")}
              className="df-btn-primary"
            >
              <Plus size={16} />
              Add New Car
            </motion.button>
          </div>
        </div>

        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2.5rem 1.5rem" }}>
          {loading ? (
            <div style={{ display: "flex", justifyContent: "center", padding: "5rem" }}>
              <LoadingSpinner size="lg" text="Loading your cars…" />
            </div>
          ) : cars.length === 0 ? (
            <EmptyState
              icon={Car}
              title="No cars listed yet"
              message="Start earning by adding your first car to the marketplace."
              action={
                <button onClick={() => navigate("/add-car")} className="df-btn-primary">
                  <Plus size={16} />
                  List Your First Car
                </button>
              }
            />
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                gap: "1.5rem",
              }}
            >
              <AnimatePresence>
                {cars.map((car, i) => (
                  <motion.div
                    key={car._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.35, delay: i * 0.06 }}
                    className="df-card"
                    style={{ display: "flex", flexDirection: "column" }}
                  >
                    {/* Image */}
                    <div style={{ position: "relative", overflow: "hidden" }}>
                      <img
                        src={car.image}
                        alt={car.carName}
                        style={{ width: "100%", height: 180, objectFit: "cover" }}
                        onError={(e) => {
                          e.target.src = `https://placehold.co/600x300/1a1a2e/f97316?text=${encodeURIComponent(car.carName)}`;
                        }}
                      />
                      <span
                        className={`df-badge ${car.availability ? "df-badge-available" : "df-badge-unavailable"}`}
                        style={{ position: "absolute", top: 10, right: 10 }}
                      >
                        <span style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: car.availability ? "var(--success)" : "var(--error)", display: "inline-block" }} />
                        {car.availability ? "Available" : "Unavailable"}
                      </span>
                    </div>

                    {/* Content */}
                    <div style={{ padding: "1.25rem", flex: 1, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                        <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.0625rem", color: "var(--foreground)" }}>
                          {car.carName}
                        </h3>
                        <span style={{ backgroundColor: "var(--accent)", color: "#fff", fontSize: "0.7rem", padding: "0.15rem 0.5rem", borderRadius: 100, fontWeight: 600 }}>
                          {car.carType}
                        </span>
                      </div>

                      <div style={{ display: "flex", justifyContent: "space-between", color: "var(--foreground-muted)", fontSize: "0.8125rem" }}>
                        <span>{formatPrice(car.dailyRentPrice)}/day</span>
                        <span>{car.bookingCount} bookings</span>
                      </div>

                      <p style={{ color: "var(--foreground-muted)", fontSize: "0.8rem" }}>
                        Listed {formatDate(car.createdAt)}
                      </p>

                      {/* Actions */}
                      <div style={{ display: "flex", gap: "0.625rem", marginTop: "auto", paddingTop: "0.75rem", borderTop: "1px solid var(--border-subtle)" }}>
                        <motion.button
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => setEditTarget(car)}
                          className="df-btn-ghost"
                          style={{ flex: 1, fontSize: "0.875rem", padding: "0.5rem" }}
                        >
                          <Pencil size={14} />
                          Edit
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => setDeleteTarget(car._id)}
                          style={{
                            flex: 1,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "0.4rem",
                            padding: "0.5rem",
                            borderRadius: "10px",
                            border: "1px solid rgba(239,68,68,0.3)",
                            backgroundColor: "rgba(239,68,68,0.06)",
                            color: "var(--error)",
                            cursor: "pointer",
                            fontSize: "0.875rem",
                            fontWeight: 500,
                            transition: "all 0.2s ease",
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(239,68,68,0.12)")}
                          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "rgba(239,68,68,0.06)")}
                        >
                          <Trash2 size={14} />
                          Delete
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={!!deleteTarget}
        title="Delete Car?"
        message="This will permanently remove the car listing. Any existing bookings may be affected."
        confirmLabel="Yes, Delete"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />

      {/* Edit Modal */}
      <Modal
        isOpen={!!editTarget}
        onClose={() => setEditTarget(null)}
        title="Update Car"
        maxWidth="580px"
      >
        {editTarget && (
          <UpdateCarForm
            car={editTarget}
            onSuccess={handleUpdateSuccess}
            onClose={() => setEditTarget(null)}
          />
        )}
      </Modal>
    </PageTransition>
  );
}
