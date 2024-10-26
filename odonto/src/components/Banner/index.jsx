import styles from '../Banner/banner.module.css'
import image from '../../../public/odonto.png'

export default function Banner(){
    return(
        <div className={styles.container}>
           <section className={styles.bannerEsquerdo}>
                <img src={image} alt="" />
           </section>
           <section  className={styles.bannerDireito}>
                <div>
                    <span>Seja bem vindo</span><br /><br />
                    <span>SEU SLOGAN</span>
                    <span>ou texto aqui</span>
                    <p> Breve introdução da empresa aqui.
                        Breve introdução da empresa aqui.
                        Breve introdução da empresa aqui.
                        Breve introdução da empresa aqui.
                        Breve introdução da empresa aqui.
                        Breve introdução da empresa aqui.
                    </p>
                    <button>Agende uma consulta</button>
                </div>
           </section>
        </div>
    )
}