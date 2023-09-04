import formStyles from './Form.module.css'

import { useState } from 'react'
import Input from './Input'
import Select from './Select'

export default function PetForm({ handleSubmit, petData, btnText }) {
    const [pet, setPet] = useState(petData || {})
    const [preview, setPreview] = useState([])
    const colors = ['Branco', 'Preto', 'Caramelo', 'Cinza', 'Marrom']

    const onFileChange = (e) => {
        setPreview(Array.from(e.target.files))
        setPet({ ...pet, images: [...e.target.files] })
    }
    const handleChange = (e) => {
        setPet({ ...pet, [e.target.name]: e.target.value })
    }
    const handleColor = (e) => {
        setPet({ ...pet, color: e.target.options[e.target.selectedIndex].text })
    }

    const submit = (e) => {
        e.preventDefault()
        handleSubmit(pet)
    }

    return (
        <div className={formStyles.container}>
            <div className={formStyles.preview_pet_images}>
                {preview.length > 0
                    ? preview.map((image, index) => (
                        <img
                            src={URL.createObjectURL(image)}
                            alt={pet.name}
                            key={`${pet.name}+${index}`}
                        />
                    ))
                    : pet.images &&
                    pet.images.map((image, index) => (
                        <img
                            src={`${process.env.REACT_APP_API}/images/pets/${image}`}
                            alt={pet.name}
                            key={`${pet.name}+${index}`}
                        />
                    ))
                }
            </div>
            <form onSubmit={submit} className={formStyles.form_container}>
                <Input
                    text='Imagens do Pet'
                    type='file'
                    name='images'
                    handleOnChange={onFileChange}
                    multiple={true}
                />
                <Input
                    text='Nome'
                    type='text'
                    name='name'
                    placeholder='Digite o nome do Pet'
                    handleOnChange={handleChange}
                    value={pet.name || ''}
                />
                <Input
                    text='Idade'
                    type='text'
                    name='age'
                    placeholder='Informe a idade do Pet'
                    handleOnChange={handleChange}
                    value={pet.age || ''}
                />
                <Input
                    text='Peso'
                    type='number'
                    name='weight'
                    placeholder='Informe o peso do Pet'
                    handleOnChange={handleChange}
                    value={pet.weight || ''}
                />
                <Input
                    text='Descrição'
                    type='text'
                    name='description'
                    placeholder='Escreva sobre as particularidades do Pet'
                    handleOnChange={handleChange}
                    value={pet.description || ''}
                />
                <Select
                    text='Selecione a Cor'
                    type='text'
                    name='color'
                    options={colors}
                    handleOnChange={handleColor}
                    value={pet.color || ''}
                />
                <input type="submit" value={btnText} />
            </form>
        </div>
    )
}