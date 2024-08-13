import {
  Box,
  Breadcrumbs,
  Link,
  Typography,
  useTheme,
  Grid,
  TextField,
  Button,
  FormControlLabel,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  MenuItem,
  Chip,
  FormGroup,
  Checkbox,
} from "@mui/material"
import {
  useLocation,
  Link as RouterLink,
  useParams,
  useNavigate,
} from "react-router-dom"
import NavigateNextIcon from "@mui/icons-material/NavigateNext"
import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import { styled } from "@mui/system"
import { useDropzone } from "react-dropzone"
import CloudUploadIcon from "@mui/icons-material/CloudUpload"
import { useState } from "react"
import { mockTours } from "../../../mock/mockTours"
import { toast } from "react-toastify"

const schema = yup.object().shape({
  name: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  content: yup.string().required("Content is required"),
  coverImage: yup.mixed().required("Cover image is required"),
  tags: yup.array().of(yup.string()).required("Tags is required"),
  guideName: yup.string().required("Tour guide is required"),
  duration: yup.string().required("Duration is required"),
  expiration: yup.date().required("Expiration date is required"),
  date: yup.date().required("Posted date is required"),
  services: yup.array().of(yup.string()).required("Services is required"),
  location: yup.string().required("Location is required"),
})

const EditTour = () => {
  const [files, setFiles] = useState([])
  const theme = useTheme()
  const location = useLocation()
  const pathnames = location.pathname.split("/").filter((x) => x)
  const { id } = useParams()
  const tourId = Number(id)
  const tour = mockTours.find((tour) => tour.id === tourId)
  const navigate = useNavigate()

  const getTodayDate = () => {
    const today = new Date()
    const yyyy = today.getFullYear()
    const mm = String(today.getMonth() + 1).padStart(2, "0")
    const dd = String(today.getDate()).padStart(2, "0")
    return `${yyyy}-${mm}-${dd}`
  }

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: tour?.name || "Tropical Paradise",
      description:
        tour?.description ||
        "Experience the beauty of the tropics with our exclusive tour.",
      content:
        tour?.content ||
        "Enjoy a week-long vacation in a tropical paradise, where the crystal-clear waters meet the golden sands. Indulge in luxurious accommodations, gourmet dining, and thrilling water sports, all set in the serene beauty of the Maldives. Perfect for couples and families looking to unwind.",
      duration: tour?.duration || "7 Days",
      price: tour?.price || "$2,499",
      rating: tour?.rating || 4.2,
      date: tour?.date || getTodayDate(),
      location: tour?.location || "Maldives",
      expiration: tour?.expiration || "2024-12-31",
      tags: tour?.tags || ["tropical", "beach", "luxury"],
      images: tour?.images || [
        "https://api-dev-minimal-v510.vercel.app/assets/images/travel/travel_1.jpg",
        "https://api-dev-minimal-v510.vercel.app/assets/images/travel/travel_2.jpg",
        "https://api-dev-minimal-v510.vercel.app/assets/images/travel/travel_3.jpg",
      ],
      guideName: tour?.guideName || "John Smith",
      contactNumber: tour?.contactNumber || "+1 555-1234",
      services: tour?.services || [
        "Accommodation",
        "Meals",
        "Water Sports",
        "Guided Tours",
      ],
      reviews: tour?.reviews || "236",
    },
    resolver: yupResolver(schema),
  })

  const onDrop = (acceptedFiles) => {
    setFiles((prevFiles) => [...acceptedFiles, ...prevFiles])
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  })

  const onSubmit = (data) => {
    console.log(data)
  }

  const StyledTextfield = styled(TextField)({
    borderRadius: "8px",
    backgroundColor: theme.palette.background.paper,
    "& .MuiFormLabel-root": {
      fontFamily: "Inter, sans-serif",
      fontSize: "14px",
    },
  })

  const guideOptions = [
    "John Michale",
    "John Smith",
    "Emily Brown",
    "Maria Garcia",
    "David Nkosi",
    "Olaf Hansen",
    "Carlos Mendes",
    "Sarah Johnson",
    "James Williams",
    "Sophia Lee",
    "Franco Rossi",
    "Linda Adams",
  ]

  const services = [
    "Accommodation",
    "Meals",
    "Water Sports",
    "Guided Tours",
    "Guided Hikes",
    "Camping Gear",
    "Museum Tickets",
    "Winter Gear",
    "Boat Tours",
    "City Tours",
    "Exclusive Access",
    "Camel Rides",
    "Cultural Tours",
    "Boat Transfers",
    "Island Tours",
    "Entry Fees",
    "Wine Tastings",
    "Restaurant Reservations",
    "Onboard Entertainment",
    "Excursions",
  ]

  const tagOptions = [
    "tropical",
    "beach",
    "luxury",
    "mountains",
    "adventure",
    "hiking",
    "culture",
    "history",
    "europe",
    "safari",
    "wildlife",
    "luxury",
    "arctic",
    "nature",
    "rainforest",
    "eco-tourism",
    "city",
    "desert",
    "islands",
    "beach",
    "ancient",
    "wine",
    "gastronomy",
    "cruise",
    "relaxation",
  ]

  return (
    <>
      <Box
        sx={{
          padding: { xs: "30px", md: "40px 80px", lg: "70px 70px" },
          backgroundColor: theme.palette.background.box,
          minHeight: { lg: "93vh", md: "95vh", sm: "110vh", xs: "140vh" },
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
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box>
              <Typography
                sx={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "25px",
                  fontWeight: "600",
                }}
              >
                Details
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "14px",
                  fontWeight: "400",
                  color: theme.palette.text.secondary,
                }}
              >
                Title, short description, image...
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={8}>
            <Box
              sx={{
                backgroundColor: theme.palette.background.paper,
                p: 2,
                borderRadius: "10px",
              }}
            >
              <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                  name='name'
                  control={control}
                  defaultValue=''
                  render={({ field }) => (
                    <StyledTextfield
                      {...field}
                      label='Name'
                      variant='outlined'
                      fullWidth
                      margin='normal'
                      error={!!errors.name}
                      helperText={errors.name ? errors.name.message : ""}
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
                <Controller
                  name='description'
                  control={control}
                  defaultValue=''
                  render={({ field }) => (
                    <StyledTextfield
                      {...field}
                      label='Description'
                      variant='outlined'
                      fullWidth
                      margin='normal'
                      multiline
                      rows={4}
                      error={!!errors.description}
                      helperText={
                        errors.description ? errors.description.message : ""
                      }
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
                <Typography
                  sx={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "14px",
                    fontWeight: "500",
                    mt: 1,
                    mb: 1,
                  }}
                >
                  Content
                </Typography>
                <Controller
                  name='content'
                  control={control}
                  defaultValue=''
                  render={({ field }) => (
                    <Box
                      sx={{
                        "& .quill": {
                          border: "1px solid #38424d",
                          borderRadius: "5px",
                          minHeight: "200px",
                          "& .ql-container": {
                            borderRadius: "0px 0px 5px 5px",
                            border: "1px solid #38424d",
                          },
                          "& .ql-toolbar": {
                            borderRadius: "5px 5px 0 0",
                            border: "1px solid #38424d",
                          },
                          "& .ql-editor": {
                            minHeight: "155px",
                          },
                        },
                      }}
                    >
                      <ReactQuill
                        {...field}
                        theme='snow'
                        onChange={(content) => setValue("content", content)}
                      />
                    </Box>
                  )}
                />
                {errors.content && (
                  <Typography color='error' variant='body2'>
                    {errors.content.message}
                  </Typography>
                )}
                <Typography
                  sx={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "14px",
                    fontWeight: "500",
                    mt: 2,
                    mb: 1,
                  }}
                >
                  Images
                </Typography>
                <Box
                  {...getRootProps()}
                  sx={{
                    border: "1px dashed #38424d",
                    padding: "60px 30px",
                    textAlign: "center",
                    cursor: "pointer",
                    borderRadius: "10px",
                    backgroundColor: isDragActive
                      ? theme.palette.action.hover
                      : "background.paper",
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
              </form>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box>
              <Typography
                sx={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "25px",
                  fontWeight: "600",
                }}
              >
                Properties
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "14px",
                  fontWeight: "400",
                  color: theme.palette.text.secondary,
                }}
              >
                Additional functions and attributes...
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={8}>
            <Box
              sx={{
                backgroundColor: theme.palette.background.paper,
                p: 2,
                borderRadius: "10px",
              }}
            >
              <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl fullWidth margin='normal' variant='outlined'>
                  <InputLabel
                    sx={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "14px",
                      fontWeight: "500",
                    }}
                  >
                    Tour guide
                  </InputLabel>
                  <Controller
                    name='guideName'
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        labelId='role-label'
                        label='Role'
                        sx={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "14px",
                          fontWeight: "500",
                          color: theme.palette.text.primary,
                        }}
                      >
                        {guideOptions.map((name) => (
                          <MenuItem
                            key={name}
                            value={name}
                            sx={{
                              fontFamily: "Inter, sans-serif",
                              fontSize: "14px",
                              fontWeight: "500",
                            }}
                          >
                            {name}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                  {errors.guideName && (
                    <Typography color='error' variant='body2'>
                      {errors.guideName.message}
                    </Typography>
                  )}
                </FormControl>

                <Grid container spacing={2}>
                  <Grid item lg={6} md={12} sm={12} xs={12}>
                    <Controller
                      name='date'
                      control={control}
                      render={({ field, fieldState }) => (
                        <StyledTextfield
                          type='date'
                          label='Posted Date'
                          fullWidth
                          InputLabelProps={{ shrink: true }}
                          {...field}
                          error={!!fieldState.error}
                          helperText={fieldState.error?.message}
                          InputProps={{
                            style: {
                              fontFamily: "Inter, sans-serif",
                              fontSize: "14px",
                              fontWeight: "500",
                              color: theme.palette.text.primary,
                            },
                          }}
                          sx={{ mt: 2, mb: 1 }}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item lg={6} md={12} sm={12} xs={12}>
                    <Controller
                      name='expiration'
                      control={control}
                      render={({ field, fieldState }) => (
                        <StyledTextfield
                          type='date'
                          label='Expiration Date'
                          fullWidth
                          InputLabelProps={{ shrink: true }}
                          {...field}
                          error={!!fieldState.error}
                          helperText={fieldState.error?.message}
                          InputProps={{
                            style: {
                              fontFamily: "Inter, sans-serif",
                              fontSize: "14px",
                              fontWeight: "500",
                              color: theme.palette.text.primary,
                            },
                          }}
                          sx={{ mt: 2, mb: 1 }}
                        />
                      )}
                    />
                  </Grid>
                </Grid>

                <Controller
                  name='duration'
                  control={control}
                  defaultValue=''
                  render={({ field }) => (
                    <StyledTextfield
                      {...field}
                      label='Duration'
                      variant='outlined'
                      fullWidth
                      margin='normal'
                      error={!!errors.metaKeywords}
                      helperText={
                        errors.metaKeywords ? errors.metaKeywords.message : ""
                      }
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
                {errors.duration && (
                  <Typography color='error' variant='body2'>
                    {errors.duration.message}
                  </Typography>
                )}

                <Controller
                  name='location'
                  control={control}
                  defaultValue=''
                  render={({ field }) => (
                    <StyledTextfield
                      {...field}
                      label='Destination'
                      variant='outlined'
                      fullWidth
                      margin='normal'
                      error={!!errors.metaKeywords}
                      helperText={
                        errors.metaKeywords ? errors.metaKeywords.message : ""
                      }
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
                {errors.location && (
                  <Typography color='error' variant='body2'>
                    {errors.location.message}
                  </Typography>
                )}

                <FormControl fullWidth margin='normal' variant='outlined'>
                  <InputLabel
                    sx={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "14px",
                      fontWeight: "500",
                    }}
                  >
                    Tags
                  </InputLabel>
                  <Controller
                    name='tags'
                    control={control}
                    defaultValue={[]}
                    render={({ field }) => (
                      <Select
                        {...field}
                        label='Tags'
                        multiple
                        input={<OutlinedInput label='Tags' />}
                        renderValue={(selected) => (
                          <Box
                            sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}
                          >
                            {selected.map((value) => (
                              <Chip key={value} label={value} />
                            ))}
                          </Box>
                        )}
                        MenuProps={{
                          PaperProps: {
                            style: {
                              maxHeight: 48 * 4.5 + 8,
                              width: 250,
                            },
                          },
                        }}
                      >
                        {tagOptions.map((tag) => (
                          <MenuItem
                            key={tag}
                            value={tag}
                            sx={{
                              fontFamily: "Inter, sans-serif",
                              fontSize: "14px",
                              fontWeight: "500",
                            }}
                          >
                            {tag}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                  {errors.tags && (
                    <Typography color='error' variant='body2'>
                      {errors.tags.message}
                    </Typography>
                  )}
                </FormControl>

                <InputLabel component='legend'>
                  {" "}
                  <Typography
                    sx={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "14px",
                      fontWeight: "500",
                      mt: 1,
                      mb: 1,
                      color: theme.palette.text.primary,
                    }}
                  >
                    Services
                  </Typography>
                </InputLabel>
                <FormGroup>
                  <Grid container spacing={0.2}>
                    {services.map((service, index) => (
                      <Grid item sm={6} xs={12} key={service}>
                        <FormControlLabel
                          control={
                            <Controller
                              name='services'
                              control={control}
                              render={({ field }) => (
                                <Checkbox
                                  {...field}
                                  value={service}
                                  checked={field.value.includes(service)}
                                  onChange={(e) => {
                                    const checked = e.target.checked
                                    if (checked) {
                                      field.onChange([...field.value, service])
                                    } else {
                                      field.onChange(
                                        field.value.filter(
                                          (item) => item !== service
                                        )
                                      )
                                    }
                                  }}
                                  sx={{
                                    color: "primary.main",
                                    "&.Mui-checked": {
                                      color: "#5F00D9",
                                    },
                                    "& .MuiSvgIcon-root": {
                                      fontSize: 20,
                                    },
                                    "&:hover": {
                                      bgcolor: "transparent",
                                    },
                                  }}
                                />
                              )}
                            />
                          }
                          label={service}
                          sx={{
                            "& .MuiTypography-root": {
                              fontFamily: "Inter, sans-serif",
                              fontSize: "14px",
                              fontWeight: "500",
                            },
                          }}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </FormGroup>

                {errors.services && (
                  <Typography color='error' variant='body2'>
                    {errors.services?.message}
                  </Typography>
                )}
              </form>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Button
                  type='submit'
                  onClick={() => {
                    navigate("/tour")
                    toast.success("Data updated successfully.")
                  }}
                  variant='contained'
                  color='primary'
                  sx={{
                    backgroundColor: "#5F00D9",
                    textTransform: "none",
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "white",
                    fontFamily: "Inter, sans-serif",
                    borderRadius: "5px",
                    padding: "5px 40px",
                  }}
                >
                  Submit
                </Button>
              </form>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default EditTour
