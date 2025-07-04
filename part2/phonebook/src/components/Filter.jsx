const Filter = (props) => {
  return (
    <div>
      filter shown with <input value={props.newFilter} onChange={(e) => props.setNewFilter(e.target.value)} />
    </div>
  )
}

export default Filter