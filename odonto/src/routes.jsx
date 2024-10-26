import { createBrowserRouter } from "react-router-dom";


import Home from './pages/Home'
import Layout  from '../src/components/Layout'
import Implatodontia from "./components/Tratamentos/implatodontia";

const router = createBrowserRouter([
    {
        element: <Layout/>,
        children:[
            {path: '/', element: <Home/>},
            {path: '/implatodontia', element: <Implatodontia/>}
        ]
    }
])

export { router }