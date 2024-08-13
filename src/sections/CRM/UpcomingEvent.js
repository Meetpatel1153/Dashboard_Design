import React, { useState } from "react"
import {
  Typography,
  IconButton,
  Modal,
  Box,
  useTheme,
  List,
  ListItemText,
  ListItemSecondaryAction,
  ListItem,
} from "@mui/material"
import FullscreenIcon from "@mui/icons-material/Fullscreen"
import CloseIcon from "@mui/icons-material/Close"
import { upcomingEvent } from "../../mock/CRM"

const UpcomingEvent = () => {
  const [open, setOpen] = useState(false)
  const theme = useTheme()

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <>
      <Box
        elevation={3}
        sx={{
          padding: 2,
          backgroundColor: theme.palette.background.paper,
          borderRadius: "10px",
          position: "relative",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box>
            {" "}
            <Typography
              sx={{
                fontFamily: "Inter, sans-serif",
                fontSize: "20px",
                fontWeight: "600",
              }}
            >
              Upcoming events
            </Typography>
          </Box>

          <Box>
            <IconButton onClick={handleOpen}>
              <FullscreenIcon />
            </IconButton>
          </Box>
        </Box>
        <List
          sx={{
            height: "31vh",
            overflowY: "auto",
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
          {upcomingEvent.map((event, index) => (
            <ListItem
              key={index}
              sx={{ display: "flex", alignItems: "center" }}
            >
              <Box
                elevation={1}
                sx={{
                  width: 40,
                  minHeight: 30,
                  borderRadius: "5px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: 2,
                  padding: 1,
                  backgroundColor: theme.palette.presets.color,
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "12px",
                    fontWeight: "500",
                    color: "black",
                  }}
                >
                  {new Date(event.date).getDate()}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "12px",
                    fontWeight: "500",
                    color: "black",
                  }}
                >
                  {new Date(event.date).toLocaleString("default", {
                    month: "short",
                  })}
                </Typography>
              </Box>

              <ListItemText
                primary={event.title}
                secondary={`${event.adress}`}
                primaryTypographyProps={{
                  sx: {
                    fontSize: "14px",
                    fontWeight: "400",
                    color: theme.palette.text.primary,
                    fontFamily: "Inter, sans-serif",
                  },
                }}
                secondaryTypographyProps={{
                  sx: {
                    fontSize: "14px",
                    fontWeight: "400",
                    color: theme.palette.text.secondary,
                    fontFamily: "Inter, sans-serif",
                  },
                }}
              />

              <ListItemSecondaryAction>
                <IconButton edge='end' aria-label={event.type}>
                  <Typography
                    sx={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "12px",
                      fontWeight: "500",
                      color: theme.palette.text.primary,
                      p: 1,
                      borderRadius: "10px",
                      backgroundColor: theme.palette.sidebar.color,
                    }}
                  >
                    {event.type}
                  </Typography>
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Box>

      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "90vw",
            height: "90vh",
            backgroundColor: theme.palette.background.paper,
            borderRadius: "10px",
            padding: 4,
            overflowY: "auto",
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
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box>
              {" "}
              <Typography
                sx={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "20px",
                  fontWeight: "600",
                }}
              >
                Upcoming events
              </Typography>
            </Box>
            <Box>
              <IconButton onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </Box>
          </Box>
          <List>
            {upcomingEvent.map((event, index) => (
              <ListItem
                key={index}
                sx={{ display: "flex", alignItems: "center" }}
              >
                <Box
                  elevation={1}
                  sx={{
                    width: 40,
                    minHeight: 30,
                    borderRadius: "5px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: 2,
                    padding: 1,
                    backgroundColor: theme.palette.presets.color,
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "12px",
                      fontWeight: "500",
                      color: "black",
                    }}
                  >
                    {new Date(event.date).getDate()}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "12px",
                      fontWeight: "500",
                      color: "black",
                    }}
                  >
                    {new Date(event.date).toLocaleString("default", {
                      month: "short",
                    })}
                  </Typography>
                </Box>

                <ListItemText
                  primary={event.title}
                  secondary={`${event.adress}`}
                  primaryTypographyProps={{
                    sx: {
                      fontSize: "14px",
                      fontWeight: "400",
                      color: theme.palette.text.primary,
                      fontFamily: "Inter, sans-serif",
                    },
                  }}
                  secondaryTypographyProps={{
                    sx: {
                      fontSize: "14px",
                      fontWeight: "400",
                      color: theme.palette.text.secondary,
                      fontFamily: "Inter, sans-serif",
                    },
                  }}
                />

                <ListItemSecondaryAction>
                  <IconButton edge='end' aria-label={event.type}>
                    <Typography
                      sx={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "12px",
                        fontWeight: "500",
                        color: theme.palette.text.primary,
                        p: 1,
                        borderRadius: "10px",
                        backgroundColor: theme.palette.sidebar.color,
                      }}
                    >
                      {event.type}
                    </Typography>
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </Box>
      </Modal>
    </>
  )
}

export default UpcomingEvent
