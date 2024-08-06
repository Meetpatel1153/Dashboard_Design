import React, { useState } from "react"
import {
  Grid,
  Box,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  Button,
  Chip,
  FormHelperText,
  Breadcrumbs,
  Link,
} from "@mui/material"
import { useForm, Controller } from "react-hook-form"
import { useTheme } from "@mui/material/styles"
import { toast } from "react-toastify"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import { useLocation, Link as RouterLink } from "react-router-dom"
import NavigateNextIcon from "@mui/icons-material/NavigateNext"

const categories = ["Electronics", "Clothing", "Home & Kitchen", "Books"]
const sizes = ["Small", "Medium", "Large", "X-Large"]
const tagOptions = ["In Stock", "Out of Stock", "Sale", "Expired"]

const EditProduct = () => {
  const [selectedTags, setSelectedTags] = useState([])

  const theme = useTheme()
  const location = useLocation()
  const pathnames = location.pathname.split("/").filter((x) => x)

  const handleChange = (event) => {
    setSelectedTags(event.target.value)
  }

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      productName: "Sample Product",
      weight: "1kg",
      category: "Electronics",
      size: "Medium",
      quantity: 10,
      productDescription:
        "This is a sample product description. It provides detailed information about the product.",
      facebookLink: "https://facebook.com/sample",
      twitterLink: "https://twitter.com/sample",
      price: 99.99,
      tags: "In Stock",
    },
  })

  const [image, setImage] = useState(
    "https://www.sony.co.in/image/ff0a71866476e0ad65b8d848f2d7b40c?fmt=pjpeg&wid=1014&hei=396&bgcolor=F1F5F9&bgc=F1F5F9"
  )

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImage(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const onSubmit = (data) => {
    toast.success("product updated successfully.")
    console.log(data)
  }

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
            mb: 3,
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
          <Grid item xs={12}>
            {" "}
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                variant='contained'
                sx={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "14px",
                  fontWeight: "500",
                  textTransform: "none",
                  backgroundColor: "#5F00D9",
                  color: "white",
                  mb: 1,
                }}
                onClick={handleSubmit(onSubmit)}
              >
                Save Changes
              </Button>
            </Box>
          </Grid>
          {/* Image Details (Grid 5) */}
          <Grid item xs={12} md={5}>
            <Box
              p={2}
              sx={{
                backgroundColor: theme.palette.background.paper,
                borderRadius: "10px",
              }}
            >
              <Typography
                sx={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "18px",
                  fontWeight: "600",
                  mb: 3,
                }}
              >
                Product Image
              </Typography>
              <Box
                sx={{
                  position: "relative",
                  border: `1px solid ${theme.palette.divider}`,
                  borderRadius: "8px",
                  overflow: "hidden",
                  textAlign: "center",
                  mb: 2,
                  height: 300,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundImage: `url(${image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  "&:hover .upload-button": {
                    display: "block",
                  },
                }}
              >
                <Button
                  variant='contained'
                  component='label'
                  className='upload-button'
                  sx={{
                    display: "none",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    fontWeight: "500",
                    textTransform: "none",
                    backgroundColor: "#5F00D9",
                    color: "white",
                  }}
                >
                  Edit Image
                  <input
                    type='file'
                    hidden
                    accept='image/*'
                    onChange={handleImageChange}
                  />
                </Button>
              </Box>
              <Typography
                sx={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "14px",
                  fontWeight: "400",
                  mb: 2,
                }}
              >
                The place is close to Barceloneta Beach and bus stop just 2 min
                by walk and near to “Naviglio” where you can enjoy the main
                night life in Barcelona.
              </Typography>
            </Box>
          </Grid>

          {/* Basic Information (Grid 7) */}
          <Grid item xs={12} md={7}>
            <Box
              p={2}
              sx={{
                backgroundColor: theme.palette.background.paper,
                borderRadius: "10px",
              }}
            >
              <Typography
                sx={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "18px",
                  fontWeight: "600",
                  mb: 3,
                }}
              >
                Product Infromation
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Controller
                    name='productName'
                    control={control}
                    defaultValue=''
                    rules={{ required: "Product Name is required" }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label='Product Name'
                        fullWidth
                        error={!!errors.productName}
                        helperText={errors.productName?.message}
                        sx={{
                          borderRadius: "8px",
                          backgroundColor: theme.palette.background.paper,

                          "& .MuiFormLabel-root": {
                            fontFamily: "Inter, sans-serif",
                            fontSize: "14px",
                          },
                        }}
                        InputProps={{
                          style: {
                            fontFamily: "Inter, sans-serif",
                            fontSize: "14px",
                            fontWeight: "500",
                            color: theme.palette.text.primary,
                          },
                        }}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controller
                    name='weight'
                    control={control}
                    defaultValue=''
                    rules={{ required: "Weight is required" }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label='Weight'
                        fullWidth
                        error={!!errors.weight}
                        helperText={errors.weight?.message}
                        sx={{
                          borderRadius: "8px",
                          backgroundColor: theme.palette.background.paper,
                          "& .MuiFormLabel-root": {
                            fontFamily: "Inter, sans-serif",
                            fontSize: "14px",
                          },
                        }}
                        InputProps={{
                          style: {
                            fontFamily: "Inter, sans-serif",
                            fontSize: "14px",
                            fontWeight: "500",
                            color: theme.palette.text.primary,
                          },
                        }}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controller
                    name='category'
                    control={control}
                    defaultValue=''
                    rules={{ required: "Category is required" }}
                    render={({ field }) => (
                      <FormControl
                        fullWidth
                        error={!!errors.category}
                        sx={{
                          borderRadius: "8px",
                          backgroundColor: theme.palette.background.paper,
                          "& .MuiFormLabel-root": {
                            fontFamily: "Inter, sans-serif",
                            fontSize: "14px",
                          },
                        }}
                      >
                        <InputLabel id='category-label'>Category</InputLabel>
                        <Select
                          {...field}
                          labelId='category-label'
                          label='Category'
                          onChange={(e) => field.onChange(e)}
                          value={field.value}
                          sx={{
                            fontFamily: "Inter, sans-serif",
                            fontSize: "14px",
                            fontWeight: "500",
                          }}
                        >
                          {categories.map((category) => (
                            <MenuItem key={category} value={category}>
                              {category}
                            </MenuItem>
                          ))}
                        </Select>
                        {errors.category && (
                          <FormHelperText>
                            {errors.category.message}
                          </FormHelperText>
                        )}
                      </FormControl>
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controller
                    name='size'
                    control={control}
                    defaultValue=''
                    rules={{ required: "Size is required" }}
                    render={({ field }) => (
                      <FormControl fullWidth error={!!errors.size}>
                        <InputLabel id='size-label'>Size</InputLabel>
                        <Select
                          {...field}
                          labelId='size-label'
                          label='Size'
                          onChange={(e) => field.onChange(e)}
                          value={field.value}
                          sx={{
                            fontFamily: "Inter, sans-serif",
                            fontSize: "14px",
                            fontWeight: "500",
                          }}
                        >
                          {sizes.map((size) => (
                            <MenuItem key={size} value={size}>
                              {size}
                            </MenuItem>
                          ))}
                        </Select>
                        {errors.size && (
                          <FormHelperText>{errors.size.message}</FormHelperText>
                        )}
                      </FormControl>
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controller
                    name='quantity'
                    control={control}
                    defaultValue=''
                    rules={{ required: "Quantity is required" }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label='Quantity'
                        fullWidth
                        error={!!errors.quantity}
                        helperText={errors.quantity?.message}
                        sx={{
                          borderRadius: "8px",
                          backgroundColor: theme.palette.background.paper,
                          "& .MuiFormLabel-root": {
                            fontFamily: "Inter, sans-serif",
                            fontSize: "14px",
                          },
                        }}
                        InputProps={{
                          style: {
                            fontFamily: "Inter, sans-serif",
                            fontSize: "14px",
                            fontWeight: "500",
                            color: theme.palette.text.primary,
                          },
                        }}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: "400",
                      mb: 1.5,
                      color: theme.palette.text.secondary,
                      fontFamily: "Inter, sans-serif",
                    }}
                  >
                    Description
                  </Typography>
                  <Controller
                    name='productDescription'
                    control={control}
                    defaultValue=''
                    rules={{ required: "Product Description is required" }}
                    render={({ field }) => (
                      <Box
                        style={{
                          backgroundColor: theme.palette.background.paper,
                          borderRadius: "8px",
                        }}
                      >
                        <ReactQuill
                          {...field}
                          theme='snow'
                          onChange={field.onChange}
                          value={field.value}
                        />
                        {errors.productDescription && (
                          <FormHelperText error>
                            {errors.productDescription.message}
                          </FormHelperText>
                        )}
                      </Box>
                    )}
                  />
                </Grid>
              </Grid>
            </Box>
          </Grid>

          {/* Social Links (Grid 2) */}
          <Grid item xs={12} md={5}>
            <Box
              p={2}
              sx={{
                backgroundColor: theme.palette.background.paper,
                borderRadius: "10px",
              }}
            >
              <Typography
                sx={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "18px",
                  fontWeight: "600",
                  mb: 3,
                }}
              >
                Social Links
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Controller
                    name='facebookLink'
                    control={control}
                    defaultValue=''
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label='Facebook Link'
                        fullWidth
                        sx={{
                          borderRadius: "8px",
                          backgroundColor: theme.palette.background.paper,

                          "& .MuiFormLabel-root": {
                            fontFamily: "Inter, sans-serif",
                            fontSize: "14px",
                          },
                        }}
                        InputProps={{
                          style: {
                            fontFamily: "Inter, sans-serif",
                            fontSize: "14px",
                            fontWeight: "500",
                            color: theme.palette.text.primary,
                          },
                        }}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    name='twitterLink'
                    control={control}
                    defaultValue=''
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label='Twitter Link'
                        fullWidth
                        sx={{
                          borderRadius: "8px",
                          backgroundColor: theme.palette.background.paper,

                          "& .MuiFormLabel-root": {
                            fontFamily: "Inter, sans-serif",
                            fontSize: "14px",
                          },
                        }}
                        InputProps={{
                          style: {
                            fontFamily: "Inter, sans-serif",
                            fontSize: "14px",
                            fontWeight: "500",
                            color: theme.palette.text.primary,
                          },
                        }}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </Box>
          </Grid>

          {/* Price (Grid 7) */}
          <Grid item xs={12} md={7}>
            <Box
              p={2}
              sx={{
                backgroundColor: theme.palette.background.paper,
                borderRadius: "10px",
              }}
            >
              <Typography
                sx={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "18px",
                  fontWeight: "600",
                  mb: 3,
                }}
              >
                Pricing
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Controller
                    name='price'
                    control={control}
                    defaultValue=''
                    rules={{ required: "Price is required" }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label='Price'
                        fullWidth
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position='start'>$</InputAdornment>
                          ),
                        }}
                        error={!!errors.price}
                        helperText={errors.price?.message}
                        sx={{
                          borderRadius: "8px",
                          backgroundColor: theme.palette.background.paper,
                          "& .MuiFormLabel-root": {
                            fontFamily: "Inter, sans-serif",
                            fontSize: "14px",
                          },
                        }}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Controller
                    name='tags'
                    control={control}
                    defaultValue={[]}
                    rules={{ required: "Tags are required" }}
                    render={({ field }) => (
                      <FormControl
                        fullWidth
                        error={!!errors.tags}
                        sx={{
                          borderRadius: "8px",
                          backgroundColor: theme.palette.background.paper,
                          "& .MuiFormLabel-root": {
                            fontFamily: "Inter, sans-serif",
                            fontSize: "14px",
                          },
                        }}
                      >
                        <InputLabel
                          id='tags-label'
                          sx={{
                            fontFamily: "Inter, sans-serif",
                            fontSize: "14px",
                          }}
                        >
                          Tags
                        </InputLabel>
                        <Select
                          {...field}
                          labelId='tags-label'
                          multiple
                          value={selectedTags}
                          onChange={(e) => {
                            handleChange(e)
                            field.onChange(e)
                          }}
                          renderValue={(selected) => (
                            <Box>
                              {selected.map((value) => (
                                <Chip
                                  key={value}
                                  label={value}
                                  sx={{
                                    margin: "2px",
                                    fontFamily: "Inter, sans-serif",
                                    fontSize: "12px",
                                  }}
                                />
                              ))}
                            </Box>
                          )}
                          MenuProps={{
                            PaperProps: {
                              sx: {
                                borderRadius: "8px",
                                backgroundColor: theme.palette.background.paper,
                              },
                            },
                          }}
                        >
                          {tagOptions.map((option) => (
                            <MenuItem
                              key={option}
                              value={option}
                              sx={{
                                fontFamily: "Inter, sans-serif",
                                fontSize: "14px",
                              }}
                            >
                              {option}
                            </MenuItem>
                          ))}
                        </Select>
                        <FormHelperText
                          sx={{ fontFamily: "Inter, sans-serif" }}
                        >
                          {errors.tags?.message}
                        </FormHelperText>
                      </FormControl>
                    )}
                  />
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default EditProduct
