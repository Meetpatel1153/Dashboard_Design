import React from "react"
import {
  Box,
  Grid,
  Avatar,
  Typography,
  Divider,
  IconButton,
  Link,
  useTheme,
  Breadcrumbs,
  Button,
} from "@mui/material"
import { Facebook, Instagram, LinkedIn, Twitter } from "@mui/icons-material"
import { useLocation, Link as RouterLink, useNavigate } from "react-router-dom"
import NavigateNextIcon from "@mui/icons-material/NavigateNext"
import { users } from "../../../mock/Card"

const UserCard = () => {
  const theme = useTheme()
  const location = useLocation()
  const pathnames = location.pathname.split("/").filter((x) => x)
  const navigate = useNavigate()

  return (
    <Box
      sx={{
        flexGrow: 1,
        padding: { xs: "20px", md: "40px 80px", lg: "50px 100px" },
        backgroundColor: theme.palette.background.box,
        minHeight: "92vh",
      }}
    >
      <Typography
        sx={{
          fontWeight: "600",
          fontSize: "30px",
          fontFamily: "Inter, sans-serif",
        }}
      >
        User Cards
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
          mb: 6,
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
      <Grid container spacing={3} justifyContent='center'>
        <Grid sm={12}>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant='contained'
              onClick={() => navigate("/user/create")}
              sx={{
                backgroundColor: "#5F00D9",
                textTransform: "none",
                fontSize: "14px",
                fontWeight: "500",
                color: "white",
                fontFamily: "Inter, sans-serif",
                borderRadius: "5px",
                padding: "5px 20px",
              }}
            >
              + New User
            </Button>
          </Box>
        </Grid>
        {users.map((user, index) => (
          <Grid item xs={12} sm={6} md={4} lg={4} key={index}>
            <Box
              sx={{
                backgroundColor: theme.palette.background.paper,
                borderRadius: "10px",
                overflow: "hidden",
              }}
            >
              {/* Cover Image */}
              <Box
                sx={{
                  height: "200px",
                  background: `url(${user.cover}) center/cover`,
                  pl: 3,
                }}
              ></Box>
              {/* User Avatar */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  mt: -4,
                }}
              >
                <Box
                  sx={{
                    width: "80px",
                    height: "80px",
                    backgroundColor: theme.palette.background.paper,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "5px",
                  }}
                >
                  <Avatar
                    src={user.avatar}
                    alt={user.avatar}
                    sx={{
                      width: "70px",
                      height: "70px",
                      borderRadius: "50%",
                    }}
                  />
                </Box>
              </Box>
              {/* User Details */}
              <Box sx={{ textAlign: "center", padding: "10px" }}>
                <Typography
                  sx={{
                    fontWeight: "500",
                    fontSize: "16px",
                    fontFamily: "Inter, sans-serif",
                    mt: 1,
                  }}
                >
                  {user.name}
                </Typography>
                <Typography
                  sx={{
                    fontWeight: "400",
                    fontSize: "14px",
                    fontFamily: "Inter, sans-serif",
                    color: theme.palette.text.secondary,
                  }}
                >
                  {user.role}
                </Typography>
                {/* Social Media Icons */}
                <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                  <IconButton size='small'>
                    <Facebook style={{ fontSize: "24px", color: "#3b5998" }} />
                  </IconButton>
                  <IconButton size='small'>
                    <Instagram style={{ fontSize: "24px", color: "#FF0000" }} />
                  </IconButton>
                  <IconButton size='small'>
                    <LinkedIn style={{ fontSize: "24px", color: "#B30086" }} />
                  </IconButton>
                  <IconButton size='small'>
                    <Twitter style={{ fontSize: "24px", color: "#FD8DE1" }} />
                  </IconButton>
                </Box>
                {/* Divider */}
                <Divider sx={{ my: 2, mx: -2 }} />
                {/* Statistics */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    p: 2,
                    flexWrap: "wrap",
                  }}
                >
                  <Box>
                    <Typography
                      sx={{
                        fontWeight: "500",
                        fontSize: "13px",
                        fontFamily: "Inter, sans-serif",
                        color: theme.palette.text.secondary,
                      }}
                    >
                      Followers
                    </Typography>
                    <Typography
                      sx={{
                        fontWeight: "600",
                        fontSize: "16px",
                        fontFamily: "Inter, sans-serif",
                        color: theme.palette.text.primary,
                      }}
                    >
                      {user.followers}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      sx={{
                        fontWeight: "500",
                        fontSize: "13px",
                        fontFamily: "Inter, sans-serif",
                        color: theme.palette.text.secondary,
                      }}
                    >
                      Following
                    </Typography>
                    <Typography
                      sx={{
                        fontWeight: "600",
                        fontSize: "16px",
                        fontFamily: "Inter, sans-serif",
                        color: theme.palette.text.primary,
                      }}
                    >
                      {user.following}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      sx={{
                        fontWeight: "500",
                        fontSize: "13px",
                        fontFamily: "Inter, sans-serif",
                        color: theme.palette.text.secondary,
                      }}
                    >
                      Posts
                    </Typography>
                    <Typography
                      sx={{
                        fontWeight: "600",
                        fontSize: "16px",
                        fontFamily: "Inter, sans-serif",
                        color: theme.palette.text.primary,
                      }}
                    >
                      {user.posts}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default UserCard
