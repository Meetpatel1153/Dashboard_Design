import { Box, useTheme } from "@mui/material"
import React from "react"
import CreateInvoice from "./CreateInvoice"

const Invoice = () => {
  const theme = useTheme()
  return (
    <>
      <Box>
        <CreateInvoice />
      </Box>
    </>
  )
}

export default Invoice
