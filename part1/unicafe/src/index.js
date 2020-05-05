import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({text}) => (
  <h1>{text}</h1>
)

const Button = ({onClick, text}) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const Statistic = ({text, val}) => (
  <tr>
    <td>{text} {val}</td>
  </tr>
)

const Statistics = ({good, neutral, bad}) => {
  const sum = () => ([good, neutral, bad].reduce((total, val) => total + val, 0))

  if (sum() === 0) {
    return (<div>No feedback given</div>)
  }
  
  const avg = () => (good-bad)/sum()
  const pos = () => 100*good/sum()

  return (
    <table>
      <tbody>
        <Statistic text="good" val={good}/>
        <Statistic text="neutral" val={neutral}/>
        <Statistic text="bad" val={bad}/>
        <Statistic text="all" val={sum()}/>
        <Statistic text="average" val={avg()}/>
        <Statistic text="positive" val={pos() + " %"}/>
      </tbody>
    </table>
  ) 
}


const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const incrementCounter = (counter, setCounter) => setCounter(counter + 1)
  const clickGood = () => incrementCounter(good, setGood)
  const clickNeutral = () => incrementCounter(neutral, setNeutral)
  const clickBad = () => incrementCounter(bad, setBad)

  return (
    <div>
      <Header text="give feedback"/>
      <Button onClick={clickGood} text="good"/>
      <Button onClick={clickNeutral} text="neutral"/>
      <Button onClick={clickBad} text="bad"/>
      <Header text="statistics"/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)