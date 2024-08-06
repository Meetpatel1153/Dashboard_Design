import React from "react"
import { Box, Grid, LinearProgress, Typography, useTheme } from "@mui/material"
import { FileData } from "../../mock/File"

const WidgetSection = () => {
  const theme = useTheme()

  return (
    <>
      {FileData.map((item, index) => (
        <Grid key={index} item lg={4} md={12} xs={12} sm={12}>
          <Box
            sx={{
              backgroundColor: theme.palette.background.paper,
              p: "20px",
              border: `0px solid ${theme.palette.divider}`,
              borderRadius: "10px",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                fontSize: "45px",
                color: theme.palette.text.primary,
              }}
              gutterBottom
            >
              {item.icon}
            </Box>
            <Typography
              sx={{
                fontFamily: "Inter, sans-serif",
                fontSize: "20px",
                fontWeight: "600",
                color: theme.palette.text.primary,
                mb: 1.4,
              }}
              gutterBottom
            >
              {item.title}
            </Typography>
            <Box sx={{ mb: 2 }}>
              <LinearProgress
                variant='determinate'
                value={item.data}
                sx={{
                  p: "2.5px",
                  borderRadius: "10px",
                }}
              />
            </Box>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Typography gutterBottom>
                <span
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "14px",
                    fontWeight: "500",
                    color: theme.palette.text.secondary,
                  }}
                >
                  {item.data} Gb
                </span>
                /
                <span
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "14px",
                    fontWeight: "500",
                    color: theme.palette.text.primary,
                  }}
                >
                  22.35 Gb
                </span>
              </Typography>
            </Box>
          </Box>
        </Grid>
      ))}
    </>
  )
}

export default WidgetSection
