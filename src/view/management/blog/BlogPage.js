import React, { useState } from "react"
import {
  Box,
  Button,
  Grid,
  Tabs,
  Tab,
  InputBase,
  InputAdornment,
  IconButton,
  Typography,
  Avatar,
  useMediaQuery,
  Breadcrumbs,
  Link,
  Menu,
  MenuItem,
} from "@mui/material"
import {
  Search as SearchIcon,
  MoreVert as MoreVertIcon,
} from "@mui/icons-material"
import { useTheme } from "@mui/material/styles"
import { blogPosts as mockBlogPosts } from "../../../mock/BlogPosts"
import { FaCommentDots } from "react-icons/fa"
import { IoEye } from "react-icons/io5"
import { IoMdShare } from "react-icons/io"
import { useLocation, Link as RouterLink } from "react-router-dom"
import NavigateNextIcon from "@mui/icons-material/NavigateNext"

const BlogPage = () => {
  const [filter, setFilter] = useState("")
  const [search, setSearch] = useState("")
  const [anchorEl, setAnchorEl] = useState(null)
  const [blogPosts, setBlogPosts] = useState(mockBlogPosts)
  const [menuPostId, setMenuPostId] = useState(null)

  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("lg"))
  const location = useLocation()
  const pathnames = location.pathname.split("/").filter((x) => x)

  const handleFilterChange = (event, newFilter) => {
    setFilter(newFilter)
  }

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  const handleMenuClick = (event, postId) => {
    setAnchorEl(event.currentTarget)
    setMenuPostId(postId)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    setMenuPostId(null)
  }

  const filteredBlogs = blogPosts.filter((post) => {
    return (
      (!filter || post.status === filter) &&
      (post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.description.toLowerCase().includes(search.toLowerCase()) ||
        post.tags.some((tag) =>
          tag.toLowerCase().includes(search.toLowerCase())
        ))
    )
  })

  const handleDelete = (id) => {
    const updatedPosts = blogPosts.filter((post) => {
      return post.id !== id
    })
    setBlogPosts(updatedPosts)
    setAnchorEl(null)
  }

  const truncateText = (text, wordLimit) => {
    const words = text.split(" ")
    if (words.length <= wordLimit) {
      return text
    }
    return words.slice(0, wordLimit).join(" ") + "..."
  }

  const renderTabLabel = (text, count) => (
    <Box display='flex' alignItems='center'>
      <Typography
        style={{
          fontSize: "14px",
          fontWeight: "500",
          textTransform: "none",
          fontFamily: "Inter, sans-serif",
          color: theme.palette.text.primary,
        }}
      >
        {text}
      </Typography>
      <Box
        component='span'
        ml={1}
        px={1}
        py={0.5}
        bgcolor='#797E82'
        borderRadius='10px'
        color='white'
        fontSize='12px'
      >
        {count}
      </Box>
    </Box>
  )

  return (
    <Box
      sx={{
        padding: { xs: "30px", md: "40px 80px", lg: "70px 70px" },
        backgroundColor: theme.palette.background.box,
        minHeight: { lg: "93vh", md: "95vh", sm: "110vh", xs: "140vh" },
      }}
    >
      <>
        {" "}
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box>
            <Typography
              sx={{
                fontWeight: "600",
                fontSize: "30px",
                fontFamily: "Inter, sans-serif",
              }}
            >
              Blog List
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
              + New Blog
            </Button>
          </Box>
        </Box>
      </>

      <Box sx={{ marginTop: 1, mb: 4 }}>
        <InputBase
          placeholder='Search....'
          sx={{
            color: theme.palette.text.primary,
            padding: "8px",
            border: "1px solid gray",
            borderRadius: "10px",
            fontSize: "14px",
            width: { lg: "30%", md: "50%", sm: "50%", xs: "100%" },
            fontFamily: "Inter, sans-serif",
          }}
          startAdornment={
            <InputAdornment position='start'>
              <IconButton>
                <SearchIcon sx={{ width: "18px", padding: "1px" }} />
              </IconButton>
            </InputAdornment>
          }
          value={search}
          onChange={handleSearchChange}
        />
      </Box>
      <Box sx={{ mt: 2 }}>
        <Tabs
          value={filter}
          onChange={handleFilterChange}
          textColor='primary'
          indicatorColor='primary'
          variant={isSmallScreen ? "scrollable" : ""}
          scrollButtons={isSmallScreen ? "auto" : "off"}
        >
          <Tab label={renderTabLabel("All", blogPosts.length)} value='' />
          <Tab
            label={renderTabLabel(
              "Published",
              blogPosts.filter((post) => post.status === "Published").length
            )}
            value='Published'
          />
          <Tab
            label={renderTabLabel(
              "Draft",
              blogPosts.filter((post) => post.status === "Draft").length
            )}
            value='Draft'
          />
        </Tabs>
      </Box>
      <Box
        sx={{
          backgroundColor: theme.palette.background.box,
          mt: 5,
        }}
      >
        <Box>
          <Grid container spacing={2}>
            {filteredBlogs.map((post) => (
              <Grid item xs={12} sm={12} md={12} lg={6} key={post.id}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    borderRadius: "10px",
                    backgroundColor: theme.palette.background.paper,

                    height: "100%",
                  }}
                >
                  <Box sx={{ p: 2, flex: 1 }}>
                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Typography
                        sx={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "10px",
                          fontWeight: "500",
                          color: "black",
                          p: 0.5,
                          borderRadius: "10px",
                          backgroundColor: theme.palette.presets.color,
                          mb: 2,
                        }}
                      >
                        {post.status}
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "12px",
                          fontWeight: "400",
                          color: theme.palette.text.secondary,
                        }}
                      >
                        {post.date}
                      </Typography>
                    </Box>
                    <RouterLink
                      to={`/blog/details/${post.id}`}
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "16px",
                        fontWeight: "500",
                        mb: 1,
                        color: theme.palette.text.primary,
                        textDecoration: "none",
                      }}
                    >
                      {post.title}
                    </RouterLink>
                    <Typography
                      sx={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "14px",
                        fontWeight: "400",
                        mb: 1,
                        color: theme.palette.text.secondary,
                      }}
                    >
                      {truncateText(post.description, 20)}
                    </Typography>

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mt: 2,
                      }}
                    >
                      <Box>
                        <IconButton aria-label='more'>
                          <MoreVertIcon
                            onClick={(event) => handleMenuClick(event, post.id)}
                            sx={{
                              display: "inline-block",
                              transform: "rotate(90deg)",
                              transition: "transform 0.3s",
                              color: theme.palette.text.secondary,
                            }}
                          />
                        </IconButton>
                      </Box>
                      <Box sx={{ display: "flex", gap: "10px" }}>
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
                          <FaCommentDots style={{ marginRight: "4px" }} />
                          {post.comments}
                        </Typography>
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
                          <IoEye style={{ marginRight: "4px" }} />
                          {post.views}
                        </Typography>
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
                          <IoMdShare style={{ marginRight: "4px" }} />
                          {post.shares}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      position: "relative",
                      p: 2,
                      flexShrink: 0,
                      display: {
                        lg: "flex",
                        md: "flex",
                        sm: "flex",
                        xs: "none",
                      },
                    }}
                  >
                    <Box>
                      <img
                        src={post.imageUrl}
                        alt={post.title}
                        style={{
                          height: "220px",
                          width: "180px",
                          borderRadius: "10px",
                          objectFit: "cover",
                        }}
                      />
                    </Box>

                    <Avatar
                      src={post.avatarUrl}
                      alt={post.title}
                      sx={{
                        position: "absolute",
                        top: 20,
                        left: 140,
                        width: 50,
                        height: 50,
                      }}
                    />
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
                      to={`/blog/edit/${menuPostId}`}
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
                    onClick={() => handleDelete(menuPostId)}
                  >
                    Delete
                  </MenuItem>
                </Menu>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
      {filteredBlogs.length === 0 && (
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
            <strong>&quot;{search}&quot;</strong>.
            <br /> Try checking for typos or using complete words.
          </Typography>
        </Box>
      )}
    </Box>
  )
}

export default BlogPage
