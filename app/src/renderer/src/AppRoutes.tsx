import { HashRouter, Route, Routes } from "react-router-dom";

// screens
import App from "./App";
import Setup from "./screens/Setup";
import SearchResult from "./screens/SearchResult";

function AppRoutes() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />} >
          <Route path="/search-result" element={<SearchResult />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}

export default AppRoutes;
