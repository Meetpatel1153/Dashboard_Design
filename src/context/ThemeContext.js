// src/contexts/ThemeContext.js

import React, { createContext, useState, useMemo, useContext } from "react"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { darkTheme, lightTheme } from "../theme"

const ThemeContext = createContext()

const ThemeProviderComponent = ({ children }) => {
  const [mode, setMode] = useState("dark")
  const [color, setColor] = useState("#d9f4e8")

  const theme = useMemo(() => {
    const baseTheme = mode === "light" ? lightTheme : darkTheme
    return createTheme({
      ...baseTheme,
      palette: {
        ...baseTheme.palette,
        presets: {
          ...baseTheme.palette.theme,
          color: color,
        },
      },
    })
  }, [mode, color])

  const handleColorChange = (newColor) => {
    setColor(newColor)
  }

  return (
    <ThemeContext.Provider value={{ mode, setMode, handleColorChange }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  )
}

const useThemeProvider = () => useContext(ThemeContext)

export { ThemeProviderComponent, useThemeProvider }
