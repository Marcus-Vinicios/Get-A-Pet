import { useEffect, useState, } from 'react'
import { useNavigate } from 'react-router-dom'

import formStyles from '../../form/Form.module.css'
import styles from './Profile.module.css'

import useFlashMessage from '../../../hooks/useFlashMessage'

import api from '../../../utils/api'
import Input from '../../form/Input'
import RoundedImage from '../../layout/RoundedImage'

export default function Profile() {
    const [user, setUser] = useState({})
    const [preview, setPreview] = useState()
    const [editable, setEditable] = useState(false)
    const [token] = useState(localStorage.getItem('token') || '')
    const { setFlashMessage } = useFlashMessage()
    const navigate = useNavigate()

    useEffect(() => {
        api
            .get('/user/checkuser', {
                headers: {
                    Authorization: `Bearer ${JSON.parse(token)}`,
                },
            })
            .then((response) => {
                setUser(response.data)
            })
            .catch((err) => {
                return err.response.data
            })


    }, [token])

    function handleChange(e) {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    function onFileChange(e) {
        setPreview(e.target.files[0])
        setUser({ ...user, [e.target.name]: e.target.files[0] })
    }

    const handleEdit = () => {
        setEditable(true)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        let msgType = 'success'

        const formData = new FormData()

        await Object.keys(user).forEach((key) =>
            formData.append(key, user[key]),
        )

        const data = await api
            .patch(`user/edit/${user._id}`, formData, {
                headers: {
                    Authorization: `Bearer ${JSON.parse(token)}`,
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then((response) => {
                console.log(response.data)
                return response.data
            })
            .catch((err) => {
                console.log(err)
                msgType = 'error'
                return err.response.data
            })

        setFlashMessage(data.message, msgType)
        setEditable(false)
    }

    return (
        <section>
            <div className={styles.profile_header}>
                <h1>Perfil</h1>
                {(user.image || preview) && (
                    <RoundedImage
                        src={preview
                            ? URL.createObjectURL(preview)
                            : `${process.env.REACT_APP_API}/images/users/${user.image}`}
                    // alt={user.image}
                    />
                )}
            </div>
            <form onSubmit={handleSubmit} className={formStyles.form_container}>
                {editable ? (
                    <>
                        <Input
                            text='Imagem'
                            type='file'
                            name='image'
                            handleOnChange={onFileChange}
                        />
                        <Input
                            text='Email'
                            type='email'
                            name='email'
                            handleOnChange={handleChange}
                            placeholder='Digite o seu email'
                            value={user.email || ''}
                        />
                        <Input
                            text='Usuário'
                            type='text'
                            name='name'
                            handleOnChange={handleChange}
                            placeholder='Digite o seu nome'
                            value={user.name || ''}
                        />
                        <Input
                            text='Telefone'
                            type='tell'
                            name='phone'
                            handleOnChange={handleChange}
                            placeholder='Digite o seu telefone'
                            value={user.phone || ''}
                        />
                        <Input
                            text='Senha'
                            type='password'
                            name='password'
                            handleOnChange={handleChange}
                            placeholder='Digite a sua senha'
                        />
                        <Input
                            text='Confirmação de Senha'
                            type='password'
                            name='validate'
                            handleOnChange={handleChange}
                            placeholder='Confirme a sua senha'
                        />
                    </>
                ) : (
                    <>
                        <Input
                            text='Email'
                            type='email'
                            name='email'
                            handleOnChange={handleChange}
                            value={user.email || ''}
                            readOnly={true}
                        />
                        <Input
                            text='Usuário'
                            type='text'
                            name='name'
                            handleOnChange={handleChange}
                            value={user.name || ''}
                            readOnly={true}
                        />
                        <Input
                            text='Telefone'
                            type='tell'
                            name='phone'
                            handleOnChange={handleChange}
                            value={user.phone || ''}
                            readOnly={true}
                        />
                    </>
                )}
                {editable ?
                    (<input type="submit" value="Salvar" />)
                    :
                    (<button className={formStyles.btn} onClick={handleEdit}>Editar</button>)
                }
            </form>
        </section>
    )
}