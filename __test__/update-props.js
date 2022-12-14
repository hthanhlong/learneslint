// This is an example of how to update the props of a rendered component.
// the basic idea is to simply call `render` again and provide the same container
// that your first call created for you.

/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import * as React from 'react'
import { useRef } from 'react'
import { render, screen } from '@testing-library/react'

let idCounter = 1

const NumberDisplay = ({ number }) => {
  const id = useRef(idCounter++) // to ensure we don't remount a different instance

  return (
    <div>
      <span data-testid="number-display">{number}</span>
      <span data-testid="instance-id">{id.current}</span>
    </div>
  )
}

test('calling render with the same component on the same container does not remount', () => {
  const { rerender } = render(<NumberDisplay number={1} />)
  expect(screen.getByTestId('number-display')).toHaveTextContent('1')

  // re-render the same component with different props
  rerender(<NumberDisplay number={2} />)
  expect(screen.getByTestId('number-display')).toHaveTextContent('2')

  expect(screen.getByTestId('instance-id')).toHaveTextContent('1')
})
