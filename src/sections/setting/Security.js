import React, { useState } from "react"
import {
  Grid,
  Box,
  Typography,
  InputBase,
  IconButton,
  Button,
  InputAdornment,
} from "@mui/material"
import { Visibility, VisibilityOff } from "@mui/icons-material"
import { IoMdInformationCircle } from "react-icons/io"
import { useForm, Controller } from "react-hook-form"
import { toast } from "react-toastify"

const SecurityPage = ({ theme }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()
  const [values, setValues] = useState({
    showOldPassword: false,
    showNewPassword: false,
    showConfirmPassword: false,
  })

  const handleClickShowPassword = (prop) => () => {
    setValues({ ...values, [prop]: !values[prop] })
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  const onSubmit = (data) => {
    if (!data.oldPassword || !data.newPassword || !data.confirmPassword) {
      toast.error("Please fill out all fields.")
    } else {
      toast.success("Changes saved successfully!")
    }
    reset()
  }

  return (
    <Box>
      <Grid
        container
        spacing={2}
        component='form'
        onSubmit={handleSubmit(onSubmit)}
      >
        <Grid item xs={12}>
          <Box>
            <Controller
              name='oldPassword'
              control={control}
              defaultValue=''
              rules={{ required: "Old password is required" }}
              render={({ field }) => (
                <InputBase
                  {...field}
                  placeholder='Old Password'
                  fullWidth
                  type={values.showOldPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton
                        onClick={handleClickShowPassword("showOldPassword")}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {values.showOldPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  style={{
                    padding: "10px",
                    border: "1px solid #38424d",
                    borderRadius: "10px",
                    fontSize: "14px",
                    fontFamily: "Inter, sans-serif",
                    color: theme.palette.text.primary,
                  }}
                />
              )}
            />
            {errors.oldPassword && (
              <Typography
                variant='caption'
                color='error'
                sx={{ fontFamily: "Inter, sans-serif", textAlign: "start" }}
              >
                {errors.oldPassword.message}
              </Typography>
            )}
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Controller
              name='newPassword'
              control={control}
              defaultValue=''
              rules={{
                required: "New password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              }}
              render={({ field }) => (
                <InputBase
                  {...field}
                  placeholder='New Password'
                  fullWidth
                  type={values.showNewPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton
                        onClick={handleClickShowPassword("showNewPassword")}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {values.showNewPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  style={{
                    padding: "10px",
                    border: "1px solid #38424d",
                    borderRadius: "10px",
                    fontSize: "14px",
                    fontFamily: "Inter, sans-serif",
                    color: theme.palette.text.primary,
                  }}
                />
              )}
            />
          </Box>
          {errors.newPassword && (
            <Typography
              variant='caption'
              color='error'
              sx={{ fontFamily: "Inter, sans-serif" }}
            >
              {errors.newPassword.message}
            </Typography>
          )}
          <Typography
            variant='body2'
            sx={{
              display: "flex",
              alignItems: "center",
              marginTop: "5px",
              color: "#535D66",
            }}
          >
            <IoMdInformationCircle fontSize='small' sx={{ mr: 1 }} size={18} />
            Password must be minimum 6 characters
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Controller
              name='confirmPassword'
              control={control}
              defaultValue=''
              rules={{
                required: "Confirm password is required",
                validate: (value) =>
                  value === control._formValues.newPassword ||
                  "Passwords do not match",
              }}
              render={({ field }) => (
                <InputBase
                  {...field}
                  placeholder='Confirm Password'
                  fullWidth
                  type={values.showConfirmPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton
                        onClick={handleClickShowPassword("showConfirmPassword")}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {values.showConfirmPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  style={{
                    padding: "10px",
                    border: "1px solid #38424d",
                    borderRadius: "10px",
                    fontSize: "14px",
                    fontFamily: "Inter, sans-serif",
                  }}
                />
              )}
            />
          </Box>
          {errors.confirmPassword && (
            <Typography
              variant='caption'
              color='error'
              sx={{ fontFamily: "Inter, sans-serif" }}
              s
            >
              {errors.confirmPassword.message}
            </Typography>
          )}
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
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
              type='submit'
            >
              Save Changes
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default SecurityPage
