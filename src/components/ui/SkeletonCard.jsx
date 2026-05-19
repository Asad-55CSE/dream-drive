export default function SkeletonCard() {
  return (
    <div className="df-card" style={{ padding: 0 }}>
      <div
        className="skeleton"
        style={{ height: 200, borderRadius: "16px 16px 0 0" }}
      />
      <div style={{ padding: "1.25rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        <div className="skeleton" style={{ height: 20, width: "70%", borderRadius: 6 }} />
        <div className="skeleton" style={{ height: 14, width: "40%", borderRadius: 6 }} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "0.5rem" }}>
          <div className="skeleton" style={{ height: 24, width: "30%", borderRadius: 6 }} />
          <div className="skeleton" style={{ height: 36, width: "38%", borderRadius: 8 }} />
        </div>
      </div>
    </div>
  );
}
