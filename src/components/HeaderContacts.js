import React, { useState } from "react"
import {
  IconButton,
  Menu,
  MenuItem,
  Divider,
  Typography,
  Avatar,
  Badge,
  useTheme,
} from "@mui/material"
import { IoMdContacts } from "react-icons/io"
import { chat } from "../mock/Chat"

const ContactMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const theme = useTheme()

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }
  const getStatusColor = (status) => {
    switch (status) {
      case "online":
        return "#FFC107"
      case "offline":
        return "#4CAF50"
      default:
        return "#BFFFE9"
    }
  }
  return (
    <>
      <IconButton onClick={handleMenuOpen}>
        <IoMdContacts />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.15))",
            mt: 0.2,
            border: "0px solid",
            width: "300px",
            height: "400px",
            borderRadius: "10px",
            overflowY: "scroll",
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
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Typography
          sx={{
            p: 2,
            fontSize: "18px",
            fontWeight: "500",
            color: theme.palette.text.primary,
            fontFamily: "Inter, sans-serif",
          }}
        >
          Contacts({chat.length})
        </Typography>
        <Divider />
        {chat.map((contact) => (
          <MenuItem key={contact.id} onClick={handleMenuClose}>
            <Badge
              overlap='circular'
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              variant='dot'
              sx={{
                "& .MuiBadge-dot": {
                  backgroundColor: getStatusColor(contact.status),
                  width: 10,
                  height: 10,
                  right: 10,
                  bottom: 6,
                  border: "1px solid #008080",
                  borderRadius: "50%",
                },
              }}
            >
              <Avatar alt={contact.name} src={contact.avatar} />
            </Badge>
            <Typography
              sx={{
                p: 1.2,
                fontSize: "14px",
                fontWeight: "500",
                color: theme.palette.text.primary,
                fontFamily: "Inter, sans-serif",
              }}
            >
              {contact.name}
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}

export default ContactMenu
