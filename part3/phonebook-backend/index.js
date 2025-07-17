require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const Person = require('./models/person')
//const cors = require('cors')
const app = express()

// app.use(morgan('tiny'))
morgan.token('body', (request) => JSON.stringify(request.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(express.json())
//app.use(cors())


app.get('/api/persons', (request, response, next) => {
    Person.find({})
        .then(persons => {
            response.json(persons)
        })
        .catch(error => next(error))
})


app.get('/api/persons/:id', (request, response, next) => {
    const id = request.params.id
    Person.findById(id)
        .then(person => {
            response.json(person)
        })
        .catch(error => next(error))
})


app.delete('/api/persons/:id', (request, response, next) => {
    const id = request.params.id
    Person.findByIdAndDelete(id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})


app.get('/info', (request, response, next) => {
    Person.countDocuments({})
        .then(count => {
            const info = `
                <p>Phonebook has info for ${count} people</p>
                <p>${new Date()}</p>
            `
            response.send(info)
        })
        .catch(error => next(error))
})


app.post('/api/persons', (request, response, next) => {
    const {name, number} = request.body

    // if (!name) {
    //     return response.status(400).json({
    //         error: 'name missing'
    //     })
    // }
    // if (!number) {
    //     return response.status(400).json({
    //         error: 'number missing'
    //     })
    // }
    const person = new Person({name, number})
    person.save()
        .then(result => {
            response.json(result)
        })
        .catch(error => next(error))
})


app.put('/api/persons/:id', (request, response, next) => {
    const {name, number} = request.body
    Person.findById(request.params.id)
        .then(person => {
            if (!person) {
                return response.status(404).end()
            }
            person.name = name
            person.number = number
            return person.save().then(updatedPerson => {
                response.json(updatedPerson)
            })
        })
        .catch(error => next(error))
})


const errorHandler = (error, request, response, next) => {
    console.log(error.message);
    if (error.name === 'CastError') {
        return response.status(400).send({error: 'malformed id'})
    }
    if (error.name === 'ValidationError') {
        return response.status(400).send({error: error.message})
    }
    next(error)
}
app.use(errorHandler)


const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})