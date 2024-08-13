import { Box, LinearProgress } from "@mui/material"
import React from "react"

const Loader = () => {
  return (
    <>
      <Box
        sx={{
          px: 5,
          width: 1,
          flexGrow: 1,
          minHeight: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mt: 30,
        }}
      >
        <LinearProgress color='inherit' sx={{ width: 1, maxWidth: 360 }} />
      </Box>
    </>
  )
}
export default Loader
