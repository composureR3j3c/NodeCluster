const express = require("express");
const cluster = require("cluster");
const totalCPU= require("os").cpus().length;
const process = require("process");

const fabObj = require("./logic/fibonacci-series");



if(cluster.isPrimary){
    console.log(`Total Number of CPU Count is ${totalCPU}`)
   
   
for (var index = 0; index < totalCPU; index++) {
    cluster.fork() 
}
cluster.on("fork", worker =>{
    
    console.log(`Worker ID ${worker.id} and PID is ${worker.process.pid} is online`)
}) 
cluster.on("exit", worker =>{
    
    console.log(`Worker ID ${worker.id} and PID is ${worker.process.pid} is offline`)
    console.log('Lets fork a new worker')
    cluster.fork()
})
}

else{
    console.log(`Worker ${process.pid} started and finished`);
const app = express();

// http://localhost:5000?number=10
app.get("/", (request, response) => {
    console.log(`Worker Process Id - ${process.pid} has accepted the request`)
    let number = fabObj.calculateFibonacciValue(Number.parseInt(request.query.number));
    response.send(`<h1>${number}</h1>`);
});

app.listen(5000, () => console.log("Express App is running on PORT : 5000"));
}

