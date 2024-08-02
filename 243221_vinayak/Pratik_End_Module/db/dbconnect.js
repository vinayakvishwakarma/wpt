const mysql=require("mysql2")

var mysqlConnection=mysql.createConnection({
    host:'127.0.0.1',
    user:'root',
    password:'vinayak@123',
    database:'wpt',
    port:3306
})

mysqlConnection.connect((err)=>{
    if(!err){
        console.log("Db connected!!")
    }
    else{
        console.log(err)
    }
})

module.exports=mysqlConnection;