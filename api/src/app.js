// this file will create server

const express = require("express")

const app = express()

// middleware
// It allows express to read JSON data sent in request body
app.use(express.json())

const notes = []

//creates api '/notes' , api method post
app.post('/notes', (req,res) => {
    notes.push(req.body)

    res.status(201).json({
        message: "note created successfully"
    })
})

//api method get, api '/notes'
app.get('/notes', (req,res)=>{
    res.status(200).json({
        message: "notes fetch succefully",
        notes: notes
    })
})

// Delete a note using its index
app.delete('/notes/:index', (req,res) => {

    const index = req.params.index
    delete notes[index]

    res.status(200).json({
        message: "note deleted successfully"
    })
})

// Update a note using its index
app.patch('/notes/:index', (req,res)=>{
    
    const index = req.params.index
    const discription = req.body.discription

    notes[ index ].discription = discription
    
    res.status(200).json({
        message: "note updated successfully"
    })
})

module.exports = app