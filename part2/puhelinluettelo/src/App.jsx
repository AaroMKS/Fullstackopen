import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')

  const [newNumber, setNewNumber] = useState('')

  const [showAll, setShowAll] = useState(true)
  
  const [filter, setFilter] = useState('')

  const [notificationMessage, setNotificationMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  
  useEffect(() => {personService.getAll().then((initialPersons) => {setPersons(initialPersons)
    })
    }, [])
  const addNumber = (event) => {

    event.preventDefault()

    const existing = persons.find(person => person.name === newName)
    if (existing) {
      const confirmChange = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      )

      if (!confirmChange) return

      const updatedPerson = {
        ...existing, number: newNumber
      }

      personService.change(existing.id, updatedPerson)
      .then(returnedPerson => {
        setPersons(persons.map(p => p.id !== existing.id ? p : returnedPerson))
      setNewName('')
      setNewNumber('')
      setNotificationMessage(
            `Changed number for '${returnedPerson.name}'`
          )
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
      }).catch(error => {
        if (error.response && error.response.status === 404) {
        setErrorMessage(
          `Information of '${existing.name}' has already been removed from server`
        )
        
        setPersons(persons.filter(p => p.id !== existing.id))
        } else {
          setErrorMessage('Something went wrong')
        }
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      
      })
    return
    }

    const numberObject = {
      name: newName,
      number: newNumber
    }
    personService.create(numberObject)
    .then(returnedPerson => {
      setPersons(persons.concat(returnedPerson))
      setNewName('')
      setNewNumber('')
      setNotificationMessage(
            `Added '${returnedPerson.name}'`
          )
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
    })
    
  }

  const handleNameChange = (event) => {

    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }

  const removeName = (id) => {
    const person = persons.find(p => p.id === id)

    const confirmRemoving = window.confirm(
      `Delete ${person.name}?`
    )

    if (!confirmRemoving) return

    personService.remove(id).then(() => setPersons(persons.filter(p => p.id !== id)))
    setNotificationMessage(
            `Removed '${person.name}'`
          )
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
  }


  const numbersToShow =  persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} />
      <ErrorMessage message={errorMessage} />
      <Filter filter={filter} onChange={handleFilterChange} />
      <h2>Add a number</h2>
      <PersonForm addNumber={addNumber} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons numbersToShow={numbersToShow} removeName={removeName}/>
    </div>
  )

}

const Filter = (props) => {
  return (<form>
    <div>
      filter shown with : <input
      value={props.filter}
      onChange={props.onChange}
      />
    </div>
  </form>
  )
}

const PersonForm = (props) => {
  return (
    <form onSubmit={props.addNumber}>
        <div>
          name: <input
          value={props.newName}
          onChange={props.handleNameChange} />
        </div>
        <div>number: <input
          value={props.newNumber}
          onChange={props.handleNumberChange}
        /></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

const Persons = (props) => {
  return (
    <ul>
        {props.numbersToShow.map(person =>
          <li key={person.name}>{person.name} {person.number}
          <button onClick={() => props.removeName(person.id)}> delete </button>
          </li>
        )}
    </ul>
  )
}

const Notification = ({ message }) => {
  const notificationStyle = {
      color: 'green',
      background: 'lightgrey',
      fontSize: '20px',
      borderStyle: 'solid',
      borderRadius: '5px',
      padding: '10px',
      marginBottom: '10px',
    }

  if (message === null) {
    return null
  }

  return (
    <div style={notificationStyle}>
      {message}
    </div>
  )
}

const ErrorMessage = ({ message }) => {
  const errorStyle = {
      color: 'green',
      background: 'lightgrey',
      fontSize: '20px',
      borderStyle: 'solid',
      borderRadius: '5px',
      padding: '10px',
      marginBottom: '10px',
    }

  if (message === null) {
    return null
  }

  return (
    <div style={errorStyle}>
      {message}
    </div>
  )
}




export default App
