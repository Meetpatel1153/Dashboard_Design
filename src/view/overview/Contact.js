import React from "react"
import {
  Box,
  Grid,
  Typography,
  Button,
  Checkbox,
  FormControlLabel,
  useTheme,
} from "@mui/material"
import { MdEmail } from "react-icons/md"
import { BsChatFill } from "react-icons/bs"
import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  surname: yup.string().required("Surname is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  message: yup.string().required("Message is required"),
  terms: yup
    .boolean()
    .oneOf([true], "You must accept the terms and conditions"),
})

const Contact = () => {
  const theme = useTheme()
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = (data) => {
    console.log(data)
    reset()
  }

  return (
    <Box
      sx={{
        flexGrow: 1,
        padding: { xs: "20px", md: "40px 80px", lg: "70px 70px" },
        backgroundColor: theme.palette.background.box,
        minHeight: "92vh",
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Box sx={{ p: 2 }}>
            <Typography variant='h4'>
              <MdEmail color='#5F00D9' />
            </Typography>
            <Typography
              sx={{
                fontSize: "32px",
                fontWeight: "500",
                color: theme.palette.text.primary,
                fontFamily: "Inter, sans-serif",
              }}
            >
              Contact Us
            </Typography>
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: "400",
                color: theme.palette.text.secondary,
                fontFamily: "Inter, sans-serif",
              }}
            >
              Have a question or just want to know more? Feel free to reach out
              to us.
            </Typography>
          </Box>
        </Grid>
        {/* Right Grid */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              p: 2,
              backgroundColor: theme.palette.background.paper,
              border: "0px solid",
              borderRadius: "12px",
            }}
          >
            <Typography
              sx={{
                fontSize: "12px",
                fontWeight: "500",
                color: theme.palette.text.primary,
                fontFamily: "Inter, sans-serif",
              }}
            >
              You will receive response within 24 hours of time of submit.
            </Typography>
            <form
              style={{ paddingTop: "20px" }}
              onSubmit={handleSubmit(onSubmit)}
            >
              <Grid container spacing={2}>
                {/* Name Field */}
                <Grid item xs={12} md={12} lg={6}>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: "500",
                      color: theme.palette.text.primary,
                      fontFamily: "Inter, sans-serif",
                      marginBottom: 1,
                    }}
                  >
                    Name
                  </Typography>
                  <Controller
                    name='name'
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        placeholder='John'
                        fullWidth
                        size='lg'
                        style={{
                          padding: "10px",
                          border: "1px solid #38424d",
                          borderRadius: "10px",
                          fontSize: "14px",
                          width: "100%",
                          fontFamily: "Inter, sans-serif",
                          backgroundColor: theme.palette.background.paper,
                          color: theme.palette.text.primary,
                        }}
                      />
                    )}
                  />
                  {errors.name && (
                    <Typography
                      color='error'
                      variant='caption'
                      sx={{
                        fontSize: "12px",
                        fontFamily: "Inter, sans-serif",
                        fontWeight: "400",
                      }}
                    >
                      {errors.name.message}
                    </Typography>
                  )}
                </Grid>

                {/* Surname Field */}
                <Grid item xs={12} md={12} lg={6}>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: "500",
                      color: theme.palette.text.primary,
                      fontFamily: "Inter, sans-serif",
                      marginBottom: 1,
                    }}
                  >
                    Surname
                  </Typography>
                  <Controller
                    name='surname'
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        placeholder='Arthur'
                        fullWidth
                        size='lg'
                        style={{
                          padding: "10px",
                          border: "1px solid #38424d",
                          borderRadius: "10px",
                          fontSize: "14px",
                          width: "100%",
                          fontFamily: "Inter, sans-serif",
                          backgroundColor: theme.palette.background.paper,
                          color: theme.palette.text.primary,
                        }}
                      />
                    )}
                  />
                  {errors.surname && (
                    <Typography
                      color='error'
                      variant='caption'
                      sx={{
                        fontSize: "12px",
                        fontFamily: "Inter, sans-serif",
                        fontWeight: "400",
                      }}
                    >
                      {errors.surname.message}
                    </Typography>
                  )}
                </Grid>

                {/* Email Field */}
                <Grid item xs={12} md={12} lg={12} xl={12}>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: "500",
                      color: theme.palette.text.primary,
                      fontFamily: "Inter, sans-serif",
                      marginBottom: 1,
                    }}
                  >
                    Email
                  </Typography>
                  <Controller
                    name='email'
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        placeholder='name@gmail.com'
                        style={{
                          padding: "10px",
                          border: "1px solid #38424d",
                          borderRadius: "10px",
                          fontSize: "14px",
                          width: "100%",
                          fontFamily: "Inter, sans-serif",
                          backgroundColor: theme.palette.background.paper,
                          color: theme.palette.text.primary,
                        }}
                      />
                    )}
                  />
                  {errors.email && (
                    <Typography
                      color='error'
                      variant='caption'
                      sx={{
                        fontSize: "12px",
                        fontFamily: "Inter, sans-serif",
                        fontWeight: "400",
                      }}
                    >
                      {errors.email.message}
                    </Typography>
                  )}
                </Grid>

                {/* Message Field */}
                <Grid item xs={12}>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: "500",
                      color: theme.palette.text.primary,
                      fontFamily: "Inter, sans-serif",
                      marginBottom: 1,
                    }}
                  >
                    Message
                  </Typography>
                  <Controller
                    name='message'
                    control={control}
                    render={({ field }) => (
                      <textarea
                        {...field}
                        placeholder='Your message'
                        rows={4}
                        style={{
                          padding: "10px",
                          border: "1px solid #38424d",
                          borderRadius: "10px",
                          fontSize: "14px",
                          width: "100%",
                          fontFamily: "Inter, sans-serif",
                          backgroundColor: theme.palette.background.paper,
                          color: theme.palette.text.primary,
                        }}
                      />
                    )}
                  />
                  {errors.message && (
                    <Typography
                      color='error'
                      variant='caption'
                      sx={{
                        fontSize: "12px",
                        fontFamily: "Inter, sans-serif",
                        fontWeight: "400",
                      }}
                    >
                      {errors.message.message}
                    </Typography>
                  )}
                </Grid>

                {/* Terms and Conditions Checkbox */}
                <Grid item xs={12}>
                  <Controller
                    name='terms'
                    control={control}
                    render={({ field }) => (
                      <FormControlLabel
                        control={<Checkbox {...field} required />}
                        label={
                          <span
                            style={{
                              fontSize: "12px",
                              fontWeight: "400",
                              color: theme.palette.text.primary,
                              fontFamily: "Inter, sans-serif",
                            }}
                          >
                            I agree with{" "}
                            <span style={{ color: "#0ea770" }}>
                              Terms & Conditions.
                            </span>
                          </span>
                        }
                      />
                    )}
                  />
                  {errors.terms && (
                    <Typography color='error' variant='caption'>
                      {errors.terms.message}
                    </Typography>
                  )}
                </Grid>

                {/* Submit Button */}
                <Grid item xs={12}>
                  <Button
                    variant='contained'
                    sx={{
                      textTransform: "none",
                      backgroundColor: "#D8DDE2",
                      fontSize: "14px",
                      fontWeight: "500",
                      color: "#797E82",
                      fontFamily: "Inter, sans-serif",
                      borderRadius: "5px",
                    }}
                    fullWidth
                    type='submit'
                  >
                    Send a Message
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant='contained'
                    sx={{
                      textTransform: "none",
                      backgroundColor: "#5F00D9",
                      fontSize: "14px",
                      fontWeight: "500",
                      color: "white",
                      fontFamily: "Inter, sans-serif",
                      borderRadius: "5px",
                    }}
                    fullWidth
                  >
                    Book a Meeting
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Grid>
      </Grid>

      {/* Below Grid */}
      <Grid container spacing={2} alignItems='center' mt={4}>
        {/* Left Grid */}
        <Grid item xs={12} md={6}>
          <Box sx={{ p: 2 }}>
            <Typography variant='h4'>
              <BsChatFill color='#5F00D9' />
            </Typography>
            <Typography
              sx={{
                fontSize: "32px",
                fontWeight: "500",
                color: theme.palette.text.primary,
                fontFamily: "Inter, sans-serif",
              }}
            >
              Live Chat
            </Typography>
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: "400",
                color: theme.palette.text.secondary,
                fontFamily: "Inter, sans-serif",
              }}
            >
              Don’t have time to wait for the answer? Chat with us now.
            </Typography>
          </Box>
        </Grid>
        {/* Right Grid */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              p: 3,
              border: "0px solid",
              backgroundColor: theme.palette.presets.color,
              borderRadius: "12px",
            }}
          >
            <Button
              variant='contained'
              sx={{
                m: 1,

                textTransform: "none",
                fontFamily: "Inter, sans-serif",
                fontWeight: "500",
                borderRadius: "10px",
                padding: "0px",
                fontSize: "12px",
                color: "white",
                backgroundColor: "#5F00D9",
              }}
            >
              Chatbot
            </Button>

            <Typography
              sx={{
                m: 0.3,
                fontSize: "18px",
                fontWeight: "500",
                color: "black",
                fontFamily: "Inter, sans-serif",
              }}
            >
              Chat with us now
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Contact
