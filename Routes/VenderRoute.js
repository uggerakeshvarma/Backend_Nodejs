const express = require('express');
const venderController = require('../Controls/controlVender'); // Check this path
const verifyTokened = require('../MiddleVare/VerifyToken');

const Router = express.Router()

Router.post('/register', venderController.Venderregister);
Router.post('/loginIn', venderController.venderLogin);

Router.get('/GetVendor', venderController.getallVender);
Router.get('/Getby/:id' , venderController.getvenderbyid)

module.exports = Router;   