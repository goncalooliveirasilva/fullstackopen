import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const addNewAnecdote = async (content) => {
  const response = await axios.post(baseUrl, {
    content,
    votes: 0
  })
  return response.data
}

const updateAnecdoteVotes = async (anecdote) => {
  const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
  const response = await axios.put(`${baseUrl}/${anecdote.id}`, updatedAnecdote)
  return response.data
}

export default { getAll, addNewAnecdote, updateAnecdoteVotes }