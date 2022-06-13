const express = require("express");

const fabQueue1=require("./queues/fab-queue1")
const fabQueue2=require("./queues/fab-queue2")

const app=express()

// http://localhost:5000?number=10
app.get("/", (request, response) => {
    let num=request.query.number
    if(num%2===0){
        fabQueue1(num)
    }
    else{
        fabQueue2(num)
    }
   
    response.send(`<h1>the request has been recieved successfully! </h1>`);
});

app.listen(5000, () => console.log("Express App is running on PORT : 5000"));


