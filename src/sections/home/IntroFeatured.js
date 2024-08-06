import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
  useTheme,
} from "@mui/material"
import React from "react"
import Carousel from "react-material-ui-carousel"

const CardData = [
  {
    id: 1,
    title: "10 Essentail Tips for healthy living.",
    desc: "lorem10",
    backgroundImage:
      "url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUgQUScOAWEM0DivC_QEVIvzBHSLp4ZfQ6Sw&s)",
  },
  {
    id: 2,
    title: "10 Essentail Tips for healthy living.",
    desc: "lorem10",
    backgroundImage:
      "url(https://img.freepik.com/free-photo/merger-vibrant-swirls-primary-colors-creates-kaleidoscope-effect_157027-2949.jpg)",
  },
  {
    id: 3,
    title: "10 Essentail Tips for healthy living.",
    desc: "lorem10",
    backgroundImage:
      "url(https://png.pngtree.com/thumb_back/fh260/background/20230605/pngtree-bright-colors-is-poured-into-a-black-background-image_2885679.jpg)",
  },
]

const IntroFeatured = () => {
  const theme = useTheme()

  return (
    <>
      <Grid item lg={8} md={12} sm={12} xs={12}>
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
              Welcome back 👋
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
              If you are going to use a passage of Lorem Ipsum, you need to be
              sure there isn't anything.
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
            sx={{
              display: { lg: "flex", md: "flex", sm: "none", xs: "none" },
              justifyContent: "flex-end",
            }}
          >
            <img
              src='/assets/about/home.png'
              alt='welcome'
              style={{ maxWidth: "60%" }}
            ></img>
          </Box>
        </Box>
      </Grid>
      <Grid item lg={4} md={12} sm={12} xs={12}>
        <Box>
          <Carousel
            autoPlay={true}
            navButtonsAlwaysVisible={true}
            animation='slide'
            indicators={true}
            indicatorContainerProps={{
              style: {
                position: "absolute", 
                top: "20px", 
                right: "10px",
                zIndex: 2,
              },
            }}
            navButtonsProps={{
              style: {
                backgroundColor: "transparent",
                color: "white",
              },
            }}
          >
            {CardData.map((card, index) => (
              <Card
                key={index}
                sx={{
                  minWidth: 200,
                  color: "white",
                  borderRadius: "10px",
                  height: "auto",
                  position: "relative",
                  backgroundImage: card.backgroundImage,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <CardContent
                  sx={{
                    position: "relative",
                    mt: 19.4,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <Box>
                    <Typography
                      sx={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "14px",
                        fontWeight: "Bold",
                        color: "#0ea770",
                        mb: 1,
                      }}
                    >
                      FEATURED APP
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "20px",
                        fontWeight: "bold",
                        mb: 1,
                      }}
                    >
                      {card.title}
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "14px",
                        fontWeight: "500",
                      }}
                    >
                      {card.desc}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Carousel>
        </Box>
      </Grid>
    </>
  )
}

export default IntroFeatured
