import styles from '../Login/login.module.css'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { auth } from '../../services/firebaseCon'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { toast } from 'react-toastify'


export default function Login(){

    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

     


    function validadeInputs(email:string, password:string){
        if(email === '' || password === ''){
            alert('preencha todos os campos')
                return
        }
    }

    async function logar(){
            try{
                validadeInputs(email, password)
                await signInWithEmailAndPassword(auth, email, password)
                    navigate('/home', {replace: true})
            }catch(err){
                console.log(err)
            }
        }
    

    return(
        <div className={styles.container}>
            <div className={styles.logo}>
                <h1>Gestão JL</h1> 
            </div>
            <div className={styles.inputs}>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoFocus={true} placeholder='Digite seu login'/>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Digite sua senha'/>
                <button onClick={() => logar()}>Entrar</button>
            </div>
        </div>
    ) 
}