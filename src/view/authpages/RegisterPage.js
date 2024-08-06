import React from "react"
import {
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material"
import { useTheme } from "@mui/material/styles"
import { Link, useNavigate } from "react-router-dom"
import { Visibility, VisibilityOff } from "@mui/icons-material"
import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

// Validation schema
const schema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
})

const RegisterPage = ({ setToken }) => {
  const navigate = useNavigate()
  const theme = useTheme()
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"))
  const [showPassword, setShowPassword] = React.useState(false)

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const handleRegister = (data) => {
    const fakeToken = "1234567890"
    const expirationTime = new Date().getTime() + 10 * 24 * 60 * 60 * 1000 // 10 days

    const authData = {
      token: fakeToken,
      expiration: expirationTime,
    }

    localStorage.setItem("authData", JSON.stringify(authData))
    setToken(fakeToken)
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
                mb: 5,
              }}
            >
              Hello, Welcome 👋
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
          padding: 4,
          backgroundColor: theme.palette.background.box,
        }}
      >
        <Box sx={{ width: "100%", maxWidth: 400 }}>
          <Typography
            sx={{
              fontFamily: "Inter, sans-serif",
              fontSize: "30px",
              fontWeight: "bold",
              mb: 2,
              color: theme.palette.text.primary,
            }}
          >
            Register
          </Typography>
          <Stack direction='row' spacing={0.5} mb={2}>
            <Typography
              sx={{
                fontFamily: "Inter, sans-serif",
                fontSize: "14px",
                fontWeight: "500",
                color: theme.palette.text.primary,
              }}
            >
              Already have an account?
            </Typography>
            <Link
              to='/login'
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "14px",
                fontWeight: "500",
                textDecoration: "none",
                color: "#0ea770",
              }}
            >
              Sign in
            </Link>
          </Stack>

          <form onSubmit={handleSubmit(handleRegister)}>
            <Stack direction='row' spacing={2}>
              <Controller
                name='firstName'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label='First Name'
                    variant='outlined'
                    margin='normal'
                    fullWidth
                    error={!!errors.firstName}
                    helperText={errors.firstName?.message}
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
              <Controller
                name='lastName'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label='Last Name'
                    variant='outlined'
                    margin='normal'
                    fullWidth
                    error={!!errors.lastName}
                    helperText={errors.lastName?.message}
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
            </Stack>
            <Controller
              name='email'
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label='Email'
                  variant='outlined'
                  margin='normal'
                  fullWidth
                  error={!!errors.email}
                  helperText={errors.email?.message}
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
            <Controller
              name='password'
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label='Password'
                  type={showPassword ? "text" : "password"}
                  variant='outlined'
                  margin='normal'
                  fullWidth
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton
                          onClick={handleClickShowPassword}
                          edge='end'
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
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
              Register
            </Button>
            <Typography
              sx={{
                fontFamily: "Inter, sans-serif",
                fontSize: "12px",
                fontWeight: "400",
                mt: 1.2,
                textAlign: "center",
              }}
            >
              By signing up, I agree to{" "}
              <span
                style={{
                  color: "#0ea770",
                  textDecoration: "underline",
                }}
              >
                Terms of Service
              </span>{" "}
              and{" "}
              <span
                style={{
                  color: "#0ea770",
                  textDecoration: "underline",
                }}
              >
                Privacy Policy
              </span>
              .
            </Typography>
          </form>
        </Box>
      </Grid>
    </Grid>
  )
}

export default RegisterPage
