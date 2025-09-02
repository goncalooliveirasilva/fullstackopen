const Notification = ({ message, isSuccessful }) => {
  if (!message) return null
  const style = {
    color: 'white',
    background: isSuccessful ? 'green' : 'red',
    fontWeight: 'bold',
    fontSize: 20,
    borderStyle: 'none',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }
  return (
    <div className="notification" style={style}>
      {message}
    </div>
  )
}

export default Notification
