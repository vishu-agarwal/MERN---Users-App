// 1st include mongoose
const mongoose = require("mongoose");
//2nd create schemas
const userSchema = mongoose.Schema({
    id: String,
    uname: String,
    password: String,
    name: String,
    age: Number
});
//3 assignwhole schema to a model
const userModel = mongoose.model("MERN_user", userSchema, "MERN_user");
//4 export model to import it another file
module.exports = userModel;