import { Box, Grid, useTheme } from "@mui/material"
import React from "react"

const Blank = () => {
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
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Box
              sx={{
                backgroundColor: theme.palette.background.paper,
                p: "30px",
                borderRadius: "10px",
                display: "flex",
                justifyContent: "space-between",
                gap: "4px",
              }}
            >
              12
            </Box>
          </Grid>
          <Grid item lg={8} md={12} sm={12} xs={12}>
            <Box
              sx={{
                backgroundColor: theme.palette.background.paper,
                p: "30px",
                borderRadius: "10px",
                display: "flex",
                justifyContent: "space-between",
                gap: "4px",
              }}
            >
              8
            </Box>
          </Grid>
          <Grid item lg={4} md={12} sm={12} xs={12}>
            <Box
              sx={{
                backgroundColor: theme.palette.background.paper,
                p: "30px",
                borderRadius: "10px",
                display: "flex",
                justifyContent: "space-between",
                gap: "4px",
              }}
            >
              4
            </Box>
          </Grid>
          <Grid item lg={4} md={12} sm={12} xs={12}>
            <Box
              sx={{
                backgroundColor: theme.palette.background.paper,
                p: "30px",
                borderRadius: "10px",
                display: "flex",
                justifyContent: "space-between",
                gap: "4px",
              }}
            >
              4
            </Box>
          </Grid>
          <Grid item lg={4} md={12} sm={12} xs={12}>
            <Box
              sx={{
                backgroundColor: theme.palette.background.paper,
                p: "30px",
                borderRadius: "10px",
                display: "flex",
                justifyContent: "space-between",
                gap: "4px",
              }}
            >
              4
            </Box>
          </Grid>
          <Grid item lg={4} md={12} sm={12} xs={12}>
            <Box
              sx={{
                backgroundColor: theme.palette.background.paper,
                p: "30px",
                borderRadius: "10px",
                display: "flex",
                justifyContent: "space-between",
                gap: "4px",
              }}
            >
              4
            </Box>
          </Grid>
          <Grid item lg={3} md={6} sm={12} xs={12}>
            <Box
              sx={{
                backgroundColor: theme.palette.background.paper,
                p: "30px",
                borderRadius: "10px",
                display: "flex",
                justifyContent: "space-between",
                gap: "4px",
              }}
            >
              3
            </Box>
          </Grid>
          <Grid item lg={3} md={6} sm={12} xs={12}>
            <Box
              sx={{
                backgroundColor: theme.palette.background.paper,
                p: "30px",
                borderRadius: "10px",
                display: "flex",
                justifyContent: "space-between",
                gap: "4px",
              }}
            >
              3
            </Box>
          </Grid>
          <Grid item lg={3} md={6} sm={12} xs={12}>
            <Box
              sx={{
                backgroundColor: theme.palette.background.paper,
                p: "30px",
                borderRadius: "10px",
                display: "flex",
                justifyContent: "space-between",
                gap: "4px",
              }}
            >
              3
            </Box>
          </Grid>
          <Grid item lg={3} md={6} sm={12} xs={12}>
            <Box
              sx={{
                backgroundColor: theme.palette.background.paper,
                p: "30px",
                borderRadius: "10px",
                display: "flex",
                justifyContent: "space-between",
                gap: "4px",
              }}
            >
              3
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default Blank
