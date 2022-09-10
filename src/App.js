import { useState, useEffect, useLayoutEffect, Fragment } from 'react'

function getRandomInt(max) {
  return Math.floor(Math.random() * max)
}

const App = () => {
  const [trigger1, setTrigger] = useState(false)
  const [trigger2, setTrigger2] = useState(false)
  const [numbers, setNumbers] = useState([1, 2, 3])

  useEffect(() => {
    console.log('useEffect')
    const random = getRandomInt(100000000000000)
    setNumbers(numbers => {
      numbers?.push(random)
      return numbers
    })
    updateScrollBar()
  }, [trigger1])

  useLayoutEffect(() => {
    console.log('useLayoutEffect')
    const random = getRandomInt(100000000000000)
    setNumbers(numbers => {
      numbers?.push(random)
      return numbers
    })
    updateScrollBar()
  }, [trigger2])

  const updateScrollBar = () => {
    const appElement = document.getElementById('app')
    const height = appElement.getBoundingClientRect().height
    window.scrollTo(0, height - window.innerHeight)
  }

  return (
    <Fragment>
      <h1>
        Hello React 3
        <div id="container">
          {numbers &&
            numbers.map(value => (
              <div key={value} id="retangle">
                {value}
              </div>
            ))}
        </div>
        <button className="btn" onClick={() => setTrigger(value => !value)}>
          click me Add Dom by useEffect!
        </button>
        <button
          className="btn layoutEffect"
          onClick={() => setTrigger2(value => !value)}
        >
          click me Add by useLayoutEffect!
        </button>
      </h1>
    </Fragment>
  )
}

export default App
