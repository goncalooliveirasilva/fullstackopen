const Header = ({text}) => <h1>{text}</h1>

const Content = ({course}) => (
  <div>
    {course.parts.map(value => <Part key={value.id} part={value}></Part>)}
  </div>
)

const Part = ({part}) => (
  <p>
    {part.name} {part.exercises}
  </p>
)

const Total = ({course}) => {
  const total = course.parts.reduce((previous, current) => previous + current.exercises, 0)
  return <><p><b>Total of {total} exercises</b></p></>
}

const Course = ({course}) => {
  return (
    <>
      <Header text={course.name}></Header>
      <Content course={course}></Content>
      <Total course={course}></Total>
    </>
  )
}

export default Course