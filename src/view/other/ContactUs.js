import React from "react"
import { Box, Typography, Grid, TextField, Button } from "@mui/material"

import { useForm, Controller } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { useTheme } from "@mui/material/styles"
import { styled } from "@mui/system"
import { motion } from "framer-motion"
import Footer from "../../components/Footer"

const validationSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  subject: yup.string().required("Subject is required"),
  description: yup.string().required("Description is required"),
})

const ContactUs = () => {
  const theme = useTheme()
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  })

  const onSubmit = (data) => {
    console.log(data)
  }

  const StyledTextfield = styled(TextField)({
    borderRadius: "8px",
    backgroundColor: theme.palette.background.box,
    "& .MuiFormLabel-root": {
      fontFamily: "Inter, sans-serif",
      fontSize: "14px",
    },
  })

  return (
    <>
      <Box
        sx={{
          height: { lg: 500, md: 550, sm: 520, xs: 820 },
          overflow: "hidden",
          position: "relative",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundImage:
            "url(/assets/background/overlay_1.svg), url(/assets/about/contactHero.jpg)",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            position: "absolute",
            top: 0,
            width: "100%",
            zIndex: 2,
            color: "white",
            textAlign: "center",
            padding: theme.spacing(4),
            display: "flex",
            flexDirection: "column",
            mt: 12,
          }}
        >
          <Typography
            sx={{
              fontWeight: "700",
              fontSize: "50px",
              fontFamily: "Inter, sans-serif",
              textAlign: "start",
              mt: 12,
              ml: 5,
            }}
          >
            <span style={{ color: "#0ea770" }}>Where</span> <br />
            to find us?
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "start",
              alignItems: "start",
              textAlign: "start",
              gap: "25px",
              flexWrap: "wrap",
              ml: 5,
              mt: 5,
            }}
          >
            <Box sx={{ mb: 2 }}>
              <Typography
                sx={{
                  fontWeight: "600",
                  fontSize: "16px",
                  fontFamily: "Inter, sans-serif",
                  mb: 1,
                }}
              >
                Bali
              </Typography>
              <Typography
                sx={{
                  fontWeight: "500",
                  fontSize: "14px",
                  fontFamily: "Inter, sans-serif",
                  color: theme.palette.text.secondary,
                }}
              >
                508 Bridle Avenue Newnan,<br></br> GA 30263
              </Typography>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography
                sx={{
                  fontWeight: "600",
                  fontSize: "16px",
                  fontFamily: "Inter, sans-serif",
                  mb: 1,
                }}
              >
                London
              </Typography>
              <Typography
                sx={{
                  fontWeight: "500",
                  fontSize: "14px",
                  fontFamily: "Inter, sans-serif",
                  color: theme.palette.text.secondary,
                }}
              >
                508 Bridle Avenue Newnan,<br></br> GA 30263
              </Typography>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography
                sx={{
                  fontWeight: "600",
                  fontSize: "16px",
                  fontFamily: "Inter, sans-serif",
                  mb: 1,
                }}
              >
                Prague
              </Typography>
              <Typography
                sx={{
                  fontWeight: "500",
                  fontSize: "14px",
                  fontFamily: "Inter, sans-serif",
                  color: theme.palette.text.secondary,
                }}
              >
                508 Bridle Avenue Newnan,<br></br> GA 30263
              </Typography>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography
                sx={{
                  fontWeight: "500",
                  fontSize: "16px",
                  fontFamily: "Inter, sans-serif",
                  mb: 1,
                }}
              >
                Moscow
              </Typography>
              <Typography
                sx={{
                  fontWeight: "500",
                  fontSize: "14px",
                  fontFamily: "Inter, sans-serif",
                  color: theme.palette.text.secondary,
                }}
              >
                508 Bridle
              </Typography>
            </Box>
          </Box>
        </motion.div>
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          padding: {
            xs: "20px",
            md: "40px 40px",
            sm: "40px",
            lg: "70px 80px",
          },
          backgroundColor: theme.palette.background.box,
          minHeight: "auto",
        }}
      >
        <Grid container spacing={8} sx={{ p: 3 }}>
          <Grid item xs={12} md={7}>
            <Typography
              sx={{
                fontWeight: "700",
                fontSize: "24px",
                fontFamily: "Inter, sans-serif",
                mb: 2,
              }}
            >
              Feel free to contact us. We'll be glad to hear from you, buddy.
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Controller
                    name='name'
                    control={control}
                    defaultValue=''
                    render={({ field }) => (
                      <StyledTextfield
                        {...field}
                        label='Name'
                        fullWidth
                        variant='outlined'
                        error={!!errors.name}
                        helperText={errors.name ? errors.name.message : ""}
                        InputProps={{
                          style: {
                            fontFamily: "Inter, sans-serif",
                            fontSize: "14px",
                            fontWeight: "500",
                            color: theme.palette.text.primary,
                          },
                        }}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    name='email'
                    control={control}
                    defaultValue=''
                    render={({ field }) => (
                      <StyledTextfield
                        {...field}
                        label='Email'
                        fullWidth
                        variant='outlined'
                        error={!!errors.email}
                        helperText={errors.email ? errors.email.message : ""}
                        InputProps={{
                          style: {
                            fontFamily: "Inter, sans-serif",
                            fontSize: "14px",
                            fontWeight: "500",
                            color: theme.palette.text.primary,
                          },
                        }}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    name='subject'
                    control={control}
                    defaultValue=''
                    render={({ field }) => (
                      <StyledTextfield
                        {...field}
                        label='Subject'
                        fullWidth
                        variant='outlined'
                        error={!!errors.subject}
                        helperText={
                          errors.subject ? errors.subject.message : ""
                        }
                        InputProps={{
                          style: {
                            fontFamily: "Inter, sans-serif",
                            fontSize: "14px",
                            fontWeight: "500",
                            color: theme.palette.text.primary,
                          },
                        }}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    name='description'
                    control={control}
                    defaultValue=''
                    render={({ field }) => (
                      <StyledTextfield
                        {...field}
                        label='Description'
                        multiline
                        rows={4}
                        fullWidth
                        variant='outlined'
                        error={!!errors.description}
                        helperText={
                          errors.description ? errors.description.message : ""
                        }
                        InputProps={{
                          style: {
                            fontFamily: "Inter, sans-serif",
                            fontSize: "14px",
                            fontWeight: "500",
                            color: theme.palette.text.primary,
                          },
                        }}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type='submit'
                    variant='contained'
                    sx={{
                      backgroundColor: "#5F00D9",
                      color: "#ffffff",
                      fontSize: "14px",
                      fontWeight: "500",
                      padding: "10px 20px",
                      borderRadius: "8px",
                      textTransform: "none",
                    }}
                  >
                    Send message
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Grid>
          <Grid item xs={12} md={3}>
            <Box
              sx={{
                display: { lg: "flex", md: "flex", sm: "none", xs: "none" },
                justifyContent: "center",
                alignItems: "center",
                p: 3,
              }}
            >
              <img src='/assets/about/contact.png' />
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Footer />
    </>
  )
}

export default ContactUs
