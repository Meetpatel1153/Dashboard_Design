import React, { useState } from "react"
import {
  Box,
  Grid,
  Typography,
  Drawer,
  IconButton,
  Divider,
  Stack,
  useTheme,
} from "@mui/material"
import EmailDetails from "../../sections/emailpage/EmailDetails"
import ComposeEmail from "../../sections/emailpage/ComposeEmail"
import { emails } from "../../mock/Emails"
import EmailCategoryList from "../../sections/emailpage/EmailCategoryList"
import MailIcon from "@mui/icons-material/Mail"
import {
  Close as CloseIcon,
  Fullscreen as FullscreenIcon,
  FullscreenExit as FullscreenExitIcon,
} from "@mui/icons-material"
import Draggable from "react-draggable"
import { FiMinus } from "react-icons/fi"
import EmailList from "../../sections/emailpage/EmailList"
import { IoChatbubbleEllipsesSharp } from "react-icons/io5"

const EmailListPage = () => {
  const [selectedEmail, setSelectedEmail] = useState(emails[0])
  const [isComposeOpen, setIsComposeOpen] = useState(false)
  const [filteredEmails, setFilteredEmails] = useState(emails)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [isDrawerOpenList, setIsDrawerOpenList] = useState(false)
  const [isComposeMinimized, setIsComposeMinimized] = useState(false)
  const [isComposeFullscreen, setIsComposeFullscreen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const theme = useTheme()

  const handleEmailClick = (email) => {
    setSelectedEmail(email)
  }

  const handleComposeOpen = () => {
    setIsComposeOpen(true)
    setIsComposeMinimized(false)
  }

  const handleComposeClose = () => {
    setIsComposeOpen(false)
    setIsComposeMinimized(false)
    setIsComposeFullscreen(false)
  }

  const handleCategoryChange = (category) => {
    if (category === "all") {
      setFilteredEmails(emails)
    } else {
      const filtered = emails.filter(
        (email) => email.category.toLowerCase() === category.toLowerCase()
      )
      setFilteredEmails(filtered)
    }
  }

  const toggleDrawer = (open) => () => {
    setIsDrawerOpen(open)
  }

  const toggleDrawerList = (open) => () => {
    setIsDrawerOpenList(open)
  }

  const toggleComposeMinimize = () => {
    setIsComposeMinimized(!isComposeMinimized)
  }

  const toggleComposeFullscreen = () => {
    setIsComposeFullscreen(!isComposeFullscreen)
  }

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
    filterEmails(event.target.value)
  }

  const filterEmails = (searchTerm) => {
    const filtered = emails.filter((email) =>
      email.subject.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredEmails(filtered)
  }

  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          padding: { xs: "20px", md: "40px 80px", lg: "70px 70px" },
          backgroundColor: theme.palette.background.box,
          minHeight: "92vh",
        }}
      >
        <Stack spacing={1} direction='row'>
          <Grid
            container
            spacing={2}
            sx={{
              maxHeight: "auto",
              height: "auto",
              backgroundColor: theme.palette.background.paper,
              border: "0px solid",
              borderRadius: "10px",
              m: 2,
            }}
          >
            <Grid
              item
              xs={12}
              sx={{ display: { md: "none", xs: "block" }, textAlign: "right" }}
            >
              <IconButton onClick={toggleDrawer(true)}>
                <MailIcon />
              </IconButton>
              <IconButton onClick={toggleDrawerList(true)}>
                <IoChatbubbleEllipsesSharp sx={{ mr: 1 }} />
              </IconButton>
            </Grid>

            {/* Drawer for email categories */}
            <Drawer
              anchor='left'
              open={isDrawerOpen}
              onClose={toggleDrawer(false)}
            >
              <Box sx={{ width: 250, padding: "8px" }}>
                <EmailCategoryList
                  toggleDrawer={toggleDrawer}
                  onCategoryChange={handleCategoryChange}
                  handleComposeOpen={handleComposeOpen}
                />
              </Box>
            </Drawer>

            <Drawer
              anchor='left'
              open={isDrawerOpenList}
              onClose={toggleDrawerList(false)}
            >
              <Box sx={{ width: 340, padding: "8px" }}>
                <EmailList
                  toggleDrawerList={toggleDrawerList}
                  searchTerm={searchTerm}
                  handleSearchChange={handleSearchChange}
                  filteredEmails={filteredEmails}
                  handleEmailClick={handleEmailClick}
                />
              </Box>
            </Drawer>

            {/* Left side: Email categories for larger screens */}
            <Grid item xs={12} md={5} lg={2.5}>
              <Box
                sx={{
                  display: { md: "block", xs: "none" },
                }}
              >
                <EmailCategoryList
                  onCategoryChange={handleCategoryChange}
                  handleComposeOpen={handleComposeOpen}
                  theme={theme}
                />
              </Box>
            </Grid>

            {/* Middle: Email list */}
            <Grid item xs={12} md={7} lg={4}>
              <Box
                sx={{
                  display: { md: "block", xs: "none" },
                }}
              >
                <EmailList
                  searchTerm={searchTerm}
                  handleSearchChange={handleSearchChange}
                  filteredEmails={filteredEmails}
                  handleEmailClick={handleEmailClick}
                  theme={theme}
                />
              </Box>
            </Grid>

            {/* Right side: Email details */}
            <Grid item xs={12} md={12} lg={5.5}>
              {selectedEmail ? (
                <EmailDetails email={selectedEmail} theme={theme} />
              ) : (
                <Typography variant='h6' color='textSecondary' align='center'>
                  Select an email to view details
                </Typography>
              )}
            </Grid>
          </Grid>
        </Stack>
      </Box>

      {/* Draggable compose email window */}
      {isComposeOpen && (
        <Draggable handle='.handle'>
          <Box
            sx={{
              position: "fixed",
              right: 20,
              bottom: 20,
              width: isComposeFullscreen ? "80%" : "600px",
              height: isComposeFullscreen ? "80%" : "auto",
              borderRadius: 2,
              backgroundColor: theme.palette.background.paper,
              boxShadow: 24,
              zIndex: 1300,
              display: isComposeMinimized ? "none" : "block",
              overflowY: "scroll",
              "&::-webkit-scrollbar": {
                width: "5px",
                height: "7px",
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
            <Box
              className='handle'
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                cursor: "move",
                p: 1,
              }}
            >
              <Typography
                sx={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "16px",
                  fontWeight: "500",
                  textTransform: "none",
                  color: theme.palette.text.primary,
                }}
              >
                New Message
              </Typography>
              <Box>
                <IconButton onClick={toggleComposeMinimize}>
                  <FiMinus size={20} />
                </IconButton>
                <IconButton onClick={toggleComposeFullscreen}>
                  {isComposeFullscreen ? (
                    <FullscreenExitIcon />
                  ) : (
                    <FullscreenIcon />
                  )}
                </IconButton>
                <IconButton onClick={handleComposeClose}>
                  <CloseIcon />
                </IconButton>
              </Box>
            </Box>
            <Divider />
            <Box sx={{ p: 1 }}>
              <ComposeEmail
                onClose={handleComposeClose}
                isComposeFullscreen={isComposeFullscreen}
                theme={theme}
              />
            </Box>
          </Box>
        </Draggable>
      )}
    </>
  )
}

export default EmailListPage
