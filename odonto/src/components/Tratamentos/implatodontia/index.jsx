import styles from './trat.module.css'
import { Link } from 'react-router-dom'

export default function implatodontia(){
    return(
    <div className={styles.container}>
        <div className={styles.container1}>
            <div className={styles.titulo}>
              <h2>Tratamento odontológicos</h2>
              <h1>IMPLATODONTIA</h1>
            </div>    
            <div className={styles.containerContent}>
                <div className={styles.content}>
                    <p>
                    O implante dentário é um procedimento seguro e indolor; ideal para repor um ou mais dentes naturais perdidos.
                    Os implantes têm a função de devolver um sorriso estético bem natural com as funções mastigatórias adequadas e equilibradas.
                    A nanotecnologia permite uma cicatrização mais rápida assim o tempo do pós-operatório é mais acelerado.
                    Aqui na Clínica Saraiva você pode realizar seus implantes dentários dormindo no nosso Dental SPA.
                    Consulte-nos para mais informações.
                    </p>
                </div>
            </div>
        </div>  
        <h1>Veja também</h1>
        <div className={styles.container2}>
            <div className={styles.servicos}>
                <div className={styles.servico}>
                    <span>Manutenção Oral</span>
                    <Link to='/manutencao'>Saiba mais</Link>
                </div>
                <div className={styles.servico}>
                 <span>periodontia </span>
                 <Link to='/periodontia'>Saiba mais</Link>   
                </div>
                <div className={styles.servico}>
                 <span>limpeza</span>
                 <Link to='/limpeza'>Saiba mais</Link>  
                </div>
            </div>
        </div>
     </div>
    )
}