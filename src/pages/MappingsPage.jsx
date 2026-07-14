import { Link } from "react-router-dom";
import TopNav from "../components/TopNav.jsx";

export default function MappingsPage() {
  return (
    <div>
      <header className="ax-header">
        <div className="ax-header-titles">
          <h1 className="ax-title">Cross-framework mappings</h1>
          <p className="text-meta">Equivalent controls across SOC 2, ISO 27001, NIST, and more</p>
        </div>
        <div className="ax-header-actions">
          <Link to="/frameworks" className="ax-btn">
            ← All frameworks
          </Link>
          <TopNav />
        </div>
      </header>

      <div className="page">
        <div className="ax-card">
          <div className="ax-empty">
            Coming soon — once more frameworks are built out, this page will map equivalent controls
            across them (e.g. SOC 2 CC6.1 ≈ ISO 27001 A.8 ≈ NIST PR.AA).
          </div>
        </div>
      </div>
    </div>
  );
}
