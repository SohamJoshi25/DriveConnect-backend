const express = require("express")
const router = express.Router();
const passport = require('passport')

const {returnTo} = require("../middlewares/middleware.preprocess")
const decodeJwt = require('../middlewares/middleware.decodejwt')

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/',keepSessionInfo: true }), (req,res)=>{
    return res.status(200).json(req.user)
});


router.get('/login',  passport.authenticate('google', {
  scope: [
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/drive',
    'https://www.googleapis.com/auth/userinfo.email',
  ],
  accessType: 'offline', 
  prompt: 'consent'       // Forcing consent screen to get refresh token
}));

router.get('/adddrives', returnTo, decodeJwt ,passport.authenticate('google', {
  scope: [
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/drive',
    'https://www.googleapis.com/auth/userinfo.email',
  ],
  accessType: 'offline', 
  prompt: 'consent'       // Forcing consent screen to get refresh token
}));



module.exports = router;