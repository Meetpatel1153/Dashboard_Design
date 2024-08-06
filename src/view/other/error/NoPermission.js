import React from "react"
import { Box, Button, Stack, Typography, useTheme } from "@mui/material"
import { TbLockOpenOff } from "react-icons/tb"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"

const NoPermission = () => {
  const theme = useTheme()
  const navigate = useNavigate()
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
              <TbLockOpenOff size={100} style={{ color: "#5F00D9" }} />
            </motion.div>
          </Box>
          <Stack spacing={1} sx={{ mt: 3, mb: 4 }}>
            <Typography
              sx={{
                fontSize: "30px",
                fontWeight: "bold",
                color: theme.palette.text.primary,
                fontFamily: "Inter, sans-serif",
              }}
            >
              No permission
            </Typography>

            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: "500",
                fontFamily: "Inter, sans-serif",
                color: theme.palette.text.primary,
              }}
            >
              The page you&apos;re trying access has restricted access.
              <br />
              Please refer to your system administrator
            </Typography>
          </Stack>
          <Button
            variant='contained'
            onClick={() => navigate("/")}
            sx={{
              mt: 2,
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

export default NoPermission
