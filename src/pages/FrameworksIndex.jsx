import { Link } from "react-router-dom";
import TopNav from "../components/TopNav.jsx";
import { FRAMEWORKS } from "../data/frameworks/index.js";

// Live frameworks first (so what's actually usable is up top), each group
// keeping its declared order — sorted here rather than by hand-ordering the
// FRAMEWORKS array, so this doesn't go stale the next time one ships.
const SORTED_FRAMEWORKS = [...FRAMEWORKS].sort(
  (a, b) => Boolean(b.content) - Boolean(a.content)
);

export default function FrameworksIndex() {
  return (
    <div>
      <header className="ax-header">
        <div className="ax-header-titles">
          <h1 className="ax-title">Frameworks</h1>
          <p className="text-meta">GRC framework reference — official criteria plus my own compliance notes</p>
        </div>
        <div className="ax-header-actions">
          <TopNav />
        </div>
      </header>

      <div className="page">
        <div className="card-grid">
          {SORTED_FRAMEWORKS.map((f) => (
            <Link key={f.slug} to={`/frameworks/${f.slug}`} className="ax-card framework-card">
              <div className="framework-card-head">
                <h3>{f.name}</h3>
                <span className="ax-badge">{f.content ? "Live" : "Coming soon"}</span>
              </div>
              <p className="ax-meta">{f.blurb}</p>
            </Link>
          ))}

          <Link to="/frameworks/mappings" className="ax-card framework-card">
            <div className="framework-card-head">
              <h3>Cross-framework mappings</h3>
              <span className="ax-badge">Coming soon</span>
            </div>
            <p className="ax-meta">
              A table mapping equivalent controls across frameworks (e.g. SOC 2 CC6.1 ≈ ISO 27001 A.8 ≈
              NIST PR.AA).
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
