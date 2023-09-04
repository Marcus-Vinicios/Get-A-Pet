import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../../utils/api'
import styles from './Home.module.css'

export default function Home() {
    const [pets, setPets] = useState([])

    useEffect(() => {
        api.get('/pets').then((response) => {
            setPets(response.data.pets)
        })
    }, [])

    return (
        <section>
            <div className={styles.pet_home_header}>
                <h1>Adote um Pet.</h1>
                <p>Veja os detalhes de cada um e conheça o tutor deles</p>
            </div>
            <div className={styles.pet_container}>
                {pets.length > 0 &&
                    pets.map((pet) => (
                        <div className={styles.pet_card} key={pet._id}>
                            <div style={{backgroundImage: `url(${process.env.REACT_APP_API}/images/pets/${pet.images[0]})`}} className={styles.pet_card_image}></div>
                            <h3>{pet.name}</h3>
                            <p><span className='bold'>Peso: {pet.weight}kg</span></p>
                            {pet.available
                                ? (<Link to={`pet/${pet._id}`}>Mais detalhes</Link>)
                                : (<p className={styles.adopted_text}>ADOTADO</p>)
                            }
                        </div>
                    ))
                }
            </div>
        </section>
    );
}