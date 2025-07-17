const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

console.log('connected to', url)
mongoose.connect(url)
    .then(result => {
        console.log('connected to MongoDB');
    })
    .catch(error => {
        console.log('error connecting to MongoBD:', error.message)
    })

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: [3, 'Name must be at least 3 characters long.'],
        required: [true, 'User name required.']
    },
    number: {
        type: String,
        minLength: [8, 'Phone number must be at least 8 characters long.'],
        validate: {
            validator: function(v) {
                return /^\d{2,3}-\d+$/.test(v)
            },
            message: props => `${props.value} is not a valid phone number. Format must be xx-xxxxxx or xxx-xxxxx`
        },
        required: [true, 'User phone number required.']
    }
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)