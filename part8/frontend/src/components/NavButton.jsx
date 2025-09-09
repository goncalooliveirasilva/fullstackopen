import { Link } from 'react-router-dom'

// eslint-disable-next-line react/prop-types
const NavButton = ({ to, children, onClick }) => {
  const style = {
    padding: '5px 8px',
    marginRight: '5px',
    textDecoration: 'none',
    border: '1px solid #ccc',
    borderRadius: '4px',
    background: '#f5f5f5',
    color: 'black',
    cursor: 'pointer',
  }
  if (to) {
    return (
      <Link style={style} to={to}>
        {children}
      </Link>
    )
  }
  return (
    <button style={style} onClick={onClick}>
      {children}
    </button>
  )
}

export default NavButton
