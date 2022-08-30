import { MyFirstComponent } from '@'
import { useState, useEffect } from 'react'

const App = () => {
  const [value, setValue] = useState('')
  const [value2, setValue2] = useState('')

  const handleOnChange = abc => event => {
    event.preventDefault()
    const value = event.target.value
    console.log('abc', abc)
    console.log('test git name')
    setValue(value)
    setValue2(currentValue => {
      return (currentValue = currentValue + 1)
    })
  }

  useEffect(() => {
    // const stringa = 'abcc'
    // const emtyString = ''
    // const bol = true
    // const numberZero = 0
    // const number1 = 1
    // const emtyArr = []
    // const emtyOBJ = {}
    // const arr = ['a']
    // const object1 = {
    //   hello: 'hello',
    // }
    // console.log('stringa', !!stringa)
    // console.log('emtyString', !!emtyString)
    // console.log('bol', !!bol)
    // console.log('numberZero', !!numberZero)
    // console.log('number1', !!number1)
    // console.log('emtyArr', !!emtyArr)
    // console.log('emtyOBJ', !!emtyOBJ)
    // console.log('arr', !!arr)
    // console.log('object1', !!object1)
    setValue2(1)
    console.log('meena 2')
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
