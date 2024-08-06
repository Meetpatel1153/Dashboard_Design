import {
  Avatar,
  Badge,
  Box,
  Card,
  CardContent,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  Typography,
  useTheme,
} from "@mui/material"
import React from "react"

const ContactList = ({
  filteredContacts,
  getStatusColor,
  handleContactClick,
  selectedContact,
  isDrawerOpen,
  setIsDrawerOpen,
}) => {
  const theme = useTheme()
  return (
    <>
      <Box
        p={1}
        flex='1'
        overflow='auto'
        sx={{
          maxHeight: isDrawerOpen ? "80vh" : "58vh",
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
        <List>
          {filteredContacts.map((contact) => (
            <ListItem
              key={contact.id}
              button
              onClick={() => {
                handleContactClick(contact)
                setIsDrawerOpen(false)
              }}
              selected={selectedContact?.id === contact.id}
              sx={{ paddingBottom: "20px" }}
            >
              <ListItemAvatar>
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
                      border: "1px solid #008080",
                      borderRadius: "50%",
                    },
                  }}
                >
                  <Avatar alt={contact.name} src={contact.avatar} />
                </Badge>
              </ListItemAvatar>

              <Grid container alignItems='center'>
                <Grid item xs>
                  <Typography
                    sx={{
                      fontSize: "15px",
                      fontWeight: "500",
                      color: theme.palette.text.primary,
                      fontFamily: "Inter, sans-serif",
                    }}
                  >
                    {contact.name}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "12px",
                      fontWeight: "500",
                      color: theme.palette.text.secondary,
                      fontFamily: "Inter, sans-serif",
                    }}
                  >
                    {contact.lastMessage.split(" ").slice(0, 4).join(" ")}
                    ...
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography
                    sx={{
                      fontSize: "12px",
                      fontWeight: "500",
                      color: theme.palette.text.secondary,
                      fontFamily: "Inter, sans-serif",
                    }}
                  >
                    {contact.timestamp}
                  </Typography>
                </Grid>
              </Grid>
            </ListItem>
          ))}
        </List>
        {filteredContacts.length === 0 && (
          <>
            <Card
              sx={{
                borderRadius: "10px",
                backgroundColor: "#BFFFE9",
                boxShadow: "none",
              }}
            >
              <CardContent>
                <Typography
                  sx={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "14px",
                    fontWeight: "400",
                    color: "black",
                  }}
                >
                  Oops... No contact found. Please try a different search term.
                </Typography>
              </CardContent>
            </Card>
          </>
        )}
      </Box>
    </>
  )
}
export default ContactList
