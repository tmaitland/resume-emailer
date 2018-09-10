var port = process.env.PORT || 8000; //objects -- PORT is the name of the environmental variable that is creted when you run a script

var express = require('express');
var fs = require('fs');
var nodemailer = require('nodemailer');
var app = express();
var path = require('path');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
       user: 'fviclass@gmail.com',
       pass: 'fviclass2017', 
    }
});

//parse the request body
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//enable cross domain requests
//add headers
app.use(function(req, res, next){
    //website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8000');
    //request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
    //Set to true if you need the website to include cookies in th requests sent
    // to the API (ex. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    //Pass to the next layer of middleware
    next();
});


app.use("/", express.static(path.join(__dirname, 'assets')));
//access the info you want to expose to the public on the webpage

app.get('/', function(req, res){ //req - contains all the info from the frontend, res-responds to the server
    res.sendFile(path.join(__dirname, './form.html'));
});

app.post('/',
function(req, res, next){
    if(req.body.from){
        next();
    }
    else{
        res.send({
            success: false,
            message: 'Missing From'
        });
    }
},
function(req, res, next){
    if(req.body.email){
        next();
    }
    else {
        res.send({
            success: false,
            message: 'Missing Email'
        })
    }
},
function (req, res, next){
    if(req.body.subject){
        next();
    }
    else {
        res.send({
            success: false,
            message: 'Missing Subject'
        })
    }
},
function(req, res){
    console.log(req.body);

    var emailBody = fs.readFileSync('./assets/resume.html');

    var mailOptions = {
        from: req.body.from,
        to: req.body.email,
        html: emailBody,
        subject: req.body.subject,
    };

    transporter.sendMail(mailOptions, function(err, info){
        if(err){
            console.log('error', err);
            
            return res.send({
                success: false,
                message: err.message
            });
        }
        res.send({
            success: true,
            message: "Your resume has been successfully sent"
        });
    });
});

app.listen(port, function(err){
    if(err){
        return console.log(err)
    }
    console.log('server listening on port ', port);
})