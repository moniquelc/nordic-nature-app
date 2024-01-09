import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SignIn from './signIn'
import Home from './home'
import { theme } from './theme'
import { ThemeProvider } from '@mui/material/styles'

function App () {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route index element={<SignIn />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
