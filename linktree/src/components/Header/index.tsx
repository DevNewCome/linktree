import { Link } from 'react-router-dom'
import  { BiLogOut } from 'react-icons/bi'
import { auth } from '../../services/firebaseConnection'
import { signOut } from 'firebase/auth'
import { toast } from 'react-toastify'

export default function Header(){


    async function out(){
        await signOut(auth)
            .then(()=>{
                toast.success('Deslogado com sucesso')
            })
            .catch(()=>{
                toast.warning('Houve um erro')
            })
    }

    return(
        <header className=' w-full max-w-2xl mt-4 px-1'>
            <nav className=' w-full bg-white h-12 flex items-center justify-between rounded-md px-3'>
                <div className=' flex gap-4 font-medium'>
                    <Link to='/home'>
                        Home
                    </Link>
                    <Link to='/admin'>
                        Admin
                    </Link>
                    <Link to='/admin/social'>
                        Social
                    </Link>
                </div>
                <button onClick={() => out()}>
                    <BiLogOut size={30} color="#db2629"/>
                </button>
            </nav>
        </header>
    )
}