import './App.css'
import { router } from './routes'
import { RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

function App() {
  return (
    <>
        <ToastContainer autoClose={3000}/>
        <RouterProvider router={ router }/>
    </>
  )
}

export default App
