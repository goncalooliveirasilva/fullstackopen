const Header = ({course}) => {
  return (
    <>
    <h1>{course}</h1>
    </>
  )
}

const Part = ({part, exercise}) => {
  return (
    <>
      <p>{part} {exercise}</p>
    </>
  )
}

const Content = ({parts, exercises}) => {
  // return (
  //   <div>
  //     <Part part={parts[0]} exercise={exercises[0]}/>
  //     <Part part={parts[1]} exercise={exercises[1]}/>
  //     <Part part={parts[2]} exercise={exercises[2]}/>
  //   </div>
  // )
  return (
    <>
      {parts.map((part, index) => (<Part key={index} part={part} exercise={exercises[index]}/>))}
    </>
  )
  
}

const Total = ({exercises}) => {
  const sum = exercises.reduce((accumulator, currentValue) => accumulator + currentValue)
  return (
    <>
      <p>Number of exercises {sum}</p>
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

  const exercises = [exercises1, exercises2, exercises3]
  const parts = [part1, part2, part3]

  return (
    <div>
      <Header course={course}/>
      <Content parts={parts} exercises={exercises}/>
      <Total exercises={exercises}/>
    </div>
  )
}

export default App
