import React, { useState, useEffect } from "react"
import {
  Alert,
  Box,
  Button,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material"

import { Link, useNavigate } from "react-router-dom"
import { Visibility, VisibilityOff } from "@mui/icons-material"
import { useForm, Controller } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { toast } from "react-toastify"

const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
})

const generateRandomToken = () => {
  return Math.random().toString(36).substr(2)
}

const LoginPage = ({ setToken }) => {
  const theme = useTheme()
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"))

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  })

  useEffect(() => {
    const authData = JSON.parse(localStorage.getItem("authData"))
    if (authData) {
      const { token, expiration } = authData
      const currentTime = new Date().getTime()
      if (currentTime < expiration) {
        setToken(token)
        navigate("/")
      } else {
        toast.error("token expired")
        localStorage.removeItem("authData")
      }
    }
  }, [navigate, setToken])

  const handleLogin = (data) => {
    const fakeToken = generateRandomToken()
    const expirationTime = new Date().getTime() + 10 * 24 * 60 * 60 * 1000 // 10 days

    const authData = {
      token: fakeToken,
      expiration: expirationTime,
    }

    localStorage.setItem("authData", JSON.stringify(authData))
    setToken(fakeToken)
    toast.success("login successfull.")
    navigate("/")
  }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  return (
    <Grid container sx={{ height: "100vh" }}>
      {!isMediumScreen && (
        <Grid
          item
          xs={12}
          md={8}
          sx={{
            backgroundColor: theme.palette.background.paper,
            padding: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                fontFamily: "Inter, sans-serif",
                fontSize: "30px",
                fontWeight: "bold",
                color: theme.palette.text.primary,
                mb: 5,
              }}
            >
              Hi, Welcome back
            </Typography>
            <Box
              component='img'
              src='https://boilerplate-ui-reactjs.vercel.app/assets/illustrations/illustration_dashboard.png'
              alt='login'
              sx={{ width: "100%", maxWidth: 700 }}
            />
          </Box>
        </Grid>
      )}
      <Grid
        item
        xs={12}
        md={4}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 2,
          backgroundColor: theme.palette.background.box,
        }}
      >
        <Box sx={{ width: "100%", maxWidth: 400 }}>
          <Typography
            sx={{
              fontFamily: "Inter, sans-serif",
              fontSize: "30px",
              fontWeight: "bold",
              mb: 4,
              color: theme.palette.text.primary,
            }}
          >
            Login
          </Typography>
          <Stack direction='row' spacing={0.5}>
            <Typography
              sx={{
                fontFamily: "Inter, sans-serif",
                fontSize: "14px",
                fontWeight: "500",
                color: theme.palette.text.primary,
              }}
            >
              New user?
            </Typography>
            <Link
              to='/register'
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "14px",
                fontWeight: "500",
                textDecoration: "none",
                color: "#0ea770",
              }}
            >
              Create an account
            </Link>
          </Stack>
          <Alert
            severity='info'
            sx={{
              mb: 2,
              mt: 2,
              fontFamily: "Inter, sans-serif",
              fontSize: "14px",
              fontWeight: "500",
            }}
          >
            Use email : <strong>test@example.com</strong> / password :
            <strong> password</strong>
          </Alert>
          <form onSubmit={handleSubmit(handleLogin)}>
            <Controller
              name='email'
              control={control}
              defaultValue='test@example.com'
              render={({ field }) => (
                <TextField
                  {...field}
                  label='Email'
                  variant='outlined'
                  margin='normal'
                  fullWidth
                  error={!!errors.email}
                  helperText={errors.email ? errors.email.message : ""}
                  sx={{
                    fontWeight: "500",
                    fontFamily: "Inter, sans-serif",
                    textTransform: "none",
                    width: "100%",
                    color: theme.palette.text.primary,
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    "& input": {
                      padding: "15px 10px",

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
            <Controller
              name='password'
              control={control}
              defaultValue='password'
              render={({ field }) => (
                <TextField
                  {...field}
                  label='Password'
                  type={showPassword ? "text" : "password"}
                  variant='outlined'
                  margin='normal'
                  fullWidth
                  error={!!errors.password}
                  helperText={errors.password ? errors.password.message : ""}
                  InputProps={{
                    endAdornment: (
                      <>
                        <IconButton
                          onClick={handleClickShowPassword}
                          edge='end'
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </>
                    ),
                  }}
                  sx={{
                    fontWeight: "500",
                    fontFamily: "Inter, sans-serif",
                    textTransform: "none",
                    width: "100%",
                    color: theme.palette.text.primary,
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    "& input": {
                      padding: "15px 10px",
                      borderRadius: "5px",
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
            <Typography
              sx={{
                textAlign: "end",
                fontFamily: "Inter, sans-serif",
                fontSize: "14px",
              }}
            >
              <Link
                to='/fpassword'
                style={{
                  color: "#0ea770",
                  textDecoration: "none",
                }}
              >
                Forget Password?
              </Link>
            </Typography>
            <Button
              type='submit'
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
                p: "10px 15px",
              }}
            >
              Login
            </Button>
          </form>
        </Box>
      </Grid>
    </Grid>
  )
}

export default LoginPage
