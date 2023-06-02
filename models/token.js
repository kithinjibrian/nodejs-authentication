//save access and refresh tokens to database
const mongoose = require("mongoose");


const tokenSchema = new mongoose.Schema({
    AccessToken:{
        type:String,
        require:true,
        unique:true
    },
    RefreshToken:{
        type:String,
        require:true,
        unique:true
    }
});

const token = mongoose.model("Token",tokenSchema);

module.exports = token;