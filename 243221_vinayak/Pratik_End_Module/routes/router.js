const express=require("express")
const myrouter=express.Router();
const connection=require("../db/dbconnect")


//get all courses
myrouter.get("/courses",function(req,resp){
    connection.query("select * from course",function(err,data,fields){
        if(err){
            resp.status(500).send("Error Occured!!")
        }
        else{
            resp.status(200).render("display_course",{coursdata:data})
        }
    })
})

//empty form to add data
myrouter.get("/addcourseform",function(req,resp){
    resp.render("add_course")
})


//add course
myrouter.post("/insertcourse",function(req,resp){
    connection.query("insert into course values(?,?,?)",[req.body.cid,req.body.cname,req.body.qty],function(err,result){
        if(err){
            resp.status(500).send("Data not inserted!!")
        }
        else{
            if(result.affectedRows>0){
                resp.redirect("/courses")
            }
        }
    })
})


//delete course
myrouter.get("/deletecourse/:id",function(req,resp){
    console.log("Cid : ",req.params.id);
    connection.query("delete from course where cid=?",[req.params.id],function(err,result){
        if(err){
            resp.status(500).send("Data not found!!")
        }
        else{
            if(result.affectedRows>0){
                resp.redirect("/courses")
            }
        }
    })
})


//update firstly take id
myrouter.get("/editcourse/:id",function(req,resp){
    connection.query("select * from course where cid=?",[req.params.id],function(err,data){
        if(err){
            resp.status(500).send("Data not found!!")
        }
        else{
            if(data.length>0){

            resp.render("update_course",{cour:data[0]})
            }
        }
    })
})

//update actual data
myrouter.post("/updatecourse",function(req,resp){
    connection.query("update course set cname=?,qty=? where cid=?",[req.body.cname,req.body.qty,req.body.cid],function(err,result){
        if(err){
            resp.status(500).send("Data not updated!!")
        }
        else{
            resp.redirect("/courses")
        }
    })

})

module.exports=myrouter;