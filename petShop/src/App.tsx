import { createBrowserRouter } from "react-router-dom"
import { Home } from "./pages/home"
import { Carrinho } from "./pages/carrinho"
import { NotFound } from "./pages/notfound"
import { Layout } from "./components/layout"

const router = createBrowserRouter([
  { element: <Layout/>,
    children:[
      {path: '/', element: <Home/>},
      {path: '/carrinho', element: <Carrinho/>},
      {path: '*', element: <NotFound/>},
    ]
}
])

export { router }