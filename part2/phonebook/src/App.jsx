import { useState, useEffect } from "react";
import axios from 'axios'

const Persons = ({persons}) => persons.map((value) => <Person key={value.id} person={value}></Person>)
const Person = ({person}) => <p>{person.name} {person.number}</p>

const Filter = (props) => {
  return (
    <div>
      filter shown with <input value={props.newFilter} onChange={(e) => props.setNewFilter(e.target.value)} />
    </div>
  )
}

const PersonForm = (props) => {
  return (
    <div>
      <form onSubmit={props.addPerson}>
        <div>
          name: <input value={props.newName} onChange={(e) => props.setNewName(e.target.value)} />
        </div>
        <div>
          number: <input value={props.newPhoneNum} onChange={(e) => props.setNewPhoneNum(e.target.value)} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('')
  const [newPhoneNum, setNewPhoneNum] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log(response.data);
        setPersons(response.data)
      })
  }, [])

  const personsToShow = (newFilter === '') 
    ? persons
    : persons.filter((person) => person.name.toLowerCase().startsWith(newFilter.toLowerCase()))

  const addPerson = (e) => {
    e.preventDefault()
    if (persons.some((element) => element.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    } else if (newName !== '' && newPhoneNum !== '') {
      const person = {
        name: newName,
        number: newPhoneNum,
        id: persons.length + 1
      }
      setPersons(persons.concat(person))
      setNewName('')
      setNewPhoneNum('')
    }
    // console.log(persons);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} setNewFilter={setNewFilter}></Filter>
      <h3>add a new</h3>
      <PersonForm 
        addPerson={addPerson} 
        newName={newName} 
        setNewName={setNewName} 
        newPhoneNum={newPhoneNum} 
        setNewPhoneNum={setNewPhoneNum}
      >
      </PersonForm>
      <h3>Numbers</h3>
      <Persons persons={personsToShow}></Persons>
    </div>
  )
}

export default App