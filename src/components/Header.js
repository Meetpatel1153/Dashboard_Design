import React, { useEffect, useState } from "react"
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Menu,
  MenuItem,
  Divider,
  Avatar,
  useMediaQuery,
  Modal,
  InputBase,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  CssBaseline,
  Badge,
} from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import SearchIcon from "@mui/icons-material/Search"
import { RiSettings3Fill } from "react-icons/ri"
import { useNavigate } from "react-router-dom"
import HeaderNotification from "./HeaderNotification"
import ContactMenu from "./HeaderContacts"
import { IoPartlySunnySharp } from "react-icons/io5"
import { PiCloudMoonFill } from "react-icons/pi"

const Header = ({
  handleDrawerToggle,
  handleLogout,
  handleThemeToggle,
  mode,
  theme,
  handleColorChange,
}) => {
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"))

  const [anchorEl, setAnchorEl] = useState(null)
  const [colorAnchorEl, setColorAnchorEl] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [showBadge, setShowBadge] = useState(true)
  const navigate = useNavigate()

  const handleModalOpen = () => {
    setModalOpen(true)
  }

  const handleModalClose = () => {
    setModalOpen(false)
  }

  const handleReset = () => {
    setShowBadge(false)
    handleColorMenuClose()
    changeColor("#d9f4e8")
  }

  const useKeyPress = (targetKey, action) => {
    useEffect(() => {
      const handleKeyPress = (event) => {
        if ((event.metaKey || event.ctrlKey) && event.key === targetKey) {
          action()
        }
      }

      window.addEventListener("keydown", handleKeyPress)
      return () => {
        window.removeEventListener("keydown", handleKeyPress)
      }
    }, [targetKey, action])
  }

  useKeyPress("k", handleModalOpen)

  const changeColor = (color) => {
    handleColorChange(color)
    handleColorMenuClose()
  }

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleProfileMenuClose = () => {
    setAnchorEl(null)
  }

  const handleColorMenuOpen = (event) => {
    setColorAnchorEl(event.currentTarget)
  }

  const handleColorMenuClose = () => {
    setColorAnchorEl(null)
  }

  const pagePaths = [
    { name: "Home", path: "/" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "Sales", path: "/sales" },
    { name: "Payment", path: "/payment" },
    { name: "File", path: "/file" },
    { name: "CRM", path: "/crm" },
    { name: "Booking", path: "/booking" },
    { name: "Profile", path: "/profile" },
    { name: "User List", path: "user/list" },
    { name: "Create User", path: "user/create" },
    { name: "Edit User", path: "user/edit" },
    { name: "Card", path: "user/card" },
    { name: "Settings", path: "user/account" },
    { name: "Create Product", path: "/product/createproduct" },
    { name: "Edit Product", path: "/product/editproduct" },
    { name: "View Product", path: "/product/viewproduct" },
    { name: "Order List", path: "/order" },
    { name: "View Order", path: "order/view/ORD12345" },
    { name: "Create Invoice", path: "/invoice/createinvoice" },
    { name: "Invoice List", path: "/invoice/list" },
    { name: "Edit Invoice", path: "/invoice/editinvoice" },
    { name: "View Invoice", path: "/invoice/detailsinvoice" },
    { name: "Blog list", path: "/blog" },
    { name: "Create blog", path: "/blog/create" },
    { name: "Edit Blog", path: "/blog/edit" },
    { name: "Blog details", path: "/blog/details" },
    { name: "Job list", path: "/job" },
    { name: "Job details", path: "/job/details" },
    { name: "Create job", path: "/job/create" },
    { name: "Edit job", path: "/job/edit" },
    { name: "Tour list", path: "/tour" },
    { name: "Tour details", path: "/tour/details" },
    { name: "Create tour", path: "/tour/create" },
    { name: "Edit tour", path: "/tour/edit" },
    { name: "Chat", path: "/chat" },
    { name: "Mail", path: "/mail" },
    { name: "Calendar", path: "/calendar" },
    { name: "Holidays", path: "/calendar/holidays" },
    { name: "Kanban", path: "/kanban" },
    { name: "Transaction", path: "/transaction" },
    { name: "Gallary", path: "/gallary" },
    { name: "Pricing", path: "/pricing" },
    { name: "Blank", path: "/blank" },
    { name: "FAQs", path: "/faq" },
    { name: "About", path: "/about" },
    { name: "Contact Us", path: "/contactus" },
    { name: "Support", path: "/contact" },
  ]

  const filteredPaths = pagePaths.filter((page) =>
    page.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <>
      <AppBar position='sticky' sx={{ boxShadow: "none" }}>
        <Toolbar
          sx={{
            zIndex: 999,
            backgroundColor: theme.palette.background.paper,
          }}
        >
          <Typography
            variant='h6'
            component='div'
            sx={{
              display: "flex",
              flexGrow: 1,
              color: "black",
              fontWeight: "500",
              fontFamily: "Inter, sans-serif",
              fontSize: { lg: "28px", md: "28px", xs: "20px", sm: "20px" },
              marginTop: "16px",
            }}
          >
            {isMediumScreen && (
              <IconButton
                color='inherit'
                aria-label='open drawer'
                edge='start'
                onClick={handleDrawerToggle}
                sx={{ mr: 1 }}
              >
                <MenuIcon sx={{ color: theme.palette.text.primary }} />
              </IconButton>
            )}
            <IconButton
              color='inherit'
              aria-label='search'
              edge='end'
              onClick={handleModalOpen}
            >
              <SearchIcon
                style={{ width: "20px", color: theme.palette.text.primary }}
              />
            </IconButton>{" "}
            <Box
              sx={{
                ml: 2,
                mt: 1.3,
                fontSize: 12,
                color: theme.palette.text.primary,
                display: { lg: "flex", md: "flex", sm: "none", xs: "none" },
              }}
            >
              ⌘K
            </Box>
          </Typography>
          <Box sx={{ paddingRight: "20px", mt: "12px" }}>
            <HeaderNotification />
          </Box>
          <Box sx={{ paddingRight: "5px", mt: "12px" }}>
            <IconButton onClick={handleThemeToggle}>
              {mode === "light" ? <PiCloudMoonFill /> : <IoPartlySunnySharp />}
            </IconButton>
          </Box>

          <Box sx={{ mt: "12px", paddingRight: "5px" }}>
            <ContactMenu />
          </Box>

          <Box sx={{ mt: "12px", paddingRight: "5px" }}>
            <Badge
              color='error'
              variant='dot'
              invisible={!showBadge}
              sx={{
                "& .MuiBadge-dot": {
                  width: 5,
                  height: 8,
                  borderRadius: "50%",
                  mt: 1,
                  mr: 1.2,
                },
              }}
            >
              <IconButton
                onClick={handleColorMenuOpen}
                sx={{
                  animation: "spin 5s linear infinite",
                  "@keyframes spin": {
                    "0%": { transform: "rotate(0deg)" },
                    "100%": { transform: "rotate(360deg)" },
                  },
                }}
              >
                <RiSettings3Fill />
              </IconButton>
            </Badge>
            <Menu
              anchorEl={colorAnchorEl}
              open={Boolean(colorAnchorEl)}
              onClose={handleColorMenuClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.15))",
                  mt: 0.2,
                  border: "0px solid",
                  borderRadius: "10px",
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem
                onClick={handleReset}
                // onClick={() => changeColor("#d9f4e8")}
                sx={{
                  fontSize: "14px",
                  fontWeight: "500",
                  color: theme.palette.text.primary,
                  fontFamily: "Inter, sans-serif",
                }}
              >
                Reset
              </MenuItem>
              <MenuItem
                onClick={() => handleColorChange("#dbf0fd")}
                sx={{
                  fontSize: "14px",
                  fontWeight: "500",
                  color: theme.palette.text.primary,
                  fontFamily: "Inter, sans-serif",
                }}
              >
                theme 1
              </MenuItem>
              <MenuItem
                onClick={() => handleColorChange("#ece0fc")}
                sx={{
                  fontSize: "14px",
                  fontWeight: "500",
                  color: theme.palette.text.primary,
                  fontFamily: "Inter, sans-serif",
                }}
              >
                theme 2
              </MenuItem>
              <MenuItem
                onClick={() => handleColorChange("#dee9fa")}
                sx={{
                  fontSize: "14px",
                  fontWeight: "500",
                  color: theme.palette.text.primary,
                  fontFamily: "Inter, sans-serif",
                }}
              >
                theme 3
              </MenuItem>
              <MenuItem
                onClick={() => handleColorChange("#fff3e1")}
                sx={{
                  fontSize: "14px",
                  fontWeight: "500",
                  color: theme.palette.text.primary,
                  fontFamily: "Inter, sans-serif",
                }}
              >
                theme 4
              </MenuItem>
              <MenuItem
                onClick={() => handleColorChange("#ffe3e6")}
                sx={{
                  fontSize: "14px",
                  fontWeight: "500",
                  color: theme.palette.text.primary,
                  fontFamily: "Inter, sans-serif",
                }}
              >
                theme 5
              </MenuItem>
            </Menu>
          </Box>

          <Box sx={{ paddingRight: "15px" }}>
            <IconButton
              edge='end'
              color='black'
              onClick={handleProfileMenuOpen}
            >
              <Avatar
                sx={{ width: 40, height: 40, border: "1px dashed gray" }}
                src='https://randomuser.me/api/portraits/men/3.jpg'
              />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleProfileMenuClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.15))",
                  mt: 0.2,
                  border: "0px solid",
                  borderRadius: "10px",
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <Box sx={{ padding: "10px 20px" }}>
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontWeight: "500",
                    color: theme.palette.text.primary,
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  John Doe
                </Typography>
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontWeight: "500",
                    color: theme.palette.text.primary,
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  john@example.com
                </Typography>
              </Box>
              <Divider sx={{ borderStyle: "dashed" }} />
              <MenuItem
                onClick={() => {
                  navigate("/")
                  handleProfileMenuClose()
                }}
                sx={{
                  fontSize: "14px",
                  fontWeight: "500",
                  color: theme.palette.text.primary,
                  fontFamily: "Inter, sans-serif",
                  mt: 1,
                }}
              >
                Home
              </MenuItem>
              <MenuItem
                onClick={() => {
                  navigate("/user/account")
                  handleProfileMenuClose()
                }}
                sx={{
                  fontSize: "14px",
                  fontWeight: "500",
                  color: theme.palette.text.primary,
                  fontFamily: "Inter, sans-serif",
                }}
              >
                Settings
              </MenuItem>
              <MenuItem
                onClick={() => {
                  navigate("/profile")
                  handleProfileMenuClose()
                }}
                sx={{
                  fontSize: "14px",
                  fontWeight: "500",
                  color: theme.palette.text.primary,
                  fontFamily: "Inter, sans-serif",
                }}
              >
                Profile
              </MenuItem>
              <Divider sx={{ borderStyle: "dashed" }} />
              <MenuItem
                onClick={handleLogout}
                sx={{
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "red",
                  fontFamily: "Inter, sans-serif",
                  mt: 1,
                }}
              >
                Logout
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <CssBaseline />
      <Modal open={modalOpen} onClose={handleModalClose}>
        <Box
          sx={{
            position: "absolute",
            top: "40%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "90%", sm: "60%", md: "40%", lg: "30%" },
            height: "50%",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 2,
            borderRadius: 2,
          }}
        >
          <InputBase
            fullWidth
            autoFocus
            placeholder='Search...'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            startAdornment={
              <InputAdornment position='start' sx={{ mr: 2 }}>
                <SearchIcon
                  style={{
                    width: "13px",
                    height: "13px",
                    color: theme.palette.text.primary,
                  }}
                />
              </InputAdornment>
            }
            inputProps={{
              sx: { fontSize: "12px" },
            }}
            sx={{
              border: "none",
              borderRadius: "8px",
              padding: "5px 17px",
              color: theme.palette.text.primary,
            }}
          />
          <Divider sx={{ m: "10px -15px 10px -15px" }} />
          <List
            sx={{
              maxHeight: "40vh",
              overflowY: "auto",
              "&::-webkit-scrollbar": {
                width: "5px",
                height: "7px",
                borderRadius: "10px",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "rgba(0, 0, 0, 0.2)",
                borderRadius: "10px",
              },
              "&::-webkit-scrollbar-track": {
                backgroundColor: "transparent",
              },
            }}
          >
            {filteredPaths.map((page, index) => (
              <Box>
                <ListItem
                  button
                  key={page.path}
                  onClick={() => {
                    navigate(page.path)
                    handleModalClose()
                  }}
                >
                  <ListItemText
                    primary={
                      <Typography
                        sx={{
                          fontSize: "14px",
                          fontWeight: "600",
                          color: theme.palette.text.primary,
                          fontFamily: "Inter, sans-serif",
                        }}
                      >
                        {page.name}
                      </Typography>
                    }
                    secondary={
                      <Typography
                        sx={{
                          fontSize: "12px",
                          fontWeight: "400",
                          color: theme.palette.text.secondary,
                          fontFamily: "Inter, sans-serif",
                        }}
                      >
                        {page.path}
                      </Typography>
                    }
                  />
                </ListItem>
                {index < filteredPaths.length - 1 && (
                  <Divider sx={{ borderStyle: "dashed" }} />
                )}
              </Box>
            ))}
          </List>
          {filteredPaths.length === 0 && (
            <>
              <Box
                sx={{
                  borderRadius: "10px",
                  backgroundColor: "#BFFFE9",
                  boxShadow: "none",
                  mt: 10,
                }}
              >
                <Box>
                  <Typography
                    sx={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "14px",
                      fontWeight: "400",
                      color: "black",
                      p: 2,
                    }}
                  >
                    Oops... No path found. Please try a different search term.
                  </Typography>
                </Box>
              </Box>
            </>
          )}
        </Box>
      </Modal>
    </>
  )
}

export default Header
