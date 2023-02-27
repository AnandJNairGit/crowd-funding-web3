import { CampaignRounded } from '@mui/icons-material'
import { Fab } from '@mui/material'
import React from 'react'

const FloatingButton = ({onClick}) => {
  return (
    <Fab
    onClick={onClick}
    variant="extended"
    sx={{
      background: "orange",
      position: "absolute",
      bottom: 30,
      right: 20,
    }}
  >
    <CampaignRounded sx={{ mr: 1 }} />
    Request Campaign
  </Fab>
  )
}

export default FloatingButton