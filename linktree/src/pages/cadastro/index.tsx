import Input from "../../components/input"
import { useState } from "react"
import { Link } from "react-router-dom"
import { db, auth } from '../../services/firebaseConnection'
import { 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
  } from 'firebase/auth'
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"


export default function Cadastro(){
    const navigate = useNavigate()
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')



   async function cadastrar(){
    await createUserWithEmailAndPassword(auth, email, password)
        .then((value)=>{
           
            setEmail('')
            setPassword('')
            toast.success('Cadastro realizado com sucesso')
            navigate('/', {replace: true})
        })
        .catch(()=> {
            toast.warning('Erro ao cadastrar, tente novamente ou tente mais tarde')
            console.log('Erro')
            setEmail('')
            setPassword('')
        })
    }

    return(
        <div className=' flex w-full h-screen items-center justify-center flex-col'>
           <Input 
           className=" w-2/4 mb-4 py-2 rounded outline-none"
           placeholder="Digite seu E-mail"
           type="email"
           value={email}
           onChange={(e) => setEmail(e.target.value)}
           />
           <Input 
           className=" w-2/4 mb-4 py-2 rounded outline-none"
           placeholder="Digite sua senha"
           type="password"
           value={password}
           onChange={(e) => setPassword(e.target.value)}
           />
         <button 
         onClick={cadastrar}
         className='text-white bg-blue-600 w-2/4 rounded py-2'>Cadastrar
         </button> 
         <Link
         className="text-white bg-blue-600 w-2/4 rounded py-2 mt-4 text-center"
         to='/login'>   
            Voltar para Login
            </Link>
        </div>
    )
}