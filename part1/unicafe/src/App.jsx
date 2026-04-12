import { useState } from 'react'

const StatisticLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistic = (props) => {
  if (props.good+props.neutral+props.bad === 0){
    return(
      <div>
        No feedback given
      </div>
  
    )
  }
  const positive = (props.good/(props.good+props.neutral+props.bad))*100
  const average = ((props.good*1+props.bad*-1)/(props.good+props.neutral+props.bad))
  return (
    <table>
      <tbody>
          <StatisticLine text = "good" value={props.good} />
          <StatisticLine text = "neutral" value={props.neutral} />
          <StatisticLine text = "bad" value={props.bad} />
          <StatisticLine text = "all" value={props.good+props.neutral+props.bad} />
          <StatisticLine text = "average" value={average} />
          <StatisticLine text = "positive" value={positive + " %"} />
      </tbody>
    </table>
    )
}
const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>

      <Button onClick={() => setGood(good + 1)} text="good" />
      <Button onClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button onClick={() => setBad(bad + 1)} text="bad" />
      <h1>statistics</h1>
      <Statistic good={good} neutral={neutral} bad={bad} />  
    </div>
  )
}

export default App
