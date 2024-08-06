import { Button, Grid, Typography, useTheme } from "@mui/material"
import React from "react"
import { Controller } from "react-hook-form"

const CardForm = ({
  handleSubmit,
  onSubmit,
  paymentDetails,
  control,
  errors,
  handleInputChange,
  setPaymentDetails,
}) => {
  const theme = useTheme()
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: "500",
                color: theme.palette.text.primary,
                fontFamily: "Inter, sans-serif",
                marginBottom: 1,
              }}
            >
              Enter Card Number
            </Typography>
            <Controller
              name='cardNumber'
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type='text'
                  placeholder='Card Number'
                  name='cardNumber'
                  value={paymentDetails.cardNumber}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "")
                    setPaymentDetails({
                      ...paymentDetails,
                      cardNumber: value,
                    })
                    field.onChange(value)
                  }}
                  inputProps={{
                    inputMode: "numeric",
                    pattern: "[0-9]*",
                  }}
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                  }}
                />
              )}
            />
            {errors.cardNumber && (
              <Typography
                color='error'
                sx={{
                  fontSize: "13px",
                  fontWeight: "500",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                {errors.cardNumber.message}
              </Typography>
            )}
          </Grid>
          <Grid item xs={12}>
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: "500",
                fontFamily: "Inter, sans-serif",
                marginBottom: 1,
                color: theme.palette.text.primary,
              }}
            >
              Enter Expiry Date
            </Typography>
            <Controller
              name='expiryDate'
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type='date'
                  placeholder='Expiry Date'
                  name='expiryDate'
                  value={paymentDetails.expiryDate}
                  onChange={(e) => {
                    handleInputChange(e)
                    field.onChange(e)
                  }}
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                  }}
                  inputProps={{
                    inputMode: "numeric",
                    pattern: "[0-9]*",
                  }}
                />
              )}
            />
            {errors.expiryDate && (
              <Typography
                color='error'
                sx={{
                  fontSize: "13px",
                  fontWeight: "500",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                {errors.expiryDate.message}
              </Typography>
            )}
          </Grid>
          <Grid item xs={12}>
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: "500",
                fontFamily: "Inter, sans-serif",
                marginBottom: 1,
                color: theme.palette.text.primary,
              }}
            >
              Enter CVV
            </Typography>
            <Controller
              name='cvv'
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type='text'
                  name='cvv'
                  value={paymentDetails.cvv}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "")
                    setPaymentDetails({ ...paymentDetails, cvv: value })
                    field.onChange(value)
                  }}
                  placeholder='CVV'
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                  }}
                  pattern='[0-9]*'
                />
              )}
            />
            {errors.cvv && (
              <Typography
                color='error'
                sx={{
                  fontSize: "13px",
                  fontWeight: "500",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                {errors.cvv.message}
              </Typography>
            )}
          </Grid>
          <Grid item xs={12}>
            <Button
              type='submit'
              variant='contained'
              sx={{
                fontFamily: "Inter, sans-serif",
                fontSize: "16px",
                fontWeight: "500",
                textTransform: "none",
                backgroundColor: "#5F00D9",
                color: "white",
              }}
            >
              Submit
            </Button>
            <Typography
              sx={{
                fontFamily: "Inter, sans-serif",
                fontSize: "12px",
                fontWeight: "500",
                mt: 1,
                opacity: "0.6",
                color: theme.palette.text.primary,
              }}
            >
              <sup>*</sup>Once you have confirmed payment you will be not change
              this.
            </Typography>
          </Grid>
        </Grid>
      </form>
    </>
  )
}

export default CardForm
