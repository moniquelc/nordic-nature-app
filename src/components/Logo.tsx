import React from 'react'
import { Forest } from '@mui/icons-material'
import { Typography } from '@mui/material'
import './styles.scss'

interface LogoProps {
  mode: 'light' | 'dark'
}

export const Logo: React.FC<LogoProps> = ({ mode }) => (
  <div className="logo-container">
    <Forest sx={{ color: mode === 'light' ? 'primary.light' : 'primary.dark', mr: 1 }} />
    <Typography variant="h6" sx={{ color: mode === 'light' ? 'primary.light' : 'primary.dark' }}>
      NORDIC NATURE
    </Typography>
  </div>
)
