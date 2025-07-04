const Notification = ({message, successful}) => {
    if (message === null) return null
    const errorStyle = {
        color: 'red',
        background: 'lightgrey',
        fontWeight: 'bold',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }
    const successStyle = {...errorStyle, color: 'green'}
    return (
        <div style={successful ? successStyle : errorStyle}>
            {message}
        </div>
    )
}

export default Notification