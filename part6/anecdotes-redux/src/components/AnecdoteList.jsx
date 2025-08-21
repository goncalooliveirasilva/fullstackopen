import { useSelector, useDispatch } from 'react-redux'
import { voteAnectode } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => {
    if (state.filter === 'ALL') {
      return state.anecdotes
    }
    return state.anecdotes.filter(anecdote => anecdote.content.includes(state.filter))
  })

  const vote = (id, content) => {
    dispatch(voteAnectode(id))
    dispatch(setNotification(`You voted '${content}'`))
    setTimeout(() => dispatch(removeNotification()), 5000)
  }

  const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes)

  return (
    <>
      {sortedAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
          </div>
        </div>
      )}
    </>
  )
}

export default AnecdoteList