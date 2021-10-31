const express = require("express");
const app = express();
let port = process.env.PORT || 3000;
// const path = require("path")
const http = require("http").createServer(app);

app.use(express.static(__dirname + '/public'));

// console.log();

http.listen(port, ()=>{
    console.log("i m listening");
});

app.get("/", (req, res)=>{
    // res.send("hi sandy rajak...");
    res.sendFile(__dirname + "/index.html");
});

// Socket

const io= require("socket.io")(http);

io.on("connection", (socket)=>{
    // console.log("hi runniong");
    socket.on("message", (msg)=>{
        console.log(msg);
        socket.broadcast.emit("message", msg);

    });
});