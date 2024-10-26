import { useState } from 'react'
import foto from './assets/logo.png'
import './index.css'

import './App.css'

function App() {
const [categoriaSelecionada, setCategoriaSelecionada] = useState(0)
const [textoFrase, setTextoFrase] = useState('')
  

  let Allfrases = [
    {id: 1, tipo: 'Motivação', frases: [
      'Siga os bons e aprenda com eles.',
      'O bom-senso vale mais do que muito conhecimento.',
      'O riso é a menor distância entre duas pessoas.', 
      'Deixe de lado as preocupações e seja feliz.',
      'Realize o óbvio, pense no improvável e conquiste o impossível.',
      'Acredite em milagres, mas não dependa deles.',
      'A maior barreira para o sucesso é o medo do fracasso.'
    ]},
    {id: 2, tipo: 'Bom dia', frases: [
      'Acordar de bem com a vida é o primeiro passo para ter um dia abençoado! Bom dia, família!', 
      'A melhor forma de acordar é pular da cama e se preparar para correr atrás de todos os seus sonhos! Bom dia, mundo!', 
      'Escreva em seu coração: todo dia é o melhor dia do ano.',
      'Bom dia! Não se esqueça que a sua alma é o reflexo do sol, tão forte e brilhante quanto um girassol.',
    ]},
    {id: 3, tipo: 'Boa noite', frases: [
      'Boa noite durma bem',
      'Teste frase boa noite'
    ]},
    
  ]

  function switchCategory(i:number){
      setCategoriaSelecionada(i)
  }

function gerarFrase(){
  let indexAleatorio = Math.floor(Math.random() * Allfrases[categoriaSelecionada].frases.length)
  setTextoFrase(`${Allfrases[categoriaSelecionada].frases[indexAleatorio]}`)
}

  return (
    <div className='container'>
          <div className='foto'>
              <img src={foto} alt="" />
          </div>
          <div className='inputs'>
              <label htmlFor="">Escolha o tipo de frase</label>
              {Allfrases.map((frase, i)=>(
                <button 
                style={{
                  borderWidth: frase.tipo === Allfrases[categoriaSelecionada].tipo ? 2 : 0,
                  borderColor: "#1fa4db"
                }}
                onClick={() => switchCategory(i)} 
                key={i}>{frase.tipo}
                </button>
              ))}
          </div>
          <button onClick={gerarFrase}>Gerar frase</button>
      
              {textoFrase !== '' && <div className='frases'><p>{textoFrase}</p></div>}
         
    </div>
  )
}

export default App
