import './style.module.css'
import { useEffect, useState } from 'react'
import { db } from '../../services/firebaseCon'
import { collection, onSnapshot, query, orderBy, where, doc } from 'firebase/firestore'

interface Funcionario {
    id: string;
    nome: string;
    cargo: string;
    salario: number;
    tipo: string;
    loja: string; // Update the type if it's different
    dataInicio: string; // Update the type if it's different
  }

export default function consultar(){
 
    const [ funcionarios, setFuncionarios ] = useState<Funcionario[]>([])

    useEffect(()=>{
        async function loadFuncionarios(){
            const funcionarioRef = collection(db, 'funcionarios');
            const q = query(funcionarioRef, orderBy('created', 'desc'))
                const unsub = onSnapshot(q, (Snapshot => {
                    let lista: Funcionario[] = []
                    Snapshot.forEach((doc) => {
                        lista.push({
                            id: doc.id,
                            nome: doc.data().nome,
                            cargo: doc.data().cargo,
                            salario: doc.data().salario,
                            tipo: doc.data().tipo,
                            loja: doc.data().loja,
                            dataInicio: doc.data().dataInicio,
                        })
                    })
                    setFuncionarios(lista)
                }))
                    return () => unsub()
        }
        loadFuncionarios()
    },[])


    console.log(funcionarios)

    return(
        <div>
            <table>
                <thead>
                <tr>
                    <th>Nome:</th>
                    <th>Cargo:</th>
                    <th>Salario:</th>
                    <th>Tipo:</th>
                    <th>Loja:</th>
                    <th>Data-Início:</th>
                </tr>
                </thead>
            <tbody>
            {funcionarios.map((funcionario) => (
            <tr key={funcionario.id}>
              <td>{funcionario.nome}</td>
              <td>{funcionario.cargo}</td>
              <td>{funcionario.salario}</td>
              <td>{funcionario.tipo}</td>
              <td>{funcionario.loja}</td>
              <td>{funcionario.dataInicio}</td>
            </tr>
          ))}
            </tbody>
            </table>
        </div>
    )
}