const express = require('express')

//create server
const app = express();  //express() create a server instance and stored to app

app.get('/', (req,res)=>{
    res.send("Hello World")
})

app.get('/about', (req,res)=>{
    res.send("About page")
})

//To start server
app.listen(3000, () => {
     console.log("Sever start running");
})