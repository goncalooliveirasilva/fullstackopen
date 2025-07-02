import { useState } from "react";

const Header = ({name}) => <h1>{name}</h1>

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const Stat = ({text, value}) => <tr><td>{text} {value}</td></tr>

const Statistics = ({total, names, values}) => {
  if (total !== 0) {
    return names.map((value, index) => <Stat key={index} text={value} value={values[index]}></Stat>)
  }
  return (
    <>
    <tr><td>No feedback given</td></tr>
    </>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const total = good + neutral + bad
  const statsNames = ["good", "neutral", "bad", "all", "average", "positive"]

  const averageScore = () => {
    return (good - bad) / total
  }

  const positiveFeedback = () => {
    return (good / total) * 100
  }

  const statsValues = [
    good,
    neutral,
    bad,
    total,
    averageScore(),
    `${positiveFeedback()}%`
  ]

  return (
    <div>
      <Header name="give feedback"></Header>
      <div>
        <Button onClick={() => setGood(good + 1)} text={"good"}></Button>
        <Button onClick={() => setNeutral(neutral + 1)} text={"neutral"}></Button>
        <Button onClick={() => setBad(bad + 1)} text={"bad"}></Button>
      </div>
      <Header name="statistics"></Header>
      <div>
        <table>
          <tbody>
            <Statistics total={total} names={statsNames} values={statsValues}></Statistics>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default App