import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({text}) => (
  <h1>{text}</h1>
)

const Button = ({onClick, text}) => (
  <button onClick={onClick}>{text}</button>
)

const Display = ({points}) => (<div>has {points} votes</div>)

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(anecdotes.map(() => 0))

  const clickVote = () => {
    const tmp = [...points]
    tmp[selected] += 1
    setPoints(tmp)
  }
  const clickNext = () => setSelected(getRndAnecdote())

  const getRndInteger = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min
  const getRndAnecdote = () => getRndInteger(0, anecdotes.length - 1)
  const getMax = () => points.indexOf(Math.max.apply(null, points))

  return (
    <div>
      <Header text="Anecdote of the day"/>
      {props.anecdotes[selected]}
      <Display points={points[selected]}/>
      <Button onClick={clickVote} text="vote" />
      <Button onClick={clickNext} text="next anecdote" />
      <Header text="Anecdote with most votes"/>
      {props.anecdotes[getMax()]}
      <Display points={points[getMax()]}/>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)