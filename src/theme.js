import { createTheme } from "@mui/material/styles"

const lightTheme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#ffffff",
      paper: "#ffffff",
      box: "#F3F3F7",
    },
    text: {
      primary: "#000000",
      secondary: "#535D66",
    },
    sidebar: {
      color: "#eef9f4",
    },
    presets: {
      color: "#d9f4e8",
    },
  },
})

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#121212",
      paper: "#212b37",
      box: "#161c24",
    },
    text: {
      primary: "#ffffff",
      secondary: "#bbbbbb",
    },
    sidebar: {
      color: "#14292a",
    },
    presets: {
      color: "#d9f4e8",
    },
  },
})

export { lightTheme, darkTheme }
