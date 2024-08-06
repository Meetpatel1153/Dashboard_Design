import { Box, Grid, useTheme } from "@mui/material"
import React from "react"
import DataActivity from "../../sections/file/DataActivity"
import UploadFile from "../../sections/file/UploadFile"
import WidgetSection from "../../sections/file/WidgetSection"

const File = () => {
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
          <WidgetSection />
          <DataActivity />
          <UploadFile />
        </Grid>
      </Box>
    </>
  )
}

export default File
