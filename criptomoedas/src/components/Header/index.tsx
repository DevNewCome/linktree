import styles from './header.module.css'
import logo from '../../assets/logo.svg'
import { Link } from 'react-router-dom'
export default function Header(){
    return(
        <header>
        <div className={styles.container}>
            <div className={styles.logo}>
                <Link to='/'>
                  <img src={logo} alt="logo cripto" />
                </Link>         
            </div>
        </div>
        </header>

    )
}