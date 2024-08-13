"use client"
import React, { useState, useEffect } from "react"
import { Fab, useTheme } from "@mui/material"
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false)
  const theme = useTheme()

  useEffect(() => {
    const onScroll = () => {
      if (window.pageYOffset > 100) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", onScroll)

    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <>
      {isVisible && (
        <Fab
          color='primary'
          aria-label='scroll-to-top'
          style={{
            cursor: "pointer",
            color: "white",
            position: "fixed",
            backgroundColor: theme.palette.presets.color,
            margin: "8",
            bottom: "20px",
            right: "12px",
            border: "1",
            borderRadius: "50%",
          }}
          onClick={scrollToTop}
        >
          <KeyboardArrowUpIcon sx={{ width: "120px", color: "black" }} />
        </Fab>
      )}
    </>
  )
}

export default ScrollToTop
