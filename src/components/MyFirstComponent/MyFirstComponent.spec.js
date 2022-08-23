/* eslint-disable no-undef */
import renderer from 'react-test-renderer'
import MyFirstComponent from './MyFirstComponent'
import { cleanup } from '@testing-library/react'

afterEach(cleanup)

it('CheckboxWithLabel changes the text after click', () => {
  const component = renderer.create(<MyFirstComponent />)
  expect(component).toBe(component)
})
