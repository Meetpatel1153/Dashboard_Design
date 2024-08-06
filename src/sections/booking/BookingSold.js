import React from "react"
import {
  Box,
  Typography,
  useTheme,
  Grid,
  CircularProgress,
} from "@mui/material"

const BookingSold = () => {
  const theme = useTheme()

  const data = [
    { id: 1, percentage: 72, value: "38,566", label: "Sold", color: "#8884d8" },
    {
      id: 2,
      percentage: 64,
      value: "18,472",
      label: "Pending for payment",
      color: "#0ea770",
    }, //
  ]

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.paper,
        border: `0px solid ${theme.palette.divider}`,
        borderRadius: "10px",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        p: 5,
      }}
    >
      <Grid container spacing={2}>
        {data.map((item) => (
          <Grid item xs={6} key={item.id}>
            <Box
              sx={{
                borderRight:
                  item.id === 1
                    ? `1px dashed ${theme.palette.divider}`
                    : "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "20px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Box position='relative' display='inline-flex'>
                  <CircularProgress
                    variant='determinate'
                    value={100}
                    size={80}
                    thickness={5}
                    sx={{ color: theme.palette.background.box }}
                  />
                  <CircularProgress
                    variant='determinate'
                    value={item.percentage}
                    size={80}
                    thickness={5}
                    sx={{ color: item.color, position: "absolute", left: 0 }}
                  />
                  <Box
                    sx={{
                      top: 0,
                      left: 0,
                      bottom: 0,
                      right: 0,
                      position: "absolute",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "column",
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "16px",
                        fontWeight: "500",
                        color: theme.palette.text.primary,
                      }}
                    >
                      {item.percentage}%
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Box>
                <Typography
                  sx={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "20px",
                    fontWeight: "bold",
                    color: theme.palette.text.primary,
                  }}
                >
                  {item.value}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "14px",
                    fontWeight: "500",
                    color: theme.palette.text.secondary,
                    mt: 1,
                  }}
                >
                  {item.label}
                </Typography>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default BookingSold
