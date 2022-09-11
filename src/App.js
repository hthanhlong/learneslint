import { Fragment } from 'react'

// function getRandomInt(max) {
//   return Math.floor(Math.random() * max)
// }

const App = () => {
  // const [trigger1, setTrigger] = useState(false)
  // const [trigger2, setTrigger2] = useState(false)
  // const [numbers, setNumbers] = useState([1, 2, 3])

  // useEffect(() => {
  //   console.log('useEffect')
  //   const random = getRandomInt(100000000000000)
  //   setNumbers(numbers => {
  //     numbers?.push(random)
  //     return numbers
  //   })
  //   updateScrollBar()
  // }, [trigger1])

  // useLayoutEffect(() => {
  //   console.log('useLayoutEffect')
  //   const random = getRandomInt(100000000000000)
  //   setNumbers(numbers => {
  //     numbers?.push(random)
  //     return numbers
  //   })
  //   updateScrollBar()
  // }, [trigger2])

  // const updateScrollBar = () => {
  //   const appElement = document.getElementById('app')
  //   const height = appElement.getBoundingClientRect().height
  //   window.scrollTo(0, height - window.innerHeight)
  // }

  return (
    <Fragment>
      <div id="container">
        <div className="wrapper">
          <h1>Hoang Thanh Long LOVE Dang Thuy My</h1>
        </div>
      </div>
    </Fragment>
  )
}

export default App
