import { Link, useLocation } from "react-router-dom";

export default function NotFoundPage() {
  const location = useLocation();

  return (
    <div className="page not-found-page">
      <div className="ax-card not-found-card">
        <img className="not-found-mascot" src="https://alexischao.com/panda.png" alt="" />
        <div className="not-found-code">404</div>
        <p className="not-found-headline">This page wandered off.</p>
        <p className="ax-meta">
          There's nothing at <code>toolkit.alexischao.com{location.pathname}</code>. It may have moved, or
          the link had a typo.
        </p>
        <div className="not-found-actions">
          <Link className="ax-btn ax-btn--solid" to="/">
            Back to this site
          </Link>
          <a className="ax-btn" href="https://alexischao.com">
            All sites
          </a>
        </div>
      </div>
    </div>
  );
}
