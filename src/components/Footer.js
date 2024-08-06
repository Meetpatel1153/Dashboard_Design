import React from "react"
import {
  Box,
  Typography,
  Grid,
  useTheme,
  IconButton,
  Divider,
} from "@mui/material"
import { Facebook, Instagram, LinkedIn, Twitter } from "@mui/icons-material"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"

const Footer = () => {
  const theme = useTheme()
  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.paper,
        p: { xs: 3, md: 6 },
      }}
    >
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography
              sx={{
                fontWeight: "700",
                fontSize: "25px",
                fontFamily: "Inter, sans-serif",
                color: "#0ea770",
              }}
            >
              MEET
            </Typography>
            <Typography
              sx={{
                mt: 2,
                fontWeight: "500",
                fontSize: "14px",
                fontFamily: "Inter, sans-serif",
              }}
            >
              The starting point for your next project with Minimal UI Kit,
              built on the newest version of Material-UI ©, ready to be
              customized to your style.
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "start",
                gap: "12px",
                flexWrap: "wrap",
                mt: 1,
                mb: 1,
              }}
            >
              <IconButton size='small'>
                <Facebook style={{ fontSize: "24px", color: "#3b5998" }} />
              </IconButton>
              <IconButton size='small'>
                <Instagram style={{ fontSize: "24px", color: "#FF0000" }} />
              </IconButton>
              <IconButton size='small'>
                <LinkedIn style={{ fontSize: "24px", color: "#B30086" }} />
              </IconButton>
              <IconButton size='small'>
                <Twitter style={{ fontSize: "24px", color: "#FD8DE1" }} />
              </IconButton>
            </Box>
          </motion.div>
        </Grid>

        <Grid item xs={12} md={2} sm={4}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Typography
              variant='body1'
              sx={{
                fontFamily: "Inter, sans-serif",
                fontWeight: "700",
                fontSize: "14px",
                color: theme.palette.text.primary,
              }}
            >
              MINIMAL
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Typography variant='body2' sx={{ mt: 1 }}>
                <Link
                  to='/about'
                  style={{
                    textDecoration: "none",
                    fontSize: "14px",
                    fontFamily: "Inter, sans-serif",
                    color: theme.palette.text.secondary,
                  }}
                >
                  About us
                </Link>
              </Typography>
              <Typography variant='body2' sx={{ mt: 1 }}>
                <Link
                  to='/contactus'
                  style={{
                    textDecoration: "none",
                    fontSize: "14px",
                    fontFamily: "Inter, sans-serif",
                    color: theme.palette.text.secondary,
                  }}
                >
                  Contact Us
                </Link>
              </Typography>
              <Typography variant='body2' sx={{ mt: 1 }}>
                <Link
                  to='/faq'
                  style={{
                    textDecoration: "none",
                    fontSize: "14px",
                    fontFamily: "Inter, sans-serif",
                    color: theme.palette.text.secondary,
                  }}
                >
                  Faqs
                </Link>
              </Typography>
            </Box>
          </motion.div>
        </Grid>

        <Grid item xs={12} md={2} sm={4}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Typography
              variant='body1'
              sx={{
                fontFamily: "Inter, sans-serif",
                fontWeight: "700",
                fontSize: "14px",
                color: theme.palette.text.primary,
              }}
            >
              LEGAL
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Typography variant='body2'>
                <Link
                  to='#'
                  style={{
                    textDecoration: "none",
                    fontSize: "14px",
                    fontFamily: "Inter, sans-serif",
                    color: theme.palette.text.secondary,
                  }}
                >
                  Terms and Conditions
                </Link>
              </Typography>
              <Typography variant='body2' sx={{ mt: 1 }}>
                <Link
                  to='#'
                  style={{
                    textDecoration: "none",
                    fontSize: "14px",
                    fontFamily: "Inter, sans-serif",
                    color: theme.palette.text.secondary,
                  }}
                >
                  Privacy Policy
                </Link>
              </Typography>
            </Box>
          </motion.div>
        </Grid>

        <Grid item xs={12} md={2} sm={4}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Typography
              variant='body1'
              sx={{
                fontFamily: "Inter, sans-serif",
                fontWeight: "700",
                fontSize: "14px",
                color: theme.palette.text.primary,
              }}
            >
              CONTACT
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Typography
                style={{
                  textDecoration: "none",
                  fontSize: "14px",
                  fontFamily: "Inter, sans-serif",
                  color: theme.palette.text.secondary,
                }}
              >
                john@example.com
              </Typography>
            </Box>
          </motion.div>
        </Grid>
      </Grid>

      <Divider
        orientation='horizontal'
        sx={{
          width: "100%",
          color: "#B2A4A4",
          mt: 3,
        }}
      />

      <Box
        sx={{
          marginTop: "20px",
          textAlign: "center",
        }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <Typography
            sx={{
              textDecoration: "none",
              color: theme.palette.text.primary,
              fontSize: "14px",
              fontFamily: "Inter, sans-serif",
              mt: 2,
            }}
          >
            2024 ©
            <span style={{ color: "#0ea770", fontWeight: "bold" }}>MEET</span>.
            All Rights Reserved.
          </Typography>
          <Typography
            sx={{ fontSize: "12px", fontFamily: "Inter, sans-serif" }}
          >
            Created by Meet.
          </Typography>
        </motion.div>
      </Box>
    </Box>
  )
}

export default Footer
