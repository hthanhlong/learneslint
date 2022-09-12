import { Slide } from '@'
import { Fragment, useReducer } from 'react'
import { slidesData } from './mockdata'
import { initialState, slidesReducer } from './reducer'

const App = () => {
  const [state, dispatch] = useReducer(slidesReducer, initialState)

  return (
    <Fragment>
      <div className="slides">
        <button onClick={() => dispatch({ type: 'PREV' })}>‹</button>
        {[...slidesData, ...slidesData, ...slidesData].map((slide, i) => {
          let offset = slidesData.length + (state.slideIndex - i)
          return <Slide slide={slide} offset={offset} key={i} />
        })}
        <button onClick={() => dispatch({ type: 'NEXT' })}>›</button>
      </div>
      );
    </Fragment>
  )
}

export default App
