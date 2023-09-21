const express = require('express');
const socket = require("socket.io")

// Port Come From env file
const PORT = 4000

// rest object 
const app = express();

// Sockit Server and Cors is available in socket server
const server = app.listen(PORT,()=>{
    console.log(`Socket Server is Running on http://localhost:${PORT}`);
})

// This is cors in Socket 
const io = socket(server,{
    cors :{
        origin : "*",
    }   
})

// making a connection with client 
io.on("connection",(socketClient)=>{
    console.log(socketClient.id)

    socketClient.on("BROADCAST",(data)=>{
        console.log(data)
        io.emit("SENDBROADCAST", data);
    })
})

app.get("/", (req,res)=>{
    res.send("Welcome to Express Server This is Home Page")
})
