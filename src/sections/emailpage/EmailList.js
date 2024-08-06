import {
  Avatar,
  Badge,
  IconButton,
  InputAdornment,
  InputBase,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material"
import { Box } from "@mui/system"
import React from "react"
import { Search as SearchIcon } from "@mui/icons-material"

const EmailList = ({
  isDrawerOpenList,
  searchTerm,
  handleSearchChange,
  filteredEmails,
  handleEmailClick,
  theme,
}) => {
  return (
    <>
      <Box
        sx={{
          p: 1,
          backgroundColor: isDrawerOpenList
            ? "white"
            : theme.palette.background.box,
          borderRadius: "10px",
          mr: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 1,
            mb: 1,
          }}
        >
          <InputBase
            placeholder='Search Contacts..'
            style={{
              color: theme.palette.text.primary,
              padding: "8px",
              border: "1px solid gray",
              borderRadius: "10px",
              fontSize: "14px",
              width: "95%",
              fontFamily: "Inter, sans-serif",
              marginBottom: 4,
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
        <List
          sx={{
            maxHeight: isDrawerOpenList ? "auto" : "63vh",
            height: isDrawerOpenList ? "auto" : "63vh",
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
          }}
        >
          {filteredEmails.map((email) => (
            <ListItem
              button
              key={email.id}
              onClick={() => {
                handleEmailClick(email)
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <ListItemAvatar>
                  <Avatar
                    src={email.avatar}
                    alt={email.sender}
                    sx={{
                      bgcolor: "primary.main",
                      color: "white",
                      mr: 2,
                    }}
                  />
                </ListItemAvatar>
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
                      {email.subject}
                    </Typography>
                  }
                  secondary={
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        width: "100%",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: "12px",
                          fontWeight: "400",
                          color: theme.palette.text.secondary,
                          fontFamily: "Inter, sans-serif",
                          mr: 1,
                        }}
                      >
                        {email.preview}
                      </Typography>
                    </Box>
                  }
                />
                <Box sx={{ ml: "auto", textAlign: "right" }}>
                  <Typography
                    sx={{
                      fontSize: "11px",
                      fontWeight: "400",
                      color: theme.palette.text.secondary,
                      fontFamily: "Inter, sans-serif",
                    }}
                  >
                    {email.time} {/* Display time */}
                  </Typography>
                  {email.unread && <Badge color='primary' variant='dot' />}
                </Box>
              </Box>
            </ListItem>
          ))}
          {filteredEmails.length === 0 && (
            <>
              <Box
                sx={{
                  borderRadius: "10px",
                  backgroundColor: "#BFFFE9",
                  boxShadow: "none",
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
                    Oops... No email found. Please try a different search term.
                  </Typography>
                </Box>
              </Box>
            </>
          )}
        </List>
      </Box>
    </>
  )
}
export default EmailList
