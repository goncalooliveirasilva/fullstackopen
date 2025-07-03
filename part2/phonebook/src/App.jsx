import { useState, useEffect } from "react"
import numbersService from "./services/numbers"

const Button = ({text, onClick}) => <button onClick={onClick}>{text}</button>

const Persons = ({persons, onClick}) => persons.map((value) => <Person onClick={onClick} key={value.id} person={value}></Person>)
const Person = ({person, onClick}) => {
  return (
    <p>{person.name} {person.number} 
      <Button text={"delete"} onClick={() => onClick(person.id)}></Button>
    </p>
  )
}

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
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhoneNum, setNewPhoneNum] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    numbersService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const personsToShow = (newFilter === '') 
    ? persons
    : persons.filter((person) => person.name.toLowerCase().startsWith(newFilter.toLowerCase()))

  const addPerson = (e) => {
    e.preventDefault()
    if (persons.some((element) => element.name === newName)) {
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const person = persons.find(p => p.name === newName)
        const id = person.id
        numbersService
          .update(id, {...person, number: newPhoneNum})
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id === id ? returnedPerson : person))
          })
      }
    } else if (newName !== '' && newPhoneNum !== '') {
      const person = {
        name: newName,
        number: newPhoneNum
      }
      numbersService
        .create(person)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewPhoneNum('')
        })
    }
    // console.log(persons);
  }

  const deletePerson = (id) => {
    // console.log("delete", id);
    const person = persons.find(p => p.id === id)
    if (window.confirm(`Delete ${person.name}?`)) {
      numbersService
      .del(id)
      .then(res => {
        // console.log(res);
        setPersons(persons.filter(p => p.id !== id))
      })
      .catch(error => {
        alert("The person was already deleted from server!")
        setPersons(persons.filter(p => p.id !== id))
      })
    }
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
      <Persons onClick={deletePerson} persons={personsToShow}></Persons>
    </div>
  )
}

export default App