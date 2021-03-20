var express = require("express");
var cors = require("cors");
var mongoose = require("mongoose");
var bodyParser = require ("body-parser");

var mongo_url = "mongodb://root:root@localhost:27017/webfullstack";
mongoose.Promise = global.Promise;
mongoose.connect (mongo_url, {useNewUrlParser: true}).then(
    ()=>{
        console.log("[Successful connecting database]");
    },
    error => {
        console.log("[Error connecting database]"+ error);
        process.exit();
    }
);

var app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
var port = process.env.PORT || 3001;

app.listen(port, ()=> {
    console.log("Success listen on port : " + port);
});

app.get("/", (req, res) => {
    res.status(200).send(" get api web full stack develop free course");
});


//Link api for student
var Student = require("./student.router");
app.use("/api/student", Student);

app.use((req, res, next) => {
    var err = new Error("not path api");
    err.status = 404;
    next(err);
})