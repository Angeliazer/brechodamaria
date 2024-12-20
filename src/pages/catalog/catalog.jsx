import {useContext, useEffect} from 'react';
import {api} from '../../instance-axios.js';
import {useNavigate} from 'react-router-dom';
import {AuthContext} from '../../context/AuthContext.jsx';
import NavCatalog from '../../components/navCatalog/navCatalog.jsx';
import styles from './catalog.module.css';

const Catalog = () => {

    const navigate = useNavigate();
    const {user, setCategory, setBlockBtn, category} = useContext(AuthContext);
    setBlockBtn(false);

    useEffect(() => {
        const verifyLog = async () => {
            if (!user.token) {
                navigate('/');
                return;
            }
            // Lendo as categorias....
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

    function junta(e){
        console.log(e.target.value);
    }

    return (
        <>
            <NavCatalog category={category}/>
            <div className={styles.containerContent}>
                <select className="form-control" onChange={junta} value="1">
                    <option value="" disabled selected>Selecione uma opção</option>
                    <option value="0">Bebidas</option>
                    <option value="1">Beleza</option>
                    <option value="2">Eletrônicos</option>
                    <option value="3">Escolar</option>
                    <option value="4">Roupas</option>
                </select>
            </div>
        </>
    );
};

export default Catalog;