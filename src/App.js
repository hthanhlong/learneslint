import { Slide } from './components'
import { Fragment, useReducer } from 'react'
import { slides } from './mockdata'
import { initialState, slidesReducer } from './reducer'

const App = () => {
  const [state, dispatch] = useReducer(slidesReducer, initialState)

  return (
    <Fragment>
      <div className="slides">
        <button onClick={() => dispatch({ type: 'PREV' })}>‹</button>
        {[...slides, ...slides, ...slides].map((slide, i) => {
          let offset = slides.length + (state.slideIndex - i)
          return <Slide slide={slide} offset={offset} key={i} />
        })}
        <button onClick={() => dispatch({ type: 'NEXT' })}>›</button>
      </div>
      );
    </Fragment>
  )
}

export default App
