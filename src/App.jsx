import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'leaflet/dist/leaflet.css'; // Global Leaflet styles
import Layout from './components/Layout';
import Home from './pages/Home';
import PanicMode from './pages/PanicMode';
import MapPage from './pages/MapPage';
import SafeMode from './pages/SafeMode';
import EvidencePage from './pages/EvidencePage';
import ProfilePage from './pages/ProfilePage';
import IncidentPage from './pages/IncidentPage';
import InfoPage from './pages/InfoPage';
import HelpPage from './pages/HelpPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/evidence" element={<EvidencePage />} />
          <Route path="/incident/:id" element={<IncidentPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
        <Route path="/panic-mode" element={<PanicMode />} />
        <Route path="/safe-mode" element={<SafeMode />} />
        <Route path="/info" element={<InfoPage />} />
        <Route path="/help" element={<HelpPage />} />
      </Routes>
    </Router>
  );
}

export default App;
