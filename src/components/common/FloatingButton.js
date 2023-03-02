import { CampaignRounded } from '@mui/icons-material'
import { Fab } from '@mui/material'
import React from 'react'

const FloatingButton = ({onClick, title}) => {
  return (
    <Fab
    onClick={onClick}
    variant="extended"
    sx={{
      background: "#52eb34",
      position: "fixed",
      bottom: 30,
      right: 20,
    }}
  >
    <CampaignRounded sx={{ mr: 1 }} />
    {title}
  </Fab>
  )
}

export default FloatingButton