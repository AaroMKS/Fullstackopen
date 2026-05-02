const Total = (props) => {
  const sum = props.parts.reduce((total, part) => total + part.exercises, 0)
  return (

    <div>
      Total of exercises {sum}
    </div>
  )
}

const Part = (props) => {
  return (
    <p>
      {props.part} {props.exercise}
    </p>
  )
}

const Content = (props) => {

  return (
    <div>
      {props.parts.map(part =>
      <Part key={part.id} part={part.name} exercise={part.exercises}/>)}
    </div>

  )
}

const Course = (props) => {
  return (
    <div>
      <h1>{props.course.name}</h1>
      <Content parts={props.course.parts}/>
      <Total parts={props.course.parts}/>
    </div>
  )
}

export default Course