import React from 'react'
import { Button } from '@mui/material'

interface ButtonProps {
  text: string
  type?: 'button' | 'submit' | 'reset' | undefined
  onClick?: () => void
  fullWidth?: boolean
}

export const PrimaryButton: React.FC<ButtonProps> = ({ text, type, onClick, fullWidth = false }) => (
  <Button
    type={type}
    variant="contained"
    fullWidth={fullWidth}
    color="primary"
    sx={{ mt: 3, mb: 2 }}
    onClick={onClick}>
    {text}
  </Button>
)

export const SecondaryButton: React.FC<ButtonProps> = ({ text, type, onClick, fullWidth = false }) => (
  <Button
    type={type}
    variant="outlined"
    color="secondary"
    fullWidth={fullWidth}
    sx={{ mt: 3, mb: 2 }}
    onClick={onClick}>
    {text}
  </Button>
)
