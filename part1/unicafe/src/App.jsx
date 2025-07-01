import { useState } from "react";

const Header = ({name}) => <h1>{name}</h1>

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const Stat = ({name, value}) => <p>{name} {value}</p>

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

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
        <Stat name={"good"} value={good}></Stat>
        <Stat name={"neutral"} value={neutral}></Stat>
        <Stat name={"bad"} value={bad}></Stat>
      </div>
    </div>
  )
}

export default App