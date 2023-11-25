import { createBrowserRouter } from 'react-router-dom'
import Home from './pages/home'
import Login from './pages/login'
import Networks from './pages/networks'
import Admin from './pages/admin'
import NotFound from './pages/notfound'
import Cadastro from './pages/cadastro'
import Private from './routes/Private'


const router = createBrowserRouter([
    {path: '/', element: <Login/>},
    {path: '/home', element: <Private><Home/></Private>},
    {path: '/cadastro', element: <Cadastro/>},
    {path: '/admin', element: <Private><Admin/></Private>},
    {path: '/admin/social', element: <Private><Networks/></Private>},
    {path: '*', element: <NotFound/>},
])

export { router }