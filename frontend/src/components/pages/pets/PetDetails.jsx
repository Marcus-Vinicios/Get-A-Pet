import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"

import useFlashMessage from "../../../hooks/useFlashMessage"
import api from "../../../utils/api"
import styles from './Pet.module.css'

export default function PetDetails() {
    const [pet, setPet] = useState({})
    const { id } = useParams()
    const { setFlashMessage } = useFlashMessage()
    const [token] = useState(localStorage.getItem('token' || ''))

    useEffect(() => {

        api.get(`/pets/${id}`).then((response) => {
            setPet(response.data.pet)
        })

    }, [id])

    const schedule = async () => {
        let msgType = 'success'

        const data = await api.patch(`/pets/schedule/${pet._id}`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
            }
        }).then((response) => {
            return response.data
        }).catch((err) => {
            msgType = 'error'
            return err.response.data
        })

        setFlashMessage(data.message, msgType)
    }

    return (
        <>
            {pet.name && (
                <section className={styles.pet_details_container}>
                    <div className={styles.pet_details_header}>
                        <h1>Detalhes sobre: {pet.name}</h1>
                        <p>Caso tenha interesse marque uma visita para conhece-lo.</p>
                    </div>
                    <div className={styles.pet_images}>
                        {pet.images.map((image, index) => (
                            <img
                                src={`${process.env.REACT_APP_API}/images/pets/${image}`}
                                alt={pet.name}
                                key={index}
                            />
                        ))}
                    </div>
                    <p>
                        <span className="bold">Tutor:</span> {pet.user.name}
                    </p>
                    <p>
                        <span className="bold">Cor:</span> {pet.color}
                    </p>
                    <p>
                        <span className="bold">Peso:</span> {pet.weight}kg
                    </p>
                    <p>
                        <span className="bold">Idade:</span> {pet.age} anos
                    </p>
                    {pet.description
                        ? <p>
                            <span className="bold">Descrição:</span> {pet.description}
                          </p>
                        : <p>
                            <span className="bold">Descrição:</span> Não foi informada nenhuma particularidade para este Pet.
                          </p>
                    }
                    {token
                        ? (<button onClick={schedule}>Solicitar visita</button>)
                        : (<p>Você precisa estar conectado para agendar uma visita. <Link to={'/register'}>Clique aqui</Link> para se cadastrar.</p>)}
                </section>
            )}
        </>
    )
}