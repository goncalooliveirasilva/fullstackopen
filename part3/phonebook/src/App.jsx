import { useState, useEffect } from "react"
import numbersService from "./services/numbers"
import Persons from "./components/Persons"
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import Notification from "./components/Notification"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhoneNum, setNewPhoneNum] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [successfulMessage, setSuccessfulMessage] = useState(true)

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
            setNewName('')
            setNewPhoneNum('')
            setSuccessfulMessage(true)
            setSuccessMessage(`Updated ${returnedPerson.name}`)
            setPersons(persons.map(person => person.id === id ? returnedPerson : person))
            setTimeout(()  => {
              setSuccessMessage(null)
            }, 3000)
          })
          .catch(error => {
            setSuccessfulMessage(false)
            setErrorMessage(`Information of ${person.name} has already been removed from server`)
            setTimeout(() => {
              setErrorMessage(null)
            }, 3000)
            setNewName('')
            setNewPhoneNum('')
          })
      }
    // } else if (newName !== '' && newPhoneNum !== '') {
    } else {
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
          setSuccessfulMessage(true)
          setSuccessMessage(`Added ${returnedPerson.name}`)
          setTimeout(() => {
            setSuccessMessage(null)
          }, 3000)
        })
        .catch(error => {
          setSuccessfulMessage(false)
          setErrorMessage(error.response.data.error)
          setTimeout(() => setErrorMessage(null), 8000)
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
        setSuccessfulMessage(true)
        setSuccessMessage(`Removed ${person.name}`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 3000)
      })
      .catch(error => {
        // alert("The person was already deleted from server!")
        setSuccessfulMessage(false)
        setErrorMessage(`Information of ${person.name} has already been deleted from server`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 3000)
        setPersons(persons.filter(p => p.id !== id))
      })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification 
        message={(successMessage === null) ? errorMessage : successMessage} 
        successful={successfulMessage}
      >
      </Notification>
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