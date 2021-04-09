var express = require('express');
var ejs = require('ejs');
var formidable = require('formidable');
var mysql = require('mysql');
 var bodyParser = require('body-parser');
 var connection = require('./db');
  var path = require('path');
var multer = require('multer');
var app = express();


// var storage = multer.diskStorage({
//       destination: './uploads/',
//     filename: function (req, file, cb) {
//       cb(null+ file.originalname);
//   }
// });

 var storage = multer.diskStorage({
     destination: function(req, file, callback) {
         callback(null, "./uploads");
     },
     filename: function(req, file, callback) {
         callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
     }
 });
var upload = multer({ storage:storage });

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.set('view engine','ejs');
 app.set('views',path.join(__dirname,'views'));
 app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname));
app.get('/', function (req, res){
    res.sendFile(__dirname + '/index.html');
   //res.render('image');
});



app.post('/', function (req, res){
 



    // var form = new formidable.IncomingForm();

    // form.parse(req);

    // form.on('fileBegin', function (name, file){
    //     file.path = __dirname + '/uploads/' + file.name;
    // });

    // form.on('file', function (name, file){
    //     console.log('Uploaded ' + file.name);
    // });

    res.sendFile(__dirname + '/index.html');

});


app.get('/add', upload.any(), function (req,res) {
    
    res.render('image');
});

app.post('/add',upload.any('image', 'driver_image'), function (req, res) {
    let sql = "INSERT INTO photo_upload (`image`, `name`,`driver_image`) VALUES('"+req.files[0].path+"', '"+req.body.name+"', '"+req.files[1].path+"')";
connection.query(sql, (error, result)=>{
if (error) {throw error};
res.render('image');

});
});

app.get('/view', function (req,res) {

    let sql = "SELECT * FROM photo_upload ";
connection.query(sql, (error, result)=>{
    console.log(result);
if (error) {throw error};
res.render('view_image', {
    data: result
})

});
});


//

app.get('/update/(:id)', upload.any(), function (req,res) {

    let sql = "SELECT * FROM photo_upload WHERE id = '"+req.params.id+"' ";
connection.query(sql, (error, result)=>{
    console.log(result);
if (error) {throw error};
res.render('update', {
    id:result[0].id,
  name: result[0].name,
  image: result[0].image,  
  driver_image: result[0].driver_image
})

});
});
//


app.get('/delete/(:id)', function (req, res) {
  // body...
  let sql = "DELETE * FROM photo_upload WHERE id = '"+req.params.id+"' ";
  connection.query(sql, (error, result)=>{
    if (error) {throw error};
    res.redirect('/add');
  });
});


// app.post('/update(:id)', function (req,res) {
// let sql = "UPDATE photo_upload SET name='"+req.body.name+"', image = '"+req.body.image+"' WHERE id= '"+req.params.id+"' ";
//  connection.query(sql, (error, result)=>{
//     console.log(result);
// if (error) {throw error};

 



// });
  
  app.post('/update/(:id)', function (req,res) {
    console.log('hiuuu');
let sql = "UPDATE photo_upload SET name='"+req.body.name+"', image = '"+req.body.image+"' WHERE id= '"+req.params.id+"' ";
 connection.query(sql, (error, result)=>{
    console.log(result);
if (error) {throw error};

 
res.redirect('/');


});
});


app.listen(3000);