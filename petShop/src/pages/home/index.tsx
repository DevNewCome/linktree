import { Link } from "react-router-dom"
import { useState, useEffect, useContext } from "react"
import { FaShoppingCart } from "react-icons/fa";
import { api } from "../../services/api";
import { CarrinhoContext } from "../../context/carrinho";
import toast from 'react-hot-toast'

export interface ProductProps{
    id: number;
    title: string;
    description: string;
    price:number;
    cover:string;
}

export function Home(){
const { addItemCart } = useContext(CarrinhoContext)    
const [produtos, setProdutos] = useState<ProductProps[]>([])

    useEffect(()=>{
        async function getProducts(){
            const response = await api.get('/products')
            setProdutos(response.data)
        }
        getProducts()
    },[])

    function handleAddCartItem(product: ProductProps){
        toast.success('Produto adicionado ao carrinho')
        addItemCart(product)
        console.log(product)
    }

    return(
        <div>
            <main className=" w-full max-w-7xl mx-auto">
                    <h1 className=" mb-14  mt-5 text-4xl font-bold text-zinc-900 text-center">Produtos para seu pet</h1>  
                    <div className="flex flex-wrap gap-16 justify-center">
                     {produtos.map((produto => (
                           <section key={produto.id} className="w-full max-w-52">
                           <img
                               className="w-full rounded-lg max-h-64 mb-2"
                               src={produto.cover}
                               alt={produto.title}
                           />
                           <p className=" font-medium mt-1 mb-2 text-center">{produto.title}</p>
                           <div className=" flex gap-3 items-center justify-center">
                               <strong className=" text-zinc-700/90">{produto.price.toLocaleString('pt-br',{style:'currency', currency:'BRL'})}</strong>
                               <button 
                                onClick={() => handleAddCartItem(produto)}
                               className=" bg-zinc-900 p-1.5 rounded">
                                   <FaShoppingCart size={15} color="#FFF"/>
                               </button>
                           </div>
                       </section>
                     )))}
                    </div>
            </main>        
        </div>
    )
}