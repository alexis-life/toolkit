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

  // Only show group dividers (in the jump nav and above the body sections)
  // when a framework actually has more than one distinct group — e.g. SOC 2's
  // Required/Optional split, or NIST CSF's 6 functions. Frameworks with a
  // single group (ISO, HIPAA, CMMC, GDPR) skip this entirely rather than
  // showing one redundant label at the top.
  const hasMultipleGroups = new Set(content.categories.map((c) => c.group)).size > 1;

  return (
    <>
      {content.description && <p className="ax-meta framework-description">{content.description}</p>}

      <div className="framework-layout">
        <nav className="framework-jump-card" aria-label="Jump to category">
          {content.categories.map((cat, i) => (
            <Fragment key={cat.id}>
              {hasMultipleGroups && cat.group !== content.categories[i - 1]?.group && (
                <div className="framework-jump-group-label label-micro">{cat.group}</div>
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
              {hasMultipleGroups && cat.group !== content.categories[i - 1]?.group && (
                <h2 className="framework-group-heading">{cat.group}</h2>
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
