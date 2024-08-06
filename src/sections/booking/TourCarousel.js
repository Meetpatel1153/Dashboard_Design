import React from "react"
import Carousel from "react-material-ui-carousel"
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  useTheme,
  useMediaQuery,
  Avatar,
} from "@mui/material"
import { FaCalendarDay } from "react-icons/fa6"
import { HiUsers } from "react-icons/hi2"
import { tours } from "../../mock/Booking"

const TourCarousel = () => {
  const theme = useTheme()
  const isSmDown = useMediaQuery(theme.breakpoints.down("sm"))
  const isMdDown = useMediaQuery(theme.breakpoints.down("md"))
  const isLgDown = useMediaQuery(theme.breakpoints.down("lg"))

  const cardsPerPage = isSmDown ? 1 : isMdDown ? 2 : isLgDown ? 2 : 4

  const getChunks = (array, size) => {
    const result = []
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size))
    }
    return result
  }

  const chunks = getChunks(tours, cardsPerPage)

  return (
    <>
      <Box sx={{ width: "100%", p: "20px 0px 20px 20px", mt: 2 }}>
        <Box>
          <Typography
            sx={{
              fontFamily: "Inter, sans-serif",
              fontSize: "20px",
              fontWeight: "600",
              color: theme.palette.text.primary,
            }}
          >
            Newest Booking
          </Typography>
          <Typography
            sx={{
              fontFamily: "Inter, sans-serif",
              fontSize: "16px",
              fontWeight: "400",
              color: theme.palette.text.secondary,
              mb: 2,
            }}
          >
            {tours.length} bookings
          </Typography>
        </Box>
        <Carousel
          navButtonsAlwaysVisible
          indicators={false}
          cycleNavigation
          swipe
          autoPlay={false}
          animation='slide'
          navButtonsProps={{
            style: {
              backgroundColor: "transparent",
              color: "white",
            },
          }}
        >
          {chunks.map((chunk, index) => (
            <Box key={index} sx={{ display: "flex", gap: 2 }}>
              {chunk.map((tour) => (
                <Card
                  key={tour.id}
                  sx={{
                    flex: 1,
                    backgroundColor: theme.palette.background.paper,
                    borderRadius: "15px",
                  }}
                >
                  <CardContent>
                    <Box
                      sx={{
                        display: "flex",
                        gap: "10px",
                      }}
                    >
                      {" "}
                      <Avatar
                        alt={tour.name}
                        src={tour.avatar}
                        sx={{ width: 40, height: 40 }}
                      />
                      <Box>
                        <Typography
                          sx={{
                            fontFamily: "Inter, sans-serif",
                            fontSize: "14px",
                            fontWeight: "500",
                          }}
                        >
                          {tour.name}
                        </Typography>
                        <Typography
                          sx={{
                            fontFamily: "Inter, sans-serif",
                            fontSize: "12px",
                            fontWeight: "400",
                            color: theme.palette.text.secondary,
                          }}
                        >
                          {tour.time}
                        </Typography>
                      </Box>
                    </Box>
                    <Box>
                      <Box
                        sx={{
                          display: "flex",
                          gap: "14px",
                          mt: 2,
                        }}
                      >
                        <Typography
                          sx={{
                            fontFamily: "Inter, sans-serif",
                            fontSize: "12px",
                            fontWeight: "400",
                            color: theme.palette.text.secondary,
                          }}
                        >
                          <FaCalendarDay /> 3 days 2 nights
                        </Typography>
                        <Typography
                          sx={{
                            fontFamily: "Inter, sans-serif",
                            fontSize: "12px",
                            fontWeight: "400",
                            color: theme.palette.text.secondary,
                          }}
                        >
                          <HiUsers /> 3-5 Guests
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                  <Box sx={{ p: 1 }}>
                    <CardMedia
                      component='img'
                      height='350'
                      image={tour.image}
                      alt={tour.title}
                      sx={{ border: "0px solid ", borderRadius: "10px" }}
                    />
                  </Box>
                </Card>
              ))}
            </Box>
          ))}
        </Carousel>
      </Box>
    </>
  )
}

export default TourCarousel
