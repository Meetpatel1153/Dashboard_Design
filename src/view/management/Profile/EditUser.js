import React, { useState } from "react"
import {
  useTheme,
  Link,
  Breadcrumbs,
  Box,
  Typography,
  Grid,
  Avatar,
  Switch,
  Button,
} from "@mui/material"
import {
  useLocation,
  Link as RouterLink,
  useNavigate,
  useParams,
} from "react-router-dom"
import NavigateNextIcon from "@mui/icons-material/NavigateNext"
import { toast } from "react-toastify"
import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from "yup"
import { users as mockUsers } from "../../../mock/User"

const EditUser = () => {
  const theme = useTheme()
  const location = useLocation()
  const pathnames = location.pathname.split("/").filter((x) => x)
  const [isPublic, setIsPublic] = useState(true)
  const [isEmail, setIsEmail] = useState(true)
  const [selectedFile, setSelectedFile] = useState(null)
  const { id } = useParams()
  const userId = Number(id)

  const navigate = useNavigate()

  const users = mockUsers.find((user) => user.id === userId)

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Email is invalid").required("Email is required"),
    phone: Yup.string().required("Phone number is required"),
    address: Yup.string().required("Address is required"),
    country: Yup.string().required("Country is required"),
    city: Yup.string().required("City is required"),
    pinCode: Yup.string().required("Pin code is required"),
    role: Yup.string().required("Role is required"),
    about: Yup.string().required("About is required"),
  })

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      avatar: users?.avatar,
      name: users?.name,
      email: users?.email,
      phone: users?.phone,
      address: "123 Main St",
      country: "USA",
      city: "New York",
      pinCode: "10001",
      role: users?.role,
      about: `I am ${users?.role}.`,
    },
    resolver: yupResolver(validationSchema),
  })

  const onSubmit = (data) => {
    navigate("/profile")
    toast.success("User updated.")
  }

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(URL.createObjectURL(event.target.files[0]))
    }
  }

  const handleSwitchChange1 = (event) => {
    setIsPublic(event.target.checked)
  }
  const handleSwitchChange2 = (event) => {
    setIsEmail(event.target.checked)
  }

  return (
    <Box
      sx={{
        flexGrow: 1,
        padding: { xs: "20px", md: "40px 80px", lg: "70px 70px" },
        backgroundColor: theme.palette.background.box,
        minHeight: { lg: "92vh", md: "94vh", sm: "110vh", xs: "140vh" },
      }}
    >
      <Typography
        sx={{
          fontWeight: "600",
          fontSize: "30px",
          fontFamily: "Inter, sans-serif",
        }}
      >
        Edit
      </Typography>
      <Breadcrumbs
        aria-label='breadcrumb'
        separator={
          <NavigateNextIcon
            fontSize='small'
            sx={{ color: theme.palette.text.primary }}
          />
        }
        sx={{
          mb: 4,
          fontSize: "14px",
          fontWeight: "400",
          color: "black",
          fontFamily: "Inter, sans-serif",
        }}
      >
        <Link
          underline='hover'
          sx={{ color: theme.palette.text.secondary }}
          component={RouterLink}
          to='/'
        >
          Home
        </Link>
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join("/")}`
          const isLast = index === pathnames.length - 1
          return isLast ? (
            <Typography
              color='text.primary'
              key={to}
              sx={{
                fontSize: "14px",
                fontWeight: "500",
                color: theme.palette.text.primary,
                fontFamily: "Inter, sans-serif",
              }}
            >
              {value.charAt(0).toUpperCase() + value.slice(1)}
            </Typography>
          ) : (
            <Link
              underline='hover'
              color='inherit'
              component={RouterLink}
              to={to}
              key={to}
              sx={{
                fontSize: "14px",
                fontWeight: "500",
                color: theme.palette.text.primary,
                fontFamily: "Inter, sans-serif",
              }}
            >
              {value.charAt(0).toUpperCase() + value.slice(1)}
            </Link>
          )
        })}
      </Breadcrumbs>
      <Grid container spacing={2}>
        <Grid item xs={12} md={5}>
          <Box
            sx={{
              p: "90px 40px 50px 40px",
              bgcolor: theme.palette.background.paper,
              border: "0px solid",
              borderRadius: "12px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <input
                accept='image/*'
                style={{ display: "none" }}
                id='avatar-upload'
                type='file'
                onChange={handleFileChange}
              />
              <label htmlFor='avatar-upload'>
                <Avatar
                  src={
                    selectedFile ||
                    users?.avatar ||
                    "https://randomuser.me/api/portraits/men/3.jpg"
                  }
                  sx={{
                    width: 100,
                    height: 100,
                    cursor: "pointer",
                    border: "1px dashed gray",
                  }}
                  component='span'
                />
              </label>
              <Typography
                sx={{
                  fontSize: "12px",
                  fontWeight: "400",
                  color: theme.palette.text.primary,
                  fontFamily: "Inter, sans-serif",
                  marginTop: 2,
                }}
              >
                Allowed *.jpeg, *.jpg, *.png, *.gif
                <br />
                max size of 3 MB
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mt: 5,
              }}
            >
              <Box>
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontWeight: "500",
                    color: theme.palette.text.primary,
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  Banned
                </Typography>
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontWeight: "500",
                    color: theme.palette.text.secondary,
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  Apply disable account
                </Typography>
              </Box>
              <Box>
                <Switch
                  checked={isPublic}
                  onChange={handleSwitchChange1}
                  inputProps={{ "aria-label": "controlled" }}
                  sx={{
                    marginLeft: 1,
                    "& .MuiSwitch-thumb": {
                      backgroundColor: "#5F00D9",
                    },
                    "& .MuiSwitch-track": {
                      backgroundColor: "#A6A6A6",
                    },
                  }}
                />
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mt: 2,
                mb: 2,
              }}
            >
              <Box>
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontWeight: "500",
                    color: theme.palette.text.primary,
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  Email Verified
                </Typography>
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontWeight: "500",
                    color: theme.palette.text.secondary,
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  Disabling this will automatically send the user a verification
                  email
                </Typography>
              </Box>
              <Box>
                <Switch
                  checked={isEmail}
                  onChange={handleSwitchChange2}
                  inputProps={{ "aria-label": "controlled" }}
                  sx={{
                    marginLeft: 1,
                    "& .MuiSwitch-thumb": {
                      backgroundColor: "#5F00D9",
                    },
                    "& .MuiSwitch-track": {
                      backgroundColor: "#A6A6A6",
                    },
                  }}
                />
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button
                variant='contained'
                sx={{
                  backgroundColor: "#5F00D9",
                  textTransform: "none",
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "white",
                  fontFamily: "Inter, sans-serif",
                  borderRadius: "5px",
                  padding: "5px 20px",
                  marginTop: 3,
                }}
              >
                Delete User
              </Button>
            </Box>
          </Box>
        </Grid>
        {/* Right Grid */}
        <Grid item xs={12} md={7}>
          <Box
            sx={{
              p: 2,
              backgroundColor: theme.palette.background.paper,
              border: "0px solid",
              borderRadius: "12px",
            }}
          >
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
                    defaultValue=''
                    render={({ field }) => (
                      <input
                        placeholder='John'
                        fullWidth
                        size='lg'
                        {...field}
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
                    <Typography variant='caption' color='error'>
                      {errors.name.message}
                    </Typography>
                  )}
                </Grid>

                {/* Email Field */}
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
                    Email Address
                  </Typography>
                  <Controller
                    name='email'
                    control={control}
                    defaultValue=''
                    render={({ field }) => (
                      <input
                        placeholder='john@example.com'
                        fullWidth
                        size='lg'
                        {...field}
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
                    <Typography variant='caption' color='error'>
                      {errors.email.message}
                    </Typography>
                  )}
                </Grid>

                {/* Phone Field */}
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
                    Phone Number
                  </Typography>
                  <Controller
                    name='phone'
                    control={control}
                    defaultValue=''
                    render={({ field }) => (
                      <input
                        placeholder='(+40) 772 100 200'
                        fullWidth
                        size='lg'
                        {...field}
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
                  {errors.phone && (
                    <Typography variant='caption' color='error'>
                      {errors.phone.message}
                    </Typography>
                  )}
                </Grid>

                {/* Address Field */}
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
                    Address
                  </Typography>
                  <Controller
                    name='address'
                    control={control}
                    defaultValue=''
                    render={({ field }) => (
                      <input
                        placeholder='Calea Mosilor Street, 2nd Number'
                        fullWidth
                        size='lg'
                        {...field}
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
                  {errors.address && (
                    <Typography variant='caption' color='error'>
                      {errors.address.message}
                    </Typography>
                  )}
                </Grid>

                {/* Country Field */}
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
                    Country
                  </Typography>
                  <Controller
                    name='country'
                    control={control}
                    defaultValue=''
                    render={({ field }) => (
                      <input
                        placeholder='Romania'
                        fullWidth
                        size='lg'
                        {...field}
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
                  {errors.country && (
                    <Typography variant='caption' color='error'>
                      {errors.country.message}
                    </Typography>
                  )}
                </Grid>

                {/* City Field */}
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
                    City
                  </Typography>
                  <Controller
                    name='city'
                    control={control}
                    defaultValue=''
                    render={({ field }) => (
                      <input
                        placeholder='Bucharest'
                        fullWidth
                        size='lg'
                        {...field}
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
                  {errors.city && (
                    <Typography variant='caption' color='error'>
                      {errors.city.message}
                    </Typography>
                  )}
                </Grid>

                {/* Pin Code Field */}
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
                    Pin Code
                  </Typography>
                  <Controller
                    name='pinCode'
                    control={control}
                    defaultValue=''
                    render={({ field }) => (
                      <input
                        placeholder='034567'
                        fullWidth
                        size='lg'
                        {...field}
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
                  {errors.pinCode && (
                    <Typography variant='caption' color='error'>
                      {errors.pinCode.message}
                    </Typography>
                  )}
                </Grid>

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
                    Role
                  </Typography>
                  <Controller
                    name='role'
                    control={control}
                    defaultValue=''
                    render={({ field }) => (
                      <input
                        placeholder='034567'
                        fullWidth
                        size='lg'
                        {...field}
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
                  {errors.role && (
                    <Typography variant='caption' color='error'>
                      {errors.role.message}
                    </Typography>
                  )}
                </Grid>
                {/* About Field */}
                <Grid item xs={12} md={12}>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: "500",
                      color: theme.palette.text.primary,
                      fontFamily: "Inter, sans-serif",
                      marginBottom: 1,
                    }}
                  >
                    About
                  </Typography>
                  <Controller
                    name='about'
                    control={control}
                    defaultValue=''
                    render={({ field }) => (
                      <textarea
                        placeholder='Tell us about yourself'
                        fullWidth
                        size='lg'
                        {...field}
                        style={{
                          padding: "10px",
                          border: "1px solid #38424d",
                          borderRadius: "10px",
                          fontSize: "14px",
                          width: "100%",
                          fontFamily: "Inter, sans-serif",
                          backgroundColor: theme.palette.background.paper,
                          color: theme.palette.text.primary,
                          resize: "none",
                          height: "150px",
                        }}
                      />
                    )}
                  />
                  {errors.about && (
                    <Typography variant='caption' color='error'>
                      {errors.about.message}
                    </Typography>
                  )}
                </Grid>

                <Grid item xs={12} md={12}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      gap: 2,
                    }}
                  >
                    <Button
                      type='submit'
                      variant='contained'
                      sx={{
                        backgroundColor: "#5F00D9",
                        textTransform: "none",
                        fontSize: "14px",
                        fontWeight: "500",
                        color: "white",
                        fontFamily: "Inter, sans-serif",
                        borderRadius: "5px",
                        padding: "5px 20px",
                      }}
                    >
                      Save Changes
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default EditUser
