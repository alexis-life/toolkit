import { useEffect, useMemo, useState } from "react";
import gamesData from "../data/games.json";
import TopNav from "../components/TopNav.jsx";
import GameDiagram from "../components/GameDiagrams.jsx";
import "./games.css";

const GAMES = gamesData.games;

function tipHaystack(tip) {
  return [tip.text, tip.why, ...(tip.stats || [])].filter(Boolean).join(" ");
}

function watchHref(seconds) {
  const url = new URL(gamesData.creditUrl);
  url.searchParams.set("t", String(seconds));
  return url.toString();
}

export default function GamesPage() {
  const [search, setSearch] = useState("");
  const [openIds, setOpenIds] = useState(() => new Set());
  const [jumpId, setJumpId] = useState(null);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return GAMES;
    return GAMES.filter((game) => {
      const haystack = [game.name, game.summary, ...(game.tags || []), ...game.tips.map(tipHaystack)]
        .join(" ")
        .toLowerCase();
      return haystack.includes(query);
    });
  }, [search]);

  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (GAMES.some((game) => game.id === id)) {
      setOpenIds(new Set([id]));
    }
  }, []);

  useEffect(() => {
    if (!jumpId) return;
    const target = document.getElementById(jumpId);
    if (!target) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    window.history.replaceState(null, "", `#${jumpId}`);
    setJumpId(null);
  }, [jumpId, filtered]);

  function toggleCard(id) {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function jumpTo(event, id) {
    event.preventDefault();
    setSearch("");
    setOpenIds((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
    setJumpId(id);
  }

  return (
    <div>
      <header className="ax-header">
        <div className="ax-header-titles">
          <h1 className="ax-title">Games</h1>
          <p className="text-meta">
            <a className="games-credit" href={gamesData.creditUrl} target="_blank" rel="noopener noreferrer">
              {gamesData.credit}
              <span className="visually-hidden"> (opens in a new tab)</span>
            </a>
          </p>
        </div>
        <div className="ax-header-actions">
          <TopNav />
          <input
            type="search"
            className="ax-input games-search"
            placeholder="Search games or tags…"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            aria-label="Search games"
          />
        </div>
      </header>

      <div className="page">
        <nav className="games-jump" aria-label="Quick reference">
          {GAMES.map((game) => (
            <a key={game.id} href={`#${game.id}`} className="games-jump-link" onClick={(event) => jumpTo(event, game.id)}>
              <span>{game.name}</span>
              <strong>{game.summary}</strong>
            </a>
          ))}
        </nav>

        {filtered.length === 0 ? (
          <div className="ax-card">
            <div className="ax-empty">No matches. Try a different search or tag.</div>
          </div>
        ) : (
          <div className="games-grid">
            {filtered.map((game) => {
              const open = openIds.has(game.id);
              return (
                <article
                  className={open ? "ax-card game-card is-open" : "ax-card game-card"}
                  key={game.id}
                  id={game.id}
                >
                  <div className="game-card-head">
                    <div>
                      <h3>{game.name}</h3>
                      <p className="game-summary">{game.summary}</p>
                    </div>
                    <button
                      type="button"
                      className="game-card-toggle"
                      aria-expanded={open}
                      aria-controls={`${game.id}-body`}
                      onClick={() => toggleCard(game.id)}
                    >
                      {open ? "Hide tips" : "Show tips"}
                    </button>
                  </div>

                  <ul className="game-tags">
                    {game.tags.map((tag) => (
                      <li key={tag}>
                        <button
                          type="button"
                          className={
                            search.trim().toLowerCase() === tag ? "ax-chip tag-chip is-active" : "ax-chip tag-chip"
                          }
                          onClick={() => setSearch(tag)}
                        >
                          {tag}
                        </button>
                      </li>
                    ))}
                  </ul>

                  <a
                    className="games-watch"
                    href={watchHref(game.watch.seconds)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Watch this part
                    <span className="games-watch-time">{game.watch.label}</span>
                    <span className="visually-hidden"> (opens in a new tab)</span>
                  </a>

                  <div className="game-card-body" id={`${game.id}-body`}>
                    <ul className="game-tips">
                      {game.tips.map((tip) => (
                        <li key={tip.id}>
                          <p className="game-tip-text">{tip.text}</p>
                          {tip.why && (
                            <p className="game-why">
                              <span className="label-micro game-why-label">Why it works</span>
                              {tip.why}
                            </p>
                          )}
                          {tip.stats?.length > 0 && (
                            <div className="game-stats">
                              {tip.stats.map((stat, index) => (
                                <span key={`${tip.id}-stat-${index}`} className="ax-badge">
                                  {stat}
                                </span>
                              ))}
                            </div>
                          )}
                        </li>
                      ))}
                    </ul>
                    {game.diagram && <GameDiagram type={game.diagram} />}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
