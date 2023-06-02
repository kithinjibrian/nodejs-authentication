const User = require("../models/users");

module.exports = async (req,res) => {
    const {_id} = req.User;
    try {
        const {
            username,
            email,
            createdAt,
            _id
        } = await User.findById(_id);
        res.json({
            _id,
            email,
            createdAt,
            username
        })
    } catch(e) {
        res.status(500).json({error:e.message})
    }
}