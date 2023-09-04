import { Link } from "react-router-dom";
import Logo from "../../assets/img/logo.png";

import { useContext } from "react";
import { Context } from "../../context/UserContext";
import styles from "./Navbar.module.css";

export default function Navbar() {

    const { auth, logout } = useContext(Context)

    return (
        <nav className={styles.navbar}>
            <div className={styles.navbar_log}>
                <img src={Logo} alt="get a pet" />
                <span>Get A Pet</span>
            </div>
            <ul>
                <li>
                    <Link to='/' >Adotar</Link>
                </li>
                {auth ?
                    (
                        <>
                            <li>
                                <Link to='/pet/myadoptions' >Minhas Adoções</Link>
                            </li>
                            <li>
                                <Link to='/pet/mypets' >Meus Pets</Link>
                            </li>
                            <li>
                                <Link to='/user/profile' >Perfil</Link>
                            </li>
                            <li onClick={logout}>
                                <Link>Sair</Link>
                            </li>
                        </>
                    )
                    :
                    (
                        <>
                            <li>
                                <Link to='/login' >Entrar</Link>
                            </li>
                            <li>
                                <Link to='/register' >Cadastrar</Link>
                            </li>
                        </>
                    )
                }
            </ul>
        </nav>
    );
}