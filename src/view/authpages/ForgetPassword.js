import React, { useState } from "react"
import {
  Box,
  Stack,
  Typography,
  TextField,
  Button,
  Alert,
  useTheme,
} from "@mui/material"
import { FaLock } from "react-icons/fa"
import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { Link } from "react-router-dom"
import { IoChevronBack } from "react-icons/io5"

const emailSchema = yup
  .object({
    email: yup.string().email("Invalid email").required("Email is required"),
  })
  .required()

// Validation schema for password change
const passwordSchema = yup
  .object({
    oldPassword: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Old password is required"),
    newPassword: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("New password is required"),
  })
  .required()

const ForgetPassword = () => {
  const [showResetFields, setShowResetFields] = useState(false)
  const [emailSent, setEmailSent] = useState(false)
  const [resettingPassword, setResettingPassword] = useState(false)

  const theme = useTheme()

  const {
    control: emailControl,
    handleSubmit: handleEmailSubmit,
    formState: { errors: emailErrors },
  } = useForm({
    resolver: yupResolver(emailSchema),
  })

  const {
    control: passwordControl,
    handleSubmit: handlePasswordSubmit,
    formState: { errors: passwordErrors },
  } = useForm({
    resolver: yupResolver(passwordSchema),
  })

  const handleEmailSend = async (data) => {
    setEmailSent(true)
    setShowResetFields(true)

    const userConfirmed = window.confirm(
      "We have sent a link to reset your password. Allow to proceed with resetting the password?"
    )
    if (userConfirmed) {
      setResettingPassword(true)
    } else {
      setShowResetFields(false)
    }
  }

  const handlePasswordChange = (data) => {
    alert("Password has been reset")
  }

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.box,
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
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
          <FaLock size={100} style={{ color: "#5F00D9" }} />
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
            Forgot your password?
          </Typography>

          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: "500",
              fontFamily: "Inter, sans-serif",
              color: theme.palette.text.primary,
            }}
          >
            Please enter the email address associated with your account and we
            <br />
            will email you a link to reset your password.
          </Typography>
        </Stack>

        {!emailSent ? (
          <form onSubmit={handleEmailSubmit(handleEmailSend)}>
            <Box>
              <Controller
                name='email'
                control={emailControl}
                defaultValue=''
                render={({ field }) => (
                  <TextField
                    {...field}
                    label='Email'
                    variant='outlined'
                    error={!!emailErrors.email}
                    helperText={emailErrors.email?.message}
                    fullWidth
                    sx={{
                      fontWeight: "500",
                      fontFamily: "Inter, sans-serif",
                      textTransform: "none",
                      width: "100%",
                      color: theme.palette.text.primary,
                      "& input": {
                        padding: "15px 10px",
                        borderRadius: "5px",
                        border: "1px solid #ccc",
                        fontFamily: "Inter, sans-serif",
                        fontSize: "14px",
                        color: theme.palette.text.primary,
                      },
                      "& label": {
                        fontFamily: "Inter, sans-serif",
                        fontSize: "14px",
                      },
                    }}
                  />
                )}
              />
              <Button
                variant='contained'
                fullWidth
                sx={{
                  mt: 2,
                  fontSize: "16px",
                  fontWeight: "500",
                  color: "white",
                  fontFamily: "Inter, sans-serif",
                  textTransform: "none",
                  backgroundColor: "#5F00D9",
                  textAlign: "center",
                  p: "10px 30px",
                }}
                type='submit'
              >
                Send Request
              </Button>
              <Typography
                sx={{
                  textAlign: "center",
                  fontFamily: "Inter, sans-serif",
                  fontSize: "14px",
                  mt: 1,
                }}
              >
                <Link
                  to='/login'
                  style={{
                    textDecoration: "none",
                    color: "#0ea770",
                  }}
                >
                  <IoChevronBack /> Return to login
                </Link>
              </Typography>
            </Box>
          </form>
        ) : (
          <>
            {showResetFields && resettingPassword && (
              <form onSubmit={handlePasswordSubmit(handlePasswordChange)}>
                <Box>
                  <Controller
                    name='oldPassword'
                    control={passwordControl}
                    defaultValue=''
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label='Old Password'
                        variant='outlined'
                        type='password'
                        error={!!passwordErrors.oldPassword}
                        helperText={passwordErrors.oldPassword?.message}
                        sx={{
                          fontWeight: "500",
                          fontFamily: "Inter, sans-serif",
                          textTransform: "none",
                          width: "100%",
                          color: "#0ea770",
                          "& input": {
                            padding: "15px 10px",
                            borderRadius: "5px",
                            border: "1px solid #ccc",
                            fontFamily: "Inter, sans-serif",
                            fontSize: "14px",
                            color: "#0ea770",
                          },
                          "& label": {
                            fontFamily: "Inter, sans-serif",
                            fontSize: "14px",
                          },
                          mb: 1.5,
                        }}
                      />
                    )}
                  />
                  <Controller
                    name='newPassword'
                    control={passwordControl}
                    defaultValue=''
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label='New Password'
                        variant='outlined'
                        type='password'
                        error={!!passwordErrors.newPassword}
                        helperText={passwordErrors.newPassword?.message}
                        sx={{
                          fontWeight: "500",
                          fontFamily: "Inter, sans-serif",
                          textTransform: "none",
                          width: "100%",
                          color: "#0ea770",
                          "& input": {
                            padding: "15px 10px",
                            borderRadius: "5px",
                            border: "1px solid #ccc",
                            fontFamily: "Inter, sans-serif",
                            fontSize: "14px",
                            color: "#0ea770",
                          },
                          "& label": {
                            fontFamily: "Inter, sans-serif",
                            fontSize: "14px",
                          },
                        }}
                      />
                    )}
                  />
                  <Button
                    variant='contained'
                    fullWidth
                    sx={{
                      mt: 2,
                      fontSize: "16px",
                      fontWeight: "500",
                      color: "white",
                      fontFamily: "Inter, sans-serif",
                      textTransform: "none",
                      backgroundColor: "#5F00D9",
                      textAlign: "center",
                      p: "10px 30px",
                    }}
                    type='submit'
                  >
                    Reset Password
                  </Button>
                  <Typography
                    sx={{
                      textAlign: "center",
                      fontFamily: "Inter, sans-serif",
                      fontSize: "14px",
                      mt: 1,
                    }}
                  >
                    <Link
                      to='/login'
                      style={{
                        textDecoration: "none",
                        color: "#0ea770",
                      }}
                    >
                      <IoChevronBack /> Return to login
                    </Link>
                  </Typography>
                </Box>
              </form>
            )}
          </>
        )}

        {emailSent && !resettingPassword && (
          <>
            <Alert severity='info' sx={{ m: 2 }}>
              A link has been sent to your email. Please check your inbox and
              follow the instructions to reset your password.
            </Alert>
            <Typography
              sx={{
                textAlign: "center",
                fontFamily: "Inter, sans-serif",
                fontSize: "14px",
                mt: 1,
              }}
            >
              <Link
                to='/login'
                style={{
                  textDecoration: "none",
                  color: "#0ea770",
                }}
              >
                <IoChevronBack /> Return to login
              </Link>
            </Typography>
          </>
        )}
      </Box>
    </Box>
  )
}

export default ForgetPassword
