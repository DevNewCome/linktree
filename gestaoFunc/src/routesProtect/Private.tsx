import { auth } from "../services/firebaseCon";
import { onAuthStateChanged } from "firebase/auth";
import { ReactNode, useState, useEffect } from 'react'
import { Navigate } from "react-router-dom";

interface PrivateProps{
    children: ReactNode,
}

export default function Private({children}: PrivateProps): any{

    const [loading, setLoading] = useState(true)
    const [signed, setSigned] = useState(false)

    useEffect(()=>{
        const unsub = onAuthStateChanged(auth, (user) =>{
            if(user){
                const userData = {
                    uid: user?.uid,
                    email: user?.email
                }
                localStorage.setItem('@gestaoFunc', JSON.stringify(userData))
                setLoading(false)
                setSigned(true)
            }else{
                setLoading(false)
                setSigned(false)
            }
        })
    }, [])

    if(loading){
        return(
            <div>
                <h1>Carregando...</h1>
            </div>
        )
    }
    if(!signed){
        return <Navigate to='/'/>
    }
    //Se passar por todas essas condições significa que o usuário está sim logado. e pode prosseguir com a página.
    return children
}