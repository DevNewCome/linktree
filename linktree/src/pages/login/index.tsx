import style from './login.module.css'
import { Link } from 'react-router-dom'
import Input from '../../components/input'
import { useState, FormEvent } from 'react'
import { auth } from '../../services/firebaseConnection'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

export default function Login(){
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

   async function handleSubmit(e: FormEvent){
        e.preventDefault();

           
              if(email === '' || password === ''){
                  toast.warning('Informe usuário e senha')
                    return
              }else{
                await signInWithEmailAndPassword(auth, email, password)
              .then(() => {
                navigate('/home', {replace: true})
               
              })
              .catch(()=>{
                toast.warning('Usuário não encontrado')
              })
             }  
    }

    return(
        <div className=' flex w-full h-screen items-center justify-center flex-col'>
             <Link to='/'>
                <h1 className=' mt-11 text-white mb-7 font-bold text-5xl '>Dev
                <span className=' bg-gradient-to-r from-yellow-500 to-orange-400 bg-clip-text text-transparent'>Link</span></h1>
             </Link>
             <form onSubmit={handleSubmit} className=' w-full max-w-xl flex flex-col px-3'>
               <Input
               type='email'
               value={email}
               onChange={(e) => setEmail(e.target.value)}
                placeholder='Digite seu E-mail'
               />
                 <Input
               type='password'
               value={password}
               onChange={(e) => setPassword(e.target.value)}
                placeholder='Digite sua senha'
               />
               <button 
                type='submit'
                className=' h-9 bg-blue-600 rounded border-0 text-lg font-medium text-white'>
                  Acessar
               </button>
               <Link 
               className=' flex items-center justify-center text-white border-0 bg-blue-600 mt-3 rounded text-center font-medium h-9 text-lg'
               to='/cadastro'>   
                Cadastrar
                </Link>
             </form>
           
        </div>
       
    )
}