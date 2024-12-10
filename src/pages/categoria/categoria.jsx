import styles from './categoria.module.css';
import {Usuario} from '../../components/usuario/usuario.jsx';
import {useNavigate} from 'react-router-dom';
import {useContext, useEffect, useRef, useState} from 'react';
import {AuthContext} from '../../context/AuthContext.jsx';
import {api} from '../../instance-axios.js';
import Mensagem from '../../components/mensagem/mensagem.jsx';


const Categoria = () => {

    const navigate = useNavigate();

    const {category, setCategory, user} = useContext(AuthContext);

    const [nomeCategory, setNomeCategory] = useState('');
    const [mensagem, setMensagem] = useState('');
    const [objCategory, setObjCategory] = useState();
    const [viewMensagem, setViewMensagem] = useState(false);

    const inputRef = useRef(null);

    useEffect(() => {
        const verifyLog = async () => {
            if (!user.token) {
                navigate('/');
                return;
            }
            try {
                api.defaults.headers.common['Authorization'] = 'Bearer ' + user.token;
                const response = await api.get('/categorias');
                setCategory(response.data);
            } catch (e) {
                console.log(e.message);
            }
        };
        setCategory([]);
        verifyLog();
    }, []);

    const logout = () => {
        navigate('/dashboard');
    };

    const alteraCategoria = (e) => {
        const objCat = category.find(item => item.idcategoria === parseInt(e.target.value));
        setNomeCategory(objCat.descricao);
        setObjCategory(objCat.idcategoria);
    };

    const inputOnFocus = () => {
        inputRef.current.select();
    };

    const novaCategoria = () => {
        setNomeCategory('');
        inputRef.current.focus();
        setObjCategory(-1);
    };

    const saveCategory = async () => {

        if (objCategory === -1) {  //Nova Cartegory
            try {
                const response = await api.post('/categorias', {descricao: nomeCategory});

                if (response.data.idcategoria) {
                    setMensagem('Categoria cadastrada com sucesso...!');
                    setViewMensagem(true);
                }
            } catch (e) {
                if (e.response?.data.error) {
                    setMensagem(e.response.data.error);
                    setViewMensagem(true);
                }
            }

        } else { //Update Category
            try {
                const response = await api.put('/categorias', {descricao: nomeCategory, idcategoria: objCategory});

                if (response.data.idcategoria) {
                    setMensagem('Categoria alterada com sucesso...!');
                    setViewMensagem(true);
                }
            } catch (e) {
                if (e.response?.data.error) {
                    setMensagem(e.response.data.error);
                    setViewMensagem(true);
                }
            }

        }

    };

    const cancelar = () => {
        navigate('/dashboard');
    }

    return (
        <>
            <div>
                {viewMensagem && <Mensagem mensag={mensagem} onClick={cancelar}/>}
            </div>
            <div className={styles.container}>
                <div className={styles.header}>
                    <div className={styles.containerLogo}>
                        <span className={styles.nomeLogo}>Brechó da Maria</span>
                    </div>
                    <div className={styles.containerLogout}>
                        <button type="button" className={styles.buttonVoltar}
                                onClick={logout}>Voltar
                        </button>
                    </div>
                </div>
                <div className={styles.containerDashboard}>
                    <div className={styles.dashboard}>
                        <div className={styles.bemVindo}>
                            <Usuario/> Dashboard
                        </div>
                        <div className={styles.titulo}>
                            Categorias
                        </div>
                        <div className={styles.containerCategoria}>
                            <div className={styles.containerSelecao}>
                                <select className={styles.selectCategory}
                                        onChange={(e) => alteraCategoria(e)}>
                                    <option value={0}>Todas as Categorias</option>
                                    {category.map((cat) => (
                                        <option key={cat.idcategoria}
                                                value={cat.idcategoria}>{cat.descricao}</option>))}
                                </select>
                                <button className={styles.button} onClick={novaCategoria}>+ Nova Categoria</button>
                                {/*<button className={styles.button}>Alterar Categoria</button>*/}
                            </div>
                            <div className={styles.containerEdicao}>
                                <input type="text" className={styles.input} value={nomeCategory}
                                       onChange={(e) => setNomeCategory(e.target.value)}
                                       placeholder="Descrição catagoria...."
                                       ref={inputRef} onFocus={inputOnFocus}/>
                                <button className={styles.button} onClick={() => saveCategory()}>Salvar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Categoria;