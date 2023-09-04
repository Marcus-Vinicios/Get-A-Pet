import { useEffect, useState } from 'react';

import api from '../../../utils/api';
import RoundedImage from '../../layout/RoundedImage';
import styles from './Dashboard.module.css';

export default function MyAdoptions() {
    const [pets, setPets] = useState([])
    const [token] = useState(localStorage.getItem('token' || ''))

    useEffect(() => {
        api.get('/pets/myadoptions', {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        }).then((response) => {
            setPets(response.data.pets)
        })
    }, [token])

    return (
        <section className={styles}>
            <div className={styles.petlist_header}>
                <h1>Minhas Adoções</h1>
            </div>
            <div className={styles.petlist_container}>
                {pets.length > 0 &&
                    pets.map((pet) => (
                        <div key={pet.id} className={styles.petlist_row}>
                            <RoundedImage
                                src={`${process.env.REACT_APP_API}/images/pets/${pet.images[0]}`}
                                alt={pet.name}
                                width="px80"
                            />
                            <span className='bold'>{pet.name}</span>
                            <div>
                                <p>
                                    <span className="bold">Fale com:</span> {pet.user.name}
                                </p>
                                <p>
                                    <span className="bold">contato:</span> {pet.user.phone}
                                </p>
                            </div>
                            <div className={styles.actions}>
                                {pet.available ? (
                                    <p>Adoção em processo.</p>
                                ) : (<p className={styles.adopted_text}>Adoção concluida.</p>)}
                            </div>
                        </div>
                    ))
                }
                {pets.length === 0 && <p>Ainda não ha adoções de Pets.</p>}
            </div>
        </section>
    )
}