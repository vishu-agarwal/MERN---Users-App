//1st include express
const express = require("express");
// 2nd create object
const exp = express();
//3rd use json format
exp.use(express.json());
//4 create port
const port = 9000;
//5 create listen port
exp.listen(port, () => console.log("server running on port ! {port}"));
// 6 include mongoose
const mongoose = require("mongoose");
// 7 connect mongoose
mongoose.connect("mongodb://localhost:27017/dcs").then(() => console.log("Mongoose conected......."));
//8 create route for home page
exp.get("/", (req, res) => res.send("Welcome To MERN User App"));
//9 create a model file usermodel
//10include userModel
const userModel = require("./models/user.js");
//11 retrieve data from of userSchema
exp.get("/userList", async(req, res) => {
    const list = await userModel.find();
    // check user have data or not
    if (list.length === 0) {
        return res.json({ data: "No data found!!!!" });
    } else {
        return res.json({ data: list });
    }
});

// create user
exp.post("/userRegister", (req, res) => {
    const { newUser } = req.body;
    userModel.create(newUser);
    return res.json({ data: "Registered successully !!!!" });
});
// login
exp.post("/userLogin", async(req, res) => {
    const uname = req.body.username;
    const pwd = req.body.password;
    const chk = await userModel.findOne({ username: uname, password: pwd });
    // check user have data or not
    if (chk) {
        return res.json({
            message: "Welcome ",
            chk: uname
        });
    } else {
        return res.json({ message: "Wrong unsername and password" });
    }
});
// update user
exp.put("/userUpdate", async(req, res) => {
    const updtuser = req.body;
    const updt = await userModel.findOneAndUpdate({ username: updtuser.username }, {
        id: updtuser.id,
        uname: updtuser.username,
        password: updtuser.password,
        name: updtuser.name,
        age: updtuser.age
    }, { new: true });
    return res.json({ data: "update successfully" });
});
//delete user
exp.delete("/userDelete", async(req, res) => {
    const uid = req.body.id;
    const del = await userModel.findOneAndDelete({ _id: uid });
    if (de) {
        return res.json({ message: "Account deleted Successfullt !!!" });
    } else {

        return res.json({ message: "Some problem while deleteing" });
    }
});
// Search user
exp.get("/userSearch", async(req, res) => {

    const uname = req.body.username;
    const user = await userModel.findOne({ username: uname });
    // check user exist or not
    if (user) {
        return res.json({ message: "find successfull", user: user })
    } else {
        return res.json({ message: "Wrong Credentials" })
    }
});
//"proxy": "http://localhost:4000/"