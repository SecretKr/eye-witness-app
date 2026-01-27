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

function App() {
  return (
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
      <Route path="/partnered-lawyers" element={<PartneredLawyers />} />
      <Route path="/info" element={<InfoPage />} />
      <Route path="/help" element={<HelpPage />} />
    </Routes>
  );
}

export default App;
