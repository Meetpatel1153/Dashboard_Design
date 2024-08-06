import React, { useState } from "react"
import {
  Stepper,
  Step,
  StepLabel,
  Box,
  Button,
  Grid,
  TextField,
  InputAdornment,
  useTheme,
  Breadcrumbs,
  Link,
  Typography,
  InputLabel,
  Select,
  FormControl,
  MenuItem,
  Chip,
  FormHelperText,
} from "@mui/material"
import { useForm, Controller } from "react-hook-form"
import NavigateNextIcon from "@mui/icons-material/NavigateNext"
import { Link as RouterLink, useLocation } from "react-router-dom"
import { useDropzone } from "react-dropzone"
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile"
import CloudUploadIcon from "@mui/icons-material/CloudUpload"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"

const steps = ["Product Info", "Product Images", "Social Links", "Price Tags"]
const tagOptions = ["In Stock", "Out of Stock", "Sale", "Expired"]
const categories = ["Electronics", "Clothing", "Home & Kitchen", "Books"]
const sizes = ["Small", "Medium", "Large", "X-Large"]

const ProductCreatePage = () => {
  const theme = useTheme()
  const [activeStep, setActiveStep] = useState(0)
  const [files, setFiles] = useState([])
  const [selectedTags, setSelectedTags] = useState([])

  const handleChange = (event) => {
    setSelectedTags(event.target.value)
  }

  const {
    handleSubmit,
    control,
    trigger,
    formState: { errors },
    reset,
  } = useForm()
  const location = useLocation()
  const pathnames = location.pathname.split("/").filter((x) => x)

  const onSubmit = (data) => {
    reset()
    console.log("Form Data:", data)
  }

  const handleNext = async () => {
    const isValid = await trigger()
    if (isValid) {
      setActiveStep((prev) => prev + 1)
    }
  }

  const handleBack = () => {
    setActiveStep((prev) => prev - 1)
  }

  const onDrop = (acceptedFiles) => {
    setFiles((prevFiles) => [...acceptedFiles, ...prevFiles])
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  })

  const handleReset = () => {
    reset()
    setActiveStep(0)
  }

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12} sx={{ mb: 2 }}>
              {" "}
              <Box>
                <Typography
                  sx={{
                    fontSize: "20px",
                    fontWeight: "600",
                    color: theme.palette.text.primary,
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  Product Infromation
                </Typography>
              </Box>
            </Grid>

            {/* Product Name */}
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
                  />
                )}
              />
            </Grid>

            {/* Weight */}
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
                  />
                )}
              />
            </Grid>

            {/* Category */}
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
                    <InputLabel
                      id='category-label'
                      sx={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "14px",
                      }}
                    >
                      Category
                    </InputLabel>
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
                      MenuProps={{
                        PaperProps: {
                          sx: {
                            borderRadius: "8px",
                            backgroundColor: theme.palette.background.paper,
                          },
                        },
                      }}
                    >
                      {categories.map((category) => (
                        <MenuItem
                          key={category}
                          value={category}
                          sx={{
                            margin: "2px",
                            fontFamily: "Inter, sans-serif",
                            fontSize: "12px",
                          }}
                        >
                          {category}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.category && (
                      <FormHelperText>{errors.category.message}</FormHelperText>
                    )}
                  </FormControl>
                )}
              />
            </Grid>

            {/* Size */}
            <Grid item xs={12} md={6}>
              <Controller
                name='size'
                control={control}
                defaultValue=''
                rules={{ required: "Size is required" }}
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.size}>
                    <InputLabel
                      id='size-label'
                      sx={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "14px",
                      }}
                    >
                      Size
                    </InputLabel>
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
                      MenuProps={{
                        PaperProps: {
                          sx: {
                            borderRadius: "8px",
                            backgroundColor: theme.palette.background.paper,
                          },
                        },
                      }}
                    >
                      {sizes.map((size) => (
                        <MenuItem
                          key={size}
                          value={size}
                          sx={{
                            margin: "2px",
                            fontFamily: "Inter, sans-serif",
                            fontSize: "12px",
                          }}
                        >
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

            {/* Quantity */}
            <Grid item xs={12} md={6}>
              <Controller
                name='Quantity'
                control={control}
                defaultValue=''
                rules={{ required: "Quantity is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label='Quantity'
                    fullWidth
                    error={!!errors.Quantity}
                    helperText={errors.Quantity?.message}
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

            {/* Product Description */}
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
                      style={{
                        border: "none",
                        outline: "none",
                        fontFamily: "Inter, sans-serif",
                        fontSize: "12px",
                        fontWeight: "400",
                        borderRadius: "10px",
                        color: theme.palette.text.primary,
                      }}
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
        )
      case 1:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12} sx={{ mb: 2 }}>
              {" "}
              <Box>
                <Typography
                  sx={{
                    fontSize: "20px",
                    fontWeight: "600",
                    color: theme.palette.text.primary,
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  Media
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box
                {...getRootProps()}
                sx={{
                  border: `1px dashed ${theme.palette.primary.main}`,
                  borderRadius: "8px",
                  padding: "20px",
                  textAlign: "center",
                  backgroundColor: theme.palette.background.paper,
                }}
              >
                <input {...getInputProps()} />
                {isDragActive ? (
                  <Box>
                    <CloudUploadIcon
                      sx={{ fontSize: "40px", color: "#5F00D9" }}
                    />
                    <Typography
                      sx={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "16px",
                        fontWeight: "500",
                        color: theme.palette.text.primary,
                      }}
                    >
                      Drop the files here ...
                    </Typography>
                  </Box>
                ) : (
                  <Box sx={{ cursor: "pointer" }}>
                    <CloudUploadIcon
                      sx={{ fontSize: "40px", color: "#5F00D9" }}
                    />
                    <Typography
                      sx={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "16px",
                        fontWeight: "500",
                        color: theme.palette.text.primary,
                      }}
                    >
                      Drag 'n' drop some files here, or click to select files
                    </Typography>
                  </Box>
                )}
              </Box>
              <Box
                mt={2}
                sx={{
                  maxHeight: "100px",
                  overflowY: "scroll",
                  "&::-webkit-scrollbar": {
                    width: "5px",
                    height: "7px",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "rgba(0, 0, 0, 0.2)",
                    borderRadius: "10px",
                  },
                  "&::-webkit-scrollbar-track": {
                    backgroundColor: "transparent",
                  },
                }}
              >
                {files &&
                  files.length !== 0 &&
                  files.map((file, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        mt: 1,
                        borderBottom: `1px solid ${theme.palette.divider}`,
                        pb: 1,
                      }}
                    >
                      <InsertDriveFileIcon sx={{ mr: 1 }} />
                      <Typography
                        sx={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "14px",
                          fontWeight: "400",
                          color: theme.palette.text.secondary,
                        }}
                      >
                        {file.name}
                      </Typography>
                    </Box>
                  ))}
              </Box>
            </Grid>
          </Grid>
        )
      case 2:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12} sx={{ mb: 2 }}>
              {" "}
              <Box>
                <Typography
                  sx={{
                    fontSize: "20px",
                    fontWeight: "600",
                    color: theme.palette.text.primary,
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  Social
                </Typography>
              </Box>
            </Grid>
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
                  />
                )}
              />
            </Grid>
          </Grid>
        )
      case 3:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12} sx={{ mb: 2 }}>
              {" "}
              <Box>
                <Typography
                  sx={{
                    fontSize: "20px",
                    fontWeight: "600",
                    color: theme.palette.text.primary,
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  Pricing
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6} lg={6} sm={12}>
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
            <Grid item xs={12} md={6} lg={6} sm={12}>
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
                      sx={{ fontFamily: "Inter, sans-serif", fontSize: "14px" }}
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
                    <FormHelperText sx={{ fontFamily: "Inter, sans-serif" }}>
                      {errors.tags?.message}
                    </FormHelperText>
                  </FormControl>
                )}
              />
            </Grid>
          </Grid>
        )
      default:
        return null
    }
  }

  return (
    <>
      <Typography
        sx={{
          fontWeight: "600",
          fontSize: "30px",
          fontFamily: "Inter, sans-serif",
        }}
      >
        Create
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

      <Box
        sx={{
          flexGrow: 1,
          padding: { xs: "20px", md: "40px 80px", lg: "70px 70px" },
          backgroundColor: theme.palette.background.paper,
          minHeight: "auto",
          borderRadius: "10px",
        }}
      >
        <Box sx={{ mb: 5 }}>
          <Typography
            sx={{
              fontSize: "26px",
              fontWeight: "bold",
              color: theme.palette.text.primary,
              fontFamily: "Inter, sans-serif",
              textAlign: "center",
              mb: 1,
            }}
          >
            Add New Product
          </Typography>
          <Typography
            sx={{
              fontSize: "20px",
              fontWeight: "500",
              color: theme.palette.text.secondary,
              fontFamily: "Inter, sans-serif",
              textAlign: "center",
            }}
          >
            This information will describe more about the product.
          </Typography>
        </Box>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Box sx={{ mt: 4 }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            {renderStepContent(activeStep)}
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography
                  sx={{
                    mt: 2,
                    mb: 1,
                    fontFamily: "Inter, sans-serif",
                    fontSize: "18px",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Product created.
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                  <Box sx={{ flex: "1 1 auto" }} />
                  <Button
                    onClick={handleReset}
                    sx={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "16px",
                      fontWeight: "500",
                      textTransform: "none",
                      backgroundColor: "#5F00D9",
                      color: "white",
                    }}
                  >
                    Reset
                  </Button>
                </Box>
              </React.Fragment>
            ) : (
              <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                <Button
                  variant='outlined'
                  onClick={handleBack}
                  disabled={activeStep === 0}
                  sx={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "14px",
                    fontWeight: "500",
                    textTransform: "none",
                    color: theme.palette.text.secondary,
                    mr: 2,
                  }}
                >
                  Back
                </Button>
                <Button
                  variant='contained'
                  onClick={handleNext}
                  sx={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "14px",
                    fontWeight: "500",
                    textTransform: "none",
                    backgroundColor: "#5F00D9",
                    color: "white",
                  }}
                >
                  {activeStep === steps.length - 1 ? "Submit" : "Next"}
                </Button>
              </Box>
            )}
          </form>
        </Box>
      </Box>
    </>
  )
}

export default ProductCreatePage
