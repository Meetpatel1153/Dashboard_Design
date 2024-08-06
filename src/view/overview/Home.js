import { Box, Grid, useTheme } from "@mui/material"
import React from "react"
import InstalledArea from "../../sections/home/AreaInstalled"
import CurrentDownload from "../../sections/home/CurrentDownload"
import IntroFeatured from "../../sections/home/IntroFeatured"
import WidgetSection from "../../sections/home/WidgetSection"

const Home = () => {
  const theme = useTheme()
  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          padding: { xs: "20px", md: "40px 80px", lg: "70px 70px" },
          backgroundColor: theme.palette.background.box,
          minHeight: "92vh",
        }}
      >
        <Grid container spacing={2}>
          <IntroFeatured />
          <WidgetSection />
          <CurrentDownload />
          <InstalledArea />
        </Grid>
      </Box>
    </>
  )
}

export default Home
