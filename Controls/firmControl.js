const { json } = require('body-parser');

const Firm = require('../Modul/Form');
const Vender = require('../Modul/Vender')
const multer = require('multer');

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

const addfirm = async (req, res) => {
    try {
        const { FirmName, area, catagory, Region, Offer } = req.body;

        const Image = req.file ? req.file.filename : undefined;

        const vender = await Vender.findById(req.venderId)
        if (!vender) {
            return res.status(404).json({ message: "vender is not Found" })
        }

        const firm = new Firm({
            FirmName,
            area,
            catagory,
            Region,
            Offer,
            Image,
            vender: vender._id
        })
        const Savefirm = await firm.save()
        vender.firm.push(Savefirm)
        await vender.save()
        return res.status(200).json({ message: "Firm Added Succesfully" })

    } catch (error) {
        console.error(error)
        return res.status(500).json('Internal Server error')
    }
}

const DeleteFrom = async (req, res) => {
    try {
        const Deletefor = req.params.firmId

        const DeleteFromid = await Firm.findByIdAndDelete(Deletefor)
        if (!DeleteFromid) {
            res.status(404).json({ error: "Not Found formId" })
        }
    } catch (error) {
        console.log(error)

        res.status(500).json("Internal Server Error")
    }
}




module.exports = { addfirm: [upload.single('Image'), addfirm], DeleteFrom }