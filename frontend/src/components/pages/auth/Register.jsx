import { useContext, useState } from 'react';
import { Link } from "react-router-dom";

import styles from '../../form/Form.module.css';
import Input from '../../form/Input';

// Context
import { Context } from '../../../context/UserContext';

export default function Register() {

    const [user, setUser] = useState({})
    const { register } = useContext(Context)

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        //enviar usuário para o banco
        register(user)
    }

    return (
        <section className={styles.form_container}>
            <h1>Cadastrar</h1>
            <form onSubmit={handleSubmit}>
                <Input
                    text='Nome'
                    type='text'
                    name='name'
                    placeholder='Digite seu nome'
                    handleOnChange={handleChange}
                />
                <Input
                    text='E-mail'
                    type='email'
                    name='email'
                    placeholder='Digite seu email'
                    handleOnChange={handleChange}
                />
                <Input
                    text='Telefone'
                    type='tell'
                    name='phone'
                    placeholder='Informe um numero para contato'
                    handleOnChange={handleChange}
                />
                <Input
                    text='Senha'
                    type='password'
                    name='password'
                    placeholder='Digite a sua senha'
                    handleOnChange={handleChange}
                />
                <Input
                    text='Confirmação de Senha'
                    type='password'
                    name='validate'
                    placeholder='Confirme a sua senha'
                    handleOnChange={handleChange}
                />
                <input type="submit" value="Cadastrar" />
            </form>
            <p>
                Já possui um cadastro?<Link to='/login' >Clique aqui</Link>.
            </p>
        </section>
    );
}