//check if password matches with the one in the database
const bcrypt = require("bcrypt"),
      User = require("../models/users");

module.exports = async (req,res,next) => {
    try {
        const hashed_password = req.User.password
        const {password} = req.body;
        const bool = await bcrypt.compare(password,hashed_password);
        if(bool) {
            next()
        } else {
            res.status(401).json({error:"Invalid password"})
        }
    } catch(e) {
        res.status(500).json({error:e.message})
    }
}