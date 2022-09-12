import { slidesData } from '../mockdata'

export const initialState = {
  slideIndex: 0,
}

export const slidesReducer = (state, event) => {
  if (event.type === 'NEXT') {
    return {
      ...state,
      slideIndex: (state.slideIndex + 1) % slidesData.length,
    }
  }
  if (event.type === 'PREV') {
    return {
      ...state,
      slideIndex:
        state.slideIndex === 0 ? slidesData.length - 1 : state.slideIndex - 1,
    }
  }
}
