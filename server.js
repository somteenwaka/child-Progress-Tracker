const express = require("express"); //import express
const bodyParser = require("body-parser"); //import body parser

const user = {
    username: "somto",
    password: "123"
};

const mongoose = require("mongoose");
const loginModel = require("./models/login")
//import schema
const connectionString =
 "mongodb+srv://somtee:123@cluster0-0ilc0.mongodb.net/test?retryWrites=true&w=majority"
 mongoose.connect(
     connectionString,
     {useNewUrlParser: true, useUnifiedTopology: true },
     err => {
         console.log(err);
     }
 );

const app = express(); //create an express app


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.post("/auth",(req, res) => {
	// let username = req.body.username;
	// let password = req.body.password;
	if (req.body.username === user.username && req.body.password === user.password){
        res.redirect("/parentdashboard.html");

    }
	 else {
                res.send ("Incorrect Username and/or Password!");
}

});        

app.post("/login", (req, res) => {
    const login = new loginModel({
        username: req.body.username,
        password: req.body.password
    });

    login.save((err, doc) => {
        if (err !==null) {
            console.log(err);
            res.send("failed to contact us. Please try again.");
        }else {
            console.log(doc);
            res.redirect("parentdashboard.html");
        }
    });
    

    
});

app.listen (3000, () => console.log("Server running at port 3000")); //expose the app on port 3000

