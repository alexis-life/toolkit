import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import TopNav from "../components/TopNav.jsx";
import FrameworkOverview from "../components/FrameworkOverview.jsx";
import FrameworkControls from "../components/FrameworkControls.jsx";
import { getFramework } from "../data/frameworks/index.js";

export default function FrameworkPage() {
  const { slug } = useParams();
  const framework = getFramework(slug);
  const content = framework?.content;
  const hasOverview = Boolean(content?.overview?.length);
  const [tab, setTab] = useState("overview");

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

  const activeTab = hasOverview ? tab : "controls";

  return (
    <div>
      <header className="ax-header">
        <div className="ax-header-titles">
          <h1 className="ax-title">{framework.name}</h1>
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
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === "overview"}
                  className={`ax-tab ${activeTab === "overview" ? "ax-tab--active" : ""}`}
                  onClick={() => setTab("overview")}
                >
                  Overview
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === "controls"}
                  className={`ax-tab ${activeTab === "controls" ? "ax-tab--active" : ""}`}
                  onClick={() => setTab("controls")}
                >
                  Controls
                </button>
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
