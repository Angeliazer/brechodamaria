import {useContext} from 'react';
import styles from './navbar.module.css';
import {useNavigate} from 'react-router-dom';
import {AuthContext} from '../../context/AuthContext.jsx';
import {Usuario} from '../usuario/usuario.jsx';

const Navbar = () => {

    const navigate = useNavigate();

    const {setUser} = useContext(AuthContext);

    const logout = () => {
        //Limpa o localStorage

        setUser('');
        localStorage.removeItem('usuario');
        navigate('/');
    };

    const catalogo = () => {
        navigate('/catalog');
    };
    return (
        <div className={styles.containerNavbar}>
            <div className={styles.header}>
                <div className={styles.containerLogo}>
                    <img className={styles.logotipo} src="/src/assets/pexels-kowalievska-1148957.jpg" alt="logo"/>
                    <span className={styles.nomeLogo}>Brechó da Maria</span>
                </div>
                <div className={styles.containerButton}>
                    <button type="button" className={styles.button}>Home</button>
                    <button type="button" className={styles.button} onClick={catalogo}>Produtos</button>
                    <button type="button" className={styles.button}>Sobre Nós</button>
                    <button type="button" className={styles.button}>Contato</button>
                </div>

                <div className={styles.containerLogout}>
                    <button type="button" className={`${styles.button}`}
                            onClick={() => logout()}>Logout
                    </button>
                </div>
            </div>
            <div className={styles.bemVindo}>
                <Usuario/>
            </div>
        </div>
    );
};

export default Navbar;


