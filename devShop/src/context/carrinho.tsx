import {ReactNode, createContext, useState } from "react";
import { ProductProps } from "../pages/home";

interface CarrinhoContextData {
    carrinho: carrinhoProps[];
    cartAmount: number;
    addItemCart: (newItem: ProductProps) => void;
    removeItemCart: (product: carrinhoProps) => void
    total: string
}

interface  carrinhoProps{
    id: number;
    title: string;
    description?: string;
    price:number;
    cover:string;
    amount:number;
    total:number
}

interface carrinhoProviderProps{
    children: ReactNode
}

export const CarrinhoContext = createContext({} as CarrinhoContextData)

function CarrinhoProvider({children}: carrinhoProviderProps){
const [carrinho, setCarrinho] = useState<carrinhoProps[]>([])
const [total, setTotal] = useState('')

function addItemCart(newItem: ProductProps){
    const indexItem = carrinho.findIndex(item => item.id === newItem.id)
        if(indexItem !== -1){ // se entrou aqui, somamos +1 na quantidade e calculamos o total desse carrinho
            let cartList = carrinho
            cartList[indexItem].amount += 1
            cartList[indexItem].total = cartList[indexItem].amount * cartList[indexItem].price
            setCarrinho(cartList)
            totalResultCart(cartList)
             return // parar execução, pois ele só deverá passar para a linha de baixo caso não existe o produto ainda
        }
        let data = { // item que será adicionado ao carrinho
            ...newItem,
            amount: 1,
            total: newItem.price
        }
        setCarrinho( products => [...products, data]) //estou pegando todos os produtos ja existentes, e adicionando data como um novo produto
        totalResultCart([...carrinho, data]) //pegando lista e add o data, para calc o total
}

function removeItemCart(product: carrinhoProps){
    const indexItem = carrinho.findIndex(item => item.id === product.id)
        if(carrinho[indexItem]?.amount > 1){ // diminuir 1
            let cartList = carrinho;
            cartList[indexItem].amount = cartList[indexItem].amount - 1
            cartList[indexItem].total = cartList[indexItem].total - cartList[indexItem].price
                setCarrinho(cartList)
                totalResultCart(cartList)
                return
        }
        const removeItem = carrinho.filter(item => item.id !== product.id)
            setCarrinho(removeItem)
            totalResultCart(removeItem) // removeItem => items atualizados
}

function totalResultCart(items: carrinhoProps[]){
    let myCarts = items
    let result = myCarts.reduce((acc,atual) => acc + atual.total, 0)
    let ResultFormat = result.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})
            return setTotal(ResultFormat)
}

    return(
        <CarrinhoContext.Provider value={{carrinho, cartAmount: carrinho.length, addItemCart, removeItemCart, total}}>
            {children}
        </CarrinhoContext.Provider>
    )
}

export default CarrinhoProvider