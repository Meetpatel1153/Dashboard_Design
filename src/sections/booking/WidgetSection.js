import React from "react"
import { Box, Grid, IconButton, Typography, useTheme } from "@mui/material"
import { BookingData } from "../../mock/Booking"

const WidgetSection = () => {
  const theme = useTheme()

  return (
    <>
      {BookingData.map((item, index) => (
        <Grid key={index} item lg={4} md={12} xs={12} sm={12}>
          <Box
            sx={{
              backgroundColor: theme.palette.background.paper,
              border: `0px solid ${theme.palette.divider}`,
              borderRadius: "10px",
              height: "100%",
              display: "flex",
              justifyContent: "space-between",
              p: 3,
            }}
          >
            <Box>
              <Typography
                sx={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "30px",
                  fontWeight: "600",
                  color: theme.palette.text.primary,
                }}
                gutterBottom
              >
                {item.data}
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "16px",
                  fontWeight: "500",
                  color: theme.palette.text.secondary,
                }}
              >
                {item.title}
              </Typography>
            </Box>
            <Box sx={{ display: "flex" }}>
              <IconButton gutterBottom>{item.icon}</IconButton>
            </Box>
          </Box>
        </Grid>
      ))}
    </>
  )
}

export default WidgetSection
