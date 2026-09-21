const express = require("express")
const nextModel = require("./models/note.model")
const noteModel = require("./models/note.model")

const app = express()

app.use(express.json())

app.post("/notes",async (req,res) => {

    const data = req.body
    await nextModel.create({
        title: data.title,
        discription: data.discription,
    })

    res.status(200).json({
        message: "created successfully"
    })
})

app.get("/notes", async (req, res) => {

    const notes = await noteModel.find({})

    res.status(200).json({
        message: "fetch successfully",
        notes: notes
    })
})

app.delete('/notes/:id', async (req, res) => {

    const id = req.params.id
    
    await noteModel.findOneAndDelete({
        _id: id
    })

    res.status(200).json({
        message: "deleted succefully"
    })
    
})

app.patch('/notes/:id', async (req,res) => {

    const id = req.params.id
    const discription = req.body.discription

    await noteModel.findOneAndUpdate({ _id: id }, { discription: discription })

    res.status(200).json({
        message: "updated successfully"
    })

})

module.exports = app