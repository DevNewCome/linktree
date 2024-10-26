import { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import './App.css'

function App() {
  const [tarefasInput, setTarefa] = useState('')
  const [tarefasList, setTarefasList] = useState<string[]>([])
  const [tarefaEdit, setTarefaEdit] = useState({
    enabled: false,
    tarefa: ''
  })

  let inputRef = useRef<HTMLInputElement>(null)
  let firstRender = useRef(true)


  const register = useCallback (() => { //funcao so será renderizada ao clicar na funçaõ, ou caso seja chamado as dependencias
    if(tarefasInput === ''){
      alert('Preencha o campo')
      return
    }
    setTarefasList((prev) => [...prev, tarefasInput])
    setTarefa('')

    if(tarefaEdit.enabled){
      saveEdit()
        return
    }
  },[tarefasInput, tarefasList])


  console.log(tarefasList)

  function excluir(item:string){
    let excluir = tarefasList.filter((tarefa) => tarefa !== item)
    setTarefasList(excluir)
    //localStorage.setItem('@cursoreact', JSON.stringify(excluir))
  }
  
  function editar(item:string){
    inputRef.current?.focus()
      setTarefa(item)
        setTarefaEdit({
          enabled: true,
          tarefa: item,
        })
  }

  function saveEdit(){
      let findIndex = tarefasList.findIndex(tarefa => tarefa === tarefaEdit.tarefa)
      let allTarefas = [...tarefasList]
      allTarefas[findIndex] = tarefasInput;
      setTarefasList(allTarefas)
        setTarefaEdit({
          enabled:false,
          tarefa: ''
        })
        setTarefa('')
      //  localStorage.setItem('@cursoreact', JSON.stringify([allTarefas])) // converte para string
  }

  useEffect(()=>{
    const tarefassaved = localStorage.getItem('@cursoreact')
      if(tarefassaved){
        setTarefasList(JSON.parse(tarefassaved)) //Converte de volta para array
      }
  },[])

  useEffect(()=>{
      if(firstRender.current){ // codigo para evitar a primeira renderização
        firstRender.current = false;
         return
      }
    localStorage.setItem('@cursoreact', JSON.stringify(tarefasList))
  },[tarefasList])


  let totalTarefas = useMemo(()=>{
    return tarefasList.length
  },[tarefasList])

  return (
    <>
      <div className='container'>
          <h1>ToDo List <span>{totalTarefas ? `Você tem ${totalTarefas} tarefas` : <strong>Sem tarefas</strong>}</span></h1>
          <div className='inputs'>
              <label htmlFor="">Tarefa</label>
              <input type="text" placeholder='Add tarefa' ref={inputRef} value={tarefasInput} onChange={(e) => setTarefa(e.target.value)}/>
              <button onClick={register}>{tarefaEdit.enabled ? 'Atualizar' : 'Cadastrar'}</button>
          </div>
          <div className='resultContainer'>
              <ul>
              {tarefasList.map((tarefa, i)=> (
                  <li key={i}>{i+1}° - {tarefa}
                    <button onClick={() => excluir(tarefa)}>Concluir</button>
                    <button onClick={() => editar(tarefa)}>Editar</button>
                  </li>
                ))}
              </ul>
          </div>
      </div>
      
    </>
  )
}

export default App
