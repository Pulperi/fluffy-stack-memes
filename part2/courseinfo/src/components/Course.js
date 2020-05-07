import React from 'react'

const Header = ({text}) => (
    <h1>{text}</h1>
  )
  
  const Part = ({part}) => {
    const {name, exercises} = part
    return (
      <p>
        {name} {exercises}
      </p>
    )
  }
  
  const Content = ({parts}) => (
    <div>
      {parts.map(part => <Part key={part.id} part={part}/>)}
    </div>
  )
  
  const Total = ({parts}) => {
    const total = () => parts.reduce((acc, val) => acc + val.exercises, 0)
    return (
      <p>
        <b>Number of exercises {total()}</b>
      </p>
    )
  }
  
  const Course =  ({course}) => (
    <div>
      <Header text={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )

  export default Course