//check if refresh token is in the database
const Token = require("../models/token");

module.exports = async(req,res,next) => {
    try {
        const {RefreshToken} = req.body;
        const token = await Token.findOne({RefreshToken});
        if(token) {
            req.Token = token;
            next()
        } else {
            res.status(401).json({error:"Token not found!"})
        }
    } catch(e) {
        res.status(500).json({error:e.message})
    }
}