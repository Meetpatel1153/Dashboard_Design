import React, { useState } from "react"
import {
  Box,
  CardMedia,
  Dialog,
  IconButton,
  Typography,
  useTheme,
  Grid,
} from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import Carousel from "react-material-ui-carousel"
import { IoIosPlay } from "react-icons/io"
import { CgPlayPause } from "react-icons/cg"

const galleryItems = [
  {
    id: 1,
    description: "Description 1",
    src: "https://api-dev-minimal-v510.vercel.app/assets/images/travel/travel_2.jpg",
    time: "26 Jul 2024",
  },
  {
    id: 2,
    description: "Description 2",
    src: "https://api-dev-minimal-v510.vercel.app/assets/images/travel/travel_3.jpg",
    time: "27 Jul 2024",
  },
  {
    id: 3,
    description: "Description 3",
    src: "https://api-dev-minimal-v510.vercel.app/assets/images/travel/travel_4.jpg",
    time: "01 Aug 2024",
  },
  {
    id: 4,
    description: "Description 4",
    src: "https://api-dev-minimal-v510.vercel.app/assets/images/travel/travel_5.jpg",
    time: "01 Jul 2024",
  },
  {
    id: 5,
    description: "Description 5",
    src: "https://api-dev-minimal-v510.vercel.app/assets/images/travel/travel_1.jpg",
    time: "26 Aug 2024",
  },
  {
    id: 6,
    description: "Description 6",
    src: "https://api-dev-minimal-v510.vercel.app/assets/images/travel/travel_3.jpg",
    time: "16 May 2024",
  },
  {
    id: 7,
    description: "Description 7",
    src: "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?cs=srgb&dl=pexels-souvenirpixels-417074.jpg&fm=jpg",
    time: "01 Jan 2024",
  },
  {
    id: 8,
    description: "Description 8",
    src: "https://api-dev-minimal-v510.vercel.app/assets/images/travel/travel_2.jpg",
    time: "18 Jan 2023",
  },
  {
    id: 9,
    description: "Description 9",
    src: "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?cs=srgb&dl=pexels-souvenirpixels-417074.jpg&fm=jpg",
    time: "06 Dec 2023",
  },
  {
    id: 10,
    description: "Description 10",
    src: "https://api-dev-minimal-v510.vercel.app/assets/images/travel/travel_4.jpg",
    time: "22 Sep 2024",
  },
  {
    id: 11,
    description: "Description 11",
    src: "https://media.istockphoto.com/id/1488944909/photo/environment-concept-green-glass-globe-with-a-tree-in-the-forest-with-sunlight-sustainability.webp?b=1&s=170667a&w=0&k=20&c=f89zMjUr7FldJzgS0p8mJyuTxBWgvhv0kBQL7fcSnjs=",
    time: "11 May 2024",
  },
  {
    id: 12,
    description: "Description 12",
    src: "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?cs=srgb&dl=pexels-souvenirpixels-417074.jpg&fm=jpg",
    time: "24 jul 2024",
  },
]

const GalleryPage = () => {
  const [open, setOpen] = useState(false)
  const [carouselItems, setCarouselItems] = useState([])
  const [autoPlay, setAutoPlay] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  const handleCardClick = (index) => {
    setCarouselItems(galleryItems)
    setCurrentIndex(index)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    setAutoPlay(false)
  }

  const handleStartSlideshow = () => {
    setAutoPlay(true)
  }

  const closeStartSlideshow = () => {
    setAutoPlay(false)
  }

  const theme = useTheme()

  return (
    <Box
      sx={{
        flexGrow: 1,
        padding: { xs: "20px", md: "40px 80px", lg: "50px 100px" },
        backgroundColor: theme.palette.background.box,
        minHeight: "92vh",
      }}
    >
      <Grid container spacing={2}>
        {galleryItems.map((item, index) => (
          <Grid item lg={4} md={6} sm={6} xs={12} key={item.id}>
            <Box>
              <Box
                sx={{
                  backgroundColor: theme.palette.background.paper,
                  borderRadius: "10px",
                }}
              >
                <Box>
                  <img
                    height='350'
                    src={item.src}
                    alt={item.description}
                    onClick={() => handleCardClick(index)}
                    style={{
                      cursor: "pointer",
                      borderRadius: "10px 10px 0px 0px",
                      width: "100%",
                    }}
                  />
                </Box>
                <Box sx={{ p: 2, cursor: "pointer" }}>
                  <Typography
                    sx={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "16px",
                      fontWeight: "600",
                    }}
                  >
                    {item.description}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "12px",
                      fontWeight: "400",
                      color: theme.palette.text.secondary,
                    }}
                  >
                    {item.time}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>

      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth='lg'
        height='1200px'
        sx={{ overflowX: "hidden" }}
      >
        <IconButton
          edge='end'
          color='inherit'
          onClick={handleClose}
          aria-label='close'
          sx={{ position: "absolute", top: 8, right: 14, zIndex: 20 }}
        >
          <CloseIcon />
        </IconButton>
        {autoPlay === true ? (
          <IconButton
            edge='end'
            color='inherit'
            aria-label='close'
            sx={{ position: "absolute", top: 8, right: 60, zIndex: 20 }}
            onClick={closeStartSlideshow}
          >
            <CgPlayPause />
          </IconButton>
        ) : (
          <IconButton
            edge='end'
            color='inherit'
            aria-label='close'
            sx={{ position: "absolute", top: 8, right: 60, zIndex: 20 }}
            onClick={handleStartSlideshow}
          >
            <IoIosPlay size={20} />
          </IconButton>
        )}

        <Box sx={{ position: "relative", height: "600px" }}>
          <Carousel
            autoPlay={autoPlay}
            interval={2000}
            navButtonsAlwaysVisible={true}
            index={currentIndex}
            onChange={(index) => setCurrentIndex(index)}
            sx={{ height: "100%" }}
            navButtonsProps={{
              style: {
                backgroundColor: "transparent",
                color: "white",
              },
            }}
          >
            {carouselItems.map((item) => (
              <Box
                key={item.id}
                sx={{
                  position: "relative",
                  height: "80%",
                }}
              >
                <CardMedia
                  component='img'
                  height='100%'
                  image={item.src}
                  alt={item.description}
                  style={{
                    cursor: "pointer",
                    height: "600px",
                  }}
                />
              </Box>
            ))}
          </Carousel>
        </Box>
      </Dialog>
    </Box>
  )
}

export default GalleryPage
