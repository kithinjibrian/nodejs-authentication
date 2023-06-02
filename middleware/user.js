//check if a user exist in the database
const User = require("../models/users");


module.exports = async (req,res,next) => {
    try {
        const {
            username
        } = req.body;

        const user = await User.findOne({username});
        if(user) {
            //pass user object to other middlewares
            req.User = user;
            next()
        } else {
            res.status(401).json({error:"User not found!"})
        }
    } catch(e)  {
        res.status(500).json({error:e.message})
    }
}