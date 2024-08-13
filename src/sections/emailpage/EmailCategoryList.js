import React from "react"
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Box,
  Typography,
  Badge,
  Button,
  useTheme,
} from "@mui/material"
import InboxIcon from "@mui/icons-material/Inbox"
import DraftsIcon from "@mui/icons-material/Drafts"
import SendIcon from "@mui/icons-material/Send"
import DeleteIcon from "@mui/icons-material/Delete"
import SpamIcon from "@mui/icons-material/Report"
import StarIcon from "@mui/icons-material/Star"
import LabelImportantIcon from "@mui/icons-material/LabelImportant"
import SocialIcon from "@mui/icons-material/Group"
import PromotionsIcon from "@mui/icons-material/LocalOffer"
import { emails } from "../../mock/Emails"
import { Edit as EditIcon } from "@mui/icons-material"

const categories = [
  { text: "All", icon: <InboxIcon /> },
  { text: "Inbox", icon: <InboxIcon /> },
  { text: "Drafts", icon: <DraftsIcon /> },
  { text: "Sent", icon: <SendIcon /> },
  { text: "Trash", icon: <DeleteIcon /> },
  { text: "Spam", icon: <SpamIcon /> },
  { text: "Starred", icon: <StarIcon /> },
  { text: "Important", icon: <LabelImportantIcon /> },
  { text: "Social", icon: <SocialIcon /> },
  { text: "Promotions", icon: <PromotionsIcon /> },
]

const EmailCategoryList = ({
  onCategoryChange,
  handleComposeOpen,
  toggleDrawer,
  isDrawerOpenList,
}) => {
  const theme = useTheme()
  const getUnreadCount = (category) => {
    if (category === "all") {
      return emails.filter((email) => email.unread).length
    }
    return emails.filter(
      (email) => email.category.toLowerCase() === category && email.unread
    ).length
  }

  return (
    <>
      <Box
        sx={{
          marginLeft: "-10px",
          p: 1,
          borderRadius: "10px",
          maxHeight: isDrawerOpenList ? "auto" : "72vh",
          height: isDrawerOpenList ? "auto" : "72vh",
          overflowY: "scroll",
          scrollBehavior: "auto",
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
          mr: 1,
        }}
      >
        <Button
          variant='contained'
          sx={{
            backgroundColor: "#5F00D9",
            textTransform: "none",
            fontFamily: "Inter, sans-serif",
            fontWeight: "500",
            borderRadius: "10px",
            color: "white",
            p: "5px 30px",
          }}
          onClick={handleComposeOpen}
          startIcon={<EditIcon />}
        >
          Compose
        </Button>
        <List>
          {categories.map((category, index) => (
            <ListItem
              button
              key={index}
              onClick={() => {
                onCategoryChange(category.text.toLowerCase())
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <ListItemIcon>{category.icon}</ListItemIcon>
                <ListItemText
                  primary={
                    <Typography
                      sx={{
                        fontSize: "14px",
                        fontWeight: "500",
                        color: theme.palette.text.primary,
                        fontFamily: "Inter, sans-serif",
                        marginLeft: "-10px",
                      }}
                    >
                      {category.text}
                    </Typography>
                  }
                />
                <Box sx={{ ml: "auto", textAlign: "right" }}>
                  {getUnreadCount(category.text.toLowerCase()) > 0 && (
                    <Badge
                      color='transperent'
                      badgeContent={getUnreadCount(category.text.toLowerCase())}
                    />
                  )}
                </Box>
              </Box>
            </ListItem>
          ))}
        </List>
      </Box>
    </>
  )
}

export default EmailCategoryList
