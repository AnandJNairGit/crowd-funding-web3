import { Box } from '@mui/material'
import React from 'react'

const Centered = ({children}) => {
  return (
    <Box
    sx={{
    //   background: "red",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    {children}
  </Box>
  )
}

export default Centered