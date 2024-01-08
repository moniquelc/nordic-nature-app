import {Button} from '@mui/material'

type ButtonProps = {
  text: string
  type?: 'button' | 'submit' | 'reset' | undefined
  onClick?: () => void
  fullWidth?: boolean
}

export const PrimaryButton = ({text, type, onClick, fullWidth = false}: ButtonProps) => (
  <Button
    type={type}
    variant="contained"
    fullWidth={fullWidth}
    color="primary"
    sx={{mt: 3, mb: 2}}
    onClick={onClick}>
    {text}
  </Button>
)

export const SecondaryButton = ({text, type, onClick, fullWidth = false}: ButtonProps) => (
  <Button
    type={type}
    variant="outlined"
    color="secondary"
    fullWidth={fullWidth}
    sx={{mt: 3, mb: 2}}
    onClick={onClick}>
    {text}
  </Button>
)
