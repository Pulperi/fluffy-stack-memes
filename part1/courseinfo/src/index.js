import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  const name = props.course.name
  
  return (
    <h1>{name}</h1>
  )
}

const Part = (props) => {
  const {name, exercises} = props.part
  return (
    <p>{name} {exercises}</p>
  )
}

const Content = (props) => {
  const parts = props.course.parts
  return (
    <div>
      <Part part={parts[0]}/>
      <Part part={parts[1]}/>
      <Part part={parts[2]}/>
    </div>
  )
}

const Total = (props) => {
  const total = () => props.course.parts.reduce((acc, val) => acc + val.exercises, 0)
  return (
    <p>Number of exercises {total()}</p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ],
  }

  return (
    <div>
      <Header course={course}/>
      <Content course={course}/>
      <Total course={course}/>
    </div>
  )
}

ReactDOM.render(<React.StrictMode><App /></React.StrictMode>, document.getElementById('root'));