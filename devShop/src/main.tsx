import React from 'react'
import ReactDOM from 'react-dom/client'
import { router } from './App.tsx'
import { RouterProvider } from 'react-router-dom'
import './index.css'
import  CarrinhoProvider  from './context/carrinho.tsx'
import { Toaster } from 'react-hot-toast'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CarrinhoProvider>  
      <Toaster
      position='top-center'
      reverseOrder={false}
      />
      <RouterProvider router={ router }/>
    </CarrinhoProvider>
  </React.StrictMode>,
)
