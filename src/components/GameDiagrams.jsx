import { useState } from "react";

// Original schematics. Coordinates are worked out from the tips, not traced
// from the video.

function StepToggle({ label, steps, step, onChange }) {
  return (
    <div className="step-toggle" role="group" aria-label={label}>
      {steps.map((item, index) => (
        <button
          key={item.id}
          type="button"
          className={index === step ? "step-toggle-btn is-active" : "step-toggle-btn"}
          aria-pressed={index === step}
          onClick={() => onChange(index)}
        >
          Step {index + 1}
          <span className="step-toggle-title">{item.title}</span>
        </button>
      ))}
    </div>
  );
}

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

const SHIP_SIZE = 10;

// Step 3 leaves one open rectangle in the middle (rows 1–7, columns 2–8).
// Its center is an every-third square, so the "aim middle" shot stays on
// the pattern.
function battleshipKinds(step) {
  const kinds = [];
  for (let row = 0; row < SHIP_SIZE; row += 1) {
    for (let col = 0; col < SHIP_SIZE; col += 1) {
      if (step === 0) {
        kinds.push((row + col) % 2 === 0 ? "hot" : "");
      } else if (step === 1) {
        kinds.push((row + col) % 3 === 0 ? "hot" : "");
      } else {
        const open = row >= 1 && row <= 7 && col >= 2 && col <= 8;
        if (!open) kinds.push("spent");
        else if (row === 4 && col === 5) kinds.push("aim");
        else if ((row + col) % 3 === 0) kinds.push("hot");
        else kinds.push("open");
      }
    }
  }
  return kinds;
}

const SHIP_STEPS = [
  {
    id: "checker",
    title: "Checkerboard",
    caption:
      "Every ship is at least 2 long, so one color of the grid touches them all. About 50 shots instead of 100.",
    legend: [
      { kind: "hot", label: "Shoot" },
      { kind: "", label: "Skip" },
    ],
  },
  {
    id: "third",
    title: "Every third",
    caption: "After the 2-long ship is sunk, space the shots every third square. What remains is 3 or longer.",
    legend: [
      { kind: "hot", label: "Shoot" },
      { kind: "", label: "Skip" },
    ],
  },
  {
    id: "middle",
    title: "Aim middle",
    caption:
      "Stay on that pattern. The marked square is the one in the middle of the largest area you have not searched.",
    legend: [
      { kind: "spent", label: "Searched" },
      { kind: "hot", label: "Pattern" },
      { kind: "aim", label: "Next" },
    ],
  },
];

function BattleshipDiagram() {
  const [step, setStep] = useState(0);
  const current = SHIP_STEPS[step];
  const kinds = battleshipKinds(step);

  return (
    <figure className="game-diagram">
      <StepToggle label="Battleship search pattern" steps={SHIP_STEPS} step={step} onChange={setStep} />
      <div className="ship-diagram" aria-hidden="true">
        <div className="ship-grid">
          {kinds.map((kind, index) => (
            <span key={index} className={kind ? `ship-cell ship-cell--${kind}` : "ship-cell"} />
          ))}
        </div>
        <ul className="ship-legend">
          {current.legend.map((item) => (
            <li key={item.label}>
              <span className={item.kind ? `ship-cell ship-cell--${item.kind} ship-swatch` : "ship-cell ship-swatch"} />
              {item.label}
            </li>
          ))}
        </ul>
      </div>
      <figcaption className="game-diagram-caption" aria-live="polite">
        {current.caption}
      </figcaption>
    </figure>
  );
}

// Cells are row-major, top-left first.
// Step 2: X top-left, O top-middle, X bottom-left. The empty left-middle
// completes a column, so it is the block O has to play.
// Step 3: O takes that block, X takes bottom-right. Center completes the
// diagonal; bottom-middle completes the bottom row. Three X's, two O's.
const TTT_STEPS = [
  {
    id: "corner",
    title: "First corner",
    caption: "Go first and take a corner. The rest of this sequence is what happens if they do not take the center.",
    cells: [
      { mark: "X" },
      { mark: "" },
      { mark: "" },
      { mark: "" },
      { mark: "" },
      { mark: "" },
      { mark: "" },
      { mark: "" },
      { mark: "" },
    ],
  },
  {
    id: "second",
    title: "Second corner",
    caption:
      "They played the top edge. The second corner shares the left side with your first and threatens the tinted square.",
    cells: [
      { mark: "X" },
      { mark: "O" },
      { mark: "" },
      { mark: "", threat: true },
      { mark: "" },
      { mark: "" },
      { mark: "X" },
      { mark: "" },
      { mark: "" },
    ],
  },
  {
    id: "fork",
    title: "Third corner",
    caption: "They block. Your third corner threatens two wins at once: the center, and the bottom middle.",
    cells: [
      { mark: "X" },
      { mark: "O" },
      { mark: "" },
      { mark: "O" },
      { mark: "", threat: true },
      { mark: "" },
      { mark: "X" },
      { mark: "", threat: true },
      { mark: "X" },
    ],
  },
];

