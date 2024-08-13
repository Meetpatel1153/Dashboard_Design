import { Box, Grid, LinearProgress, Typography, useTheme } from "@mui/material"
import React from "react"

const BookingBooked = () => {
  const theme = useTheme()

  const BookingBookedData = [
    {
      title: "PENDING",
      value: 9.91,
      color: "#8884d8",
    },
    {
      title: "CANCELLED",
      value: 1.95,
      color: "#0ea770",
    },
    {
      title: "SOLD",
      value: 9.12,
      color: "#ffc658",
    },
  ]

  return (
    <>
      <>
        <Box
          sx={{
            backgroundColor: theme.palette.background.paper,
            p: "20px",
            border: `0px solid ${theme.palette.divider}`,
            borderRadius: "10px",
          }}
        >
          <Box>
            <Typography
              sx={{
                fontFamily: "Inter, sans-serif",
                fontSize: "20px",
                fontWeight: "500",
                p: "10px 10px 10px 0px",
              }}
            >
              Booked
            </Typography>
          </Box>

          {BookingBookedData.map((data) => (
            <>
              <Grid
                container
                alignItems='center'
                justifyContent='space-between'
                sx={{ mt: 3, mb: 1 }}
              >
                <Grid item>
                  <Typography
                    sx={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "13px",
                      fontWeight: "500",
                    }}
                  >
                    {data.title}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography
                    sx={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "14px",
                      fontWeight: "500",
                    }}
                  >
                    {data.value}k
                  </Typography>
                </Grid>
              </Grid>
              <Box>
                <LinearProgress
                  variant='determinate'
                  value={data.value}
                  sx={{
                    p: "2.5px",
                    borderRadius: "10px",
                    "& .MuiLinearProgress-bar": {
                      backgroundColor: data.color,
                      borderRadius: "10px",
                    },
                  }}
                />
              </Box>
            </>
          ))}
        </Box>
      </>
    </>
  )
}

export default BookingBooked
