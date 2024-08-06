import { Box, Grid, useTheme } from "@mui/material"
import React from "react"
import Intro from "../../sections/sales/Intro"
import QuickTransfer from "../../sections/sales/QuickTransfer"
import SalesOverview from "../../sections/sales/SalesOverview"

import WidgetSection from "../../sections/sales/WidgetSection"
import YearlySales from "../../sections/sales/YearlySales"

const Sales = () => {
  const theme = useTheme()
  return (
    <Box
      sx={{
        flexGrow: 1,
        padding: { xs: "20px", md: "40px 80px", lg: "70px 70px" },
        backgroundColor: theme.palette.background.box,
        minHeight: "92vh",
      }}
    >
      <Grid container spacing={2}>
        <Intro />
        <WidgetSection />
        <YearlySales />
        <QuickTransfer />
        <SalesOverview />
      </Grid>
    </Box>
  )
}

export default Sales
