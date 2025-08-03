const Notification = ({ message, isSuccessful }) => {
  const style = {
    color: 'white',
    background: 'green',
    fontWeight: 'bold',
    fontSize: 20,
    borderStyle: 'none',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }
  return (
    <div style={isSuccessful ? style : {...style, background: 'red'}}>
      { message }
    </div>
  )
}

export default Notification