const Vender = require('../Modul/Vender');
const JWt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const dotenv = require('dotenv')

dotenv.config();

secretkey = process.env.MySecretKey;

const Venderregister = async (req, res) => {
    const { UserName, Email, Password } = req.body

    try {

        const Vedermail = await Vender.findOne({ Email })
        if (Vedermail) {
            res.status(400).json("Already used Mail")
        }
        const hashPassword = await bcrypt.hash(Password, 10)

        const newVwnder = new Vender({
            UserName,
            Email,
            Password: hashPassword
        })
        await newVwnder.save()

        res.status(201).json({ message: "Vendder Register Succsesfully" })
        console.log('register')
    }
    catch (error) {
        console.error('error');
        res.status(500).json({ error: "interval Server error" })
    }


}



const venderLogin = async (req, res) => {
    const { Email, Password } = req.body;

    try {
        const vender = await Vender.findOne({ Email }); // Use 'vender' instead of 'venders'

        if (!vender || !(await bcrypt.compare(Password, vender.Password))) {
            return res.status(401).json({ error: "Invalid username or password" }); // Fix the error message text
        }

        const token = JWt.sign({ venderid: vender._id }, secretkey, { expiresIn: "1h" })

        // Successful login
        res.status(200).json({ success: "Successfully logged in", token }); // Correct the success message spelling
        console.log(Email, "this is tocken", token)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Internal server error" });
    }
};



const getallVender = async (req, res) => {
    try {
        const vendor = await Vender.find().populate('firm')
        res.json({ vendor })

    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
}


const getvenderbyid = async (req, res) => {
    const venderId = req.params.id
    try {
        const vender = await Vender.findById(venderId).populate('firm');
        if (!vender) {
            return res.status(404).json({ message: "vendor is Not Found" })
        }
        res.status(200).json({ vender })
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" })
    }
}
module.exports = { Venderregister, venderLogin, getallVender, getvenderbyid }