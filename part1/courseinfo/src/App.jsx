const Header = (props) => {
  // console.log(props)
  return (<h1>{props.course.name}</h1>)
}

const Part = (props) => {
  return (<p>{props.part} {props.exercise}</p>)
}

const Content = (props) => {
  console.log('Content', props)
  return (
    <>
      {props.course.parts.map((part, index) => (
        <Part key={index} part={part.name} exercise={part.exercises}/>
      ))}
    </>
  )
  
}

const Total = (props) => {
  console.log(props)
  const sum = props.course.parts.reduce((total, current) => total + current.exercises, 0)
  return (
    <>
      <p>Number of exercises {sum}</p>
    </>
  )
}

const App = () => {
  const course =  {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course}/>
      <Content course={course}/>
      <Total course={course}/>
    </div>
  )
}

export default App
