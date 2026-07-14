import { Link, useParams } from "react-router-dom";
import TopNav from "../components/TopNav.jsx";
import { getFramework } from "../data/frameworks/index.js";

export default function FrameworkPage() {
  const { slug } = useParams();
  const framework = getFramework(slug);

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

  const { content } = framework;

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
      </header>

      <div className="page">
        {!content ? (
          <div className="ax-card">
            <div className="ax-empty">{framework.name} isn't built out yet — check back soon.</div>
          </div>
        ) : (
          <>
            {content.description && <p className="ax-meta framework-description">{content.description}</p>}

            <div className="framework-layout">
              <nav className="framework-jump-nav" aria-label="Jump to category">
                {content.categories.map((cat, i) => (
                  <a
                    key={cat.id}
                    href={`#${cat.id}`}
                    className={
                      cat.group === "additional" &&
                      content.categories[i - 1]?.group !== "additional"
                        ? "framework-jump-link framework-jump-link--group-start"
                        : "framework-jump-link"
                    }
                  >
                    {cat.id}
                  </a>
                ))}
              </nav>

              <div className="framework-categories">
                {content.categories.map((cat, i) => (
                  <div key={cat.id}>
                    {cat.group === "additional" && content.categories[i - 1]?.group !== "additional" && (
                      <h2 className="framework-group-heading">Additional Trust Services Categories</h2>
                    )}
                    <section id={cat.id} className="framework-category">
                      <h2 className="framework-category-title">
                        {cat.id} — {cat.title}
                      </h2>
                      {cat.summary && <p className="ax-meta framework-category-summary">{cat.summary}</p>}

                      <div className="framework-control-list">
                        {cat.controls.map((ctrl) => (
                          <div key={ctrl.id} id={ctrl.id} className="framework-control ax-card">
                            <div className="framework-control-criteria">
                              <a href={`#${ctrl.id}`} className="framework-control-id">
                                {ctrl.id}
                              </a>
                              <p>{ctrl.criteria}</p>
                            </div>
                            <div className="framework-control-notes">
                              <span className="framework-control-label">What it means / how to comply</span>
                              <p>{ctrl.notes}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>
                  </div>
                ))}
              </div>
            </div>

            {content.source && (
              <p className="framework-source-note">
                Source:{" "}
                <a href={content.source.url} target="_blank" rel="noreferrer">
                  {content.source.label}
                </a>
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
