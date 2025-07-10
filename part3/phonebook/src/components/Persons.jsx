import Button from "./Button"

const Person = ({person, onClick}) => {
    return (
        <p>{person.name} {person.number} 
      <Button text={"delete"} onClick={() => onClick(person.id)}></Button>
    </p>
  )
}

const Persons = ({persons, onClick}) => persons.map((value) => <Person onClick={onClick} key={value.id} person={value}></Person>)

export default Persons