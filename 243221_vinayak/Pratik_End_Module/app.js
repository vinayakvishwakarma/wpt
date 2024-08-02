const express=require("express")
const app=express();
const path=require("path")
const routes=require("./routes/router")
const bodyParser=require("body-parser")


app.set("views",path.join(__dirname,"views"))
app.set("view engine","ejs");


app.use(bodyParser.urlencoded({extended:false}))
app.use("/",routes)

app.listen(3002,function(){
    console.log("Server started on port 3002")
})

module.exports=app;