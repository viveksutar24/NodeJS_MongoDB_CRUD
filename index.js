var express = require("express");
let bodyparser = require("body-parser");
var mongodb = require("mongodb");
let app = express();
app.use(express.json());

var MongoClient = mongodb.MongoClient;

var url = "mongodb://127.0.0.1:27017";

app.get("/", (req, res) => {
    res.end("Hello");
});

app.post("/save", (req, res) => {
    let body = req.body;
    MongoClient.connect(url, (err, db) => {
        if (err) {
            res.end(JSON.stringify({ status: "failed", data: err }));
        }
        var dbo = db.db("company");
        dbo.collection("employees").insertOne({ name: body.name, email: body.email }, (err, result) => {

            if (err) {
                res.end(JSON.stringify({ status: "failed", data: err }));

            } else {
                res.end(JSON.stringify({ status: "success", data: result }));

            }
        });
    });
});


app.get("/list", (req, res) => {
    MongoClient.connect(url, (err, db) => {
        if (err) {
            res.end(JSON.stringify({ status: "failed", data: err }));
        }
        var dbo = db.db("company");
        dbo.collection("employees").find({}).toArray((req, result) => {

            if (err) {
                res.end(JSON.stringify({ status: "failed", data: err }));

            } else {
                res.end(JSON.stringify({ status: "success", data: result }));

            }
        });
    });

})

app.get("/get/:name", (req, res) => {
    MongoClient.connect(url, (err, db) => {
        if (err) {
            res.end(JSON.stringify({ status: "failed", data: err }));
        }
        var dbo = db.db("company");
        dbo.collection("employees").findOne({ name: req.params.name }, (req, result) => {

            if (err) {
                res.end(JSON.stringify({ status: "failed", data: err }));

            } else {
                res.end(JSON.stringify({ status: "success", data: result }));
            }
        });
    });
})


app.put("/update/:name", (req, res) => {
    var body = req.body
    MongoClient.connect(url, (err, db) => {
        if (err) {
            res.end(JSON.stringify({ status: "failed", data: err }));
        }
        var dbo = db.db("company");
        dbo.collection("employees").updateOne({ name: req.params.name }, { $set: { name: body.name, email: body.email } }, (req, result) => {

            if (err) {
                res.end(JSON.stringify({ status: "failed", data: err }));

            } else {
                res.end(JSON.stringify({ status: "success", data: result }));
            }
        });
    });
})

app.delete("/delete/:name", (req, res) => {
    MongoClient.connect(url, (err, db) => {
        if (err) {
            res.end(JSON.stringify({ status: "failed", data: err }));
        }
        var dbo = db.db("company");
        dbo.collection("employees").deleteOne({ name: req.params.name },(req, result) => {

            if (err) {
                res.end(JSON.stringify({ status: "failed", data: err }));

            } else {
                res.end(JSON.stringify({ status: "success", data: result }));
            }
        });
    });
})

app.listen(8081, () => {
    console.log("Server Running In http://localhost:8081/")
})