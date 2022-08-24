/* eslint-disable no-undef */
import MyFirstComponent from './MyFirstComponent'
import { render, cleanup, screen } from '@testing-library/react'

afterEach(cleanup)

it('Minhle changes the text after click', () => {
  render(<MyFirstComponent />)
  const text = screen.getByTestId('test')
  expect(text.innerHTML).toBe('hello MyFirstComponent')
})

it('Minhle changes the text after click 2', () => {
  render(<MyFirstComponent />)
  const text = screen.getByTestId('test')
  expect(text.innerHTML).toBe('hello MyFirstComponent')
})

it('Minhle changes the text after click 3', () => {
  render(<MyFirstComponent />)
  const text = screen.getByTestId('test')
  expect(text.innerHTML).toBe('hello MyFirstComponent')
})

it('Minhle changes the text after click 4', () => {
  render(<MyFirstComponent />)
  const text = screen.getByTestId('test')
  expect(text.innerHTML).toBe('hello MyFirstComponent')
})
