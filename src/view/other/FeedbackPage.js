import React, { useState } from "react"
import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  Rating,
  Snackbar,
  Alert,
  useTheme,
} from "@mui/material"

const FeedbackPage = () => {
  const theme = useTheme()
  const [feedback, setFeedback] = useState("")
  const [rating, setRating] = useState(0)
  const [openSnackbar, setOpenSnackbar] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    setFeedback("")
    setRating(0)
    setOpenSnackbar(true)
  }

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return
    }
    setOpenSnackbar(false)
  }

  return (
    <Box
      sx={{
        flexGrow: 1,
        padding: { xs: "20px", md: "40px 80px", lg: "70px 70px" },
        backgroundColor: theme.palette.background.box,
        minHeight: { lg: "93vh", md: "93vh", sm: "100vh", xs: "105vh" },
      }}
    >
      <Box
        sx={{
          backgroundColor: theme.palette.background.box,
          borderRadius: "10px",
          padding: "40px",
          marginTop: "40px",
        }}
      >
        <Typography
          sx={{
            fontFamily: "Inter, sans-serif",
            fontSize: "30px",
            fontWeight: "600",
          }}
        >
          We Value Your Feedback
        </Typography>
        <Typography
          variant='body1'
          sx={{
            fontFamily: "Inter, sans-serif",
            fontSize: "16px",
            fontWeight: "500",
            color: theme.palette.text.secondary,
            mb: 2,
          }}
        >
          Please let us know your thoughts about our application.
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label='Your Feedback'
                multiline
                rows={4}
                variant='outlined'
                fullWidth
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                InputProps={{
                  sx: {
                    fontSize: "14px",
                    fontWeight: "500",
                    color: theme.palette.text.primary,
                    fontFamily: "Inter, sans-serif",
                  },
                }}
                sx={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "14px",
                  fontWeight: "500",
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant='body1'
                sx={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "16px",
                  fontWeight: "500",
                  mb: 2,
                }}
              >
                Rate Your Experience
              </Typography>
              <Rating
                name='user-rating'
                value={rating}
                onChange={(e, newValue) => setRating(newValue)}
                sx={{
                  fontSize: "2rem",
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type='submit'
                variant='contained'
                color='primary'
                sx={{
                  backgroundColor: "#5F00D9",
                  textTransform: "none",
                  fontFamily: "Inter, sans-serif",
                  fontWeight: "500",
                  borderRadius: "10px",
                  color: "white",
                  fontSize: "14px",
                }}
              >
                Submit Feedback
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={4500}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity='success'
          sx={{
            width: "100%",
            fontFamily: "Inter, sans-serif",
          }}
        >
          Thank you for your feedback!
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default FeedbackPage
