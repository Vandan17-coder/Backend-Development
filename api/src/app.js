// this file will create server

const express = require("express")
const noteModel = require("./models/note.model")

const app = express()

// middleware
// It allows express to read JSON data sent in request body
app.use(express.json())


//creates api '/notes' , api method post
app.post('/notes', async (req,res) => {
    
    const data = req.body
    await noteModel.create({
        title: data.title,
        discription: data.discription,
    })

    res.status(201).json({
        message: "note created successfully"
    })
})

//api method get, api '/notes'
app.get('/notes',async (req,res)=>{

    const notes = await noteModel.findOne({}) // this find() will always return array [] 

    /* 
        find => return array of object if data found [{},{}] and if not found then empty array []
        findOne => return object if data found {} and if not found return null
    */

    res.status(200).json({
        message: "notes fetch succefully",
        notes: notes
    })
})

// Delete a note using its id
app.delete('/notes/:id',async (req,res) => {

    const id = req.params.id
    await noteModel.findOneAndDelete({
        _id: id
    })

    res.status(200).json({
        message: "note deleted successfully"
    })
})

// Update a note using its id
app.patch('/notes/:id',async (req,res)=>{
    
    const id = req.params.id
    const discription = req.body.discription

    await noteModel.findOneAndUpdate({_id: id},{ discription: discription })
    
    res.status(200).json({
        message: "note updated successfully"
    })
})

module.exports = app