import {useContext} from 'react';
import {AuthContext} from '../../context/AuthContext.jsx';

export const Usuario = () => {
    const {user} = useContext(AuthContext);
    return (
        <div>
            {user.apelido ? <span> Bem vindo: {user.apelido} </span> : null}
        </div>
    );
};

