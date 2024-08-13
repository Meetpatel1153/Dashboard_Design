import {
  Box,
  Button,
  Grid,
  LinearProgress,
  Typography,
  useTheme,
} from "@mui/material"
import React from "react"

const SalesOverview = () => {
  const theme = useTheme()

  const SalesOveriviewData = [
    {
      title: "Total Profit",
      price: "$8,374",
      percentage: 10.1,
      color: "#8884d8",
    },
    {
      title: "Total Income",
      price: "$9,714",
      percentage: 13.6,
      color: "#0ea770",
    },
    {
      title: "Total Expenses",
      price: "$6,871",
      percentage: 28.2,
      color: "#ffc658",
    },
  ]

  return (
    <>
      <Grid item lg={8} md={12} xs={12} sm={12}>
        <Box
          sx={{
            backgroundColor: theme.palette.background.paper,
            p: "30px",
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
                mb: 0.5,
              }}
            >
              Sales Overview
            </Typography>
          </Box>

          {SalesOveriviewData.map((data) => (
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
                      fontSize: "14px",
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
                    {data.price}{" "}
                    <span style={{ color: theme.palette.text.secondary }}>
                      ({data.percentage}%)
                    </span>
                  </Typography>
                </Grid>
              </Grid>
              <Box>
                <LinearProgress
                  variant='determinate'
                  value={data.percentage}
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
      </Grid>
      <Grid item lg={4} md={12} xs={12} sm={12}>
        <Box
          sx={{
            backgroundColor: theme.palette.background.paper,
            p: "30px",
            border: "0px solid",
            borderRadius: "10px",
          }}
        >
          <Box sx={{ mb: 2 }}>
            <Typography
              sx={{
                fontFamily: "Inter, sans-serif",
                fontSize: "16px",
                fontWeight: "500",
                mb: 0.5,
              }}
            >
              Current Balance
            </Typography>
            <Typography
              sx={{
                fontFamily: "Inter, sans-serif",
                fontSize: "25px",
                fontWeight: "bold",
              }}
            >
              $162,150
            </Typography>
          </Box>
          <Box sx={{ mb: 1 }}>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
            >
              <Typography
                sx={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "14px",
                  fontWeight: "400",
                }}
              >
                Order Total
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "14px",
                  fontWeight: "400",
                }}
              >
                $187,650
              </Typography>
            </Box>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
            >
              <Typography
                sx={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "14px",
                  fontWeight: "400",
                }}
              >
                Earning
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "14px",
                  fontWeight: "400",
                }}
              >
                - $25,500
              </Typography>
            </Box>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
            >
              <Typography
                sx={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "14px",
                  fontWeight: "400",
                }}
              >
                Refunded
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "16px",
                  fontWeight: "500",
                }}
              >
                $162,150
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mb: 1,
              mt: 2,
              gap: "8px",
            }}
          >
            <Button
              fullWidth
              variant='contained'
              sx={{
                fontFamily: "Inter, sans-serif",
                fontSize: "16px",
                fontWeight: "500",
                textTransform: "none",
                backgroundColor: "#feab00",
                color: "white",
              }}
            >
              Request
            </Button>
            <Button
              fullWidth
              variant='contained'
              sx={{
                fontFamily: "Inter, sans-serif",
                fontSize: "16px",
                fontWeight: "500",
                textTransform: "none",
                backgroundColor: "#0ea770",
                color: "white",
              }}
            >
              Transfer
            </Button>
          </Box>
        </Box>
      </Grid>
    </>
  )
}

export default SalesOverview
