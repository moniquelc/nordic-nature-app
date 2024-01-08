import {Forest} from '@mui/icons-material'
import {Typography} from '@mui/material'
import './styles.scss'

type LogoProps = {
  mode: 'light' | 'dark'
}

export const Logo = ({mode}: LogoProps) => (
  <div className="logo-container">
    <Forest sx={{color: mode === 'light' ? 'primary.light' : 'primary.dark', mr: 1}} />
    <Typography variant="h6" sx={{color: mode === 'light' ? 'primary.light' : 'primary.dark'}}>
      NORDIC NATURE
    </Typography>
  </div>
)
