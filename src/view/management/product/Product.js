import { Box, useTheme } from "@mui/material"
import React from "react"
import ProductCreatePage from "./ProductCreatePage"

const Product = () => {
  const theme = useTheme()
  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          padding: { xs: "20px", md: "40px 80px", lg: "70px 70px" },
          backgroundColor: theme.palette.background.box,
          minHeight: { lg: "92vh", md: "94vh", sm: "110vh", xs: "140vh" },
        }}
      >
        <ProductCreatePage />
      </Box>
    </>
  )
}

export default Product
