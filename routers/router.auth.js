const express = require("express")
const router = express.Router();

const AuthController = require('../controllers/controller.auth')

const {decodeJwt} = require("../middlewares/middleware.decodejwt")


//User is already logged in , fetch their details
router.get("/userDetails",AuthController.getUserDetails)


module.exports = router;