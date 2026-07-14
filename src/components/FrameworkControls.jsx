import { Fragment, useEffect, useState } from "react";

export default function FrameworkControls({ content }) {
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    const sections = document.querySelectorAll(".framework-category");
    if (sections.length === 0) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      { rootMargin: "-15% 0px -75% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {content.description && <p className="ax-meta framework-description">{content.description}</p>}

      <div className="framework-layout">
        <nav className="framework-jump-card" aria-label="Jump to category">
          {content.categories.map((cat, i) => (
            <Fragment key={cat.id}>
              {cat.group === "core" && i === 0 && (
                <div className="framework-jump-group-label label-micro">Required</div>
              )}
              {cat.group === "additional" && content.categories[i - 1]?.group !== "additional" && (
                <div className="framework-jump-group-label label-micro">Optional</div>
              )}
              <a href={`#${cat.id}`} className={`nav-item ${activeId === cat.id ? "active" : ""}`}>
                {cat.id}
              </a>
            </Fragment>
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
  );
}
