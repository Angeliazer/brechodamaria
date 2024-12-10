import styles from './cadastro.module.css';
import fundo from '../../assets/05-Como-abrir-um-brecho.jpg';
import {Link, useNavigate} from 'react-router-dom';
import {useState} from 'react';
import Mensagem from '../../components/mensagem/mensagem.jsx';
import {api} from '../../instance-axios.js';
import {Usuario} from '/src/models/model.usuario.js';

const Cadastro = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password1, setPassword1] = useState('');
    const [apelido, setApelido] = useState('');
    const [nome, setNome] = useState('');
    const [error, setError] = useState(false);
    const [mensagem, setMensagem] = useState('');
    const [viewMessage, setViewMessage] = useState(false);
    const navigate = useNavigate();

    const salvarApi = async () => {

        const dateCadastre = new Date().toISOString().split('T')[0];

        if (password !== password1) {
            setMensagem('Senhas diferentes...!');
            setError(true);
        }

        const usuario = new Usuario();

        usuario.email = email;
        usuario.password = password;
        usuario.nome = nome;
        usuario.apelido = apelido;
        usuario.dataCadastro = dateCadastre;

        try {
            setViewMessage(false);
            const response = await api.post('/usuarios', usuario);
            localStorage.setItem('usuario', JSON.stringify(response.data));
            setMensagem('Registro Cadastrado com Sucesso!');
            setError(true);
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
    const limparSenhas = () => {
        setPassword('');
        setPassword1('');
        setMensagem('');
        setError(false);
    };

    return (
        <>
            <div>
                {viewMessage && <Mensagem mensag={error} onClick={limparSenhas} />}
            </div>
            <div className={styles.containerPrincipal}>
                <div className={styles.containerTexto}>
                    <div className={styles.titulo}>
                        <span className={styles.nomeLogo}>Brechó da Maria</span>
                    </div>
                    <div className={styles.containerCadastro}>
                        <div className="w-100 d-flex justify-content-center">
                            <label className={styles.textoLabel}>Novo Usuário</label>
                        </div>
                        <div className="w-100 d-flex mt-3 justify-content-center flex-column">
                            <div>
                                <label className="w-100">Nome</label>
                            </div>
                            <div>
                                <input value={nome} className={styles.input} placeholder="Nome usuário"
                                       onChange={(e) => setNome(e.target.value)}/>
                            </div>
                        </div>
                        <div className="w-100 d-flex mt-3 justify-content-center flex-column">
                            <div>
                                <label className="w-100">Apelido</label>
                            </div>
                            <div>
                                <input value={apelido} className={styles.input} placeholder="Como quer ser chamado(a)"
                                       onChange={(e) => setApelido(e.target.value)}/>
                            </div>
                        </div>
                        <div className="w-100 d-flex mt-3 justify-content-center flex-column">
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

                            <div className="w-100 d-flex mt-4 justify-content-center flex-column">
                                <div>
                                    <label className="w-100">Confirm Password</label>
                                </div>
                                <input value={password1} type="password" className={styles.input}
                                       placeholder="Confirm Password"
                                       onChange={(e) => setPassword1(e.target.value)}/>
                            </div>
                        </div>

                        <div className="d-flex w-100 mt-4 justify-content-center align-items-center flex-column mb-5">
                            <button type="button" className={styles.buttonLogin} onClick={() => salvarApi()}>Salvar
                            </button>
                        </div>
                        <div className={styles.textSemCadastro}>
                            <div>
                                <span>Já tem conta?</span>
                                <Link to={'/'}>
                                    <span className={styles.conta}> Clique aqui.</span>
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

export default Cadastro;