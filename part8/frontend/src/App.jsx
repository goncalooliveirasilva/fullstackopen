import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'

const App = () => {
  const [error, setError] = useState(null)
  const style = {
    paddingRight: '10px',
  }
  return (
    <BrowserRouter>
      {error && (
        <div style={{ color: 'red', fontSize: '30px', fontWeight: 'bold' }}>
          {error}
        </div>
      )}
      <div>
        <Link style={style} to={'/'}>
          authors
        </Link>
        <Link style={style} to={'/books'}>
          books
        </Link>
        <Link style={style} to={'/add'}>
          add
        </Link>
      </div>
      <Routes>
        <Route path="/" element={<Authors setError={setError} />} />
        <Route path="/books" element={<Books />} />
        <Route path="/add" element={<NewBook />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
