import { Link } from "react-router-dom"
import { FaShoppingCart } from "react-icons/fa";
import { useContext } from 'react'
import { CarrinhoContext } from '../../context/carrinho'


export function Header(){
    const { cartAmount } = useContext(CarrinhoContext)
    return(
        <header className=" w-full bg-slate-300">
            <nav className=" p-5 w-full max-w-7xl flex items-center justify-between mx-auto h-14 ">
                <Link className=" font-bold text-black text-lg " to='/'>PET SHOP ZONA SUL</Link>
                <Link  className="relative" to='/carrinho'>
                     <FaShoppingCart 
                     className=""
                     size={30} />
                      {cartAmount > 0 && (
                      <span className='absolute -top-3 -right-3 px-2.5 bg-sky-500 rounded-full w-6 h-6 flex items-center justify-center text-white text-xs'>{cartAmount}</span>
                  )}
                </Link>
            </nav>
        </header>
    )
}