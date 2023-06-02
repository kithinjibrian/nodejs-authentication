const Auth = require("../utils/auth"),
      Token = require("../models/token")

const auth = new Auth(Token)

module.exports = async (req,res) => {
   try {
      const {
         username,
         _id
      } = req.User;

      const tokens = await auth.login({username,_id});
      res.status(201).json(tokens);
   } catch(e) {
      res.status(500).json({error:e.message});
   }
}