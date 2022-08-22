import React from 'react'
import { MyFirstComponent } from './components'

const App = () => {
  /* eslint-disable no-undef */
  const MINH_LE = process.env.MINHLE
  console.log('hello, please remove me')
  return (
    <h1>
      Hello React 3 - {MINH_LE}
      <MyFirstComponent />
    </h1>
  )
}

export default App
