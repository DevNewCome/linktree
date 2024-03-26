import { Link } from "react-router-dom"

export default function NotFound(){
    return(
        <div className=" flex flex-col justify-center min-h-screen items-center text-white ">
            <h1 className="font-medium text-8xl">404</h1>
            <h2 className=" font-normal text-3xl">você caiu em uma página não encontrada</h2>
            <Link 
            className=" hover:bg-cyan-600 bg-cyan-500 py-2 px-4 rounded-md mt-5"
            to={'/'}>Retorne para home aqui
            </Link>
        </div>
        
    )
}