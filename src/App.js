import { MyFirstComponent } from '@'
import { useState, useEffect } from 'react'

const App = () => {
  const [value, setValue] = useState('')
  const [value2, setValue2] = useState('')

  const handleOnChange = abc => event => {
    event.preventDefault()
    const value = event.target.value
    console.log('value', value)
    console.log('abc', abc)
    console.log('abc1231')
    setValue(value)
    setValue2(currentValue => {
      return (currentValue = currentValue + 1)
    })
  }

  useEffect(() => {
    setValue2(1)
  }, [])

  return (
    <h1>
      Hello React 3
      <input id="test" onChange={handleOnChange(123)} value={value}></input>
      <div>value 2: {value2}</div>
      <MyFirstComponent />
    </h1>
  )
}

export default App
