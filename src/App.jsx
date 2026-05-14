import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import DecorativeBackground from "./components/DecorativeBackground.jsx";
import Home from "./pages/Home.jsx";
import CategoryPage from "./pages/CategoryPage.jsx";
import ProjectDetail from "./pages/ProjectDetail.jsx";
import SimplePage from "./pages/SimplePage.jsx";

function App() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <div className="min-h-screen bg-paper text-ink">
      <DecorativeBackground />
      <Navbar />
      <main className="relative z-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/interior" element={<CategoryPage category="interior" />} />
          <Route path="/landscape" element={<CategoryPage category="landscape" />} />
          <Route path="/about" element={<SimplePage type="about" />} />
          <Route path="/contact" element={<SimplePage type="contact" />} />
          <Route path="/projects/:projectId" element={<ProjectDetail />} />
        </Routes>
      </main>
      {!isHome ? <Footer /> : null}
    </div>
  );
}

export default App;
