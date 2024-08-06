import React, { useState } from "react"
import {
  Box,
  Typography,
  Breadcrumbs,
  Link,
  Grid,
  useTheme,
} from "@mui/material"
import { useLocation, Link as RouterLink } from "react-router-dom"
import NavigateNextIcon from "@mui/icons-material/NavigateNext"
import { user } from "../../../mock/User"
import General from "../../../sections/setting/General"
import { Tabs, Tab } from "@mui/material"
import { MdNotifications } from "react-icons/md"
import Notification from "../../../sections/setting/Notification"
import { BiSolidUserPin } from "react-icons/bi"
import SocialLinks from "../../../sections/setting/SocialLinks"
import { IoShareSocial } from "react-icons/io5"
import { IoMdKey } from "react-icons/io"
import SecurityPage from "../../../sections/setting/Security"

const Setting = () => {
  const location = useLocation()
  const pathnames = location.pathname.split("/").filter((x) => x)
  const [isPublic, setIsPublic] = useState(true)
  const [selectedFile, setSelectedFile] = useState(null)
  const [formData, setFormData] = useState(user)
  const [tabIndex, setTabIndex] = useState(0)
  const theme = useTheme()

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue)
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
  }

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(URL.createObjectURL(event.target.files[0]))
    }
  }

  const handleSwitchChange = (event) => {
    setIsPublic(event.target.checked)
  }
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
          Account
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
            mb: 4,
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
        <Grid
          item
          xs={12}
          sx={{ maxWidth: { lg: 700, md: 500, xs: 400, sm: 520 } }}
        >
          <Tabs
            value={tabIndex}
            onChange={handleTabChange}
            indicatorColor='primary'
            textColor='primary'
            aria-label='Settings tabs'
            sx={{ marginBottom: 4, ml: -4 }}
            variant='scrollable'
            scrollButtons
            allowScrollButtonsMobile
          >
            <Tab
              icon={
                <BiSolidUserPin
                  size={20}
                  sx={{ color: theme.palette.text.primary }}
                />
              }
              iconPosition='start'
              label='General'
              sx={{
                textTransform: "none",
                fontSize: "14px",
                fontWeight: "500",
                color: theme.palette.text.primary,
                fontFamily: "Inter, sans-serif",
              }}
            />

            <Tab
              icon={
                <MdNotifications
                  size={20}
                  sx={{ color: theme.palette.text.primary }}
                />
              }
              iconPosition='start'
              label='Notification'
              sx={{
                textTransform: "none",
                fontSize: "14px",
                fontWeight: "500",
                color: theme.palette.text.primary,
                fontFamily: "Inter, sans-serif",
              }}
            />
            <Tab
              icon={
                <IoShareSocial
                  size={20}
                  sx={{ color: theme.palette.text.primary }}
                />
              }
              iconPosition='start'
              label='Social Links'
              sx={{
                textTransform: "none",
                fontSize: "14px",
                fontWeight: "500",
                color: theme.palette.text.primary,
                fontFamily: "Inter, sans-serif",
              }}
            />
            <Tab
              icon={
                <IoMdKey size={20} sx={{ color: theme.palette.text.primary }} />
              }
              iconPosition='start'
              label='Security'
              sx={{
                textTransform: "none",
                fontSize: "14px",
                fontWeight: "500",
                color: theme.palette.text.primary,
                fontFamily: "Inter, sans-serif",
              }}
            />
          </Tabs>
        </Grid>
        {tabIndex === 0 && (
          <General
            handleFileChange={handleFileChange}
            selectedFile={selectedFile}
            isPublic={isPublic}
            handleSwitchChange={handleSwitchChange}
            formData={formData}
            handleInputChange={handleInputChange}
            theme={theme}
          />
        )}

        {tabIndex === 1 && (
          <Box
            sx={{
              p: "30px 30px",
              backgroundColor: theme.palette.background.paper,
              border: "0px solid",
              borderRadius: "12px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Notification theme={theme} />
          </Box>
        )}
        {tabIndex === 2 && (
          <Box
            sx={{
              p: "30px 30px",
              backgroundColor: theme.palette.background.paper,
              border: "0px solid",
              borderRadius: "12px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <SocialLinks theme={theme} />
          </Box>
        )}
        {tabIndex === 3 && (
          <Box
            sx={{
              p: "30px 30px",
              backgroundColor: theme.palette.background.paper,
              border: "0px solid",
              borderRadius: "12px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <SecurityPage theme={theme} />
          </Box>
        )}
      </Box>
    </>
  )
}

export default Setting
