const mongoose = require("mongoose"),
      bcrypt = require("bcrypt");


const userSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true,
        unique:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true,
        unique:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});

//hash password before saving user
userSchema.pre("save",async function(next) {
    try {
        if(!this.isModified('password')) {
            return next()
        }
        const salt = await bcrypt.genSalt(10);
        const hashed_password = await bcrypt.hash(this.password,salt);
        this.password = hashed_password;
        return next()
    } catch (e) {
        return next(e)
    }
})


const user = mongoose.model("User",userSchema);

module.exports = user;