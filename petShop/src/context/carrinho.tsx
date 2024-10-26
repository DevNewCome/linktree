import { ReactNode, createContext, useState } from 'react'
import { ProductProps } from '../pages/home'

interface CarrinhoContextData {
    carrinho: carrinhoProps[];
    cartAmount: number;
    addItemCart: (newItem: ProductProps) => void;
    removeItemCart: (product: carrinhoProps) => void
    total: string
}

interface carrinhoProps{
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

export const  CarrinhoContext = createContext({} as CarrinhoContextData)

function CarrinhoProvider({children}: carrinhoProviderProps) {
    const [carrinho, setCarrinho] = useState<carrinhoProps[]>([])
    const [total, setTotal] = useState('')


    function addItemCart(newItem: ProductProps){
         // devolve -1 caso ele nao encontre no carrinho
        const indexItem = carrinho.findIndex(item => item.id === newItem.id)
            if(indexItem !== -1){ // se ele encontrar o item clicado na lista, ele entra no if faz a soma apenas
                // se entrou aqui, apenas somamos 1 na qtd e calculamos o total desse carrinho
                let cartList = carrinho
                cartList[indexItem].amount += 1
                cartList[indexItem].total = cartList[indexItem].amount * cartList[indexItem].price
                setCarrinho(cartList)
                totalResultCart(cartList)
                return
            }
            let data = {
                ...newItem,
                amount: 1,
                total: newItem.price
            }

           // pego todos os produtos que 
            //ja tenho, e jogo data para adicionar o novo produto
            setCarrinho(products => [...products, data])
            totalResultCart([...carrinho, data])
    }

    function removeItemCart(product: carrinhoProps){
        const indexItem = carrinho.findIndex(item => item.id === product.id)
            if(carrinho[indexItem].amount > 1){
                let cartList = carrinho
                 cartList[indexItem].amount = cartList[indexItem].amount - 1
                 cartList[indexItem].total = cartList[indexItem].total - cartList[indexItem].price
                    setCarrinho(cartList)
                    totalResultCart(cartList)
                    return
            }
            const removeItem = carrinho.filter(item => item.id !== product.id) 
            // essa linha de codigo esta percorrendo todos os produtos
            // e verificando qual eu cliquei, no caso a logica consiste em:
            // ele vai colocar todos os produtos (tirando o que eu cliquei)
            // na variavel removeItem, e com isso o produto que foi clicado, ficará de fora
            // filtre para mim os produtos que são diferentes do q estou clicando,
            // item.id do carrinho original, product.id do parametro que chegou na função, ou seja
            // o produto especifico que foi clicado, comparo os dois, inclui em remoteItem os que não são iguais
            // e o produto q contem o mesmo id é removido.

            setCarrinho(removeItem)
            totalResultCart(removeItem)
    }

    function totalResultCart(items: carrinhoProps[]){
        let myCarts = items
        let result = myCarts.reduce((acc, atual) => acc + atual.total, 0)
        let resultFormated = result.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})
            return setTotal(resultFormated)
    }

    return(
        <CarrinhoContext.Provider value={{carrinho, cartAmount: carrinho.length, addItemCart, removeItemCart, total}}>
            {children}
        </CarrinhoContext.Provider>
    )
}

export default CarrinhoProvider