import style from './admin.module.css'
import Header from '../../components/Header'
import Input from '../../components/input'
import { useState, FormEvent, useEffect } from 'react'
import { FiTrash } from 'react-icons/fi'
import { db } from '../../services/firebaseConnection'
import { addDoc, collection, onSnapshot, query, orderBy, doc, where, deleteDoc, } from 'firebase/firestore'
import { toast } from 'react-toastify'

interface linksProps {
    id: string;
    name: string;
    url: string;
    bg: string;
    color: string;
    userUid:string;
}

interface UserInfo{
    uid: string;
}

export default function Admin(){

    const [nameInput, setNameInput] = useState('')
    const [urlInput, setUrl] = useState('')
    const [textColorInput, setTextColorInput] = useState('#f1f1f1')
    const [backgroundColorInput, setBackgroundColorInput] = useState('#121212')
    const [links, setLinks] = useState<linksProps[]>([])
    const [userInfo, setUserInfo] = useState<UserInfo | {}>({})


    useEffect(()=>{
        const userDetail = localStorage.getItem('@reactlinks')
            if(userDetail){
                const data: UserInfo = JSON.parse(userDetail)
                setUserInfo(data);
                const linkRef = collection(db, 'links')
                const queryRef = query(linkRef, orderBy('created', 'asc'), where('userUid', '==', data?.uid))
        
                const unsub = onSnapshot(queryRef, (snapshot) => {
                    let lista = [] as linksProps[];
                    snapshot.forEach((doc) => {
                        lista.push({
                            id: doc.id,
                            name: doc.data().name,
                            url: doc.data().url,
                            bg: doc.data().bg,
                            color: doc.data().color,
                            userUid: doc.data().userUid,
                        })
                    })
                    setLinks(lista)
                })
                return () => {
                    unsub()
                }
            }   

    },[])
    
    async function handleRegister(e: FormEvent){
        e.preventDefault();
            if(nameInput === '' || urlInput === ''){
                alert('Preencha todos os campos')
                    return
            }
           await addDoc(collection(db, 'links'), {
                name: nameInput,
                url: urlInput,
                bg: backgroundColorInput,
                color: textColorInput,
                created: new Date(),
                userUid: (userInfo as UserInfo)?.uid || '',
            })  
            .then(()=>{
                setNameInput('')
                setUrl('')
                toast.success('Cadastro realizado com sucesso') 
            })
            .catch((error)=>{
                console.log(error)
            })
    }

   

    async function del(id:string){
        const docRef = doc(db, 'links', id)
            await deleteDoc(docRef) 
                .then(()=>{
                    toast.success(' Link Excluido com sucesso')
                })
                .catch((error) =>{
                    console.log(error)
                })
    }

    return(
        <div className=' flex items-center flex-col min-h-screen pb-7 px-2'>
             <Header/>
             <form onSubmit={handleRegister} className=' flex flex-col mt-3 mb-3 w-full max-w-xl'>
                <label className=' text-white font-medium mt-2 mb-2'>Nome do link</label>
                <Input
                value={nameInput}
                type='text'
                onChange={(e) => setNameInput(e.target.value)}
                    placeholder='Digite o nome do Link'
                />
                <label className=' text-white font-medium mt-2 mb-2'>Url do link</label>
                <Input
                type='url'
                value={urlInput}
                onChange={(e) => setUrl(e.target.value)}
                    placeholder='Digite a url'
                />

                <section className=' flex my-4 gap-5'>
                    <div className=' flex gap-2'>
                         <label className=' text-white font-medium mt-2 mb-2'>Cor do texto</label>
                         <input
                            type='color'
                            value={textColorInput}
                            onChange={(e) => setTextColorInput(e.target.value)}
                         />
                    </div>
                    <div className=' flex gap-2'>
                         <label className=' text-white font-medium mt-2 mb-2'>Cor do fundo</label>
                         <input
                            type='color'
                            value={backgroundColorInput}
                            onChange={(e) => setBackgroundColorInput(e.target.value)}
                         />
                    </div>
                </section>

            {nameInput !== '' && (
                    <div className='flex items-center justify-center flex-col mb-7 p-1 border-gray-100/25 border rounded-md'>
                    <label className=' text-white font-medium mt-2 mb-3'>Veja como está ficando !</label>
                    <article 
                       style={{marginBottom: 8, marginTop:8, backgroundColor: backgroundColorInput}}
                       className='flex w-11/12 max-w-lg flex-col items-center justify-between bg-zinc-900 rounded px-1 py-3'>
                       <p className=' font-medium' style={{color: textColorInput}}>{nameInput}</p>
                    </article>
               </div>
            )}
                <button type='submit' className=' bg-blue-600 h-9 rounded-md text-white font-medium gap-4 flex justify-center items-center'>Cadastrar</button>
             </form>

             <h2 className=' font-bold text-white mb-4 text-2xl'>Meus Links</h2>
             {links.map((item) => (
                <article key={item.id}
                style={{backgroundColor: item.bg, color:item.color}}
                className=' flex items-center justify-between w-11/12 max-w-xl rounded py-3 px-2 mb-2 select-none'>
                   <p>{item.name}</p>
                   <div>
                       <button onClick={() => del(item.id)} className=' border bg-neutral-900 border-dashed p-1 rounded'>
                           <FiTrash size={18} color='fff'/>
                       </button>
                   </div>
                </article>
             ))}
        </div>
       
    )
}