import React, { useState, useEffect } from 'react'
import personService from './services/Persons'

const Header = ({ type, text }) => (
  type > 2 ? <h3>{text}</h3> : <h2>{text}</h2>
)

const Notification = ({ notificationMessage }) => {
  const { message, error} = notificationMessage

  const notificationStyle = {
    color: (error ? 'red' : 'green'),
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px',
  }

  if (!message) {
    notificationStyle.display = 'none'
  }

  return (
    <div style={notificationStyle}>
      {message}
    </div>
  )
}

const InputForm = ({ label, name, value, onChange }) => (
  <div>{label} <input type='text' name={name} value={value} onChange={onChange}></input></div>
)

const Number = ({ person, removePerson }) => {
  const { name, number } = person
  return (
    <div>
      {name} {number}
      <button onClick={removePerson}>delete</button>
    </div>
  )
}

const Filter = ({ filter, handleFilterChange }) => (
  <InputForm label='filter shown with' name='filter' value={filter} onChange={handleFilterChange} />
)

const PersonForm = ({ onSubmit, value, onChange }) => (
  <form onSubmit={onSubmit}>
    <div>
      <InputForm label='name:' name='name' value={value.name} onChange={onChange} />
      <InputForm label='number:' name='number' value={value.number} onChange={onChange} />
    </div>
    <div>
      <button type='submit'>add</button>
    </div>
  </form>
)

const Persons = ({ persons, nameFilter, removePerson }) => (
  <div>
    {persons.filter(person =>
      person.name.toLowerCase().includes(nameFilter.toLowerCase())).map((person) =>
        (<Number key={person.name} person={person} removePerson={() => removePerson(person.id)} />))}
  </div>
)

const App = () => {
  const [persons, setPersons] = useState([])
  const [newPerson, setNewPerson] = useState({ name: '', number: '' })
  const [filter, setFilter] = useState('')
  const [notificationMessage, setNotificationMessage] = useState([])

  useEffect(() => {
    personService.getAll().then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [])

  const handleInputChange = (event) => setNewPerson({ ...newPerson, [event.target.name]: event.target.value })
  const handleFilterChange = (event) => setFilter(event.target.value)

  const isNewName = (name) => persons.filter(person => person.name === name).length === 0


  const createNotification = message => {
    setNotificationMessage(message)
    setTimeout(() => setNotificationMessage([]), 2000)
  }

  const addPerson = (event) => {
    event.preventDefault()
    if (newPerson.name.length === 0)
      createNotification({ message: `Name cannot be empty.`, error: true })
    else if (isNewName(newPerson.name)) {
      personService.create(newPerson).then(returnedPerson => {
        setPersons([...persons, returnedPerson])
        createNotification({ message: `Added ${newPerson.name}.`, error: false })
      })
    }
    else {
      if (window.confirm(`${newPerson.name} is already added to phonebook, replace the old number with a new one?`))
        personService.update(persons.filter(person => person.name === newPerson.name)[0].id, newPerson).then(returnedPerson => {
          setPersons(persons.filter(person => person.id !== returnedPerson.id).concat(returnedPerson))
          createNotification({ message: `Updated ${newPerson.name}.`, error: false })
        }).catch(error => {
          setPersons(persons.filter(person => person.name !== newPerson.name))
          createNotification({ message: `${newPerson.name} not found on server.`, error: true })
        })
      setNewPerson({ name: '', number: '' })
    }
  }

  const removePerson = (id) => {
    const person = persons.filter((person) => person.id === id)[0]

    if (!person)
      createNotification({ message: `Person not found.`, error: true })
    else {
      if (window.confirm(`Delete '${person.name}' ?`)) {
        personService.remove(id).catch(error => {
          createNotification({ message: `${person.name} not found on server.`, error: true })
        })
        setPersons(persons.filter(person => person.id !== id))
        createNotification({ message: `${person.name} removed.`, error: false })
      }
    }
  }

  return (
    <div>
      <Header type={2} text='Phonebook' />
      <Notification notificationMessage={notificationMessage} />
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <Header type={3} text='Add a new' />
      <PersonForm onSubmit={addPerson} value={newPerson} onChange={handleInputChange} />
      <Header type={3} text='Numbers' />
      <Persons persons={persons} nameFilter={filter} removePerson={removePerson} />
    </div>
  )
}

export default App