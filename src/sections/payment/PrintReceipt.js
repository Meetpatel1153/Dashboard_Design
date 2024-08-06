import { Button, Typography, useTheme } from "@mui/material"
import { Box } from "@mui/system"
import React from "react"

const PrintReceipt = ({ handlePrint, selectedCard }) => {
  const theme = useTheme()

  return (
    <>
      <Box>
        <Box>
          <Typography
            sx={{
              fontFamily: "Inter, sans-serif",
              fontSize: "14px",
              fontWeight: "500",
              color: theme.palette.text.primary,
            }}
          >
            Card Number: {selectedCard.cardNumber}
          </Typography>
          <Typography
            sx={{
              fontFamily: "Inter, sans-serif",
              fontSize: "14px",
              fontWeight: "500",
              color: theme.palette.text.primary,
            }}
          >
            Expiry Date: {selectedCard.expiryDate}
          </Typography>
          <Typography
            sx={{
              fontFamily: "Inter, sans-serif",
              fontSize: "14px",
              fontWeight: "500",
              color: theme.palette.text.primary,
            }}
          >
            CVV: {selectedCard.cvv}
          </Typography>
        </Box>
        <Typography
          sx={{
            fontSize: "16px",
            fontWeight: "500",
            color: "chocolate",
            fontFamily: "Inter, sans-serif",
            marginBottom: 1,
          }}
        >
          Payment Confirmed
        </Typography>
        <Button
          variant='contained'
          onClick={handlePrint}
          sx={{
            fontFamily: "Inter, sans-serif",
            fontSize: "16px",
            fontWeight: "500",
            textTransform: "none",
            backgroundColor: "#5F00D9",
            color: "white",
          }}
        >
          Print Receipt
        </Button>
      </Box>
    </>
  )
}

export default PrintReceipt
