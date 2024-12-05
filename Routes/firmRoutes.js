
const express = require('express');
const firmController = require('../Controls/firmControl')
const veryfytoken = require('../MiddleVare/VerifyToken');

const router = express.Router();


router.post('/add-firm', veryfytoken, firmController.addfirm)

router.get('/,upload/:imageName', (req, res) => {
    const imageName = req.params.imageName;
    res.headersSent('Content-typr', 'image/jpeb');
    res.sendFile(path.join(__dirname, '..' , 'uploads', imageName))
})
router.delete('/:deletefirm' , firmController.DeleteFrom)


module.exports = router