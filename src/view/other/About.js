import React from "react"
import {
  Box,
  Typography,
  Grid,
  LinearProgress,
  useMediaQuery,
  Card,
  CardMedia,
  CardContent,
  IconButton,
} from "@mui/material"
import { useTheme } from "@mui/material/styles"
import { styled } from "@mui/system"
import { motion } from "framer-motion"
import Carousel from "react-material-ui-carousel"
import { Facebook, Instagram, LinkedIn, Twitter } from "@mui/icons-material"
import Footer from "../../components/Footer"

const minimalData = [
  {
    title: "Development",
    value: 20,
    color: "#8884d8",
  },
  {
    title: "Design",
    value: 40,
    color: "#0ea770",
  },
  {
    title: "Marketing",
    value: 60,
    color: "#ffc658",
  },
]

const team = [
  {
    id: 1,
    name: "John Doe",
    image:
      "https://api-dev-minimal-v510.vercel.app/assets/images/portrait/portrait_1.jpg",
    role: "HR Manager",
  },
  {
    id: 2,
    image:
      "https://api-dev-minimal-v510.vercel.app/assets/images/portrait/portrait_2.jpg",
    name: "Jane Smith",
    role: "Data Analyst",
  },
  {
    id: 3,
    image:
      "https://api-dev-minimal-v510.vercel.app/assets/images/portrait/portrait_3.jpg",
    name: "Bob Johnson",
    role: "UX designer",
  },
  {
    id: 4,
    image:
      "https://api-dev-minimal-v510.vercel.app/assets/images/portrait/portrait_4.jpg",
    name: "Alice Brown",
    role: "Account Manager",
  },
  {
    id: 5,
    image:
      "https://api-dev-minimal-v510.vercel.app/assets/images/portrait/portrait_5.jpg",
    name: "Tom Hanks",
    role: "Developer",
  },
  {
    id: 6,
    image:
      "https://api-dev-minimal-v510.vercel.app/assets/images/portrait/portrait_6.jpg",
    name: "David Wilson",
    role: "Developer",
  },
]

