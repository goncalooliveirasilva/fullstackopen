const Header = (props) => {
  return (
    <>
      <h1>{props.course}</h1>
    </>
  )
}

const Part = (props) => {
  return (
    <>
      <p>{props.part} {props.exercises}</p>
    </>
  )
}

const Content = (props) => {
  return (
    <>
      {props.part.map((value, index) => (
        <Part key={index} part={value} exercises={props.exercises[index]}></Part>
      ))}
    </>
  )
}

const Total = (props) => {
  return (
    <>
      <p>Number of exercises {props.exercises.reduce((total, current) => total + current, 0)}</p>
    </>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course}></Header>
      <Content part={[part1, part2, part3]} exercises={[exercises1, exercises2, exercises3]}></Content>
      <Total exercises={[exercises1, exercises2, exercises3]}></Total>
    </div>
  )
}

export default App