import { Button, Grid, Typography, useTheme } from "@mui/material"
import { Box } from "@mui/system"
import React from "react"

const Intro = () => {
  const theme = useTheme()
  return (
    <>
      <Grid item lg={12} md={12} sm={12} xs={12}>
        <Box
          sx={{
            backgroundColor: theme.palette.presets.color,
            p: "30px",
            border: `1px solid ${theme.palette.presets.color}`,
            borderRadius: "10px",
            display: "flex",
            justifyContent: "space-between",
            gap: "4px",
          }}
        >
          <Box>
            <Typography
              sx={{
                fontFamily: "Inter, sans-serif",
                fontSize: "22px",
                fontWeight: "600",
                mb: 1,
                color: "black",
              }}
            >
              Congratulations!
              <br />
              John Doe
            </Typography>
            <Typography
              sx={{
                fontFamily: "Inter, sans-serif",
                fontSize: "14px",
                fontWeight: "400",
                color: "black",
              }}
            >
              Best seller of the month You have done 57.6% more sales today.
            </Typography>
            <Button
              variant='contained'
              sx={{
                fontFamily: "Inter, sans-serif",
                fontSize: "14px",
                fontWeight: "500",
                textTransform: "none",
                backgroundColor: "#5F00D9",
                borderRadius: "10px",
                color: "white",
                mt: 5,
              }}
            >
              Go now
            </Button>
          </Box>
          <Box
            sx={{ display: { lg: "flex", md: "flex", sm: "none", xs: "none" } }}
          >
            <img
              src='https://boilerplate-ui-reactjs.vercel.app/assets/illustrations/characters/character_11.png'
              alt='welcome'
              style={{ maxWidth: "60%" }}
            ></img>
          </Box>
        </Box>
      </Grid>
    </>
  )
}

export default Intro
