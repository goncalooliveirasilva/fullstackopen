const express = require('express')
const app = express()

app.use(express.json())

let entries = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

const generateID = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min)
}

app.get('/api/persons', (req, res) => {
    res.json(entries)
})

app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id
    const note = entries.find(note => note.id === id)
    if (note) {
        res.json(note)
    } else {
        res.status(404).end()
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id
    entries = entries.filter(note => note.id !== id)
    res.status(204).end()
})

app.get('/info', (req, res) => {
    const info = `
        <p>Phonebook has info for ${entries.length} people</p>
        <p>${new Date().toString()}</p>
    `
    res.send(info)
})

app.post('/api/persons', (req, res) => {
    const body = req.body

    if (!body.name) {
        return res.status(400).json({
            error: 'name missing'
        })
    }
    if (!body.number) {
        return res.status(400).json({
            error: 'number missing'
        })
    }
    if (entries.some(entry => entry.name.toLowerCase() === body.name.toLowerCase())) {
        return res.status(409).json({
            error: 'name must be unique'
        })
    }

    const entry = {
        id: String(generateID(0, 5000)),
        name: body.name,
        number: body.number
    }

    entries = entries.concat(entry)
    res.json(entry)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})