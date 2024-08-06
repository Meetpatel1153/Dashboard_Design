import {
  Avatar,
  Badge,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Stack,
  Tab,
  Tabs,
  Typography,
  useTheme,
} from "@mui/material"
import { Box } from "@mui/system"
import React, { useState } from "react"
import NotificationsIcon from "@mui/icons-material/Notifications"
import DoneAllIcon from "@mui/icons-material/DoneAll"
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord"
import CloseIcon from "@mui/icons-material/Close"
import { styled } from "@mui/system"
import { notification } from "../mock/HeaderNotificationData"

const ScrollableTabs = styled(Tabs)({
  overflowX: "auto",

  "& .MuiTabs-flexContainer": {
    display: "inline-flex",
  },
})

const HeaderNotification = () => {
  const [notificationDrawerOpen, setNotificationDrawerOpen] = useState(false)
  const [tabValue, setTabValue] = useState(0)
  const [notifications, setNotifications] = useState(notification)
  const theme = useTheme()

  const handleNotificationDrawerOpen = () => {
    setNotificationDrawerOpen(true)
  }

  const handleNotificationDrawerClose = () => {
    setNotificationDrawerOpen(false)
  }

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  const handleNotificationClick = (notification) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notification.id ? { ...n, status: "read" } : n))
    )
  }

  const handleMarkAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((n) => (n.status === "unread" ? { ...n, status: "read" } : n))
    )
  }

  const unreadCount = notifications.filter((n) => n.status === "unread").length

  const getAvatarIcon = (type) => {
    switch (type) {
      case "user":
        const randomUserNumber = Math.floor(Math.random() * 10) + 4
        return `https://randomuser.me/api/portraits/men/${randomUserNumber}.jpg`
      case "email":
        return "https://cdn4.iconfinder.com/data/icons/social-media-logos-6/512/112-gmail_email_mail-512.png"
      case "settings":
        return "https://png.pngtree.com/element_our/png/20190103/vector-setting-icon-png_309695.jpg"
      default:
        return "https://randomuser.me/api/portraits/lego/1.jpg"
    }
  }

  const TabStyle = styled(Tab)({
    textTransform: "none",
    fontSize: "14px",
    fontWeight: "500",
    color: theme.palette.text.primary,
    fontFamily: "Inter, sans-serif",
  })

  return (
    <>
      <Box>
        <IconButton
          color='black'
          aria-label='notifications'
          edge='end'
          onClick={handleNotificationDrawerOpen}
        >
          <Badge badgeContent={unreadCount} color='error'>
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <Drawer
          anchor='right'
          open={notificationDrawerOpen}
          onClose={handleNotificationDrawerClose}
          slotProps={{
            backdrop: { invisible: true },
          }}
          PaperProps={{
            sx: {
              width: 1,
              maxWidth: 360,
              p: 1,
              backgroundColor: theme.palette.background.paper,
            },
          }}
        >
          <Stack justifyContent='space-between'>
            <Box
              display='flex'
              justifyContent='space-between'
              alignItems='center'
              sx={{
                mb: 1,
                mt: 2,
              }}
            >
              <Typography
                sx={{
                  color: theme.palette.text.primary,
                  fontWeight: "500",
                  fontFamily: "Inter, sans-serif",
                  fontSize: "20px",
                  pl: 2,
                }}
              >
                Notifications
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                <IconButton onClick={handleMarkAllAsRead}>
                  <DoneAllIcon sx={{ color: "#008000" }} />
                </IconButton>
                <IconButton
                  onClick={handleNotificationDrawerClose}
                  sx={{
                    display: { xs: "block", sm: "none" },
                    color: theme.palette.text.primary,
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </Box>
            </Box>
            <Divider />
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <ScrollableTabs
                value={tabValue}
                onChange={handleTabChange}
                indicatorColor='primary'
                textColor='primary'
                variant='scrollable'
                scrollButtons='auto'
              >
                <TabStyle label={`All (${notifications.length})`} />
                <TabStyle label={`Unread (${unreadCount})`} />
                <TabStyle
                  label={`Read (${notifications.length - unreadCount})`}
                />
              </ScrollableTabs>
            </Box>
            <Divider />
            <List sx={{ width: "100%", maxWidth: 360 }}>
              {notifications
                .filter((notification) => {
                  if (tabValue === 1) return notification.status === "unread"
                  if (tabValue === 2) return notification.status === "read"
                  return true
                })
                .map((notification, index) => (
                  <Box key={notification.id}>
                    <ListItem
                      button
                      onClick={() => handleNotificationClick(notification)}
                    >
                      <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                        <Avatar
                          sx={{
                            bgcolor: "primary.main",
                            color: "white",
                            mr: 2,
                          }}
                          src={getAvatarIcon(notification.type)}
                        />
                        <ListItemText
                          primary={
                            <Typography
                              sx={{
                                fontSize: "14px",
                                fontWeight: "500",
                                color: theme.palette.text.primary,
                                fontFamily: "Inter, sans-serif",
                              }}
                            >
                              {notification.text}
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
                            >{`${notification.time} - ${notification.title}`}</Typography>
                          }
                        />
                      </Box>
                      {notification.status === "unread" && (
                        <FiberManualRecordIcon
                          color='error'
                          sx={{
                            fontSize: 10,
                            ml: 8,
                          }}
                        />
                      )}
                    </ListItem>
                    {index < notifications.length && (
                      <Divider sx={{ borderStyle: "dashed" }} />
                    )}
                  </Box>
                ))}
            </List>

            <Button
              variant='contained'
              sx={{
                m: "10px 20px",
                backgroundColor: "#5F00D9",
                textTransform: "none",
                fontFamily: "Inter, sans-serif",
                fontWeight: "500",
                borderRadius: "10px",
                color: "white",
              }}
            >
              View all
            </Button>
          </Stack>
        </Drawer>
      </Box>
    </>
  )
}

export default HeaderNotification
