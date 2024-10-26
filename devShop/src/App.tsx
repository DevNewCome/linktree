import { createBrowserRouter } from "react-router-dom";
import { Home } from './pages/home'
import { Cart } from './pages/cart'
import { Layout } from "./components/layout";
import { ProductDes } from "./pages/productDes";


const router = createBrowserRouter([
  { element:  <Layout/>,
    children:[
      {path: '/', element: <Home/>},
      {path: '/product/:id', element: <ProductDes/>},
      {path: '/cart', element: <Cart/>},
    ]
  }
])

export { router }