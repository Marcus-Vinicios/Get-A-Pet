const Pet = require("../models/Pet")
const { Mongoose } = require('../db/conn')

//Helpers
const getToken = require("../helpers/get-Token")
const getUserByToken = require("../helpers/get-user-by-token")
const ObjectId = require('mongoose').Types.ObjectId

module.exports = class PetController {

    static async create(req, res) {

        const { name, age, weight, color, description } = req.body

        const images = req.files

        const available = true

        //validations
        if (!name) {
            res.status(422).json({
                message: 'O campo nome é obrigatório.'
            })
            return
        }

        if (!age) {
            res.status(422).json({
                message: 'A idade é obrigatória.'
            })
            return
        }

        if (!weight) {
            res.status(422).json({
                message: 'O peso é obrigatório.'
            })
            return
        }

        if (!color) {
            res.status(422).json({
                message: 'A cor é obrigatória.'
            })
            return
        }

        if (!images) {
            res.status(422).json({
                message: 'A imagem é obrigatória.'
            })
            return
        }

        if (!description) {
            res.status(422).json({
                message: 'A descrição é obrigatória.'
            })
            return
        }

        //get pet woner
        const token = getToken(req)
        const user = await getUserByToken(token)

        //create a pet
        const pet = new Pet({
            name,
            age,
            weight,
            color,
            available,
            images: [],
            user: {
                _id: user._id,
                name: user.name,
                image: user.image,
                phone: user.phone
            },
            description,
        })

        images.map((image) => {
            pet.images.push(image.filename)
        })

        try {

            const newPet = await pet.save()
            res.status(201).json({
                message: 'Pet cadastrado com sucesso.',
                newPet,
            })

        } catch (error) {
            res.status(500).json({
                message: `ERROR: ${error}`
            })
        }
    }

    static async getAll(req, res) {

        const pets = await Pet.find().sort('-createdAt')

        res.status(200).json({
            pets: pets,
        })
    }

    static async getAllUserPets(req, res) {

        const token = getToken(req)
        const user = await getUserByToken(token)

        const pets = await Pet.find({ 'user._id': user._id }).sort('-createdAt')

        res.status(200).json({
            pets,
        })
    }

    static async getAllUserAdoptions(req, res) {

        const token = getToken(req)
        const user = await getUserByToken(token)

        const pets = await Pet.find({ 'adopter._id': user._id }).sort('-createdAt')

        res.status(200).json({
            pets,
        })
    }

    static async getPetById(req, res) {

        const id = req.params.id

        if (!ObjectId.isValid(id)) {
            res.status(422).json({
                message: 'ID inválido.'
            })
            return
        }

        //checks if pet exists
        const pet = await Pet.findOne({ _id: id })

        if (!pet) {
            res.status(404).json({
                message: 'Pet não encontrado.'
            })
            return
        }

        res.status(200).json({
            pet: pet,
        })
        return

    }

    static async removePetById(req, res) {

        const id = req.params.id

        if (!ObjectId.isValid(id)) {
            res.status(422).json({
                message: 'ID inválido.'
            })
            return
        }

        //checks if pet exists
        const pet = await Pet.findOne({ _id: id })

        if (!pet) {
            res.status(404).json({
                message: 'Pet não encontrado.'
            })
            return
        }

        const token = getToken(req)
        const user = await getUserByToken(token)

        if (pet.user._id.toString() !== user._id.toString()) {
            res.status(422).json({
                message: 'Houve um problema em processar sua solicitação. Tente novamente mais tarde.'
            })
            return
        }

        await Pet.findByIdAndRemove(id)

        res.status(200).json({
            message: 'Pet removido com sucesso!'
        })

    }

    static async updatePet(req, res) {

        const id = req.params.id

        const { name, age, weight, color, description, available } = req.body

        const images = req.files

        const updatedData = {}

        if (!ObjectId.isValid(id)) {
            res.status(422).json({
                message: 'ID inválido.'
            })
            return
        }

        const pet = await Pet.findOne({ _id: id })
        if (!pet) {
            res.status(422).json({
                message: 'Pet não encontrado!'
            })
            return
        }

        const token = getToken(req)
        const user = await getUserByToken(token)

        if (pet.user._id.toString() !== user._id.toString()) {
            res.status(422).json({
                message: 'Houve um problema em processar sua solicitação. Tente novamente mais tarde.'
            })
            return
        }

        //validations
        if (!name) {
            res.status(422).json({
                message: 'O campo nome é obrigatório.'
            })
            return
        } else {
            updatedData.name = name
        }

        if (!age) {
            res.status(422).json({
                message: 'A idade é obrigatória.'
            })
            return
        } else {
            updatedData.age = age
        }

        if (!weight) {
            res.status(422).json({
                message: 'O peso é obrigatório.'
            })
            return
        } else {
            updatedData.weight = weight
        }

        if (description != '') {
            updatedData.description = description
        }

        if (!color) {
            res.status(422).json({
                message: 'A cor é obrigatória.'
            })
            return
        } else {
            updatedData.color = color
        }

        if (images.length > 0) {
            updatedData.images = []
            images.map((image) => {
                updatedData.images.push(image.filename)
            })
        }

        await Pet.findByIdAndUpdate(id, updatedData)

        res.status(200).json({
            message: 'Pet atualizado com sucesso!'
        })

    }

    static async schedule(req, res) {

        const id = req.params.id

        if (!ObjectId.isValid(id)) {
            res.status(422).json({
                message: 'ID inválido.'
            })
            return
        }

        const pet = await Pet.findOne({ _id: id })
        if (!pet) {
            res.status(422).json({
                message: 'Pet não encontrado!'
            })
            return
        }

        //checks if user registered the pet
        const token = getToken(req)
        const user = await getUserByToken(token)

        if (pet.user._id.equals(user._id)) {
            res.status(422).json({
                message: 'Você não pode agendar uma visita com o seu próprio pet!'
            })
            return
        }

        // cheks if user alredy scheduled a visit
        if (pet.adopter) {
            if (pet.adopter._id.equals(user._id)) {
                res.status(422).json({
                    message: 'Você já agendou uma visita para este pet!'
                })
                return
            }
        }

        //add an user to pet
        pet.adopter = {
            _id: user._id,
            name: user.name,
            image: user.image
        }

        await Pet.findByIdAndUpdate(id, pet)

        res.status(200).json({
            message: `A visita foi agendada com sucesso, entre em contato com ${pet.user.name} pelo telefone ${pet.user.phone}`
        })

    }

    static async concludeAdoption(req, res) {

        const id = req.params.id

        if (!ObjectId.isValid(id)) {
            res.status(422).json({
                message: 'ID inválido.'
            })
            return
        }

        const pet = await Pet.findOne({ _id: id })
        if (!pet) {
            res.status(422).json({
                message: 'Pet não encontrado!'
            })
            return
        }


        const token = getToken(req)
        const user = await getUserByToken(token)

        if (pet.user._id.toString() !== user._id.toString()) {
            res.status(422).json({
                message: 'Houve um problema em processar sua solicitação. Tente novamente mais tarde.'
            })
            return
        }

        pet.available = false

        await Pet.findByIdAndUpdate(id, pet)

        res.status(200).json({
            message: 'Parabéns! O ciclo de adoção foi finalizado com sucesso!'
        })
    }

}