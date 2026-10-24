import { useMemo, useState } from "react";
import gamesData from "../data/games.json";
import TopNav from "../components/TopNav.jsx";
import GameDiagram from "../components/GameDiagrams.jsx";
import "./games.css";

const GAMES = gamesData.games;

export default function GamesPage() {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return GAMES;
    return GAMES.filter((game) => {
      const haystack = `${game.name} ${game.tips.join(" ")}`.toLowerCase();
      return haystack.includes(q);
    });
  }, [search]);

  return (
    <div>
      <header className="ax-header">
        <div className="ax-header-titles">
          <h1 className="ax-title">Games</h1>
          <p className="text-meta">
            <a
              className="games-credit"
              href={gamesData.creditUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
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
            placeholder="Search games…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search games"
          />
        </div>
      </header>

      <div className="page">
        {filtered.length === 0 ? (
          <div className="ax-card">
            <div className="ax-empty">No matches. Try a different search.</div>
          </div>
        ) : (
          <div className="games-grid">
            {filtered.map((game) => (
              <article className="ax-card game-card" key={game.id} id={game.id}>
                <h3>{game.name}</h3>
                <ul className="game-tips">
                  {game.tips.map((tip) => (
                    <li key={tip}>{tip}</li>
                  ))}
                </ul>
                {game.diagram && <GameDiagram type={game.diagram} />}
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
