import { Outlet } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";

export default function PublicLayout() {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />
      <main style={{ flex: 1, paddingTop: 68 }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
