// JAI SHREE RAM

var express = require('express');
var fs = require('fs');
var app = express();

// const ip = "169.254.17.143";
const ip = "192.168.225.22";
const port = 80;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));


app.use(express.static("./public"));


app.get("/video", function (req, res) {
    fs.readFile("path.txt", 'utf8', (err, data) => {
        if (err) {
            res.redirect('/failed');
        } else {
            console.log("File Reading Done.");
            res.render("video", { rasta: data });
        }
    });
});

app.get("/" , function (req , res) {
    res.render("welcome");
});


app.get("/failed", function (req, res) {
    res.send("<h1>Failed to Show Video</h1>");
});

app.post("/processForm", function (req, res) {
    var fieldValue = req.body.ram;
    fs.writeFile("path.txt", fieldValue, (err) => {
        if (err) {
            console.error(err);
            res.redirect('/failed'); // Redirect in case of an error
        } else {
            console.log(`The Value from Field is ${fieldValue} and it has been saved to path.txt`);
            res.redirect('/video');
        }
    });
});


app.listen(port, ip, () => {
    console.log(`Server listening at http://${ip}:${port}`);
});