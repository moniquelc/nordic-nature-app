import React from 'react'
import { useNavigate } from 'react-router-dom'
import { AccountCircle as UserIcon } from '@mui/icons-material'
import { Logo } from '../../components/Logo'
import { SecondaryButton } from '../../components/Buttons'
import '../styles.scss'
import { Typography } from '@mui/material'

export const Navbar: React.FC = () => {
  const navigate = useNavigate()

  const handleLogout = () => { navigate('/') }

  return (
    <div className="nav">
      <Logo mode="light" />
      <div className="container-right">
        <div className="user-container">
          <UserIcon sx={{ color: 'primary.light', mr: 1 }} />
          <Typography sx={{ color: 'primary.light' }} variant="body1">
            User
          </Typography>
        </div>
        <SecondaryButton text="Logout" onClick={handleLogout} />
      </div>
    </div>
  )
}
