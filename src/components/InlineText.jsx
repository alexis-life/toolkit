// Minimal "**bold**" parser for content authored as plain text with light
// markdown emphasis — avoids pulling in a full markdown renderer for what's
// otherwise a handful of inline bold spans per list item.
export default function InlineText({ text }) {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return parts.map((part, i) =>
    i % 2 === 1 ? <strong key={i}>{part}</strong> : <span key={i}>{part}</span>
  );
}
