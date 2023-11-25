import { Link } from "react-router-dom"

export default function NotFound(){
    return(
        <div className=" flex flex-col justify-center min-h-screen items-center text-white font-medium text-6xl">
            <h1>Not found</h1>
            <Link 
            className=" text-2xl mt-4 hover:text-gray-400"
            to={'/'}>Retorne para home aqui
            </Link>
        </div>
        
    )
}