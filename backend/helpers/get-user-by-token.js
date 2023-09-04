const jwt = require("jsonwebtoken")

const User = require("../models/User")

//get user by jwt token
const getUserByToken = async (token) => {

    if (!token) {
        return res.status(422).json({
            message: 'Acesso negado!'
        })
    }

    const decoded = jwt.verify(token, 'MV05lp06Olv03')

    const userId = decoded.id

    const user = await User.findOne({_id: userId})

    return user

}

module.exports = getUserByToken