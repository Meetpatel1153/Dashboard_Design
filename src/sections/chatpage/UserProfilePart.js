import React, { useState } from "react"
import {
  Avatar,
  Badge,
  Typography,
  Menu,
  MenuItem,
  Fade,
  useTheme,
} from "@mui/material"
import { Box } from "@mui/system"
import styled from "@emotion/styled"

const UserProfilePart = () => {
  const [status, setStatus] = useState("Online")
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const theme = useTheme()

  const OnlineBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-dot": {
      backgroundColor:
        status === "Online"
          ? "#FFC107"
          : status === "Offline"
          ? "#4CAF50"
          : "#BFFFE9",
      border: "1px solid #008080",
      width: 10,
      height: 10,
      borderRadius: "50%",
    },
  }))

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus)
    handleClose()
  }

  return (
    <>
      <Box p={2} sx={{ display: "flex", gap: "12px" }}>
        <Box position='relative'>
          <span id='fade-button' onClick={handleClick}>
            <OnlineBadge
              overlap='circular'
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              variant='dot'
              onClick={handleClick}
            >
              <Avatar
                sx={{ width: 50, height: 50 }}
                src='https://randomuser.me/api/portraits/men/3.jpg'
              />
            </OnlineBadge>
          </span>
          <Menu
            id='fade-menu'
            MenuListProps={{
              "aria-labelledby": "fade-button",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            TransitionComponent={Fade}
            sx={{ marginTop: "18px", marginRight: "80px" }}
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
                  right: 40,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
          >
            <MenuItem
              onClick={() => handleStatusChange("Online")}
              sx={{
                fontSize: "14px",
                fontWeight: "500",
                color: theme.palette.text.primary,
                fontFamily: "Inter, sans-serif",
              }}
            >
              Online
            </MenuItem>
            <MenuItem
              onClick={() => handleStatusChange("Offline")}
              sx={{
                fontSize: "14px",
                fontWeight: "500",
                color: theme.palette.text.primary,
                fontFamily: "Inter, sans-serif",
              }}
            >
              Offline
            </MenuItem>
            <MenuItem
              onClick={() => handleStatusChange("Break")}
              sx={{
                fontSize: "14px",
                fontWeight: "500",
                color: theme.palette.text.primary,
                fontFamily: "Inter, sans-serif",
              }}
            >
              Break
            </MenuItem>
          </Menu>
        </Box>
        <Box>
          <Typography
            sx={{
              fontSize: "15px",
              fontWeight: "500",
              color: theme.palette.text.primary,
              fontFamily: "Inter, sans-serif",
            }}
          >
            You (Meet patel)
          </Typography>
          <Typography
            sx={{
              fontSize: "12px",
              fontWeight: "500",
              color: theme.palette.text.secondary,
              fontFamily: "Inter, sans-serif",
            }}
          >
            Orophile⛰️.
          </Typography>
        </Box>
      </Box>
    </>
  )
}

export default UserProfilePart
