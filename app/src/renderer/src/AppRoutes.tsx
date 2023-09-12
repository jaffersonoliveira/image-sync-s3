import { HashRouter, Route, Routes } from "react-router-dom";

// screens
import App from "./App";
import Setup from "./screens/Setup";

function AppRoutes() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />} >
          <Route path="/setup" element={<Setup />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}

export default AppRoutes;
