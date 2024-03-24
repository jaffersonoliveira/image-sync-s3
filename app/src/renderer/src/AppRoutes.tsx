import { HashRouter, Route, Routes } from "react-router-dom";

// screens
import App from "./App";
import Setup from "./screens/Setup";
import SearchResult from "./screens/SearchResult";
import Home from "./screens/Home"
import Profile from "./screens/Profile"

function AppRoutes() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />} >
          <Route path="/" element={<Home />} />
          <Route path="/search-result" element={<SearchResult />} />
          <Route path="/setup" element={<Setup />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}

export default AppRoutes;
