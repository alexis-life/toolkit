import { Link, useLocation, useParams } from "react-router-dom";
import TopNav from "../components/TopNav.jsx";
import FrameworkOverview from "../components/FrameworkOverview.jsx";
import FrameworkControls from "../components/FrameworkControls.jsx";
import { getFramework, FRAMEWORK_TYPES } from "../data/frameworks/index.js";

export default function FrameworkPage() {
  const { slug } = useParams();
  const location = useLocation();
  const framework = getFramework(slug);
  const content = framework?.content;
  const hasOverview = Boolean(content?.overview?.length);

  if (!framework) {
    return (
      <div>
        <header className="ax-header">
          <div className="ax-header-titles">
            <h1 className="ax-title">Frameworks</h1>
            <p className="text-meta">Unknown framework</p>
          </div>
          <div className="ax-header-actions">
            <TopNav />
          </div>
        </header>
        <div className="page">
          <div className="ax-card">
            <div className="ax-empty">
              Couldn't find that framework. <Link to="/frameworks">Back to Frameworks</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const isControlsUrl = location.pathname.endsWith("/controls");
  const activeTab = hasOverview && !isControlsUrl ? "overview" : "controls";

  return (
    <div>
      <header className="ax-header">
        <div className="ax-header-titles">
          <div className="framework-title-row">
            <h1 className="ax-title">{framework.name}</h1>
            <span className="framework-title-dot" aria-hidden="true">
              ·
            </span>
            <span className="label-micro framework-type-label" title={FRAMEWORK_TYPES[framework.type]}>
              {framework.type}
            </span>
          </div>
          <p className="text-meta">{content ? content.section : framework.blurb}</p>
        </div>
        <div className="ax-header-actions">
          <Link to="/frameworks" className="ax-btn">
            ← All frameworks
          </Link>
          <TopNav />
        </div>
        {hasOverview && (
          <div className="ax-tabs-row">
            <div className="ax-tabs-inner">
              <nav className="ax-tabs" role="tablist" aria-label="Framework section">
                <Link
                  to={`/frameworks/${slug}`}
                  role="tab"
                  aria-selected={activeTab === "overview"}
                  className={`ax-tab ${activeTab === "overview" ? "ax-tab--active" : ""}`}
                >
                  Overview
                </Link>
                <Link
                  to={`/frameworks/${slug}/controls`}
                  role="tab"
                  aria-selected={activeTab === "controls"}
                  className={`ax-tab ${activeTab === "controls" ? "ax-tab--active" : ""}`}
                >
                  Controls
                </Link>
              </nav>
            </div>
          </div>
        )}
      </header>

      <div className="page">
        {!content ? (
          <div className="ax-card">
            <div className="ax-empty">{framework.name} isn't built out yet — check back soon.</div>
          </div>
        ) : activeTab === "overview" ? (
          <FrameworkOverview overview={content.overview} />
        ) : (
          <FrameworkControls content={content} />
        )}
      </div>
    </div>
  );
}
