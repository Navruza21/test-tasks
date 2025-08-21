import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import BalancePage from "./pages/BalancePage";
import ResultsPage from "./pages/ResultsPage";
import AchievementsPage from "./pages/AchievementsPage";
import TestsPage from "./pages/tests";
import TestDetail from "./pages/tests/testDetailPage";
import ProfilePage from "./pages/ProfilePage";
import LayoutApp from "./components/layout";

export default function App() {
  return (
    <Router>
      <LayoutApp>
        <Routes>
          <Route path="/" element={<Navigate to="/profile" />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/tests" element={<TestsPage />} />
          <Route path="/tests/:id" element={<TestDetail />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/balance" element={<BalancePage />} />
          <Route path="/achievements" element={<AchievementsPage />} />
        </Routes>
      </LayoutApp>
    </Router>
  );
}
