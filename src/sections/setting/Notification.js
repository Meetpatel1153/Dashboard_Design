import React, { useState } from "react"
import { Grid, Box, Typography, Switch, Button } from "@mui/material"
import { toast } from "react-toastify"
import { notificationsdata } from "../../mock/NotificationData"

const Notification = ({ theme }) => {
  const [notifications, setNotifications] = useState(notificationsdata)

  const handleSwitchChange = (category, id) => {
    const updatedNotifications = {
      ...notifications,
      [category]: notifications[category].map((notif) =>
        notif.id === id ? { ...notif, checked: !notif.checked } : notif
      ),
    }
    setNotifications(updatedNotifications)
  }

  const handleSaveChanges = () => {
    toast.success("Changes saved successfully")
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={5}>
        <Box
          sx={{
            p: "10px 20px",
            border: "0px solid",
            borderRadius: "12px",
          }}
        >
          <Typography
            sx={{
              fontSize: "16px",
              fontWeight: "500",
              color: theme.palette.text.primary,
              fontFamily: "Inter, sans-serif",
            }}
          >
            Activity
          </Typography>
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: "400",
              color: theme.palette.text.secondary,
              fontFamily: "Inter, sans-serif",
            }}
          >
            Manage your activity notifications
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12} md={7}>
        <Box
          sx={{
            p: "10px 20px",
            backgroundColor: theme.palette.background.box,
            border: "0px solid",
            borderRadius: "12px",
            marginBottom: 2,
          }}
        >
          {notifications.activity.map((notification) => (
            <Box
              key={notification.id}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 1,
              }}
            >
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: "400",
                  color: theme.palette.text.primary,
                  fontFamily: "Inter, sans-serif",
                }}
              >
                {notification.label}
              </Typography>
              <Switch
                checked={notification.checked}
                onChange={() => handleSwitchChange("activity", notification.id)}
                inputProps={{
                  "aria-label": `${notification.label} switch`,
                }}
                sx={{
                  marginLeft: 1,
                  "& .MuiSwitch-thumb": {
                    backgroundColor: "#5F00D9",
                  },
                  "& .MuiSwitch-track": {
                    backgroundColor: "#A6A6A6",
                  },
                }}
              />
            </Box>
          ))}
        </Box>
      </Grid>

      <Grid item xs={12} md={5}>
        <Box
          sx={{
            p: "10px 20px",
            border: "0px solid",
            borderRadius: "12px",
          }}
        >
          <Typography
            sx={{
              fontSize: "16px",
              fontWeight: "500",
              color: theme.palette.text.primary,
              fontFamily: "Inter, sans-serif",
            }}
          >
            Application
          </Typography>
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: "400",
              color: theme.palette.text.secondary,
              fontFamily: "Inter, sans-serif",
            }}
          >
            Manage your application notifications
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12} md={7}>
        <Box
          sx={{
            p: "10px 20px",
            backgroundColor: theme.palette.background.box,
            border: "0px solid",
            borderRadius: "12px",
          }}
        >
          {notifications.application.map((notification) => (
            <Box
              key={notification.id}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 1,
              }}
            >
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: "400",
                  color: theme.palette.text.primary,
                  fontFamily: "Inter, sans-serif",
                }}
              >
                {notification.label}
              </Typography>
              <Switch
                checked={notification.checked}
                onChange={() =>
                  handleSwitchChange("application", notification.id)
                }
                inputProps={{
                  "aria-label": `${notification.label} switch`,
                }}
                sx={{
                  marginLeft: 1,
                  "& .MuiSwitch-thumb": {
                    backgroundColor: "#5F00D9",
                  },
                  "& .MuiSwitch-track": {
                    backgroundColor: "#A6A6A6",
                  },
                }}
              />
            </Box>
          ))}
        </Box>
      </Grid>

      <Grid item xs={12}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button
            variant='contained'
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
            onClick={handleSaveChanges}
          >
            Save changes
          </Button>
        </Box>
      </Grid>
    </Grid>
  )
}

export default Notification
