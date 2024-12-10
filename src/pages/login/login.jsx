import styles from './login.module.css';
import fundo from '/src/assets/05-Como-abrir-um-brecho.jpg';
import {Link, useNavigate} from 'react-router-dom';
import {useContext, useState} from 'react';
import {api} from '/src/instance-axios.js';
import Mensagem from '../../components/mensagem/mensagem.jsx';
import {AuthContext} from '../../context/AuthContext.jsx';
import Navbar from '../../components/navbar/navbar.jsx';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [viewMessage, setViewMessage] = useState(false);
    const [error, setError] = useState('');

    const {setUser} = useContext(AuthContext);

    const loginApi = async () => {
        try {
            setViewMessage(false);
            const response = await api.post('/usuarios/login', {email, password});
            response.data.dataCadastro = response.data.dataCadastro.split('T')[0];
            // Save to localStorage
            localStorage.setItem('usuario', JSON.stringify(response.data));
            api.defaults.headers.common.Authorization = 'Bearer ' + response.data.token;
            setUser(response.data);

            if (response.data.email === 'admin@admin.com.br')
                navigate('/dashboard');
            else
                navigate('/home');

        } catch (e) {
            if (e.response?.data.error) {
                setError(e.response.data.error);
                setViewMessage(true);
            } else {
                setError(e.message);
                setViewMessage(true);
            }
        }
    };
    const handledClick = () => {
        setViewMessage(false);
    };
    return (
        <>
            <div>
                {viewMessage && <Mensagem mensag={error} onClick={handledClick}/>}
            </div>
            <Navbar/>
            <div className={styles.containerPrincipal}>
                <div className={styles.containerTexto}>
                    <div className={styles.containerLogin}>
                        <div className="w-100 d-flex mt-3 justify-content-center">
                            <label className={styles.textoLabel}>Login</label>
                        </div>
                        <div className="w-100 d-flex mt-5 justify-content-center flex-column">
                            <div>
                                <label className="w-100">Email</label>
                            </div>
                            <div>
                                <input value={email} className={styles.input} placeholder="Email"
                                       onChange={(e) => setEmail(e.target.value.toLowerCase())}/>
                            </div>
                        </div>
                        <div className="w-100 d-flex mt-4 justify-content-center flex-column">
                            <div>
                                <label className="w-100">Password</label>
                            </div>
                            <div>
                                <input value={password} type="password" className={styles.input}
                                       placeholder="Password"
                                       onChange={(e) => setPassword(e.target.value)}/>
                            </div>
                        </div>
                        <div
                            className="d-flex w-100 mt-4 justify-content-center align-items-center flex-column mb-5">
                            <button type="button" className={styles.buttonLogin} onClick={loginApi}>Acessar</button>
                        </div>
                        <div className={styles.textSemCadastro}>
                            <div>
                                <span>Não tem conta?</span>
                                <Link to={'/Cadastro'}>
                                    <span className={styles.conta}> Clique aqui.</span>
                                </Link>
                            </div>
                            <div>
                                <Link to={'/Cadastro'}>
                                    <span>Esqueceu a Senha?</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.containerImagem}>
                    <img src={fundo} className={styles.backgroundLogin} alt="fundo"/>
                </div>
            </div>
        </>
    );
};

export default Login;