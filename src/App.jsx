import { BrowserRouter, Routes, Route } from "react-router-dom";
import CommandsPage from "./pages/CommandsPage.jsx";
import FrameworksIndex from "./pages/FrameworksIndex.jsx";
import FrameworkPage from "./pages/FrameworkPage.jsx";
import MappingsPage from "./pages/MappingsPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import "./App.css";
import "./pages/frameworks.css";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<CommandsPage />} />
        <Route path="/frameworks" element={<FrameworksIndex />} />
        <Route path="/frameworks/mappings" element={<MappingsPage />} />
        <Route path="/frameworks/:slug" element={<FrameworkPage />} />
        <Route path="/frameworks/:slug/controls" element={<FrameworkPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
