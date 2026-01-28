import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import PanicMode from "./pages/PanicMode";
import MapPage from "./pages/MapPage";
import SafeMode from "./pages/SafeMode";
import EvidencePage from "./pages/EvidencePage";
import ProfilePage from "./pages/ProfilePage";
import IncidentPage from "./pages/IncidentPage";
import InfoPage from "./pages/InfoPage";
import HelpPage from "./pages/HelpPage";
import PanicMapMode from "./pages/PanicMapMode";
import IncidentFormPage from "./pages/IncidentFormPage";
import PartneredLawyers from "./pages/PartneredLawyers";
import SafeHavenBusinessPage from "./pages/SafeHavenBusinessPage";
import SafeHavenTrackingPage from "./pages/SafeHavenTrackingPage";

import IPhoneMockup from "./components/IPhoneMockup";

import { EvidenceProvider } from "./context/EvidenceContext";

function App() {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const content = (
    <EvidenceProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/evidence" element={<EvidencePage />} />
          <Route path="/incident/:id" element={<IncidentPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>

        <Route path="/panic-mode" element={<PanicMode />} />
        <Route path="/panic-map" element={<PanicMapMode />} />
        <Route path="/safe-mode" element={<SafeMode />} />
        <Route path="/incident-form" element={<IncidentFormPage />} />
        <Route path="/safe-haven-business" element={<SafeHavenBusinessPage />} />
        <Route path="/business/tracking" element={<SafeHavenTrackingPage />} />
        <Route path="/partnered-lawyers" element={<PartneredLawyers />} />
        <Route path="/info" element={<InfoPage />} />
        <Route path="/help" element={<HelpPage />} />
      </Routes>
    </EvidenceProvider>
  );

  return isDesktop ? (
    <IPhoneMockup screenWidth={350}>
      {content}
    </IPhoneMockup>
  ) : (
    content
  );
}

export default App;
