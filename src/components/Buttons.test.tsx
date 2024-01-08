import {render, screen, fireEvent} from '@testing-library/react'
import {PrimaryButton, SecondaryButton} from './Buttons'

test('handles click on primary button', () => {
  const onClick = jest.fn()
  render(<PrimaryButton text="test primary button" onClick={onClick} />)
  const buttonEllement = screen.getByText('test primary button')
  fireEvent.click(buttonEllement)
  expect(onClick).toHaveBeenCalledTimes(1)
})

test('handles click on secondary button', () => {
  const onClick = jest.fn()
  render(<SecondaryButton text="test secondary button" onClick={onClick} />)
  const buttonEllement = screen.getByText('test secondary button')
  fireEvent.click(buttonEllement)
  expect(onClick).toHaveBeenCalledTimes(1)
})
