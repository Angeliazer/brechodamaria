import styles from './home.module.css';
import Navbar from '../../components/navbar/navbar.jsx';
import {useContext, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {AuthContext} from '../../context/AuthContext.jsx';
import fundo from '/src/assets/05-Como-abrir-um-brecho.jpg';
// import {Usuario} from '../../components/usuario/usuario.jsx';

const Home = () => {
    const {user} = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const verificarLogin = async () => {
            if (!user.token) {
                navigate('/');
                return;
            }
            navigate('/home');
        };
        verificarLogin();
    }, []);

    return (<>
            <div className={styles.containerPrincipal}>
                <div>
                    <Navbar/>
                </div>
                <div className="w-100 d-flex mt-3 justify-content-center h-100 flex-row mt-0">
                    <div className={styles.containerTexto}>
                        <div className={styles.texto}>
                        <span>
                            Aqui, moda sustentável e acessível é o nosso propósito!
                            Descubra peças únicas que contam histórias, promovem o consumo consciente e refletem o
                            seu
                            estilo.
                            Seja você um amante de tendências ou um caçador de tesouros vintage, nosso brechó
                            oferece
                            uma
                            seleção especial para todos os gostos e ocasiões.
                            Por que escolher o Brechó da Maria?
                            Sustentabilidade: Reduzimos o impacto ambiental reaproveitando roupas incríveis.
                            Preços Justos: Encontre qualidade e estilo sem gastar muito.
                            Exclusividade: Cada peça é única, escolhida com carinho para você.

                            Aproveite a experiência de garimpar moda com significado e reescrever a história de cada

                            peça.

                            Explore nossa coleção agora e leve para casa um pouco de originalidade e amor pelo
                            planeta!

                            <br/>
                            <b> Garimpe.</b>
                            <br/>
                            <b>Reutilize.</b>
                            <br/>
                            <b>Transforme.</b>
                        </span>
                        </div>
                    </div>
                    <div className={styles.containerImagem}>
                        <img className={styles.backgroundLogin} src={fundo} alt="fundo"/>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;

