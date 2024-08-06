import React, { useState } from "react"
import {
  Box,
  Typography,
  Button,
  Grid,
  Rating,
  IconButton,
  TextField,
  useTheme,
  Link,
  Breadcrumbs,
  Dialog,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material"
import Carousel from "react-material-ui-carousel"
import { styled } from "@mui/system"

import { useLocation, Link as RouterLink } from "react-router-dom"
import NavigateNextIcon from "@mui/icons-material/NavigateNext"
import CloseIcon from "@mui/icons-material/Close"
import { toast } from "react-toastify"

const colors = ["Red", "Black", "Blue", "Orange", "Green", "Yellow", "white"]

const StyledImage = styled("img")({
  maxWidth: "100%",
  height: "auto",
  borderRadius: "8px",
})

const SmallImage = styled("img")({
  width: "100px",
  height: "100px",
  borderRadius: "8px",
  margin: "5px",
  cursor: "pointer",
  border: "2px solid transparent",
  "&:hover": {
    border: "2px solid #1976d2",
  },
})

const productDetails = {
  productName: "Sample Product",
  productDescription: "This is a sample product description...",
  productCategory: "Electronics",
  productTags: ["Tag1", "Tag2"],
  productImage:
    "https://www.laptopsdirect.co.uk/Images/32LH510U_4_Supersize.jpg?v=5",
  relatedImages: [
    "https://oxygendigitalshop.com/media/cache/2500x0/catalog/product/6/1/61o83zk1j3l._sl1500__1699947731.webp",
    "https://www.reliancedigital.in/medias/ONEPLUS-32Y1-TV-491895010-i-2-1200Wx1200H?context=bWFzdGVyfGltYWdlc3w0MDMyODF8aW1hZ2UvanBlZ3xpbWFnZXMvaDM2L2hkZi85ODEwNjIxODkwNTkwLmpwZ3w5ZDEzYzkwMzQzYmFlMTg0NjRkMzY2NGY1OTUxODEyMjY4OGQzYzU0ZmNiYjczODcwNDc1ZDBjYzZmZmM5NWI3",
    "https://m.media-amazon.com/images/I/71d5fMDvq9L._SL1500_.jpg",
  ],
  rating: 4.5,
  stock: 20,
  colors: ["Red", "Blue", "Green"],
  price: 132,
}

// const products = [
//   {
//     id: 1,
//     name: "Product 1",
//     price: "$10.00",
//     review: 4.5,
//     availability: "In Stock",
//   },
//   {
//     id: 2,
//     name: "Product 2",
//     price: "$15.00",
//     review: 3.8,
//     availability: "Out of Stock",
//   },
//   {
//     id: 3,
//     name: "Product 3",
//     price: "$20.00",
//     review: 4.2,
//     availability: "In Stock",
//   },

// ]

const ViewProduct = () => {
  const theme = useTheme()
  const location = useLocation()
  const pathnames = location.pathname.split("/").filter((x) => x)

  const [quantity, setQuantity] = React.useState(1)
  const [open, setOpen] = useState(false)

  const handleImageClick = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Box
      sx={{
        flexGrow: 1,
        padding: { xs: "20px", md: "40px 40px", sm: "40px", lg: "70px 80px" },
        backgroundColor: theme.palette.background.box,
        minHeight: { lg: "92vh", md: "92vh", sm: "110vh", xs: "96vh" },
      }}
    >
      <Typography
        sx={{
          fontWeight: "600",
          fontSize: "30px",
          fontFamily: "Inter, sans-serif",
        }}
      >
        Details
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
          mb: 6,
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
      <Grid container spacing={7}>
        <Grid item xs={12} md={6}>
          <StyledImage
            src={productDetails.productImage}
            alt='Product Image'
            onClick={handleImageClick}
            sx={{ cursor: "pointer" }}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: "16px",
            }}
          >
            {productDetails.relatedImages.map((image, index) => (
              <SmallImage
                key={index}
                src={image}
                alt={`Related Image ${index + 1}`}
                onClick={handleImageClick}
              />
            ))}
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography
            sx={{
              fontFamily: "Inter, sans-serif",
              fontSize: "22px",
              fontWeight: "bold",
              textTransform: "none",
              mb: 1,
            }}
            gutterBottom
          >
            {productDetails.productName}
          </Typography>
          <Rating
            value={productDetails.rating}
            readOnly
            precision={0.5}
            sx={{ mb: 2 }}
          />
          <Typography
            sx={{
              mb: 2,
              fontFamily: "Inter, sans-serif",
              fontSize: "14px",
              fontWeight: "500",
              color: "#0ea770",
            }}
            gutterBottom
          >
            {productDetails.stock > 0 ? `IN STOCK` : "OUT OF STOCK"}
          </Typography>
          <Typography
            sx={{
              fontFamily: "Inter, sans-serif",
              fontSize: "16px",
              fontWeight: "500",
              textTransform: "none",
              color: theme.palette.text.primary,
            }}
          >
            Price
          </Typography>
          <Typography
            sx={{
              fontFamily: "Inter, sans-serif",
              fontSize: "20px",
              fontWeight: "500",
              textTransform: "none",
              mb: 1,
            }}
            gutterBottom
          >
            $ {productDetails.price}
          </Typography>
          <Typography
            sx={{
              fontFamily: "Inter, sans-serif",
              fontSize: "16px",
              fontWeight: "500",
              textTransform: "none",
              color: theme.palette.text.primary,
            }}
          >
            Description
          </Typography>
          <Typography
            sx={{
              fontFamily: "Inter, sans-serif",
              fontSize: "14px",
              fontWeight: "400",
              textTransform: "none",
              color: theme.palette.text.secondary,
            }}
          >
            <ul>
              <li>
                The most beautiful curves of this swivel stool adds an elegant
                touch to any environment
              </li>
              <li>Memory swivel seat returns to original seat position</li>
              <li>Fully assembled! No assembly required</li>
            </ul>
          </Typography>

          <Box sx={{ display: "flex", gap: "50px" }}>
            <Box my={2}>
              <Typography
                sx={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "16px",
                  fontWeight: "500",
                  textTransform: "none",
                  color: theme.palette.text.primary,
                }}
                gutterBottom
              >
                Quantity:
              </Typography>
              <TextField
                type='number'
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                inputProps={{
                  min: 1,
                  max: productDetails.stock,
                  style: {
                    fontFamily: "Inter, sans-serif",
                    fontSize: "14px",
                    fontWeight: "500",
                    color: theme.palette.text.primary,
                  },
                }}
              />
            </Box>
            <Box my={2}>
              <Typography
                sx={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "16px",
                  fontWeight: "500",
                  textTransform: "none",
                  color: theme.palette.text.primary,
                  mb: 1,
                }}
                gutterBottom
              >
                Color:
              </Typography>
              <FormControl sx={{ mb: 2, width: "100px" }}>
                <InputLabel
                  id='color-select-label'
                  sx={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "14px",
                    fontWeight: "500",
                  }}
                >
                  Color
                </InputLabel>
                <Select
                  labelId='size-label'
                  label='Size'
                  sx={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "14px",
                    fontWeight: "500",
                  }}
                >
                  {colors.map((size) => (
                    <MenuItem
                      key={size}
                      value={size}
                      sx={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "14px",
                        fontWeight: "500",
                      }}
                    >
                      {size}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Box>
          <Button
            variant='contained'
            color='primary'
            onClick={() => toast.success("product added to cart.")}
            disabled={productDetails.stock === 0}
            sx={{
              fontFamily: "Inter, sans-serif",
              fontSize: "16px",
              fontWeight: "500",
              textTransform: "none",
              backgroundColor: "#5F00D9",
              color: "white",
              mt: 2,
              p: "5px 80px",
            }}
          >
            Add to Cart
          </Button>
        </Grid>
      </Grid>
      {/* <Grid item xs={12}>
        <Box
          sx={{
            padding: { xs: "20px", md: "40px" },
            backgroundColor: theme.palette.background.box,
            borderRadius: "8px",
          }}
        >
          <Typography variant='h5' gutterBottom>
            Product List
          </Typography>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Review</TableCell>
                  <TableCell>Rating</TableCell>
                  <TableCell>Availability</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>{product.id}</TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.price}</TableCell>
                    <TableCell>{product.review}</TableCell>
                    <TableCell>
                      <Rating
                        name='product-rating'
                        value={product.review}
                        precision={0.1}
                        readOnly
                      />
                    </TableCell>
                    <TableCell>{product.availability}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Grid> */}
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth='md'
        fullWidth
        sx={{ overflowX: "hidden", height: "auto" }}
      >
        <IconButton
          edge='end'
          color='inherit'
          onClick={handleClose}
          aria-label='close'
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            backgroundColor: "black",
          }}
        >
          <CloseIcon style={{ color: "black" }} />
        </IconButton>
        <Carousel
          interval={2000}
          autoPlay='true'
          navButtonsAlwaysVisible={true}
          navButtonsProps={{
            style: {
              backgroundColor: "transparent",
              color: "white",
            },
          }}
        >
          {[productDetails.productImage, ...productDetails.relatedImages].map(
            (image, index) => (
              <StyledImage
                key={index}
                src={image}
                alt={`Carousel Image ${index + 1}`}
              />
            )
          )}
        </Carousel>
      </Dialog>
    </Box>
  )
}

export default ViewProduct
