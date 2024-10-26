import { Link } from 'react-router-dom'
import style from './style.module.css'

export default function NotFound(){
    return(
        <div className={style.container}>   
                <h1 className={style.titulo}>Pagina não encontrada</h1>
                <Link className={style.link} to='/'>Go Home</Link>
        </div>
    )
}