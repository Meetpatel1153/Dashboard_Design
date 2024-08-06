import { Avatar, Button, Grid, Switch, Typography } from "@mui/material"
import { Box } from "@mui/system"
import React from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { user } from "../../mock/User"

const General = ({
  handleFileChange,
  selectedFile,
  isPublic,
  handleSwitchChange,
  formData,
  handleInputChange,
  theme,
}) => {
  const navigate = useNavigate()
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={5}>
          <Box
            sx={{
              p: "90px 40px",
              bgcolor: theme.palette.background.paper,
              border: "0px solid",
              borderRadius: "12px",
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
                src={selectedFile || user?.avatar}
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
            <Box sx={{ display: "flex", alignItems: "center", marginTop: 2 }}>
              <Switch
                checked={isPublic}
                onChange={handleSwitchChange}
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
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: "500",
                  color: theme.palette.text.primary,
                  fontFamily: "Inter, sans-serif",
                }}
              >
                Public Account
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button
                variant='contained'
                onClick={() => navigate("/permissiondenied")}
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
            <form style={{ paddingTop: "20px" }}>
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
                  <input
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
                    name='name'
                    value={formData.name}
                    onChange={handleInputChange}
                  />
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
                    Email Address
                  </Typography>
                  <input
                    placeholder='john@example.com'
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
                    name='email'
                    value={formData.email}
                    onChange={handleInputChange}
                  />
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
                    Phone no.
                  </Typography>
                  <input
                    placeholder='123-456-7890'
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
                    name='phone'
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
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
                    Adress
                  </Typography>
                  <input
                    placeholder='123 Main St'
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
                    name='address'
                    value={formData.address}
                    onChange={handleInputChange}
                  />
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
                    Country
                  </Typography>
                  <input
                    placeholder='USA'
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
                    name='country'
                    value={formData.country}
                    onChange={handleInputChange}
                  />
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
                    City
                  </Typography>
                  <input
                    placeholder='New York'
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
                    name='city'
                    value={formData.city}
                    onChange={handleInputChange}
                  />
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
                    Pin code
                  </Typography>
                  <input
                    placeholder='10001'
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
                    name='pinCode'
                    value={formData.pinCode}
                    onChange={handleInputChange}
                  />
                </Grid>

                {/* About Field */}
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
                    About
                  </Typography>
                  <textarea
                    placeholder='This is a default message about John.'
                    rows={4}
                    fullWidth
                    required
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
                    name='about'
                    value={formData.about}
                    onChange={handleInputChange}
                  />
                </Grid>

                {/* Submit Button */}
                <Grid item xs={12}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
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
                      }}
                      onClick={() => toast.success("save changes")}
                    >
                      Save changes
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Grid>
      </Grid>
    </>
  )
}

export default General
