import styles from './notfound.module.css'
import { Link } from 'react-router-dom'

export default function notFound(){
    return(
        <div>
            <h1>404 Página não encontrada</h1>
            <Link to={'/'}>Retorne para página principal</Link>
        </div>
    )
}