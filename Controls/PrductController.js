const ProductData = require('../Modul/Product');
const Firm = require('../Modul/Form')
const multer = require('multer')
const path =require('path')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // The folder where the images will be stored
    },
    filename: (req, file, cb) => {
        // Add a unique suffix to the filename
        cb(null, Date.now() + path.extname(file.originalname)); // Save with the original file extension
    }
});

// Initialize multer with the storage configuration
const upload = multer({ storage: storage });


//productName, price, catagory, Image, bestSeller, disciption
const addProduct = async (req, res) => {
    try {
        const { productName, price, catagory, bestSeller, disciption } = req.body
        const Image = req.file ? req.file.filename : undefined

        const firmid = req.params.firmid;

        const firm = await Firm.findById(firmid)
        if (!firm) {
            res.status(404).json({ error: "Not Found firm" })
        }

        const product = new ProductData({
            productName, price, catagory, Image, bestSeller, disciption, firm: firm._id

        })

        const savedproduct = await product.save()
        firm.product.push(savedproduct);

        await firm.save()
        res.status(200).json(savedproduct)

    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "internal Server error" })
    }
}


const getproductbyFirm = async (req, res) => {
    try {

        const firmId = req.params.firmId
        const firm = await Firm.findById(firmId)
        if (!firm) {
            res.status(404).json({ error: "Not Found" })
        }
        const RestarentName = firm.FirmName;
        const product = await ProductData.find({ firm: firmId })

        res.status(200).json({ RestarentName, product })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Internal server" })
    }

}


const Deletproduct = async (req, res) =>{
    try {
        const productid = req.params.productid

        const DeleteProductss = await ProductData.findByIdAndDelete(productid)
        id(!DeleteProductss)
        res.status(404).json({error: "Not Found Product"})
    } catch (error) {
        console.log(error)
        res.status(500).json( "internal Server Not Working ")
    }
}

module.exports = { addProduct: [upload.single('Image'), addProduct], getproductbyFirm , Deletproduct};