// eslint-disable-next-line react/prop-types
const Notification = ({ notification, success }) => {
  if (!notification) return null
  const style = {
    color: 'white',
    background: success ? 'green' : 'red',
    fontWeight: 'bold',
    fontSize: 20,
    borderStyle: 'none',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }
  return <div style={style}>{notification}</div>
}

export default Notification
