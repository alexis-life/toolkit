import { useMemo, useState } from "react";
import rawTools from "./data/toolkit.json";
import CodeBlock from "./CodeBlock.jsx";
import "./App.css";

function parseTags(tags) {
  if (!tags) return [];
  return tags
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
}

const TOOLS = rawTools.map((t) => ({ ...t, tagList: parseTags(t.tags) }));

export default function App() {
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
      <header className="topbar">
        <div className="topbar-titles">
          <h1 className="title-lg">Toolbox</h1>
          <p className="text-meta">commands and tools I actually use</p>
        </div>
        <div className="topbar-nav">
          <div className="topbar-nav-inner">
            <nav className="nav-tabs" role="tablist" aria-label="Filter by category">
              {categories.map((c) => (
                <button
                  key={c}
                  type="button"
                  role="tab"
                  aria-selected={category === c}
                  className={`nav-tab ${category === c ? "is-active" : ""}`}
                  onClick={() => setCategory(c)}
                >
                  {c === "all" ? "Overview" : c}{" "}
                  <span className="nav-tab-count">{categoryCounts[c] ?? 0}</span>
                </button>
              ))}
            </nav>
            <input
              type="search"
              className="topbar-search"
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
          <span className="chip tag-pill">
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
        <div className="empty-state">
          <p>No tools yet — add rows to Toolkit.md in your vault and let vault-sync do the rest.</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="empty-state">
          <p>No matches. Try a different search, category, or tag.</p>
        </div>
      ) : (
        <div className="card-grid">
          {filtered.map((t, i) => (
            <article className="card tool-card" key={`${t.tool}-${i}`}>
              <div className="tool-card-head">
                <h2 className="tool-name">{t.tool}</h2>
                {t.category && <span className="chip badge-primary category-badge">{t.category}</span>}
              </div>
              {t.description && <p className="tool-description">{t.description}</p>}

              <CodeBlock code={t.command} />
              {t.example && <CodeBlock code={t.example} label="example" small />}

              {t.tagList.length > 0 && (
                <div className="tag-row">
                  {t.tagList.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      className="chip tag-chip"
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
