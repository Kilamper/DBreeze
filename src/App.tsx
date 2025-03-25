import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Content from "./pages/Content";
import Overview from "./pages/Overview";
import Settings from "./pages/Settings";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Rutas dentro del Layout */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Content />} />
          <Route path="overview" element={<Overview />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
