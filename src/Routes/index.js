import { Routes, Route } from "react-router-dom";
import Dashboard from "../Page/Dashboard/Dashboard";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
    </Routes>
  );
}

export default AppRoutes;
