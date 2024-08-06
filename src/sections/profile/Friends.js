import React, { useState } from "react"
import {
  Box,
  Grid,
  Typography,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  InputAdornment,
} from "@mui/material"
import {
  Instagram as InstagramIcon,
  Facebook as FacebookIcon,
  LinkedIn as LinkedInIcon,
  Twitter as TwitterIcon,
  Search as SearchIcon,
} from "@mui/icons-material"
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi"
import { dummyFriends as initialFriends } from "../../mock/Friends"

const Friends = ({ theme }) => {
  const [friends, setFriends] = useState(initialFriends)
  const [anchorEl, setAnchorEl] = useState(null)
  const [selectedFriend, setSelectedFriend] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")

  const handleMenuClick = (event, friend) => {
    setAnchorEl(event.currentTarget)
    setSelectedFriend(friend)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    setSelectedFriend(null)
  }

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value)
  }

  const handleDeleteFriend = () => {
    setFriends(friends.filter((friend) => friend.id !== selectedFriend.id))
    handleMenuClose()
  }

  const filteredFriends = friends.filter((friend) =>
    friend.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Typography
          variant='h5'
          sx={{
            fontSize: "26px",
            fontWeight: "500",
            color: theme.palette.text.primary,
            fontFamily: "Inter, sans-serif",
            textAlign: "start",
          }}
        >
          Friends
        </Typography>
        <TextField
          variant='outlined'
          size='small'
          placeholder='Search friends'
          value={searchQuery}
          onChange={handleSearchChange}
          sx={{
            width: "250px",
            "& .MuiInputBase-root": {
              fontSize: "14px",
              fontWeight: "400",
              color: theme.palette.text.primary,
              fontFamily: "Inter, sans-serif",
              p: 1,
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#666",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#666",
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <SearchIcon sx={{ color: "#666" }} />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <Grid container spacing={2}>
        {filteredFriends.map((friend) => (
          <Grid item lg={4} md={6} sm={12} xs={12} key={friend.id}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                backgroundColor: theme.palette.background.paper,
                borderRadius: "10px",
                p: 2,
                minHeight: "200px",
              }}
            >
              <Box sx={{ alignSelf: "flex-end" }}>
                <IconButton
                  aria-label='settings'
                  onClick={(event) => handleMenuClick(event, friend)}
                >
                  <PiDotsThreeOutlineVerticalFill size={15} />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl) && selectedFriend?.id === friend.id}
                  onClose={handleMenuClose}
                >
                  <MenuItem
                    sx={{
                      fontSize: "14px",
                      fontWeight: "500",
                      color: theme.palette.text.primary,
                      fontFamily: "Inter, sans-serif",
                    }}
                  >
                    Edit
                  </MenuItem>
                  <MenuItem
                    onClick={handleDeleteFriend}
                    sx={{
                      fontSize: "14px",
                      fontWeight: "500",
                      color: theme.palette.text.primary,
                      fontFamily: "Inter, sans-serif",
                    }}
                  >
                    Delete
                  </MenuItem>
                </Menu>
              </Box>
              <Avatar
                alt={friend.name}
                src={friend.avatar}
                sx={{ width: 80, height: 80, mb: 2 }}
              />
              <Typography
                variant='subtitle1'
                sx={{
                  fontSize: "16px",
                  fontWeight: "500",
                  color: theme.palette.text.primary,
                  fontFamily: "Inter, sans-serif",
                }}
              >
                {friend.name}
              </Typography>
              <Typography
                variant='subtitle2'
                sx={{
                  fontSize: "14px",
                  fontWeight: "400",
                  color: theme.palette.text.secondary,
                  fontFamily: "Inter, sans-serif",
                }}
              >
                {friend.role}
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                <IconButton aria-label='facebook'>
                  <FacebookIcon sx={{ color: "#3b5998" }} />
                </IconButton>
                <IconButton aria-label='instagram'>
                  <InstagramIcon sx={{ color: "#FF0000" }} />
                </IconButton>
                <IconButton aria-label='linkedin'>
                  <LinkedInIcon sx={{ color: "#0e76a8" }} />
                </IconButton>
                <IconButton aria-label='twitter'>
                  <TwitterIcon sx={{ color: "#1DA1F2" }} />
                </IconButton>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
      {filteredFriends.length === 0 && (
        <Box
          sx={{
            mt: 10,
            textAlign: "center",
          }}
        >
          <Typography variant='h6' gutterBottom>
            Not Found
          </Typography>
          <Typography variant='body2'>
            No results found for &nbsp;
            <strong>&quot;{searchQuery}&quot;</strong>.
            <br /> Try checking for typos or using complete words.
          </Typography>
        </Box>
      )}
    </Box>
  )
}

export default Friends
