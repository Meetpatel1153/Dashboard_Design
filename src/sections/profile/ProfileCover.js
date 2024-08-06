import React from "react"
import { Box, Typography, Avatar, useMediaQuery, useTheme } from "@mui/material"
import { styled } from "@mui/system"

const ProfileCover = ({ user }) => {
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("lg"))

  const ProfileCoverContainer = styled(Box)({
    position: "relative",
    width: "100%",
    height: "200px",
    backgroundImage:
      "url(https://t3.ftcdn.net/jpg/06/15/71/06/360_F_615710666_LfNa8IfYtTq95e4tNoTrI2KwgTR1lGiH.jpg)",
    backgroundSize: "cover",
    backgroundPosition: "center",
  })

  const Overlay = styled(Box)({
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: theme.palette.presets.color,
    opacity: 0.5,
  })

  const ProfileDetails = styled(Box)(({ theme, isCentered }) => ({
    position: "absolute",
    bottom: isCentered ? "50%" : "-35px",
    left: isCentered ? "50%" : "20px",
    transform: isCentered ? "translate(-50%, 50%)" : "none",
    display: "flex",
    alignItems: "center",
    color: "white",
  }))

  const StyledAvatar = styled(Avatar)(({ theme, isCentered }) => ({
    width: isCentered ? "80px" : "140px",
    height: isCentered ? "80px" : "140px",
    marginRight: "20px",
    border: "2px solid white",
  }))

  return (
    <ProfileCoverContainer>
      <Overlay />
      <ProfileDetails isCentered={isSmallScreen}>
        <StyledAvatar
          alt={user.name}
          src={user.avatar}
          isCentered={isSmallScreen}
        />
        <Box>
          <Typography
            variant='h6'
            sx={{
              fontWeight: "bold",
              color: "black",
              fontFamily: "Inter, sans-serif",
            }}
          >
            {user.name}
          </Typography>
          <Typography
            variant='body2'
            sx={{
              fontWeight: "400",
              color: "black",
              fontFamily: "Inter, sans-serif",
            }}
          >
            {user.role}
          </Typography>
        </Box>
      </ProfileDetails>
    </ProfileCoverContainer>
  )
}

export default ProfileCover