const About = () => {
  const theme = useTheme()

  const StyledImage = styled("img")({
    display: "block",
    margin: "auto",
    borderRadius: "8px",
  })

  const isSmDown = useMediaQuery(theme.breakpoints.down("sm"))
  const isMdDown = useMediaQuery(theme.breakpoints.down("md"))
  const isLgDown = useMediaQuery(theme.breakpoints.down("lg"))

  const cardsPerPage = isSmDown ? 1 : isMdDown ? 2 : isLgDown ? 2 : 3

  const getChunks = (array, size) => {
    const result = []
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size))
    }
    return result
  }

  const chunks = getChunks(team, cardsPerPage)

  return (
    <Box sx={{ backgroundColor: theme.palette.background.box }}>
      <Box
        sx={{
          height: 500,
          overflow: "hidden",
          position: "relative",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundImage:
            "url(/assets/background/overlay_1.svg), url(/assets/about/hero.jpg)",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            position: "absolute",
            top: 0,
            width: "100%",
            zIndex: 2,
            color: "white",
            textAlign: "center",
            padding: theme.spacing(4),
            display: "flex",
            flexDirection: "column",
            mt: 12,
          }}
        >
          <Typography
            sx={{
              fontWeight: "700",
              fontSize: "50px",
              fontFamily: "Inter, sans-serif",
              textAlign: "start",
              mt: 12,
              ml: 5,
            }}
          >
            <span style={{ color: "#0ea770" }}>Who</span> <br />
            we are?
          </Typography>

          <Typography
            sx={{
              fontWeight: "500",
              fontSize: "20px",
              fontFamily: "Inter, sans-serif",
              textAlign: "start",
              mt: 3,
              ml: 5,
            }}
          >
            Let's work together and <br></br> make awesome site easily
          </Typography>
        </motion.div>
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          padding: "20px",
          backgroundColor: theme.palette.background.box,
          mt: 6,
          mb: 6,
          mx: 4,
        }}
      >
        <Grid
          container
          spacing={2}
          sx={{
            p: 1,
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          <Grid
            item
            xs={12}
            md={6}
            sm={6}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "raw",
                alignItems: "center",
                gap: "20px",
                flexWrap: "wrap",
              }}
            >
              <StyledImage
                src='/assets/about/what_2.png'
                alt='Small Image'
                width={220}
                height={240}
                sx={{
                  marginBottom: "20px",
                  display: {
                    xl: "flex",
                    lg: "none",
                    md: "none",
                    sm: "none",
                    xs: "none",
                  },
                }}
              />
              <StyledImage
                src='/assets/about/what_1.png'
                alt='Large Image'
                width={310}
                height={350}
              />
            </Box>
          </Grid>

          {/* Right Grid for Text */}
          <Grid item xs={12} md={6} sm={6}>
            <motion.div
              style={{ p: 3 }}
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Typography
                sx={{
                  fontWeight: "700",
                  fontSize: "30px",
                  fontFamily: "Inter, sans-serif",
                  mb: 2,
                }}
              >
                What is Minimal?
              </Typography>
              <Typography
                sx={{
                  fontWeight: "400",
                  fontSize: "16px",
                  fontFamily: "Inter, sans-serif",
                  mb: 2,
                }}
              >
                Our theme is the most advanced and user-friendly theme you will
                find on the market, we have documentation and video to help set
                your site really easily, pre-installed demos you can import in
                one click and everything from the theme options to page content
                can be edited from the front-end. This is the theme you are
                looking for.
              </Typography>
              {minimalData.map((data) => (
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
                          fontSize: "16px",
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
                          fontSize: "16px",
                          fontWeight: "500",
                          color: theme.palette.text.secondary,
                        }}
                      >
                        {data.value}%
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
                      }}
                    />
                  </Box>
                </>
              ))}
            </motion.div>
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          padding: "10px",
          backgroundColor: theme.palette.background.paper,
          mx: 5,
          mt: {
            xl: 25,
            lg: 6,
            md: 6,
            sm: 4,
            xs: 4,
          },
          borderRadius: "10px",
          mb: 10,
          display: {
            xl: "flex",
            lg: "none",
            md: "none",
            sm: "none",
            xs: "none",
          },
          flexDirection: "column",
        }}
        component={motion.div}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mt: -15,
            mb: 5,
          }}
        >
          <motion.img
            src='/assets/about/ourVision.png'
            style={{
              borderRadius: "10px",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          />
        </Box>
        <Typography
          sx={{
            fontWeight: "700",
            fontSize: "20px",
            fontFamily: "Inter, sans-serif",
            mb: 3,
            mt: 3,
            textAlign: "center",
          }}
          component={motion.div}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Our vision offering the best product nulla vehicula
          <br /> tortor scelerisque ultrices malesuada.
        </Typography>
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          padding: "10px",
          backgroundColor: theme.palette.background.box,
          mt: 2,
        }}
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Typography
          sx={{
            fontWeight: "700",
            fontSize: "30px",
            fontFamily: "Inter, sans-serif",
            mt: 1,
            textAlign: "center",
            mb: 1,
          }}
          component={motion.div}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          Great team is the key
        </Typography>
        <Typography
          sx={{
            fontWeight: "500",
            fontSize: "16px",
            fontFamily: "Inter, sans-serif",
            mb: 6,
            textAlign: "center",
            color: theme.palette.text.secondary,
          }}
          component={motion.div}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Minimal will provide you support if you have any problems, our support
          team will reply
          <br /> within a day and we also have detailed documentation.
        </Typography>
      </Box>

      <Box sx={{ px: 5, mx: 4, mb: 6 }}>
        <Carousel
          navButtonsAlwaysVisible
          indicators={false}
          cycleNavigation
          swipe
          autoPlay={false}
          animation='slide'
          navButtonsProps={{
            style: {
              backgroundColor: "#94989c",
              color: "white",
              borderRadius: "10px",
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
                  component={motion.div}
                >
                  <CardContent>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "5px",
                        alignItems: "center",
                      }}
                    >
                      <Typography
                        sx={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "16px",
                          fontWeight: "500",
                        }}
                      >
                        {tour.name}
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "14px",
                          fontWeight: "400",
                          color: theme.palette.text.secondary,
                        }}
                      >
                        {tour.role}
                      </Typography>
                    </Box>
                  </CardContent>
                  <Box sx={{ p: 2 }}>
                    <CardMedia
                      component='img'
                      height='360px'
                      maxWidth='200px'
                      image={tour.image}
                      alt={tour.title}
                      sx={{ border: "0px solid ", borderRadius: "10px" }}
                      whileHover={{ scale: 1.05 }}
                    />
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      gap: "12px",
                      flexWrap: "wrap",
                      mt: 0,
                      mb: 1,
                    }}
                  >
                    <IconButton size='small'>
                      <Facebook
                        style={{ fontSize: "24px", color: "#3b5998" }}
                      />
                    </IconButton>
                    <IconButton size='small'>
                      <Instagram
                        style={{ fontSize: "24px", color: "#FF0000" }}
                      />
                    </IconButton>
                    <IconButton size='small'>
                      <LinkedIn
                        style={{ fontSize: "24px", color: "#B30086" }}
                      />
                    </IconButton>
                    <IconButton size='small'>
                      <Twitter style={{ fontSize: "24px", color: "#FD8DE1" }} />
                    </IconButton>
                  </Box>
                </Card>
              ))}
            </Box>
          ))}
        </Carousel>
      </Box>
      <Footer />
    </Box>
  )
}

export default About
