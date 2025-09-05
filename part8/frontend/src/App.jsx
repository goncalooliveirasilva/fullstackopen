import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'

const App = () => {
  const style = {
    paddingRight: '10px',
  }
  return (
    <BrowserRouter>
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
        <Route path="/" element={<Authors />} />
        <Route path="/books" element={<Books />} />
        <Route path="/add" element={<NewBook />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
