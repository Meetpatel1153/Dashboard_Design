import React, { useState } from "react"
import {
  Box,
  Grid,
  Typography,
  InputBase,
  InputAdornment,
  IconButton,
  Link,
  Breadcrumbs,
  Button,
  Menu,
  MenuItem,
} from "@mui/material"
import { Star as StarIcon } from "@mui/icons-material"
import { useTheme } from "@mui/material/styles"
import { Search as SearchIcon } from "@mui/icons-material"
import { mockTours } from "../../../mock/mockTours.js"
import { useLocation, Link as RouterLink, useNavigate } from "react-router-dom"
import NavigateNextIcon from "@mui/icons-material/NavigateNext"
import { FaLocationDot } from "react-icons/fa6"
import { MoreVert as MoreVertIcon } from "@mui/icons-material"

const TourPage = () => {
  const [tours, setTours] = useState(mockTours)
  const [searchQuery, setSearchQuery] = useState("")
  const [menuTourId, setMenuTourId] = useState(null)
  const [anchorEl, setAnchorEl] = useState(null)

  const theme = useTheme()
  const location = useLocation()
  const pathnames = location.pathname.split("/").filter((x) => x)
  const navigate = useNavigate()

  const handleMenuClick = (event, tourId) => {
    setAnchorEl(event.currentTarget)
    setMenuTourId(tourId)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    setMenuTourId(null)
  }

  const handleDelete = (id) => {
    const updatedTours = tours.filter((tour) => {
      return tour.id !== id
    })
    setTours(updatedTours)
    setAnchorEl(null)
  }

  const renderRating = (rating) => {
    return [...Array(5)].map((_, index) => (
      <StarIcon
        key={index}
        sx={{
          color: index < rating ? "#FFD700" : theme.palette.text.secondary,
          fontSize: "16px",
        }}
      />
    ))
  }
  const filteredTourPosts = tours.filter(
    (tour) =>
      tour.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tour.location.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value)
  }

  return (
    <Box
      sx={{
        padding: { xs: "30px", md: "40px 80px", lg: "70px 70px" },
        backgroundColor: theme.palette.background.box,
        minHeight: "100vh",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box>
          <Typography
            sx={{
              fontWeight: "600",
              fontSize: "30px",
              fontFamily: "Inter, sans-serif",
            }}
          >
            Tour List
          </Typography>
          <Breadcrumbs
            aria-label='breadcrumb'
            separator={
              <NavigateNextIcon
                fontSize='small'
                sx={{ color: theme.palette.text.primary }}
              />
            }
            sx={{
              mb: 4,
              fontSize: "14px",
              fontWeight: "400",
              color: "black",
              fontFamily: "Inter, sans-serif",
            }}
          >
            <Link
              underline='hover'
              sx={{ color: theme.palette.text.secondary }}
              component={RouterLink}
              to='/'
            >
              Home
            </Link>
            {pathnames.map((value, index) => {
              const to = `/${pathnames.slice(0, index + 1).join("/")}`
              const isLast = index === pathnames.length - 1
              return isLast ? (
                <Typography
                  color='text.primary'
                  key={to}
                  sx={{
                    fontSize: "14px",
                    fontWeight: "500",
                    color: theme.palette.text.primary,
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  {value.charAt(0).toUpperCase() + value.slice(1)}
                </Typography>
              ) : (
                <Link
                  underline='hover'
                  color='inherit'
                  component={RouterLink}
                  to={to}
                  key={to}
                  sx={{
                    fontSize: "14px",
                    fontWeight: "500",
                    color: theme.palette.text.primary,
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  {value.charAt(0).toUpperCase() + value.slice(1)}
                </Link>
              )
            })}
          </Breadcrumbs>
        </Box>
        <Box sx={{ mt: 1 }}>
          <Button
            onClick={() => {
              navigate("/tour/create")
            }}
            variant='contained'
            style={{
              fontSize: "14px",
              fontWeight: "500",
              backgroundColor: "#5F00D9",
              color: "white",
              fontFamily: "Inter, sans-serif",
              textTransform: "none",
              borderRadius: "10px",
            }}
          >
            + New Tour
          </Button>
        </Box>
      </Box>
      <Box sx={{ marginTop: 1, mb: 4 }}>
        <InputBase
          placeholder='Search by tour name or location'
          sx={{
            color: theme.palette.text.primary,
            padding: "8px",
            border: "1px solid gray",
            borderRadius: "10px",
            fontSize: "14px",
            width: { lg: "32%", md: "50%", sm: "50%", xs: "100%" },
            fontFamily: "Inter, sans-serif",
          }}
          startAdornment={
            <InputAdornment position='start'>
              <IconButton>
                <SearchIcon sx={{ width: "18px", padding: "1px" }} />
              </IconButton>
            </InputAdornment>
          }
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </Box>

      <Grid container spacing={2}>
        {filteredTourPosts.map((tour) => (
          <Grid item xs={12} sm={6} md={6} lg={4} key={tour.id}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                borderRadius: "10px",
                backgroundColor: theme.palette.background.paper,
                overflow: "hidden",
                height: "100%",
              }}
            >
              <Box sx={{ display: "flex", height: "100%" }}>
                <Box sx={{ flex: 3, position: "relative", p: 1 }}>
                  <img
                    src={tour.images[0]}
                    alt={tour.name}
                    style={{
                      width: "100%",
                      height: "180px",
                      objectFit: "cover",
                      borderRadius: "10px",
                    }}
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      top: "20px",
                      left: "20px",
                      backgroundColor: "rgba(0, 0, 0, 0.6)",
                      color: "white",
                      padding: "5px 10px",
                      borderRadius: "5px",
                      display: "flex",
                      fontFamily: "Inter, sans-serif",
                      fontSize: "14px",
                      fontWeight: "500",
                    }}
                  >
                    {tour.price}
                  </Box>
                </Box>

                <Box
                  sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    p: "10px 3px 10px 0px",
                  }}
                >
                  {tour.images.slice(1, 3).map((image, index) => (
                    <Box
                      key={index}
                      sx={{
                        flex: 1,
                        position: "relative",
                        height: "180px",
                      }}
                    >
                      <img
                        src={image}
                        alt={`${tour.name} - ${index + 1}`}
                        style={{
                          width: "93%",
                          height: "86px",
                          objectFit: "cover",
                          borderRadius: "10px",
                        }}
                      />
                    </Box>
                  ))}
                </Box>
              </Box>

              <Box
                sx={{
                  padding: "0px 20px 20px 20px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Box>
                  <Typography
                    sx={{
                      fontSize: "12px",
                      fontWeight: "400",
                      fontFamily: "Inter, sans-serif",
                      color: theme.palette.text.secondary,
                      mb: 0.5,
                    }}
                  >
                    Posted date:{tour.date}
                  </Typography>
                  <RouterLink
                    to={`/tour/details/${tour.id}`}
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "16px",
                      fontWeight: "500",
                      mb: 1,
                      color: theme.palette.text.primary,
                      textDecoration: "none",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "16px",
                        fontWeight: "600",
                        fontFamily: "Inter, sans-serif",
                      }}
                    >
                      {tour.name}
                    </Typography>
                  </RouterLink>

                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: "400",
                      fontFamily: "Inter, sans-serif",
                      marginTop: "5px",
                      marginBottom: "10px",
                    }}
                  >
                    {tour.description}
                  </Typography>
                </Box>
                <Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Box>
                      <Typography
                        sx={{
                          fontSize: "12px",
                          fontWeight: "500",
                          color: theme.palette.text.primary,
                        }}
                      >
                        <FaLocationDot /> {tour.location}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      {renderRating(Math.round(tour.rating))}
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box>
                      <Typography
                        sx={{
                          fontSize: "12px",
                          fontWeight: "400",
                          color: theme.palette.text.secondary,
                          marginTop: "10px",
                        }}
                      >
                        Expiration: {tour.expiration}
                      </Typography>
                    </Box>
                    <Box>
                      <IconButton aria-label='more'>
                        <MoreVertIcon
                          onClick={(event) => handleMenuClick(event, tour.id)}
                          sx={{
                            display: "inline-block",
                            color: theme.palette.text.secondary,
                            width: "22px",
                          }}
                        />
                      </IconButton>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              style={{ boxShadow: "none" }}
            >
              <MenuItem sx={{ boxShadow: "none" }}>
                <RouterLink
                  to={`/tour/edit/${menuTourId}`}
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "14px",
                    fontWeight: "500",
                    mb: 1,
                    color: theme.palette.text.primary,
                    textDecoration: "none",
                  }}
                >
                  Edit
                </RouterLink>
              </MenuItem>
              <MenuItem
                sx={{
                  boxShadow: "none",
                  fontFamily: "Inter, sans-serif",
                  fontSize: "14px",
                  fontWeight: "500",
                }}
                onClick={() => handleDelete(menuTourId)}
              >
                Delete
              </MenuItem>
            </Menu>
          </Grid>
        ))}
      </Grid>
      {filteredTourPosts.length === 0 && (
        <Box
          sx={{
            mt: 1,
            textAlign: "center",
            backgroundColor: theme.palette.background.paper,
            p: "150px 100px",
            borderRadius: "10px",
          }}
        >
          <Typography variant='h6' gutterBottom>
            Not Found
          </Typography>
          <Typography variant='body2'>
            No results found for &nbsp;
            <strong>&quot;{searchQuery}&quot;</strong>.
            <br /> Try checking for typos or using complete words.
          </Typography>
        </Box>
      )}
    </Box>
  )
}

export default TourPage
