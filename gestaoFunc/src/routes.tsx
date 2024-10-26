import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from './pages/NotFound'
import Private from "./routesProtect/Private";
import Consultar from "./pages/Consultar";

const router = createBrowserRouter([
    {path: '/', element: <Login/> },
    {path: '/home', element:<Private><Home/></Private> },
    {path: '/consultar', element:<Private><Consultar/></Private> },
    {path: '*', element: <NotFound/>}
])

export { router }