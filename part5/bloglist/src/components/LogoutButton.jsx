const Button = ({ setUser }) => {
  const onHandleClick = () => {
    window.localStorage.removeItem('loggedBlogsUser')
    setUser(null)
  }
  return (
    <button onClick={ onHandleClick }>logout</button>
  )
}

export default Button