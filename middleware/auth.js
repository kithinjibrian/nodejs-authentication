//middleware to block access if user is not authenticated
const Auth = require("../utils/auth");

const auth = new Auth();

module.exports = async (req,res,next) => {
    try {
        req.User = await auth.verify(req.headers);
        next()
    } catch(e) {
        res.status(500).json({error:e.message})
    }
}