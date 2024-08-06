import React, { useState, useEffect } from "react"
import {
  Box,
  Button,
  Stack,
  Typography,
  useTheme,
  IconButton,
  TextField,
  InputAdornment,
} from "@mui/material"
import { TbHourglassEmpty } from "react-icons/tb"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { Facebook, Instagram, LinkedIn, Twitter } from "@mui/icons-material"

const ComingSoon = () => {
  const theme = useTheme()
  const navigate = useNavigate()
  const calculateTimeLeft = () => {
    const difference = +new Date("2024-08-31") - +new Date()
    let timeLeft = {}

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(-difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      }
    }

    return timeLeft
  }

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearTimeout(timer)
  }, [timeLeft])

  return (
    <Box
      sx={{
        minHeight: "92vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.palette.background.box,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box
          sx={{
            display: "flex",
            textAlign: "center",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Box sx={{ mt: 4 }}>
            <motion.div>
              <TbHourglassEmpty size={100} style={{ color: "#5F00D9" }} />
            </motion.div>
          </Box>
          <Stack spacing={0.2} sx={{ mt: 3, mb: 4 }}>
            <Typography
              sx={{
                fontSize: "30px",
                fontWeight: "bold",
                color: theme.palette.text.primary,
                fontFamily: "Inter, sans-serif",
                mb: 3,
              }}
            >
              Coming Soon!
            </Typography>
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: "500",
                fontFamily: "Inter, sans-serif",
                color: theme.palette.text.primary,
              }}
            >
              We are working hard to bring you something amazing! Stay tuned.
            </Typography>
            <Box
              sx={{
                display: "flex",
                gap: 2,
                justifyContent: "center",
                pt: 3,
                flexWrap: "wrap",
              }}
            >
              {Object.keys(timeLeft).map((interval) => (
                <Box
                  key={interval}
                  sx={{
                    backgroundColor: theme.palette.background.paper,
                    borderRadius: "10px",
                    padding: "10px",
                    minWidth: "60px",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "20px",
                      fontWeight: "bold",
                      color: theme.palette.text.primary,
                      fontFamily: "Inter, sans-serif",
                    }}
                  >
                    {timeLeft[interval]}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      color: theme.palette.text.secondary,
                      fontFamily: "Inter, sans-serif",
                    }}
                  >
                    {interval.charAt(0).toUpperCase() + interval.slice(1)}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Stack>

          <TextField
            fullWidth
            placeholder='Enter your email'
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <Button
                    variant='contained'
                    size='large'
                    sx={{
                      backgroundColor: "#5F00D9",
                      borderRadius: "10px",
                      textTransform: "none",
                      color: "white",
                      fontSize: "14px",
                      fontWeight: "500",
                      fontFamily: "Inter, sans-serif",
                    }}
                  >
                    Notify Me
                  </Button>
                </InputAdornment>
              ),
              sx: {
                pr: 0.5,
                fontFamily: "Inter, sans-serif",
                fontSize: "14px",
                fontWeight: "500",
                borderRadius: "10px",
              },
            }}
            sx={{ my: 1 }}
          />
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
          <Button
            variant='contained'
            onClick={() => navigate("/")}
            sx={{
              mt: 3,
              fontSize: "16px",
              fontWeight: "500",
              fontFamily: "Inter, sans-serif",
              textTransform: "none",
              backgroundColor: "#5F00D9",
              color: "white",
              textAlign: "center",
              p: "5px 20px",
            }}
          >
            Go to Home
          </Button>
        </Box>
      </motion.div>
    </Box>
  )
}

export default ComingSoon
