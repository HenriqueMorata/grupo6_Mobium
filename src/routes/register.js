const express = require('express');
const multer = require('multer');
const router = express.Router();
const path = require('path');

const dataValidator = require('../middlewares/dataValidation');
const controller = require('../controllers/registerController');

//Multer Config

const multerDiskStorage = multer.diskStorage({
    destination: (req, file, callback) => {
        let folder = path.join(__dirname, '../../public/img/profileImages');
        callback(null, folder);
    },
    
    filename: (req, file, callback) => {
        let imageName = Date.now() + path.extname(file.originalname);
        callback(null, imageName);
    }
})

const uploadFile = multer({ storage : multerDiskStorage });

//Show Register page

router.get('/', controller.index);


//Send Register Form data

router.post('/', uploadFile.single('image'), dataValidator.Registration, controller.checkData);

module.exports = router;