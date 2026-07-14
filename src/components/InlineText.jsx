import { Link } from "react-router-dom";

// Minimal "**bold**" and "[label](url)" parser for content authored as plain
// text with light markdown — avoids pulling in a full markdown renderer for
// what's otherwise a handful of inline bold spans and source links. A link
// starting with "/" is treated as internal (client-side navigation via
// react-router's Link); anything else is external (opens in a new tab).
const TOKEN_RE = /\*\*(.+?)\*\*|\[([^\]]+)\]\(([^)]+)\)/g;

export default function InlineText({ text }) {
  const nodes = [];
  let lastIndex = 0;
  let key = 0;
  let match;

  while ((match = TOKEN_RE.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(<span key={key++}>{text.slice(lastIndex, match.index)}</span>);
    }
    if (match[1] !== undefined) {
      nodes.push(<strong key={key++}>{match[1]}</strong>);
    } else if (match[3].startsWith("/")) {
      nodes.push(
        <Link key={key++} to={match[3]}>
          {match[2]}
        </Link>
      );
    } else {
      nodes.push(
        <a key={key++} href={match[3]} target="_blank" rel="noreferrer">
          {match[2]}
        </a>
      );
    }
    lastIndex = TOKEN_RE.lastIndex;
  }
  if (lastIndex < text.length) {
    nodes.push(<span key={key++}>{text.slice(lastIndex)}</span>);
  }
  return nodes;
}