function TicTacToeBoard({ cells }) {
  return (
    <div className="ttt-board" aria-hidden="true">
      {cells.map((cell, index) => (
        <div key={index} className={cell.threat ? "ttt-cell ttt-cell--threat" : "ttt-cell"}>
          {cell.mark === "X" ? <MarkX /> : cell.mark === "O" ? <MarkO /> : null}
        </div>
      ))}
    </div>
  );
}

function TicTacToeDiagram() {
  const [step, setStep] = useState(0);
  const current = TTT_STEPS[step];

  return (
    <figure className="game-diagram">
      <StepToggle label="Tic-tac-toe corner sequence" steps={TTT_STEPS} step={step} onChange={setStep} />
      <TicTacToeBoard cells={current.cells} />
      <figcaption className="game-diagram-caption" aria-live="polite">
        {current.caption}
      </figcaption>
    </figure>
  );
}

function ConnectFourBoard({ cells, highlightCenter }) {
  return (
    <div className="c4-board" aria-hidden="true">
      {Array.from({ length: 7 }, (_, col) => (
        <div key={col} className={highlightCenter && col === 3 ? "c4-col c4-col--center" : "c4-col"}>
          {highlightCenter ? <span className="c4-col-label">{col === 3 ? "Center" : ""}</span> : null}
          {Array.from({ length: 6 }, (_, row) => {
            const kind = cells[`${row}-${col}`];
            return (
              <span key={row} className={kind ? `c4-hole c4-hole--${kind}` : "c4-hole"}>
                {kind === "threat" ? <span className="c4-threat-dot" /> : null}
              </span>
            );
          })}
        </div>
      ))}
    </div>
  );
}

function centerStackCells() {
  const cells = {};
  for (const row of [3, 4, 5]) cells[`${row}-3`] = "you";
  return cells;
}

// Rows are numbered from the top, so row 5 is the bottom rank.
// Bottom rank: three of yours, then their block (the four they just stopped).
// Rank above: three of yours, then the empty square that now wins.
// One extra disc pokes up in the middle so the cluster reads as a beak
// pointing up. Same idea can be aimed down, left, or right.
function beakCells() {
  return {
    "5-2": "you",
    "5-3": "you",
    "5-4": "you",
    "5-5": "block",
    "4-2": "you",
    "4-3": "you",
    "4-4": "you",
    "4-5": "threat",
    "3-3": "you",
  };
}

function ConnectFourDiagram() {
  return (
    <div className="game-diagrams">
      <figure className="game-diagram">
        <ConnectFourBoard cells={centerStackCells()} highlightCenter />
        <figcaption className="game-diagram-caption">
          Stack the center. Horizontal and diagonal fours run through it. A vertical four can miss it, and you
          can see that one coming.
        </figcaption>
      </figure>
      <figure className="game-diagram">
        <ConnectFourBoard cells={beakCells()} />
        <ul className="c4-legend" aria-hidden="true">
          <li>
            <span className="c4-hole c4-hole--you c4-swatch" />
            Your beak
          </li>
          <li>
            <span className="c4-hole c4-hole--block c4-swatch" />
            Their block
          </li>
          <li>
            <span className="c4-hole c4-hole--threat c4-swatch">
              <span className="c4-threat-dot" />
            </span>
            Second threat
          </li>
        </ul>
        <figcaption className="game-diagram-caption">
          Pointing up. They block the lower four, and that piece is what you play on for the second threat. The
          same shape works down, left, or right.
        </figcaption>
      </figure>
    </div>
  );
}

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
        Counted in play order from Jail. The oranges are 6, 8, and 9 spaces past the busiest square, and they
        are cheap to build on.
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
