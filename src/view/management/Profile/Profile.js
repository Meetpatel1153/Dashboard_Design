import React, { useState } from "react"
import {
  Box,
  Typography,
  Breadcrumbs,
  Link,
  Tabs,
  Tab,
  useTheme,
} from "@mui/material"
import { useLocation, Link as RouterLink } from "react-router-dom"
import NavigateNextIcon from "@mui/icons-material/NavigateNext"
import ProfileCover from "../../../sections/profile/ProfileCover"
import { styled } from "@mui/system"
import { user } from "../../../mock/User"
import ProfileHome from "../../../sections/profile/ProfileHome"
import Follower from "../../../sections/profile/Follower"
import Friends from "../../../sections/profile/Friends"
import { CgProfile } from "react-icons/cg"
import { FaRegHeart } from "react-icons/fa"
import { FaUserGroup } from "react-icons/fa6"

const Profile = () => {
  const location = useLocation()
  const pathnames = location.pathname.split("/").filter((x) => x)
  const [tabValue, setTabValue] = useState(0)

  const theme = useTheme()

  const handleChange = (event, newValue) => {
    setTabValue(newValue)
  }

  const ScrollableTabs = styled(Tabs)({
    overflowX: "auto",

    "& .MuiTabs-flexContainer": {
      display: "inline-flex",
    },
  })

  const TabStyle = styled(Tab)({
    textTransform: "none",
    fontSize: "14px",
    fontWeight: "500",
    color: theme.palette.text.primary,
    fontFamily: "Inter, sans-serif",
  })

  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          padding: { xs: "20px", md: "40px 80px", lg: "50px 100px" },
          backgroundColor: theme.palette.background.box,
          minHeight: "92vh",
        }}
      >
        <Typography
          sx={{
            fontWeight: "600",
            fontSize: "30px",
            fontFamily: "Inter, sans-serif",
          }}
        >
          Profile
        </Typography>
        <Breadcrumbs
          aria-label='breadcrumb'
          separator={
            <NavigateNextIcon
              fontSize='small'
              sx={{ color: theme.palette.text.primary }}
            />
          }
          sx={{
            mb: 6,
            fontSize: "14px",
            fontWeight: "400",
            color: "black",
            fontFamily: "Inter, sans-serif",
          }}
        >
          <Link
            underline='hover'
            sx={{ color: theme.palette.text.secondary }}
            component={RouterLink}
            to='/'
          >
            Home
          </Link>
          {pathnames.map((value, index) => {
            const to = `/${pathnames.slice(0, index + 1).join("/")}`
            const isLast = index === pathnames.length - 1
            return isLast ? (
              <Typography
                color='text.primary'
                key={to}
                sx={{
                  fontSize: "14px",
                  fontWeight: "500",
                  color: theme.palette.text.primary,
                  fontFamily: "Inter, sans-serif",
                }}
              >
                {value.charAt(0).toUpperCase() + value.slice(1)}
              </Typography>
            ) : (
              <Link
                underline='hover'
                color='inherit'
                component={RouterLink}
                to={to}
                key={to}
                sx={{
                  fontSize: "14px",
                  fontWeight: "500",
                  color: theme.palette.text.primary,
                  fontFamily: "Inter, sans-serif",
                }}
              >
                {value.charAt(0).toUpperCase() + value.slice(1)}
              </Link>
            )
          })}
        </Breadcrumbs>

        <Box
          sx={{
            borderRadius: "10px",
            overflow: "hidden",
          }}
        >
          <ProfileCover user={user} theme={theme} />

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              backgroundColor: theme.palette.background.paper,
              padding: "0px 10px",
            }}
          >
            <ScrollableTabs
              value={tabValue}
              onChange={handleChange}
              indicatorColor='primary'
              textColor='primary'
              variant='scrollable'
              scrollButtons='auto'
            >
              <TabStyle
                icon={<CgProfile size={20} />}
                iconPosition='start'
                label='Profile'
              />
              <TabStyle
                icon={<FaRegHeart size={20} />}
                iconPosition='start'
                label='Followers'
              />
              <TabStyle
                icon={<FaUserGroup size={20} />}
                iconPosition='start'
                label='Friends'
              />
            </ScrollableTabs>
          </Box>
        </Box>
        <Box sx={{ paddingTop: "20px" }}>
          {tabValue === 0 && (
            <>
              <ProfileHome user={user} theme={theme} />
            </>
          )}
          {tabValue === 1 && (
            <>
              <Follower theme={theme} />
            </>
          )}
          {tabValue === 2 && (
            <>
              <Friends theme={theme} />
            </>
          )}
        </Box>
      </Box>
    </>
  )
}

export default Profile
