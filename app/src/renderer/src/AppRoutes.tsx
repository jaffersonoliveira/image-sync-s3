import { HashRouter, Route, Routes } from "react-router-dom";

// screens
import App from "./App";

function AppRoutes() {
  return (
    <HashRouter> 
      <Routes>
        <Route path="/" element={<App />} />
      </Routes>
    </HashRouter>
  )
}

export default AppRoutes;
