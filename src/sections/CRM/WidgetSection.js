import React from "react"
import { Box, Grid, IconButton, Typography, useTheme } from "@mui/material"
import { CRMWidgetData } from "../../mock/CRM"

const WidgetSection = () => {
  const theme = useTheme()

  return (
    <>
      {CRMWidgetData.map((item, index) => (
        <Grid key={index} item lg={3} md={6} xs={12} sm={6}>
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
              <IconButton gutterBottom>{item.icon}</IconButton>

              <Typography
                sx={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "14px",
                  fontWeight: "500",
                  color: theme.palette.text.secondary,
                }}
              >
                {item.title}
              </Typography>
            </Box>
            <Box sx={{ display: "flex" }}>
              <Typography
                sx={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "22px",
                  fontWeight: "600",
                  color: theme.palette.text.primary,
                }}
                gutterBottom
              >
                {item.data}
              </Typography>
            </Box>
          </Box>
        </Grid>
      ))}
    </>
  )
}

export default WidgetSection
