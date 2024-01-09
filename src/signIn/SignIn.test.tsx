import { render, screen, fireEvent } from '@testing-library/react'
import { SignIn } from './SignIn'
import { ThemeProvider } from '@mui/material'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { theme } from '../theme'

test('Should not accept passwords with less than 8 characters', async () => {
  render(
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route index element={<SignIn />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
  const passwordInput = screen.getByLabelText('Password')
  const submitButton = screen.getByRole('button', { name: 'Sign In' })
  fireEvent.change(passwordInput, { target: { value: 'pass' } })
  fireEvent.click(submitButton)
  const errorMessage = await screen.findByText('Password must be at least 8 characters long')
  expect(errorMessage).toBeVisible()
})
