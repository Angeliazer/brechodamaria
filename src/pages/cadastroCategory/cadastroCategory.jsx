import styles from './cadastroCategory.module.css';
import {useState} from 'react';
import NavCatalog from '../../components/navCatalog/navCatalog.jsx';
import {api} from '../../instance-axios.js';
import {useNavigate} from 'react-router-dom';
import Mensagem from '../../components/mensagem/mensagem.jsx';

const CadastroCategory = () => {

    const [viewMensagem, setViewMensagem, nomeCategoria, setNomeCategoria] = useState('');
    const navigate = useNavigate();

    const cancelar = () => {
        setViewMensagem(false);
        navigate('/catalog');
    };

    const saveCategory = async () => {
        try {
            const response = await api.post('/categorias', {descricao: nomeCategoria});
            if (response.data.idcategoria) {
                setViewMensagem(true);
                navigate('/catalog');
            }
        } catch (e) {
            if (e.response?.data.error) {
                console.log(e.response.data.error);
            }
        }
    };
    return (
        <>
            {viewMensagem && <Mensagem mensag="Categoria Cadastrada com sucess...." onClick={cancelar}/>}
            <div className={styles.containerPrincipal}>
                <NavCatalog/>
                <div className={styles.containerTexto}>
                    <div className={styles.containerLogin}>
                        <div className="w-100 d-flex mt-3 justify-content-center">
                            <label className={styles.textoLabel}>Nova Categoria</label>
                        </div>
                        <div className="w-100 d-flex mt-5 justify-content-center flex-column">
                            <div className="mb-2">
                                <label>Descrição Categoria</label>
                            </div>
                            <div>
                                <input value={nomeCategoria} className={styles.input} placeholder="Descrição"
                                       onChange={(e) => setNomeCategoria(e.target.value)}/>
                            </div>
                        </div>
                        <div className={styles.containerButton}>
                            <button type="button" className={styles.buttonCancel} onClick={cancelar}>Cancelar</button>
                            <button type="button" className={styles.buttonSalvar} onClick={saveCategory}>Salvar</button>
                        </div>
                    </div>
                </div>
            </div>
        </>);
};
export default CadastroCategory;




