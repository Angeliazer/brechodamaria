import styles from './dashboard.module.css';
import {Usuario} from '../../components/usuario/usuario.jsx';
import {useNavigate} from 'react-router-dom';
import {useContext, useEffect} from 'react';
import {AuthContext} from '../../context/AuthContext.jsx';

const Dashboard = () => {

    const navigate = useNavigate();
    const {user} = useContext(AuthContext);

    useEffect(() => {
        const verifLog = () => {
            !user.token && navigate('/');
        };
        verifLog();
    });

    const cadCategory = () =>{
        navigate('/categoria');

    }

    const cadGrupo = () =>{


    }


    const logout = () => {
        navigate('/');
    };
    return (<>
            <div className={styles.container}>
                <div className={styles.header}>
                    <div className={styles.containerLogo}>
                        <span className={styles.nomeLogo}>Brechó da Maria</span>
                    </div>
                    <div className={styles.containerLogout}>
                        <button type="button" className={`${styles.button}`}
                                onClick={logout}>Logout
                        </button>
                    </div>
                </div>
                <div className={styles.containerDashboard}>
                    <div className={styles.dashboard}>
                        <div className={styles.bemVindo}>
                            <Usuario/> Dashboard
                        </div>
                    </div>

                    <div className={styles.containerOutDash}>

                        <div className={`btn ${styles.containerDash}`} onClick={cadGrupo}>

                            <span>Grupos</span>

                        </div>
                        <div className={`btn ${styles.containerDash}`} onClick={cadCategory}>

                            <span>Categorias</span>
                        </div>
                        <div className={styles.containerDash}>

                            <span>Produtos</span>
                        </div>
                    </div>
                    <div className={styles.containerOutDash}>

                        <div className={styles.containerDash}>
                            <span>Vendas do Mês</span>

                        </div>
                        <div className={styles.containerDash}>
                            <span>Vendas do Ano</span>

                        </div>
                    </div>


                </div>
            </div>
        </>
    );
};

export default Dashboard;

