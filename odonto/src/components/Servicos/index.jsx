import styles from './servicos.module.css'
import { Link } from 'react-router-dom'

export default function Servicos(){
    return(
        <div className={styles.container}>
            <div className={styles.textContent}>
                <h3>Tratamento</h3>
                <h1>Conheça os tratamentos</h1>
                <h1>Da "Clinica São Jorge"</h1>
            </div>
            <div className={styles.services}>
                <div className={styles.service}>
                    <img src="" alt="" />
                     <span>Implatodontia</span>
                     <p>Especialidade que afz implante dentário e promove a reabilitação
                        oral de pacientes que sofreram perda de dentes</p>
                        <Link to={'/implatodontia'}>Saiba mais</Link>
                </div>

                <div className={styles.service}>
                <img src="" alt="" />
                     <span>Limpeza</span>
                     <p>Especialidade que afz implante dentário e promove a reabilitação
                        oral de pacientes que sofreram perda de dentes</p>
                        <Link to={'/limpeza'}>Saiba mais</Link>
                </div>

                <div className={styles.service}>
                     <img src="" alt="" />
                     <span>Protese dentária</span>
                     <p>Especialidade que afz implante dentário e promove a reabilitação
                        oral de pacientes que sofreram perda de dentes</p>
                        <Link to={'/implatodontia'}>Saiba mais</Link>
                </div>

                <div className={styles.service}>
                     <img src="" alt="" />
                     <span>Endodontia</span>
                     <p>Especialidade que afz implante dentário e promove a reabilitação
                        oral de pacientes que sofreram perda de dentes</p>
                        <Link to={'/implatodontia'}>Saiba mais</Link>
                </div>

                <div className={styles.service}>
                     <img src="" alt="" />
                     <span>Estetica</span>
                     <p>Especialidade que afz implante dentário e promove a reabilitação
                        oral de pacientes que sofreram perda de dentes</p>
                        <Link to={'/implatodontia'}>Saiba mais</Link>
                </div>

                <div className={styles.service}>
                     <img src="" alt="" />
                     <span>Cirurgia</span>
                     <p>Especialidade que afz implante dentário e promove a reabilitação
                        oral de pacientes que sofreram perda de dentes</p>
                        <Link to={'/implatodontia'}>Saiba mais</Link>
                </div>
            </div>
        </div>
    )
}