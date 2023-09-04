import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import PetForm from '../../form/PetForm';
import styles from './AddPet.module.css';

import useFlashMessage from '../../../hooks/useFlashMessage';
import api from '../../../utils/api';

export default function AddPet() {
    const [token] = useState(localStorage.getItem('token') || '')
    const { setFlashMessage } = useFlashMessage()
    const navigate = useNavigate()

    const registerPet = async (pet) => {
        let msgType = 'success'

        const formData = new FormData()

        await Object.keys(pet).forEach((key) => {
            if (key === 'images') {
                for (let i = 0; i < pet[key].length; i++) {
                    formData.append(key, pet[key][i])
                }
            } else {
                formData.append(key, pet[key])
            }
        })

        const data = await api
            .post(`/pets/create`, formData, {
                headers: {
                    Authorization: `Bearer ${JSON.parse(token)}`,
                    'Content-Type': 'multipart/form-data',
                }
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

        if (msgType !== 'error') {
            navigate('/pet/mypets')
        }
        console.log(data)
    }

    return (
        <section>
            <div className={styles.addpet_header}>
                <h1>Cadastre um Pet</h1>
                <p>Despois ele ficará disponivel para adoção.</p>
            </div>
            <PetForm handleSubmit={registerPet} btnText='Cadastrar Pet' />
        </section>
    );
}