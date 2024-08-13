import React, { useEffect, useState } from "react"
import { Box, LinearProgress, useTheme } from "@mui/material"
import { useLocation } from "react-router-dom"

const ScrollProgressBar = () => {
  const [scrollProgress, setScrollProgress] = useState(0)
  const theme = useTheme()
  const location = useLocation()

  const handleScroll = () => {
    const scrollTop = window.scrollY
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    const scrollPercent = (scrollTop / docHeight) * 100
    setScrollProgress(scrollPercent)
  }

  useEffect(() => {
    const resetScrollProgress = () => {
      setScrollProgress(0)
      window.scrollTo(0, 0)
    }

    window.addEventListener("scroll", handleScroll)
    resetScrollProgress()

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [location.pathname])

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 9999,
      }}
    >
      <LinearProgress
        variant='determinate'
        value={scrollProgress}
        sx={{
          height: 4,
          backgroundColor: theme.palette.background.paper,

          "& .MuiLinearProgress-bar": {
            backgroundColor: "#0ea770",
            borderRadius: "10px",
          },
        }}
      />
    </Box>
  )
}

export default ScrollProgressBar
