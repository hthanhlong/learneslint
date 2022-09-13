import { Slide } from '@'
import { Fragment, useReducer, useEffect } from 'react'
import { slidesData } from './mockdata'
import { initialState, slidesReducer } from './reducer'

const App = () => {
  const [state, dispatch] = useReducer(slidesReducer, initialState)

  useEffect(() => {
    if (intervalID) clearInterval(intervalID)
    let intervalID = setInterval(() => {
      dispatch({ type: 'NEXT' })
    }, 2000)
    return () => {
      if (intervalID) clearInterval(intervalID)
    }
  }, [])

  return (
    <Fragment>
      <div className="slides">
        {[...slidesData, ...slidesData, ...slidesData].map((slide, i) => {
          let offset = slidesData.length + (state.slideIndex - i)
          return <Slide slide={slide} offset={offset} key={i} />
        })}
      </div>
    </Fragment>
  )
}

export default App
