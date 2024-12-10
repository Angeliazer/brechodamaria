import styles from './navCatalog.module.css';
import {useNavigate} from 'react-router-dom';
import {Usuario} from '../usuario/usuario.jsx';
// import {useContext} from 'react';
// import {AuthContext} from '../../context/AuthContext.jsx';
import {Client} from '/src/asaas.js';
import {api} from '/src/instance-axios.js';


const NavCatalog = ({category}) => {

        const navigate = useNavigate();

        const addCliente = async () => {

            const cliente = new Client();

            cliente.name = 'Jesse da Costa';
            cliente.email = 'cida.rigon@hotmail.com';
            cliente.address = 'Rua Santos da Cruz';
            cliente.addressNumber = '216';
            cliente.cpfCnpj = '91605156787';
            cliente.complement = 'sobrado';
            cliente.externalReference = '100';
            cliente.mobilePhone = '21967453213';
            cliente.notificationDisabled = true;
            cliente.postalCode = '24460170';
            cliente.province = 'Mutuá';

            try {
                const response = await api.post('/clienteAsaas', cliente);
                console.log(response.data);
            } catch (e) {
                console.log(e.message);
            }
        };

        const back = () => {
            navigate('/home');
        };

        return (
            <div className={styles.containerCatalog}>
                <div className={styles.header}>
                    <div className={styles.containerLogo}>
                        <img className={styles.logotipo} src="/src/assets/pexels-kowalievska-1148957.jpg" alt="logo"/>
                        <span className={styles.nomeLogo}>Brechó da Maria</span>
                    </div>
                    <div className={styles.containerButtons}>
                        <select className={styles.buttonNovaCategory}>
                                 {/*onChange={(e) => cadastroGroup(e.target.value)} disabled={blockBtn}*/}
                            <option value={0}>Todas os Grupos</option>
                            {category.map((cat) => (
                                <option key={cat.idcategoria} value={cat.idcategoria}>{cat.descricao}</option>))}
                        </select>
                        <select className={styles.buttonNovaCategory}>
                                 {/*onChange={(e) => cadastroCategory(e.target.value)} disabled={blockBtn}*/}
                            <option value={0}>Todas as Categorias</option>
                            {category.map((cat) => (
                                <option key={cat.idcategoria} value={cat.idcategoria}>{cat.descricao}</option>))}
                        </select>
                        <button type="button" className={styles.buttonNovoGrupo} onClick={addCliente}>Pesquisar</button>
                    </div>
                    <div className={styles.containerLog}>
                        <button type="button" className={styles.buttonNovoGrupo} onClick={back}>Voltar</button>
                    </div>

                </div>
                <div className={styles.bemVindo}>
                    <Usuario/>
                </div>
            </div>
        );
    }
;

export default NavCatalog;