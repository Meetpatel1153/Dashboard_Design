import { CircularProgress, Typography, useTheme } from "@mui/material"
import { Box } from "@mui/system"
import React from "react"
import { RiCheckboxBlankFill } from "react-icons/ri"

const ToursAvailable = () => {
  const theme = useTheme()
  const totalTours = 186
  const soldOutTours = 120
  const availableTours = totalTours - soldOutTours
  const soldOutPercentage = (soldOutTours / totalTours) * 100

  return (
    <>
      <Box
        sx={{
          backgroundColor: theme.palette.background.paper,
          border: "0px solid ",
          borderRadius: "10px",
          padding: "20px",
          width: "100%",
        }}
      >
        <Box>
          <Typography
            sx={{
              fontFamily: "Inter, sans-serif",
              fontSize: "20px",
              fontWeight: "500",
              mb: 0.5,
              p: 1,
            }}
          >
            Tours Available
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            mt: 2,
            mb: 2,
          }}
        >
          <Box position='relative' display='inline-flex'>
            <CircularProgress
              variant='determinate'
              value={100}
              size={200}
              thickness={4}
              sx={{ color: theme.palette.background.box }}
            />
            <CircularProgress
              variant='determinate'
              value={soldOutPercentage}
              size={200}
              thickness={4}
              sx={{
                color: "#5F00D9",
                position: "absolute",
                left: 0,
              }}
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
                  fontSize: "14px",
                  fontWeight: "500",
                  color: theme.palette.text.secondary,
                }}
              >
                Tours
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "20px",
                  fontWeight: "bold",
                  color: theme.palette.text.primary,
                }}
              >
                {totalTours}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box sx={{ p: 2 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
            <Typography
              sx={{
                fontFamily: "Inter, sans-serif",
                fontSize: "14px",
                fontWeight: "500",
                color: theme.palette.text.secondary,
              }}
            >
              <span>
                <RiCheckboxBlankFill style={{ color: "#5F00D9" }} />
              </span>{" "}
              Sold out
            </Typography>
            <Typography
              sx={{
                fontFamily: "Inter, sans-serif",
                fontSize: "14px",
                fontWeight: "500",
                color: theme.palette.text.secondary,
              }}
            >
              {soldOutTours} Tours
            </Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography
              sx={{
                fontFamily: "Inter, sans-serif",
                fontSize: "14px",
                fontWeight: "500",
                color: theme.palette.text.secondary,
              }}
            >
              <span>
                <RiCheckboxBlankFill
                  style={{ color: theme.palette.background.box }}
                />
              </span>{" "}
              Available
            </Typography>
            <Typography
              sx={{
                fontFamily: "Inter, sans-serif",
                fontSize: "14px",
                fontWeight: "500",
                color: theme.palette.text.secondary,
              }}
            >
              {availableTours} Tours
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  )
}
export default ToursAvailable
