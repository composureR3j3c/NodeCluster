const express = require("express");
const cluster = require("cluster");
const totalCPU= require("os").cpus().length;
const process = require("process");

const fabObj = require("./logic/fibonacci-series");



if(cluster.isPrimary){
    
    console.log(`Master process id ${process.pid}`)

    const worker1= require('child_process').fork('./workers/fab-series-worker1')
    const worker2= require('child_process').fork('./workers/fab-series-worker2')

    console.log(`Child Process ID is ${worker1.pid}`)
    console.log(`Child Process ID is ${worker2.pid}`)

    worker1.on('message', function (number) {
        console.log(`Fab Number from child process - 1 is ${number}`)
    })
    worker1.on('message', function (number) {
        console.log(`Fab Number from child process - 2 is ${number}`)
    })
   
cluster.on("fork", worker =>{
    
    console.log(`Message recieved from ${worker.process.pid}`)
    worker.on("message", num=>{
        if (num%2===0){
            worker1.send(num)    
        }
        else{
            worker2.send(num)
        }
    })
}) 
cluster.on("exit", worker =>{
    
    console.log(`Worker ID ${worker.id} and PID is ${worker.process.pid} is offline`)
    console.log('Lets fork a new worker')
    cluster.fork()
})

for (var index = 0; index < totalCPU -2; index++) {
    let worker=cluster.fork() 
    console.log(`Worker started on PID - ${worker.process.pid}`)
}
console.log(`Total Number of CPU Count is ${totalCPU}`)
}

else{
    console.log(`Worker ${process.pid} started and finished`);
const app = express();

// http://localhost:5000?number=10
app.get("/", (request, response) => {
    process.send(request.query.number)
    console.log(`Process Id - ${process.pid} has accepted the request`)
    let number = fabObj.calculateFibonacciValue(Number.parseInt(request.query.number));
    response.send(`<h1>the request has been recieved successfully!
     </h1>`);
});

app.listen(5000, () => console.log("Express App is running on PORT : 5000"));
}

