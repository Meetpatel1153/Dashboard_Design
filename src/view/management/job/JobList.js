
import React, { useState } from "react"
import {
  Box,
  Grid,
  Typography,
  Avatar,
  useTheme,
  Link,
  Breadcrumbs,
  Button,
  InputBase,
  InputAdornment,
  IconButton,
  Divider,
  Menu,
  MenuItem,
} from "@mui/material"
import { jobPosts as mockJobPosts } from "../../../mock/JobPosts"
import { MoreVert as MoreVertIcon } from "@mui/icons-material"
import { useLocation, Link as RouterLink, useNavigate } from "react-router-dom"
import NavigateNextIcon from "@mui/icons-material/NavigateNext"
import { Search as SearchIcon } from "@mui/icons-material"
import { MdBarChart } from "react-icons/md"
import { MdWatchLater } from "react-icons/md"
import { FaMoneyBills } from "react-icons/fa6"
import { TiUser } from "react-icons/ti"

const JobPage = () => {
  const [jobPosts, setJobPosts] = useState(mockJobPosts)
  const [searchTerm, setSearchTerm] = useState("")
  const [menuJobId, setMenuJobId] = useState(null)
  const [anchorEl, setAnchorEl] = useState(null)
  const theme = useTheme()
  const location = useLocation()
  const pathnames = location.pathname.split("/").filter((x) => x)
  const navigate = useNavigate()

  const filteredJobPosts = jobPosts.filter((post) =>
    post.jobMainPosition.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const handleMenuClick = (event, postId) => {
    setAnchorEl(event.currentTarget)
    setMenuJobId(postId)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    setMenuJobId(null)
  }

  const handleDelete = (id) => {
    const updatedPosts = jobPosts.filter((post) => {
      return post.id !== id
    })
    setJobPosts(updatedPosts)
    setAnchorEl(null)
  }

  return (
    <Box
      sx={{
        padding: { xs: "30px", md: "40px 80px", lg: "70px 70px" },
        backgroundColor: theme.palette.background.box,
        minHeight: { lg: "93vh", md: "95vh", sm: "110vh", xs: "140vh" },
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
            Job List
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
              navigate("/job/create")
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
            + New Job
          </Button>
        </Box>
      </Box>
      <Box sx={{ marginTop: 1, mb: 4 }}>
        <InputBase
          placeholder='Search....'
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
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </Box>

      <Grid container spacing={2}>
        {filteredJobPosts.map((jobPost) => (
          <Grid key={jobPost.id} item xs={12} md={6} lg={4} sm={6}>
            <Box
              sx={{
                backgroundColor: theme.palette.background.paper,
                padding: 2,
                borderRadius: "10px",
                height: "100%",
              }}
            >
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box>
                  <Avatar
                    src={jobPost.brandImage}
                    alt={jobPost.jobMainPosition}
                    sx={{
                      width: "50px",
                      height: "50px",
                      mb: 1,
                      borderRadius: "10px",
                    }}
                    variant='rounded'
                  />
                </Box>
                <Box>
                  <IconButton aria-label='more'>
                    <MoreVertIcon
                      onClick={(event) => handleMenuClick(event, jobPost.id)}
                      sx={{
                        display: "inline-block",
                        color: theme.palette.text.secondary,
                        width: "22px",
                      }}
                    />
                  </IconButton>
                </Box>
              </Box>

              <Box sx={{ flex: 1 }}>
                <RouterLink
                  to={`/job/details/${jobPost.id}`}
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
                      fontFamily: "Inter, sans-serif",
                      fontSize: "16px",
                      fontWeight: "600",
                      mb: 1,
                    }}
                  >
                    {jobPost.jobMainPosition}
                  </Typography>
                </RouterLink>

                <Typography
                  sx={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "12px",
                    fontWeight: "400",
                    mb: 1,
                    color: theme.palette.text.secondary,
                  }}
                >
                  posted date: {jobPost.postedDate}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "14px",
                    fontWeight: "500",
                    mb: 1,
                    color: theme.palette.text.primary,
                  }}
                >
                  Vacancy: {jobPost.numberOfVacancy}
                </Typography>
              </Box>
              <Divider sx={{ m: "20px -10px 10px -10px" }} />
              <Box sx={{ p: 1 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "20px",
                    flexWrap: "wrap",
                  }}
                >
                  <Grid container spacing={1}>
                    <Grid item lg={6} md={12} sm={12} xs={12}>
                      <Typography
                        sx={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "12px",
                          fontWeight: "400",
                          color: theme.palette.text.secondary,
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <MdBarChart style={{ marginRight: "4px" }} />
                        No Experience
                      </Typography>
                    </Grid>
                    <Grid item lg={6} md={12} sm={12} xs={12}>
                      <Typography
                        sx={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "12px",
                          fontWeight: "400",
                          color: theme.palette.text.secondary,
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <MdWatchLater style={{ marginRight: "4px" }} />
                        {jobPost.employeeType}
                      </Typography>
                    </Grid>
                    <Grid item lg={6} md={12} sm={12} xs={12}>
                      <Typography
                        sx={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "12px",
                          fontWeight: "400",
                          color: theme.palette.text.secondary,
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <FaMoneyBills style={{ marginRight: "4px" }} />
                        {jobPost.amount}({jobPost.salary})
                      </Typography>
                    </Grid>
                    <Grid item lg={6} md={12} sm={12} xs={12}>
                      <Typography
                        sx={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "12px",
                          fontWeight: "400",
                          color: theme.palette.text.secondary,
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <TiUser style={{ marginRight: "4px" }} />
                        {jobPost.subPosition}
                      </Typography>
                    </Grid>
                  </Grid>
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
                  to={`/job/edit/${menuJobId}`}
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
                onClick={() => handleDelete(menuJobId)}
              >
                Delete
              </MenuItem>
            </Menu>
          </Grid>
        ))}
      </Grid>
      {filteredJobPosts.length === 0 && (
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
            <strong>&quot;{searchTerm}&quot;</strong>.
            <br /> Try checking for typos or using complete words.
          </Typography>
        </Box>
      )}
    </Box>
  )
}

export default JobPage
