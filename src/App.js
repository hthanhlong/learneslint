import React from 'react'
import MyFirstComponent from './components/MyFirstComponent'
const App = () => {
  console.warn('hello, please remove me')
  console.error('hello, please remove me')
  return (
    <h1>
      Hello React 2 <MyFirstComponent />
    </h1>
  )
}

export default App
