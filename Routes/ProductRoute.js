const express = require('express')
const productcontroller = require('../Controls/PrductController')


const Router = express.Router();

Router.post ('/add-product/:firmid', productcontroller.addProduct);

Router.get('/:firmId/products'  ,  productcontroller.getproductbyFirm)

Router.get('/,upload/:imageName', (req, res) => {
    const imageName = req.params.imageName;
    res.headersSent('Content-typr', 'image/jpeb');
    res.sendFile(path.join(__dirname, '..' , 'uploads', imageName))
})

Router.delete('/:productId' ,  productcontroller.Deletproduct)


module.exports = Router;