import { use, useState } from "react";

const Button = ({text, onClick}) => <><button onClick={onClick}>{text}</button></>

const App = () => {
  const anecdotes = [
      'If it hurts, do it more often.',
      'Adding manpower to a late software project makes it later!',
      'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
      'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
      'Premature optimization is the root of all evil.',
      'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
      'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
      'The only way to go fast, is to go well.'
  ]
  const numAnecdotes = anecdotes.length

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(numAnecdotes).fill(0))

  const randomInt = (max) => Math.floor(Math.random() * max)

  const handleNextClick = () => {
    setSelected(randomInt(numAnecdotes))
  }

  const handleVoteClick = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }

  const maxIdx = votes.reduce(
    (previous, current, currentIdx, arr) => current > arr[previous] ? currentIdx : previous, 0
  )
  
  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <p>has {votes[selected]} votes</p>
      <div>
        <Button onClick={handleVoteClick} text={"vote"}></Button>
        <Button onClick={handleNextClick} text={"next anecdote"}></Button>
      </div>
      <div>
        <h1>Anecdote with most votes</h1>
        {anecdotes[maxIdx]}
        <p>has {votes[maxIdx]} votes</p>
      </div>
    </div>
  )
}

export default App