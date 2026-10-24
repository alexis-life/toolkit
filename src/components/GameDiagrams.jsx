// Original schematics for the Games page. Geometry is drawn in JSX
// from the tips themselves — not traced from the source video.

function MarkX() {
  return (
    <svg viewBox="0 0 24 24" className="ttt-mark ttt-mark--x" aria-hidden="true">
      <path d="M6 6 L18 18 M18 6 L6 18" />
    </svg>
  );
}

function MarkO() {
  return (
    <svg viewBox="0 0 24 24" className="ttt-mark ttt-mark--o" aria-hidden="true">
      <circle cx="12" cy="12" r="6.5" />
    </svg>
  );
}

function BattleshipDiagram() {
  const cells = Array.from({ length: 100 }, (_, i) => (Math.floor(i / 10) + (i % 10)) % 2 === 0);

  return (
    <figure className="game-diagram">
      <div className="ship-diagram" aria-hidden="true">
        <div className="ship-grid">
          {cells.map((shaded, i) => (
            <span key={i} className={shaded ? "ship-cell ship-cell--hot" : "ship-cell"} />
          ))}
        </div>
        <ul className="ship-legend">
          <li>
            <span className="ship-cell ship-cell--hot ship-swatch" />
            Shoot
          </li>
          <li>
            <span className="ship-cell ship-swatch" />
            Skip
          </li>
        </ul>
      </div>
      <figcaption className="game-diagram-caption">
        Checkerboard shots. Every ship covers a shaded square.
      </figcaption>
    </figure>
  );
}

// Opening is the top-left corner. The fork keeps that corner, adds the
// bottom two corners, and leaves the center plus the bottom middle empty —
// each of those empties completes a line. O sits on the left edge, so the
// center was never taken.
const TTT_OPENING = [
  { mark: "X" },
  { mark: "" },
  { mark: "" },
  { mark: "" },
  { mark: "" },
  { mark: "" },
  { mark: "" },
  { mark: "" },
  { mark: "" },
];

const TTT_FORK = [
  { mark: "X" },
  { mark: "" },
  { mark: "" },
  { mark: "O" },
  { mark: "", threat: true },
  { mark: "" },
  { mark: "X" },
  { mark: "", threat: true },
  { mark: "X" },
];

function TicTacToeBoard({ cells }) {
  return (
    <div className="ttt-board" aria-hidden="true">
      {cells.map((cell, i) => (
        <div key={i} className={cell.threat ? "ttt-cell ttt-cell--threat" : "ttt-cell"}>
          {cell.mark === "X" ? <MarkX /> : cell.mark === "O" ? <MarkO /> : null}
        </div>
      ))}
    </div>
  );
}

function TicTacToeDiagram() {
  return (
    <figure className="game-diagram">
      <div className="ttt-boards">
        <div className="ttt-board-wrap">
          <p className="label-micro">Opening</p>
          <TicTacToeBoard cells={TTT_OPENING} />
        </div>
        <div className="ttt-board-wrap">
          <p className="label-micro">Three-corner fork</p>
          <TicTacToeBoard cells={TTT_FORK} />
        </div>
      </div>
      <figcaption className="game-diagram-caption">
        Start in a corner. Three corners, with the opponent on a side instead of the center, leave two
        winning squares (tinted).
      </figcaption>
    </figure>
  );
}

function ConnectFourDiagram() {
  return (
    <figure className="game-diagram">
      <div className="c4-board" aria-hidden="true">
        {Array.from({ length: 7 }, (_, col) => {
          const center = col === 3;
          return (
            <div key={col} className={center ? "c4-col c4-col--center" : "c4-col"}>
              <span className="c4-col-label">{center ? "Center" : ""}</span>
              {Array.from({ length: 6 }, (_, row) => {
                const filled = center && row === 5;
                return <span key={row} className={filled ? "c4-hole c4-hole--filled" : "c4-hole"} />;
              })}
            </div>
          );
        })}
      </div>
      <figcaption className="game-diagram-caption">
        The center column. Only a vertical four can miss it.
      </figcaption>
    </figure>
  );
}

// Play order from Jail. Oranges are the 6th, 8th, and 9th squares after it
// (a railroad and a community-chest square sit in the gaps).
const MONOPOLY_SPACES = [
  { key: "jail", name: "Jail", kind: "jail" },
  { key: "1", name: "+1" },
  { key: "2", name: "+2" },
  { key: "3", name: "+3" },
  { key: "4", name: "+4" },
  { key: "5", name: "+5" },
  { key: "6", name: "+6", kind: "orange" },
  { key: "7", name: "+7" },
  { key: "8", name: "+8", kind: "orange" },
  { key: "9", name: "+9", kind: "orange" },
];

function MonopolyDiagram() {
  return (
    <figure className="game-diagram">
      <ol className="mono-board" aria-hidden="true">
        {MONOPOLY_SPACES.map((space) => (
          <li
            key={space.key}
            className={
              space.kind === "jail"
                ? "mono-space mono-space--jail"
                : space.kind === "orange"
                  ? "mono-space mono-space--orange"
                  : "mono-space"
            }
          >
            <span className="mono-space-name">{space.name}</span>
            {space.kind === "orange" && <span className="mono-space-kind">Orange</span>}
          </li>
        ))}
      </ol>
      <figcaption className="game-diagram-caption">
        Counted in play order from Jail. The orange set is 6, 8, and 9 spaces past it.
      </figcaption>
    </figure>
  );
}

export default function GameDiagram({ type }) {
  switch (type) {
    case "battleship":
      return <BattleshipDiagram />;
    case "tic-tac-toe":
      return <TicTacToeDiagram />;
    case "connect-four":
      return <ConnectFourDiagram />;
    case "monopoly":
      return <MonopolyDiagram />;
    default:
      return null;
  }
}
