import { createBrowserRouter } from "react-router-dom";
import App from "./App";

const routers = [
    {},
]

const router = createBrowserRouter([{
    path: '/',
    element: <App />,
    children: routers
}]);

export default router