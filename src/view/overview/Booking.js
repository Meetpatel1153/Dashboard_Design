import { Box, Grid, useTheme } from "@mui/material"
import React from "react"
import BookingBooked from "../../sections/booking/BookingBooked"
import BookingSold from "../../sections/booking/BookingSold"
import BookingStastic from "../../sections/booking/BookingStastic"
import CustomerReview from "../../sections/booking/CustomerReview"
import TotalIncome from "../../sections/booking/TotalIncome"
import TourCarousel from "../../sections/booking/TourCarousel"
import ToursAvailable from "../../sections/booking/ToursAvailable"
import WidgetSection from "../../sections/booking/WidgetSection"

const Booking = () => {
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

          <Grid container item xs={12} spacing={2}>
            <Grid item lg={8} md={12} sm={12} xs={12}>
              <Grid container spacing={2}>
                <Grid item lg={6} md={12} sm={12} xs={12}>
                  <TotalIncome />
                </Grid>
                <Grid item lg={6} md={12} sm={12} xs={12}>
                  <BookingBooked />
                </Grid>

                <Grid item xs={12}>
                  <BookingSold />
                </Grid>
                <Grid item xs={12}>
                  <BookingStastic />
                </Grid>
              </Grid>
            </Grid>

            <Grid item lg={4} md={12} sm={12} xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <ToursAvailable />
                </Grid>
                <Grid item xs={12}>
                  <CustomerReview />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid xs={12}>
            <TourCarousel />
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default Booking
