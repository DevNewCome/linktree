        import Header from '../../components/Header'
        import Input from '../../components/input'
        import { useState, useEffect ,  FormEvent } from 'react'
        import { getDocs, addDoc, collection, onSnapshot, query, orderBy, where, doc, setDoc } from 'firebase/firestore'
        import { toast } from 'react-toastify'
        import { db } from '../../services/firebaseConnection'


        interface UserProps{
            uid: string;
        }

        interface LinkProps{
            id: string;
            instagram: string;
            linkedin: string;
            github: string;
            userUid: string;
           
        }


        export default function Networks(){
            const [instagram, setInstagram] = useState('')
            const [linkedin, setLinkedin] = useState('')
            const [github, setGithub ] = useState('')
            const [user, setUser] = useState<UserProps|{}>({})
            const [social, setSocial] = useState<LinkProps[]>([])
            const [edit, setEdit] = useState({
                enabled: true
            })

         
            useEffect(()=>{
                const detailUser = localStorage.getItem('@reactlinks')
                    if(detailUser){
                        const data: UserProps = JSON.parse(detailUser)
                        setUser(data)
                    
                       const socialRef = collection(db, 'social')
                       const q = query(socialRef, orderBy('created', 'asc'), where('userUid', '==', data?.uid))

                        const unsub = onSnapshot(q, (snapshot) => {
                            let listaSocial = [] as LinkProps[]
                                snapshot.forEach((doc)=>{
                                   setInstagram(doc.data().instagram)
                                   setLinkedin(doc.data().linkedin)
                                   setGithub(doc.data().github)
                                })   
                                setSocial(listaSocial)               
                        })
                        return () => {
                            unsub()
                        }
                    }
            },[])

           


            async function register(e: FormEvent) {
                e.preventDefault();
            
                if (instagram === '' || linkedin === '' || github === '') {
                    toast.warning('Preencha todos os campos');
                    setEdit({enabled: false});
                    return;
                }
            
                // Verifique se há algum documento social existente para o usuário atual
                const userSocialRef = collection(db, 'social');
                const userSocialQuery = query(userSocialRef, where('userUid', '==', (user as UserProps)?.uid));
            
                const querySnapshot = await getDocs(userSocialQuery);
            
               /* console.log('Número de documentos encontrados:', querySnapshot.size);*/
            
                if (querySnapshot.size > 0) {
                    // Se existir, atualize o primeiro documento retornado pela consulta
                    const linkId = querySnapshot.docs[0].id;
                   /* console.log('Atualizando documento existente com ID:', linkId);*/
                    await saveEdit(linkId);
                } else {
                    // Se não existir, crie um novo documento
                   /* console.log('Criando novo link, pois não há documentos existentes.');*/
                    await addNewLink();
                }
            }
            
            async function addNewLink() {
                // Adicione um novo documento à coleção
                await addDoc(collection(db, 'social'), {
                    instagram: instagram,
                    linkedin: linkedin,
                    github: github,
                    userUid: (user as UserProps)?.uid || '',
                    created: new Date(),
                })
                .then(() => {
                    toast.success('Cadastrado com sucesso');
                })
                .catch((error) => {
                    console.log(error);
                });
            }
            
            async function saveEdit(id: string) {
                // Atualize o documento existente
                const linkRef = doc(collection(db, 'social'), id);
                await setDoc(linkRef, {
                    instagram,
                    linkedin,
                    github
                }, { merge: true })
                .then(() => {
                    toast.success('Atualizado com sucesso');
                })
                .catch(() => {
                    console.log('Erro ao atualizar');
                });
            }
            

            return(
                <div className=' flex items-center flex-col min-h-screen pb-7 px-2'>
                    <Header/>
                    <h1 className=' text-white text-2xl font-medium mt-8 mb-4'>Minhas redes sociais</h1>
                    <form onSubmit={register} className=' flex flex-col max-w-xl w-full' >

                        <label className=' text-white font-medium mt-2 mb-2' htmlFor="">Link do instagram</label>
                        <Input
                        type='url'
                        placeholder='digite a url do Instagram'
                        value={instagram}
                        onChange={(e) => setInstagram(e.target.value)}
                        />

                        <label className=' text-white font-medium mt-2 mb-2' htmlFor="">Link do Linkedin</label>
                        <Input
                        type='url'
                        placeholder='digite a url do LinkedIn'
                        value={linkedin}
                        onChange={(e) => setLinkedin(e.target.value)}
                        />

                        <label className=' text-white font-medium mt-2 mb-2' htmlFor="">Link do github</label>
                        <Input
                        type='url'
                        placeholder='digite a url do GitHub'
                        value={github}
                        onChange={(e) => setGithub(e.target.value)}
                        />
                        <button 
                        className='font-medium text-white bg-blue-600 py-2 rounded w-full'>
                            {edit.enabled === true ? 'atualizar' : 'cadastrar'}
                            </button>
                    </form>



                </div>
            )
        }