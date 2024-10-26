import { useState } from 'react'

import './App.css'

function App() {
const [userNameInput, setNameUserInput] = useState('')
const [userIdadeInput, setIdadeUserInput] = useState(0)




const [user, setUser] = useState({
  idade: 0,
  nome: ''
})

const [textResp, setTextResp] = useState('')

function calculo(){

  if(userNameInput === '' || userIdadeInput === 0){
    alert('Preencha todos os campos ou adicione uma idade')
      return
  }

 let date = new Date()
 let anoAtual = date.getFullYear()

 setUser({
  idade:  anoAtual - userIdadeInput ,
  nome: userNameInput
 })

 setIdadeUserInput(0)
 setNameUserInput('')
}


  return (
    <>
        <div className="container">
          <div className="inputs">
            <label htmlFor="">Digite seu nome</label>
            <input type="text" placeholder='digite o seu nome' value={userNameInput} onChange={(e) => setNameUserInput(e.target.value)}/>
            <label htmlFor="">Digite sua idade</label>
            <input type="number" placeholder='digite a data do seu nascimento' value={userIdadeInput}  onChange={(e) => setIdadeUserInput(parseInt(e.target.value))} />
            <button onClick={() => calculo()}>Calcular idade</button>
          </div>
          
               {user && user.nome !== '' && ( 
                   <div className='resp'>
                      <span>{user?.nome} você nasceu em {user?.idade} anos</span>
                   </div>
               )}
            
          
        </div>
    </>
  )
}

export default App
