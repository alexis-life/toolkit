import { Link } from "react-router-dom";
import TopNav from "../components/TopNav.jsx";
import { FRAMEWORKS, FRAMEWORK_TYPES } from "../data/frameworks/index.js";

// SOC 2, ISO 27001, and HIPAA are the ones most commonly required in
// practice, so they're pinned first in this exact order regardless of what
// else ships later — a plain "live first" sort isn't enough, since a newly
// shipped framework could otherwise land between them based on registry
// order. Everything else: live before coming-soon, each group keeping its
// declared order.
const PRIORITY_SLUGS = ["soc2", "iso-27001", "hipaa"];

function rank(f) {
  const priorityIndex = PRIORITY_SLUGS.indexOf(f.slug);
  if (priorityIndex !== -1) return priorityIndex;
  return f.content ? PRIORITY_SLUGS.length : PRIORITY_SLUGS.length + 1;
}

const SORTED_FRAMEWORKS = [...FRAMEWORKS].sort((a, b) => rank(a) - rank(b));

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
              <span className="label-micro framework-type-label" title={FRAMEWORK_TYPES[f.type]}>
                {f.type}
              </span>
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
