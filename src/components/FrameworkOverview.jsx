import InlineText from "./InlineText.jsx";

const ACCENTS = ["sp1", "sp2", "sp3", "sp4"];

function Block({ block }) {
  switch (block.type) {
    case "heading":
      return <h3 className="framework-overview-heading">{block.text}</h3>;
    case "paragraph":
      return (
        <p>
          <InlineText text={block.text} />
        </p>
      );
    case "list":
      return (
        <ul>
          {block.items.map((item, i) => (
            <li key={i}>
              <InlineText text={item} />
            </li>
          ))}
        </ul>
      );
    case "ordered-list":
      return (
        <ol>
          {block.items.map((item, i) => (
            <li key={i}>
              <InlineText text={item} />
            </li>
          ))}
        </ol>
      );
    case "table":
      return (
        <div className="framework-overview-table-wrap">
          <table>
            <thead>
              <tr>
                {block.headers.map((h) => (
                  <th key={h}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => (
                    <td key={j}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "callout":
      return (
        <div className="framework-overview-callout">
          <InlineText text={block.text} />
        </div>
      );
    default:
      return null;
  }
}

export default function FrameworkOverview({ overview }) {
  return (
    <div className="framework-overview">
      {overview.map((section, i) => (
        <section
          key={section.title}
          className={`ax-card framework-overview-section framework-overview-section--${ACCENTS[i % ACCENTS.length]}`}
        >
          <h2 className="framework-overview-title">
            <span aria-hidden="true">{section.icon}</span> {section.title}
          </h2>
          {section.blocks.map((block, j) => (
            <Block key={j} block={block} />
          ))}
        </section>
      ))}
    </div>
  );
}
