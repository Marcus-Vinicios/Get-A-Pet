import { useContext, useState } from 'react';
import { Link } from "react-router-dom";

import styles from '../../form/Form.module.css';
import Input from '../../form/Input';

//Context
import { Context } from '../../../context/UserContext';

export default function Login() {

    const [user, setUser] = useState({})
    const { login } = useContext(Context)

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        login(user)
    }

    return (
        <section className={styles.form_container}>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <Input
                    text='E-mail'
                    type='email'
                    name='email'
                    placeholder='Digite seu email'
                    handleOnChange={handleChange}
                />
                <Input
                    text='Senha'
                    type='password'
                    name='password'
                    placeholder='Digite a sua senha'
                    handleOnChange={handleChange}
                />
                <input type="submit" value="Entrar" />
            </form>
            <p>
                Ainda não possui um cadastro?<Link to='/register' >Clique aqui</Link>.
            </p>
        </section>
    );
}