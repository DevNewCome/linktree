import styles from '../Home/home.module.css'
import { auth, db } from '../../services/firebaseCon'
import { signOut } from 'firebase/auth'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { addDoc, collection } from 'firebase/firestore'

interface Usuario{
  nome: string;
  cargo: string;
  salario: number;
  tipo: string;
  loja: string;
  dataInicio: string;
}

export default function Home(){
    const [nome, setNome] = useState('');
    const [cargo, setCargo] = useState('');
    const [salario, setSalario] = useState('');
    const [tipo, setTipo] = useState('')
    const [loja, setLoja] = useState('');
    const [dataInicio, setDataInicio] = useState('')
    const [usuarios, setUsuarios] = useState<Usuario[]>([])
    
    const navigate = useNavigate()

   async function deslogar(){
        try{
            await signOut(auth)
            navigate('/', {replace:true})
            alert('Deslogado com sucesso')
        }catch(err){
            console.log(err)
        }
    }

    async function cadastrar(){

        const salarioNumber = Number(salario)

        const novoUsuario = {
            nome: nome,
            cargo: cargo,
            salario: salarioNumber,
            tipo: tipo,
            loja: loja,
            dataInicio: dataInicio
        }
        setUsuarios([...usuarios, novoUsuario])

            try{
                const docRef = await addDoc(collection(db, 'funcionarios'), novoUsuario)
                alert('cadastrado com sucesso')
            }catch(err){
                console.log(err)
            }
    }

    console.log(usuarios)

    function consultar(){   
        navigate('/consultar', {replace: true})
    }

    return(
        <div className={styles.container}>
            <div className={styles.divUsuario}>
                <h3>Bem vindo Jefferson</h3>
                <button onClick={() => deslogar()}>Deslogar</button>
            </div>
            <div className={styles.cadastroDiv}>
                <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} placeholder='Nome'/>
                <input type="text" value={cargo} onChange={(e) => setCargo(e.target.value)} placeholder='Cargo'/>
                <input type="number" value={salario} onChange={(e) => setSalario(e.target.value)} placeholder='Salario'/>
                <select name="tipo" value={tipo} onChange={(e) => setTipo(e.target.value)} id="">
                    <option value="CLT">CLT</option>
                    <option value="PJ">pj</option>
                </select>
                <select name="loja" value={loja} onChange={(e) => setLoja(e.target.value)} id="">
                    <option value="1">Loja 1</option>
                    <option value="2">Loja 2</option>
                    <option value="3">Loja 3</option>
                    <option value="4">Loja 4</option>
                    <option value="5">Loja 5</option>
                </select>
                <input type="date" value={dataInicio} onChange={(e) => setDataInicio(e.target.value)} placeholder='Data-Inicio'/>
                <button onClick={() => cadastrar()}>Cadastrar</button>
                <button onClick={() => consultar()}>Consultar</button>
            </div>
        </div>
    )
}