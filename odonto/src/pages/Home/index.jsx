import styles from './index.module.css'
import Header from '../../components/Header'
import Banner from '../../components/Banner'
import Tratamento from '../../components/Servicos'
import Wpp from '../../../public/icons8-whatsapp-48.png'

export default function Home(){
    return(
        <div className={styles.container}>
            <Banner/>
            <Tratamento/>
            <div className={styles.icon}>
            <a href="https://wa.me/5512988350310?text=Oi!%20Teste" target="_blank"><img src={Wpp} alt="" /></a>
            </div>  
        </div>
    )
}