import styles from './mensagem.module.css';
import imagem from "/src/assets/sucesso1.png";

const Mensagem = ({mensag, onClick}) => {
    return (
        <div className={styles.container}>
            <div className={styles.boxMensagem}>
                <span className={styles.texto}>{mensag}</span>
                <img className={styles.imagem} src={imagem} alt="Logo Sucesso" />
                <button className={styles.button} onClick={onClick} >Ok</button>
            </div>
        </div>
    );
};

export default Mensagem;