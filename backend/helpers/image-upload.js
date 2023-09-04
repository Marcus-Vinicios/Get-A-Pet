const multer = require('multer')
const path = require('path')

// Destino de armazenamento das imagens
const imageStorage = multer.diskStorage({
    destination: function (req, file, cb) {

        let folder = ''

        if (req.baseUrl.includes('user' || 'users')) {
            folder = "users"
        } else if (req.baseUrl.includes('pets' || 'pet')) {
            folder = "pets"
        }

        cb(null, `public/images/${folder}`)

    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + String(Math.floor(Math.random() * 100000)) + path.extname(file.originalname))
    },
})

const imageUpload = multer({
    storage: imageStorage,
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(png|jpg)$/)) {
            return cb(new Error("Por favor, envie arquivos apenas JPG ou PNG!"))
        }
        cb(undefined, true) //passa para a função que não ha nenhum erro, e valida o arquivo para upload.
    }
})

module.exports = {imageUpload} 