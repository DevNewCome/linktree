import React from 'react'
import ReactDOM from 'react-dom/client'
import { router } from './App'
import {  RouterProvider } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import  CarrinhoProvider  from './context/carrinho'
import './index.css'

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
