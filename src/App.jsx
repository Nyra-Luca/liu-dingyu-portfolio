import { Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import DecorativeBackground from "./components/DecorativeBackground.jsx";
import BlueprintCursor from "./components/BlueprintCursor.jsx";
import Seo from "./components/Seo.jsx";
import Home from "./pages/Home.jsx";
import CategoryPage from "./pages/CategoryPage.jsx";
import ProjectDetail from "./pages/ProjectDetail.jsx";
import SimplePage from "./pages/SimplePage.jsx";

function App() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const isContact = location.pathname === "/contact";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div
      className={`min-h-screen bg-paper text-ink ${
        isContact ? "flex flex-col" : ""
      }`}
    >
      <Seo />
      <DecorativeBackground />
      <BlueprintCursor />
      <Navbar />
      <main
        className={`relative z-10 ${isContact ? "flex-1" : ""}`}
        key={location.pathname}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/interior" element={<CategoryPage key="interior" category="interior" />} />
          <Route path="/landscape" element={<CategoryPage key="landscape" category="landscape" />} />
          <Route path="/about" element={<SimplePage type="about" />} />
          <Route path="/contact" element={<SimplePage type="contact" />} />
          <Route path="/projects/:projectId" element={<ProjectDetail />} />
        </Routes>
      </main>
      {!isHome ? <Footer showEmail={!isContact} /> : null}
    </div>
  );
}

export default App;
