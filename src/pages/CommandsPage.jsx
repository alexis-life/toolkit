import { useMemo, useState } from "react";
import rawTools from "../data/toolkit.json";
import CodeBlock from "../components/CodeBlock.jsx";
import TopNav from "../components/TopNav.jsx";

function parseTags(tags) {
  if (!tags) return [];
  return tags
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
}

const TOOLS = rawTools.map((t) => ({ ...t, tagList: parseTags(t.tags) }));

export default function CommandsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [activeTag, setActiveTag] = useState(null);

  const categories = useMemo(() => {
    const set = new Set(TOOLS.map((t) => t.category).filter(Boolean));
    return ["all", ...Array.from(set).sort()];
  }, []);

  const categoryCounts = useMemo(() => {
    const counts = { all: TOOLS.length };
    for (const t of TOOLS) {
      if (!t.category) continue;
      counts[t.category] = (counts[t.category] || 0) + 1;
    }
    return counts;
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return TOOLS.filter((t) => {
      if (category !== "all" && t.category !== category) return false;
      if (activeTag && !t.tagList.includes(activeTag)) return false;
      if (!q) return true;
      const haystack = `${t.tool} ${t.command} ${t.description}`.toLowerCase();
      return haystack.includes(q);
    });
  }, [search, category, activeTag]);

  return (
    <div>
      <header className="ax-header">
        <div className="ax-header-titles">
          <h1 className="ax-title">Toolbox</h1>
          <p className="text-meta">commands and tools I actually use</p>
        </div>
        <div className="ax-header-actions">
          <TopNav />
        </div>
        <div className="ax-tabs-row">
          <div className="ax-tabs-inner">
            <nav className="ax-tabs" role="tablist" aria-label="Filter by category">
              {categories.map((c) => (
                <button
                  key={c}
                  type="button"
                  role="tab"
                  aria-selected={category === c}
                  className={`ax-tab ${category === c ? "ax-tab--active" : ""}`}
                  onClick={() => setCategory(c)}
                >
                  {c === "all" ? "Overview" : c} {categoryCounts[c] ?? 0}
                </button>
              ))}
            </nav>
            <input
              type="search"
              className="ax-input"
              style={{ marginLeft: "auto", minWidth: "180px" }}
              placeholder="Search titles…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search toolkit"
            />
          </div>
        </div>
      </header>

      <div className="page">
        {activeTag && (
          <div className="active-tag-row">
            <span className="ax-chip">
              #{activeTag}
              <button
                type="button"
                className="tag-pill-dismiss"
                onClick={() => setActiveTag(null)}
                aria-label={`Remove tag filter ${activeTag}`}
              >
                ×
              </button>
            </span>
          </div>
        )}

        {TOOLS.length === 0 ? (
          <div className="ax-card">
            <div className="ax-empty">
              No tools yet — add rows to Toolkit.md in your vault and let vault-sync do the rest.
            </div>
          </div>
        ) : filtered.length === 0 ? (
          <div className="ax-card">
            <div className="ax-empty">No matches. Try a different search, category, or tag.</div>
          </div>
        ) : (
          <div className="card-grid">
            {filtered.map((t, i) => (
              <article className="ax-card tool-card" key={`${t.tool}-${i}`}>
                <div className="tool-card-head">
                  <h3>{t.tool}</h3>
                  {t.category && <span className="ax-badge">{t.category}</span>}
                </div>
                {t.description && <p className="ax-meta">{t.description}</p>}

                <CodeBlock code={t.command} />
                {t.example && <CodeBlock code={t.example} label="example" small />}

                {t.tagList.length > 0 && (
                  <div className="tag-row">
                    {t.tagList.map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        className="ax-chip tag-chip"
                        onClick={() => setActiveTag(tag)}
                      >
                        #{tag}
                      </button>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
