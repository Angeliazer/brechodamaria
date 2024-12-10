import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from './pages/home/home.jsx';
import Login from './pages/login/login.jsx';
import Cadastro from './pages/cadastro/cadastro.jsx';
import AuthProvider from './context/AuthContext.jsx';
import Catalog from './pages/catalog/catalog.jsx';
import CadastroCategory from './pages/cadastroCategory/cadastroCategory.jsx';
import Dashboard from './pages/dashboard/dashboard.jsx';
import Categoria from './pages/categoria/categoria.jsx';
function Rotas() {

    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<Login/>}/>
                    <Route path="/home" element={<Home/>}/>
                    <Route path="/cadastro" element={<Cadastro/>}/>
                    <Route path="/catalog" element={<Catalog/>}/>
                    <Route path="/cadastroCategory" element={<CadastroCategory/>}/>
                    <Route path="/dashboard" element={<Dashboard/>}/>
                    <Route path="/categoria" element={<Categoria/>}/>
                </Routes>
            </AuthProvider>
        </BrowserRouter>);
}

export default Rotas;