const express = require("express");
const mysql = require("mysql");
const app = express();
app.use(express.urlencoded({extended:true}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname+'/public'))

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'workshop2'
  });
  connection.connect();

app.get("/",(req,res)=>{
    let sql ="CREATE TABLE IF NOT EXISTS users (user_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT  ,username VARCHAR(30), password VARCHAR(30) , name VARCHAR(30))"
    connection.query(sql,(err,result)=>{
        if(err) throw err;

        console.log(result);

    })
    res.sendFile(__dirname+"/index.html")
})

app.post("/",(req,res)=>{
    console.log(req.body.username, req.body.password);
    
    let sql = `INSERT INTO users (username , password , name)
     VALUES( "${req.body.username}" , "${req.body.password}" , "${req.body.name}")`;

     connection.query(sql,(err,result)=>{
         if(err) throw err
         console.log(result);
        })

        res.send("info saved");

})

app.get("/data",(req,res)=>{
    let sql = `SELECT username , name FROM users `;
    connection.query(sql,(err,result)=>{
        if(err) throw err;
        console.log(result);
        res.render("data",{dataDb : result});
    })


})

app.listen(3000,()=>{
    console.log("server begins");
})


