import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, X, ChevronLeft, ChevronRight } from "lucide-react";
import api from "../../lib/axios.js";
import CarCard from "../../components/shared/CarCard.jsx";
import SkeletonCard from "../../components/ui/SkeletonCard.jsx";
import EmptyState from "../../components/shared/EmptyState.jsx";
import PageTransition from "../../components/ui/PageTransition.jsx";
import { CAR_TYPES, SORT_OPTIONS } from "../../utils/helpers.js";

export default function ExploreCars() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("All");
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({});
  const [searchInput, setSearchInput] = useState("");

  const fetchCars = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page, limit: 9, sort });
      if (search) params.set("search", search);
      if (type && type !== "All") params.set("type", type);

      const res = await api.get(`/cars?${params}`);
      setCars(res.data.data || []);
      setPagination(res.data.pagination || {});
    } catch {
      setCars([]);
    } finally {
      setLoading(false);
    }
  }, [search, type, sort, page]);

  useEffect(() => {
    fetchCars();
  }, [fetchCars]);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchInput);
      setPage(1);
    }, 400);
    return () => clearTimeout(timer);
  }, [searchInput]);

  const handleTypeChange = (t) => {
    setType(t);
    setPage(1);
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
    setPage(1);
  };

  const clearSearch = () => {
    setSearchInput("");
    setSearch("");
  };

  return (
    <PageTransition>
      <div style={{ backgroundColor: "var(--background)", minHeight: "calc(100vh - 68px)" }}>
        {/* Page Header */}
        <div
          style={{
            background: "var(--gradient-hero)",
            borderBottom: "1px solid var(--border)",
            padding: "3rem 1.5rem 2.5rem",
          }}
        >
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <span className="section-label">Fleet</span>
              <h1
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.875rem, 4vw, 2.75rem)",
                  fontWeight: 800,
                  color: "var(--foreground)",
                  letterSpacing: "-0.02em",
                  marginBottom: "0.5rem",
                }}
              >
                Explore All Cars
              </h1>
              <p style={{ color: "var(--foreground-muted)", fontSize: "1rem" }}>
                Browse our full fleet — {pagination.total || 0} vehicles available
              </p>
            </motion.div>
          </div>
        </div>

        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem 1.5rem" }}>
          {/* Filters Bar */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            style={{
              display: "flex",
              gap: "1rem",
              flexWrap: "wrap",
              alignItems: "center",
              marginBottom: "2rem",
            }}
          >
            {/* Search */}
            <div style={{ position: "relative", flex: "1 1 260px", minWidth: 220 }}>
              <Search
                size={16}
                style={{
                  position: "absolute",
                  left: 14,
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "var(--foreground-muted)",
                  pointerEvents: "none",
                }}
              />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search by car name…"
                className="df-input"
                style={{ paddingLeft: "2.5rem", paddingRight: searchInput ? "2.5rem" : "1rem" }}
              />
              <AnimatePresence>
                {searchInput && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    onClick={clearSearch}
                    style={{
                      position: "absolute",
                      right: 12,
                      top: "50%",
                      transform: "translateY(-50%)",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: "var(--foreground-muted)",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <X size={14} />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>

            {/* Sort */}
            <div style={{ position: "relative" }}>
              <SlidersHorizontal
                size={14}
                style={{
                  position: "absolute",
                  left: 12,
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "var(--foreground-muted)",
                  pointerEvents: "none",
                  zIndex: 1,
                }}
              />
              <select
                value={sort}
                onChange={handleSortChange}
                style={{
                  appearance: "none",
                  backgroundColor: "var(--input-bg)",
                  border: "1px solid var(--input-border)",
                  borderRadius: "10px",
                  padding: "0.75rem 2rem 0.75rem 2.25rem",
                  color: "var(--foreground)",
                  fontSize: "0.9375rem",
                  cursor: "pointer",
                  minWidth: 180,
                }}
              >
                {SORT_OPTIONS.map(({ value, label }) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
          </motion.div>

          {/* Type Filter Pills */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            style={{
              display: "flex",
              gap: "0.5rem",
              flexWrap: "wrap",
              marginBottom: "2rem",
            }}
          >
            {CAR_TYPES.map((t) => (
              <motion.button
                key={t}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleTypeChange(t)}
                style={{
                  padding: "0.4rem 1rem",
                  borderRadius: "100px",
                  border: `1px solid ${type === t ? "var(--accent)" : "var(--border)"}`,
                  backgroundColor: type === t ? "var(--accent-muted)" : "transparent",
                  color: type === t ? "var(--accent)" : "var(--foreground-muted)",
                  fontSize: "0.875rem",
                  fontWeight: type === t ? 600 : 400,
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
              >
                {t}
              </motion.button>
            ))}
          </motion.div>

          {/* Results */}
          {loading ? (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                gap: "1.5rem",
              }}
            >
              {Array.from({ length: 9 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : cars.length === 0 ? (
            <EmptyState
              title="No cars found"
              message="Try adjusting your search or filters to find available vehicles."
              action={
                <button
                  onClick={() => {
                    setSearchInput("");
                    setSearch("");
                    setType("All");
                    setSort("newest");
                  }}
                  className="df-btn-primary"
                >
                  Clear Filters
                </button>
              }
            />
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={`${search}-${type}-${sort}-${page}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                  gap: "1.5rem",
                }}
              >
                {cars.map((car, i) => (
                  <CarCard key={car._id} car={car} index={i} />
                ))}
              </motion.div>
            </AnimatePresence>
          )}

          {/* Pagination */}
          {!loading && pagination.pages > 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
                marginTop: "3rem",
              }}
            >
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="df-btn-ghost"
                style={{
                  padding: "0.5rem 0.875rem",
                  opacity: page === 1 ? 0.4 : 1,
                  cursor: page === 1 ? "not-allowed" : "pointer",
                }}
              >
                <ChevronLeft size={16} />
                Prev
              </button>

              <div style={{ display: "flex", gap: "0.375rem" }}>
                {Array.from({ length: pagination.pages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: "8px",
                      border: `1px solid ${p === page ? "var(--accent)" : "var(--border)"}`,
                      backgroundColor: p === page ? "var(--accent)" : "transparent",
                      color: p === page ? "#fff" : "var(--foreground-muted)",
                      fontWeight: p === page ? 700 : 400,
                      cursor: "pointer",
                      fontSize: "0.875rem",
                      transition: "all 0.2s ease",
                    }}
                  >
                    {p}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setPage((p) => Math.min(pagination.pages, p + 1))}
                disabled={page === pagination.pages}
                className="df-btn-ghost"
                style={{
                  padding: "0.5rem 0.875rem",
                  opacity: page === pagination.pages ? 0.4 : 1,
                  cursor: page === pagination.pages ? "not-allowed" : "pointer",
                }}
              >
                Next
                <ChevronRight size={16} />
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </PageTransition>
  );
}
