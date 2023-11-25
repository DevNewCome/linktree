import { auth } from "../services/firebaseConnection";
import { onAuthStateChanged } from "firebase/auth";
import { ReactNode, useState, useEffect } from 'react'
import { Navigate } from "react-router-dom";

interface PrivateProps{
    children: ReactNode;
}

export default function Private({ children }:PrivateProps): any{

    const [ loading, setLoading] = useState(true)
    const [signed, setSigned] = useState(false)

    useEffect(()=>{
        const unsub = onAuthStateChanged(auth, (user) => {
            if(user){
                const userData = {
                    uid: user?.uid,
                    email: user?.email
                }
                localStorage.setItem('@reactlinks', JSON.stringify(userData))
                setLoading(false)
                setSigned(true)
               /* console.log(user)*/
            }else{
                setLoading(false)
                setSigned(false)
               /* console.log('Nao tem usuario logado')*/
            }
        })
    }, [])

    if(loading){
            return <div>Carregando</div>
    }

    if(!signed){
        return <Navigate to='/'/>
    }

    return children
}