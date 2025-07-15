const mongoose = require('mongoose')

if (process.argv.length < 1) {
    console.log('USAGE: <password> <name> <number>');
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@phonebook.sduvoud.mongodb.net/phonebook?
retryWrites=true&w=majority&appName=phonebook`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
    Person.find({}).then(result => {
        result.forEach(entry => {
            console.log(entry.name, entry.number);
        })
        mongoose.connection.close()
    })
} else {
    const name = process.argv[3]
    const number = process.argv[4]
    const entry = new Person({name, number})
    entry.save().then(result => {
        const str = `added ${result.name} ${result.number} to phonebook`
        console.log(str);
        mongoose.connection.close()
    })
}
