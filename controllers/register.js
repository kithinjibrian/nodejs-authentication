const User = require("../models/users")

module.exports = async (req,res) => {
    try {
        const {
            username,
            email,
            password
        } = req.body;

        const new_user = new User({
            username,
            email,
            password
        });

        const saved_user = await new_user.save();

        res.status(201).json(saved_user)
    } catch(e) {
        res.json({error:e.message})
    }
}