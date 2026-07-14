import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// React Router doesn't reset scroll position on client-side navigation the
// way a full page load would — without this, clicking a tab/link while
// scrolled down on the previous page leaves you scrolled down on the new
// one too.
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
