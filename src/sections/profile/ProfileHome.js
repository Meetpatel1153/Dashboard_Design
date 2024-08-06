"use client"

import { useRef } from "react"

import Box from "@mui/material/Box"
import Link from "@mui/material/Link"
import Stack from "@mui/material/Stack"
import Button from "@mui/material/Button"
import Divider from "@mui/material/Divider"
import InputBase from "@mui/material/InputBase"
import Grid from "@mui/material/Unstable_Grid2"
import { Typography } from "@mui/material"
import { IoLocationSharp } from "react-icons/io5"
import { MdEmail } from "react-icons/md"
import { HiMiniBuildingOffice } from "react-icons/hi2"
import PhotoIcon from "@mui/icons-material/Photo"
import { FaVideo } from "react-icons/fa6"
import { toast } from "react-toastify"
import { links } from "../../mock/Link"
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa"
import PostList from "./PostList"

export default function ProfileHome({ user, theme }) {
  const fileInputRef = useRef(null)

  const handleAttachImage = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleAttachVideo = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleFileUpload = (event) => {
    toast.success("file uploaded")
  }

  const handlePost = () => {
    // // Handle post logic (e.g., send post to server)
    // console.log("Post button clicked")
    toast.success("post upload.")
  }

  const renderFollows = (
    <Box
      sx={{
        py: 3,
        textAlign: "center",
        typography: "h4",
        backgroundColor: theme.palette.background.paper,
        borderRadius: "10px",
      }}
    >
      <Stack
        direction='row'
        divider={
          <Divider
            orientation='vertical'
            flexItem
            sx={{ borderStyle: "dashed" }}
          />
        }
      >
        <Stack width={1}>
          <Typography
            sx={{
              fontSize: "22px",
              fontWeight: "500",
              color: theme.palette.text.primary,
              fontFamily: "Inter, sans-serif",
            }}
          >
            {user.follower}
          </Typography>
          <Box
            component='span'
            sx={{
              fontSize: "14px",
              fontWeight: "400",
              color: theme.palette.text.secondary,
              fontFamily: "Inter, sans-serif",
            }}
          >
            Follower
          </Box>
        </Stack>

        <Stack width={1}>
          <Typography
            sx={{
              fontSize: "22px",
              fontWeight: "500",
              color: theme.palette.text.primary,
              fontFamily: "Inter, sans-serif",
            }}
          >
            {user.following}
          </Typography>
          <Box
            component='span'
            sx={{
              fontSize: "14px",
              fontWeight: "400",
              color: theme.palette.text.secondary,
              fontFamily: "Inter, sans-serif",
            }}
          >
            Following
          </Box>
        </Stack>
      </Stack>
    </Box>
  )

  const renderAbout = (
    <Box
      sx={{
        typography: "h4",
        backgroundColor: theme.palette.background.paper,
        borderRadius: "10px",
        p: 2,
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
          mb: 2,
        }}
      >
        About
      </Typography>

      <Stack spacing={2}>
        <Typography
          variant='body1'
          sx={{
            fontSize: "14px",
            fontWeight: "500",
            fontFamily: "Inter, sans-serif",
          }}
        >
          {user.about}
        </Typography>

        <Stack direction='row' alignItems='center' spacing={1}>
          <IoLocationSharp size={20} />
          <Typography
            variant='body2'
            sx={{
              fontSize: "14px",
              fontWeight: "500",
              fontFamily: "Inter, sans-serif",
            }}
          >
            Live at{" "}
            <Link
              variant='subtitle2'
              color='inherit'
              sx={{ textDecoration: "none", fontWeight: "700" }}
            >
              {user.city}
            </Link>
          </Typography>
        </Stack>

        <Stack direction='row' alignItems='center' spacing={1}>
          <MdEmail size={20} />
          <Typography
            variant='body2'
            sx={{
              fontSize: "14px",
              fontWeight: "500",
              fontFamily: "Inter, sans-serif",
            }}
          >
            {user.email}
          </Typography>
        </Stack>

        <Stack direction='row' alignItems='center' spacing={1}>
          <HiMiniBuildingOffice size={20} />
          <Typography
            variant='body2'
            sx={{
              fontSize: "14px",
              fontWeight: "500",
              fontFamily: "Inter, sans-serif",
            }}
          >
            {user.role} at{" "}
            <Link
              variant='subtitle2'
              color='inherit'
              sx={{ textDecoration: "none", fontWeight: "700" }}
            >
              {user.company}
            </Link>
          </Typography>
        </Stack>

        <Stack direction='row' alignItems='center' spacing={1}>
          <HiMiniBuildingOffice size={20} />
          <Typography
            variant='body2'
            sx={{
              fontSize: "14px",
              fontWeight: "500",
              fontFamily: "Inter, sans-serif",
            }}
          >
            Studied at{" "}
            <Link
              variant='subtitle2'
              color='inherit'
              sx={{ textDecoration: "none", fontWeight: "700" }}
            >
              {user.country}
            </Link>
          </Typography>
        </Stack>
      </Stack>
    </Box>
  )

  const renderSocial = (
    <>
      <Box
        sx={{
          typography: "h4",
          backgroundColor: theme.palette.background.paper,
          borderRadius: "10px",
          p: 2,
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
            mb: 2,
          }}
        >
          Social
        </Typography>

        <Stack direction='row' spacing={2} alignItems='center'>
          <Link href={links.facebook} color='inherit' underline='none'>
            <FaFacebook style={{ fontSize: "24px", color: "#3b5998" }} />
          </Link>
          <Link href={links.instagram} color='inherit' underline='none'>
            <FaInstagram style={{ fontSize: "24px", color: "#FF0000" }} />
          </Link>
          <Link href={links.linkedin} color='inherit' underline='none'>
            <FaLinkedin style={{ fontSize: "24px", color: "#B30086" }} />
          </Link>
          <Link href={links.twitter} color='inherit' underline='none'>
            <FaTwitter style={{ fontSize: "24px", color: "#FD8DE1" }} />
          </Link>
        </Stack>
      </Box>
    </>
  )
  const renderPostInput = (
    <Box
      sx={{
        typography: "h4",
        backgroundColor: theme.palette.background.paper,
        borderRadius: "10px",
      }}
    >
      <Box sx={{ m: "10px 10px 5px 10px" }}>
        <InputBase
          rows={3}
          fullWidth
          multiline
          placeholder='Share your thoughts...'
          style={{
            padding: "10px",
            border: "1px solid #38424d",
            borderRadius: "10px",
            fontSize: "15px",
            fontFamily: "Inter, sans-serif",
          }}
        />
      </Box>
      <Box sx={{ m: "10px", display: "flex", justifyContent: "space-between" }}>
        <Box>
          <input
            type='file'
            accept='image/*, video/*'
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileUpload}
          />
          <Button
            variant='contained'
            onClick={handleAttachImage}
            sx={{
              backgroundColor: "#5F00D9",
              textTransform: "none",
              fontSize: "14px",
              fontWeight: "500",
              color: "white",
              fontFamily: "Inter, sans-serif",
              borderRadius: "5px",
              padding: "5px 10px",
            }}
          >
            <PhotoIcon />
            &nbsp; Image/Video
          </Button>
          <Button
            variant='contained'
            onClick={handleAttachVideo}
            sx={{
              ml: 1,
              backgroundColor: "#5F00D9",
              textTransform: "none",
              fontSize: "14px",
              fontWeight: "500",
              color: "white",
              fontFamily: "Inter, sans-serif",
              borderRadius: "5px",
              padding: "5px 10px",
            }}
          >
            <FaVideo />
            &nbsp; Streaming
          </Button>
        </Box>
        <Box>
          {" "}
          <Button
            variant='contained'
            sx={{
              ml: 1,
              backgroundColor: "#5F00D9",
              textTransform: "none",
              fontSize: "14px",
              fontWeight: "500",
              color: "white",
              fontFamily: "Inter, sans-serif",
              borderRadius: "5px",
              padding: "5px 10px",
            }}
            onClick={handlePost}
          >
            Post
          </Button>
        </Box>
      </Box>
    </Box>
  )

  const renderPost = <PostList theme={theme} />

  return (
    <Grid container spacing={2}>
      <Grid xs={12} md={4}>
        <Stack spacing={2}>
          {renderFollows}
          {renderAbout}
          {renderSocial}
        </Stack>
      </Grid>

      <Grid xs={12} md={8}>
        <Stack>
          {renderPostInput}
          {renderPost}
        </Stack>
      </Grid>
    </Grid>
  )
}
