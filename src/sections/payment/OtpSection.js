import {
  Button,
  CircularProgress,
  TextField,
  Typography,
  useTheme,
} from "@mui/material"
import { Box } from "@mui/system"
import { styled } from "@mui/system"
import React from "react"

const TextFieldStyle = styled(TextField)({
  fontWeight: "500",
  fontFamily: "Inter, sans-serif",
  textTransform: "none",
  width: "100%",
  "& input": {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontFamily: "Inter, sans-serif",
    fontSize: "14px",
  },
  "& label": {
    fontFamily: "Inter, sans-serif",
    fontSize: "14px",
  },
})

const OtpSection = ({
  otp,
  setOTP,
  handleOTPSubmit,
  resendOTP,
  otpResending,
}) => {
  const theme = useTheme()
  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography
          sx={{
            fontFamily: "Inter, sans-serif",
            fontSize: "20px",
            fontWeight: "500",
            color: theme.palette.text.primary,
          }}
          gutterBottom
        >
          Enter OTP to confirm payment
        </Typography>
        <TextFieldStyle
          label='OTP'
          fullWidth
          margin='normal'
          value={otp}
          onChange={(e) => setOTP(e.target.value)}
        />
        <Button
          variant='contained'
          color='primary'
          onClick={handleOTPSubmit}
          sx={{
            mt: 2,
            backgroundColor: "#5F00D9",
            textTransform: "none",
            fontFamily: "Inter, sans-serif",
            fontWeight: "500",
            borderRadius: "10px",
            p: "5px 40px",
            color: "white",
          }}
        >
          Confirm Payment
        </Button>
        {otpResending ? (
          <CircularProgress sx={{ mt: 2 }} />
        ) : (
          <Button
            onClick={resendOTP}
            sx={{
              mt: 2,
              textTransform: "none",
              fontFamily: "Inter, sans-serif",
              color: "#5F00D9",
              fontWeight: "500",
            }}
          >
            Resend OTP
          </Button>
        )}
      </Box>
    </>
  )
}

export default OtpSection
