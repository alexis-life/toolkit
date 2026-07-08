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
      <header className="site-header-bar">
        <div className="site-header-inner">
          <h1>toolkit</h1>
          <p className="tagline">commands and tools I actually use</p>
        </div>
      </header>

      <div className="page">
      <div className="controls">
        <input
          type="search"
          className="search-input"
          placeholder="Search tools, commands, descriptions…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Search toolkit"
        />
        <div className="category-bar" role="tablist" aria-label="Filter by category">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              className={`chip category-chip ${category === c ? "chip-active" : ""}`}
              onClick={() => setCategory(c)}
            >
              {c === "all" ? "All" : c}
            </button>
          ))}
        </div>
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
      </div>

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
