const express = require("express")
const cors = require("cors")
const mongoose=require("mongoose")

const app = express()
var corsOptions={origin:['https://bulk-mail-frontend-iota.vercel.app'],}
app.use(cors(corsOptions))
app.use(express.json())

app.listen(5000, function () {
    console.log("server connected...")
})
"use strict";
const nodemailer = require("nodemailer");


mongoose.connect("mongodb+srv://sharan:123@cluster0.stpyira.mongodb.net/passkey?retryWrites=true&w=majority").then(function(){
    console.log("Connected to DB")
}).catch(function(error){
    console.log(error)
})


const credential =mongoose.model('credential',{},"bulkmail")

app.get("/",function(req,res)
{
    res.send("server is connected")
})



app.post("/sendmail", function (req, res) {
res.send("returned")
    var msg = req.body.msg
    var newtotalemail = req.body.newtotalemail

    credential.find().then(function(data)
    {
        console.log(data[0].toJSON().pass)
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                // TODO: replace `user` and `pass` values from <https://forwardemail.net>
                user: data[0].toJSON().user,
                pass: data[0].toJSON().pass,
               
            },
    
        });
    
        new Promise(async function(resolve,reject)
        {
            try{ 
                for (var i = 0; i < newtotalemail.length; i = i + 1) {
               await transporter.sendMail(
                    {
                        from: "sharanraja346@gmail.com",
                        to: newtotalemail[i],
                        subject: "Testing mail from bulk mail app",
                        text: msg
                    }
                )
                console.log("Email sent to :"+newtotalemail[i])
            }
            resolve("Success")
                
            }
            catch(error){
                console.log(error)
                reject("failed")
            }
        }).then(function(){
            res.send(true)
        }).catch(function(){
            res.send(false)
        })
    }).catch(function(){
        console.log("Failed")
    })
    
   
   

})
