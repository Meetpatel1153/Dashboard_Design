import React, { useState } from "react"
import { Box, Grid, Typography, Avatar, Button } from "@mui/material"
import {
  LocationOn as LocationIcon,
  Check as CheckIcon,
} from "@mui/icons-material"
import { dummyFollowers } from "../../mock/Followers"

const Follower = ({ theme }) => {
  const [followState, setFollowState] = useState(
    dummyFollowers.map(() => false)
  )

  const handleFollowClick = (index) => {
    const newFollowState = [...followState]
    newFollowState[index] = !newFollowState[index]
    setFollowState(newFollowState)
  }

  return (
    <Box>
      <Typography
        variant='h5'
        sx={{
          fontSize: "26px",
          fontWeight: "500",
          color: theme.palette.text.primary,
          fontFamily: "Inter, sans-serif",
          textAlign: "start",
          mb: 3,
        }}
      >
        Followers
      </Typography>
      <Grid container spacing={2}>
        {dummyFollowers.map((follower, index) => (
          <Grid item lg={4} md={6} sm={12} xs={12} key={follower.id}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                backgroundColor: theme.palette.background.paper,
                borderRadius: "10px",
                p: 2,
              }}
            >
              <Avatar
                alt={follower.name}
                src={follower.avatar}
                sx={{ width: 50, height: 50, mr: 2 }}
              />
              <Box sx={{ flex: 1 }}>
                <Typography
                  variant='subtitle1'
                  sx={{
                    fontSize: "14px",
                    fontWeight: "500",
                    color: theme.palette.text.primary,
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  {follower.name}
                </Typography>
                <Box
                  sx={{ display: "flex", alignItems: "center", color: "#666" }}
                >
                  <LocationIcon sx={{ fontSize: 18 }} />
                  <Typography
                    sx={{
                      fontSize: "12px",
                      fontWeight: "500",
                      color: theme.palette.text.secondary,
                      fontFamily: "Inter, sans-serif",
                    }}
                  >
                    {follower.location}
                  </Typography>
                </Box>
              </Box>
              <Button
                variant={followState[index] ? "none" : "outlined"}
                onClick={() => handleFollowClick(index)}
                sx={{
                  minWidth: 50,
                  textTransform: "none",
                  fontSize: "14px",
                  fontWeight: "500",
                  color: followState[index]
                    ? "green"
                    : theme.palette.text.primary,
                  fontFamily: "Inter, sans-serif",
                  borderRadius: "5px",
                }}
                startIcon={
                  followState[index] ? (
                    <CheckIcon sx={{ color: "green" }} />
                  ) : null
                }
              >
                {followState[index] ? "Following" : "Follow"}
              </Button>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default Follower
