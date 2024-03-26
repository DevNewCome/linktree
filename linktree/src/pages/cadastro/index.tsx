import Input from "../../components/input"
import { useState } from "react"
import { Link } from "react-router-dom"
import { auth } from '../../services/firebaseConnection'
import {
    fetchSignInMethodsForEmail, 
    createUserWithEmailAndPassword,
  } from 'firebase/auth'
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"


export default function Cadastro(){
    const navigate = useNavigate()
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
        async function cadastrar() {
            if (password === '' || email === '') {
            toast.warning('Informe os dados para cadastrar');
            return;
            }
        
            try {
            const verificaEmail = await checkRegister(email);
        
            if (verificaEmail) {
                toast.warning('E-mail já possui um cadastro.');
                return;
            }
        
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                setEmail('');
                setPassword('');
                toast.success('Cadastro realizado com sucesso');
                navigate('/', { replace: true });
                    /*console.log(userCredential)*/
            } 
                catch (error) {
                toast.warning('Erro ao cadastrar, tente novamente ou tente mais tarde');
                console.error('Error:', error);
                setEmail('');
                setPassword('');
            }
        }
      



    async function checkRegister(email:string){
        try {
            let verificaEmail = await fetchSignInMethodsForEmail(auth, email)
                if(verificaEmail.length > 0){
                    return true
                }else{
                    return false
                }
        }
        catch{
            console.log('error')
        }
    }

    return(
        <div className=' flex w-full h-screen items-center justify-center flex-col'>
           <Input 
           className=" w-2/4 mb-4 p-2 rounded outline-none"
           placeholder="Digite seu E-mail"
           type="email"
           value={email}
           onChange={(e) => setEmail(e.target.value)}
           />
           <Input 
           className=" w-2/4 mb-4 p-2 rounded outline-none"
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
         to='/'>   
            Voltar para Login
            </Link>
        </div>
    )
}