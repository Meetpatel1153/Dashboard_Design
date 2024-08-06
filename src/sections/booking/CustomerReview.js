import React from "react"
import { Box, Typography, useTheme, Avatar } from "@mui/material"
import Carousel from "react-material-ui-carousel"
import StarIcon from "@mui/icons-material/Star"
import StarBorderIcon from "@mui/icons-material/StarBorder"
import { reviews } from "../../mock/Booking"

const CustomerReview = () => {
  const theme = useTheme()

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.paper,
        border: "0px solid",
        borderRadius: "10px",
        padding: "20px",
        width: "100%",
      }}
    >
      <Box sx={{ p: 1 }}>
        <Typography
          sx={{
            fontFamily: "Inter, sans-serif",
            fontSize: "20px",
            fontWeight: "500",
            mb: 0.5,
          }}
        >
          Customer Review
        </Typography>
        <Typography
          sx={{
            fontFamily: "Inter, sans-serif",
            fontSize: "14px",
            fontWeight: "400",
            color: theme.palette.text.secondary,
          }}
        >
          See what our customers are saying
        </Typography>
      </Box>
      <Carousel
        autoPlay={false}
        animation='slide'
        navButtonsProps={{
          style: {
            backgroundColor: "transparent",
            color: "white",
          },
        }}
      >
        {reviews.map((review, index) => (
          <Box
            key={index}
            sx={{
              p: 2,
              justifyContent: "flex-start",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: "10px",
              }}
            >
              {" "}
              <Avatar
                alt={review.name}
                src={review.avatar}
                sx={{ width: 50, height: 50 }}
              />
              <Box>
                <Typography
                  sx={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "16px",
                    fontWeight: "500",
                  }}
                >
                  {review.name}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "12px",
                    fontWeight: "400",
                    color: theme.palette.text.secondary,
                  }}
                >
                  {review.time}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: "flex", mb: 1.5, mt: 1.5 }}>
              {[...Array(5)].map((_, i) =>
                i < review.rating ? (
                  <StarIcon key={i} sx={{ color: "#FFD700" }} />
                ) : (
                  <StarBorderIcon key={i} sx={{ color: "#FFD700" }} />
                )
              )}
            </Box>
            <Box>
              <Typography
                sx={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "14px",
                  fontWeight: "400",
                  color: theme.palette.text.primary,
                }}
              >
                {review.review}
              </Typography>
            </Box>
          </Box>
        ))}
      </Carousel>
    </Box>
  )
}

export default CustomerReview
