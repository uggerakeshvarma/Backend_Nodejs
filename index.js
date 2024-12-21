const express = require('express')
const mongoose = require("mongoose")
const Mongodb = require('mongodb')
const bodyparser = require('body-parser')
const DotEnv = require('dotenv')
const cors = require('cors')
const venderRoutes = require('./Routes/VenderRoute');
const firmroutes = require('./Routes/firmRoutes')
const ProductRoute = require('./Routes/ProductRoute')
const path = require('path')



const app = express()
app.use(cors())
app.use(bodyparser.json())


DotEnv.config();
mongoose.connect(process.env.Mongodb_Url)
    .then(() => {
        console.log("Server Connect MobgoDb")
    })
    .catch((Error) => {
        console.error(`Error`)
    })

app.use('/vender', venderRoutes);
app.use('/firm', firmroutes)
app.use('/Product', ProductRoute)
app.use('/uploads', express.static('uploads'))


PORT =  process.env.PORT || 5000

app.listen(PORT, () => {

    console.log(`Connected Seever SucsesFully  ${PORT}`)
})

app.use('/' , (req, res) => {
    res.send("<h1> I love You</h1>")
})