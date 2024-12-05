const jwt = require('jsonwebtoken');
const Vender = require('../Modul/Vender');

const dotenv = require("dotenv")

dotenv.config()
const secretKey = process.env.MySecretKey;

const verifyToken = async (req, res, next) => {

    const token = req.headers.token;
    if(!token) {
        return res.status(401).json({ error: "Token is require" });

    }
    try {
        const decoded = jwt.verify(token, secretKey)

        const vender = await Vender.findById(decoded.venderid)
        if (!vender) {
            res, status(404).json({ error: "vender not found" })
        }
        req.venderId = vender._id

        next()


    } catch (error) {
        console.log(error)
        return res,startus(5000).json({error: "Incvalid Token"})
    }

}

module.exports= verifyToken;