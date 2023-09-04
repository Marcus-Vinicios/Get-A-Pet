import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import PetForm from '../../form/PetForm';
import styles from './AddPet.module.css';

import useFlashMessage from '../../../hooks/useFlashMessage';
import api from '../../../utils/api';

export default function PetEdit() {
    const [pet, setPet] = useState({})
    const [token] = useState(localStorage.getItem('token') || '')
    const { id } = useParams()
    const { setFlashMessage } = useFlashMessage()
    const navigate = useNavigate()

    useEffect(() => {

        api.get(`/pets/${id}`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        }).then((response) => {
            setPet(response.data.pet)
        })

    }, [token, id])

    const updatePet = async (pet) => {
        let msgType = 'success'

        const formData = new FormData()

        await Object.keys(pet).forEach((key) => {
            if(key === 'images') {
                for (let i = 0; i < pet[key].length; i++ ) {
                    formData.append('images', pet[key][i])
                }
            } else {
                formData.append(key, pet[key])
            }
        })

        const data = await api.patch(`/pets/${pet._id}`, formData, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
                'Content-Type': 'multipart/form-data'
            }
        }).then((response) => {
            return response.data
        }).catch((err) => {
            msgType = 'error'
            return err.response.data
        })

        setFlashMessage(data.message, msgType)

        if (msgType !== 'error') {
            navigate('/pet/mypets')
        }
    }

    return (
        <section>
            <div className={styles.addpet_header}>
                <h1>Editando um Pet: {pet.name}</h1>
            </div>
            {pet.name && (
                <PetForm handleSubmit={updatePet} btnText='Editar Pet' petData={pet} />
            )}
        </section>
    );
}