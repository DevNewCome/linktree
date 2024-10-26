import style from '../Header/header.module.css'


export default function Header(){
    return(
    
        <div className={style.menu}>
            <div className={style.logo}>
                <img src="" alt="" />
                <div className={style.menuLogoText}>
                    <span>SEU LOGO</span>
                    <span>AQUI</span>
                 </div>
            </div>
            <nav>
                <ul>
                    <li>Home</li>
                    <li>Serviços</li>
                    <li>Sobre Nós</li>
                    <li>Contato</li>
                </ul>
            </nav>
        </div>  
    )
}