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
  Switch,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  RadioGroup,
  Radio,
  FormGroup,
  FormLabel,
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
import { jobPosts as mockJobPosts } from "../../../mock/JobPosts"
import { toast } from "react-toastify"

const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  content: yup.string().required("Content is required"),
  experience: yup.string().required("Experience is required"),
  role: yup.string().required("Role is required"),
  skills: yup.array().of(yup.string()).required("Skills are required"),
  location: yup.string().required("Location is required"),
  expirationDate: yup.date().required("Expiration date is required"),
  salary: yup
    .string()
    .typeError("Salary must be a number")
    .required("Salary is required"),
  benefits: yup.array().of(yup.string()).min(1, "Select at least one benefit"),
})

const EditJob = () => {
  const theme = useTheme()
  const location = useLocation()
  const pathnames = location.pathname.split("/").filter((x) => x)
  const { id } = useParams()
  const jobId = Number(id)
  const job = mockJobPosts.find((job) => job.id === jobId)
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
      title: job?.jobMainPosition || "Software Engineer",
      description:
        job?.jobDescription ||
        "Join our team to develop and maintain cutting-edge web applications using modern frameworks and tools. Collaborate with cross-functional teams and contribute to the entire development lifecycle.",
      content:
        job?.keyResponsibilities ||
        "Write clean code, collaborate with team members, review pull requests, participate in code reviews.",
      employeeType: job?.jobType || ["Part-Time", "Full-Time"],
      experience: "6 months",
      role: job?.subPosition || "Frontend Developer",
      location: job?.location || "San Francisco, CA",
      createdDate: job?.createdDate || getTodayDate(),
      expirationDate: job?.expirationDate || "2024-09-01",
      salary: job?.amount || "$80,000",
      skills: job?.skills || ["JavaScript", "React", "CSS"],
      benefits: job?.benefits || ["Health Insurance", "Paid Time Off"],
    },
    resolver: yupResolver(schema),
  })

  const onSubmit = (data) => {
    navigate("/job")
    toast.success("data updated successfully")
  }

  const StyledTextfield = styled(TextField)({
    borderRadius: "8px",
    backgroundColor: theme.palette.background.paper,
    "& .MuiFormLabel-root": {
      fontFamily: "Inter, sans-serif",
      fontSize: "14px",
    },
  })

  const roleOptions = Array.from(
    new Set(mockJobPosts.map((job) => job.subPosition))
  )

  const locations = Array.from(new Set(mockJobPosts.map((job) => job.location)))

  const benefits = [
    "Health Insurance",
    "Paid Time Off",
    "Flexible Hours",
    "Remote Work",
    "Retirement Plans",
    "Professional Development",
    "Commission",
  ]

  const jobType = ["Part-Time", "Full-Time", "Contract", "Permanent"]

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
                Title, short description.....
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
                  name='title'
                  control={control}
                  defaultValue=''
                  render={({ field }) => (
                    <StyledTextfield
                      {...field}
                      label='Ex:Software Engineer'
                      variant='outlined'
                      fullWidth
                      margin='normal'
                      error={!!errors.title}
                      helperText={errors.title ? errors.title.message : ""}
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
                      label='Job description'
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
                <FormLabel component='legend'>
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
                    Employee type
                  </Typography>
                </FormLabel>
                <FormGroup row>
                  {jobType.map((jobTypes) => (
                    <FormControlLabel
                      key={jobTypes}
                      control={
                        <Controller
                          name='employeeType'
                          control={control}
                          render={({ field }) => (
                            <Checkbox
                              {...field}
                              checked={field.value.includes(jobTypes)}
                              onChange={(e) => {
                                const checked = e.target.checked
                                if (checked) {
                                  field.onChange([...field.value, jobTypes])
                                } else {
                                  field.onChange(
                                    field.value.filter(
                                      (item) => item !== jobTypes
                                    )
                                  )
                                }
                              }}
                              value={jobTypes}
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
                      label={jobTypes}
                      sx={{
                        "& .MuiTypography-root": {
                          fontFamily: "Inter, sans-serif",
                          fontSize: "14px",
                          fontWeight: "500",
                        },
                      }}
                    />
                  ))}
                </FormGroup>
                {errors.employeeType && (
                  <Typography color='error' variant='body2'>
                    {errors.employeeType?.message}
                  </Typography>
                )}

                <FormLabel component='legend'>
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
                    Experience
                  </Typography>
                </FormLabel>
                <Controller
                  name='experience'
                  control={control}
                  render={({ field }) => (
                    <RadioGroup {...field} row>
                      {[
                        "No Experience",
                        "6 months",
                        "1-2 Years",
                        "2+ Years",
                      ].map((option) => (
                        <FormControlLabel
                          key={option}
                          value={option}
                          control={
                            <Radio
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
                          }
                          label={option}
                          sx={{
                            "& .MuiTypography-root": {
                              fontFamily: "Inter, sans-serif",
                              fontSize: "14px",
                              fontWeight: "500",
                            },
                          }}
                        />
                      ))}
                    </RadioGroup>
                  )}
                />
                {errors.experience && (
                  <Typography color='error' variant='body2'>
                    {errors.experience?.message}
                  </Typography>
                )}

                <FormControl fullWidth margin='normal'>
                  <InputLabel id='role-label'>
                    <Typography
                      sx={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "14px",
                        fontWeight: "400",
                      }}
                    >
                      Role
                    </Typography>
                  </InputLabel>
                  <Controller
                    control={control}
                    name='role'
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
                        {roleOptions.map((role) => (
                          <MenuItem
                            key={role}
                            value={role}
                            sx={{
                              fontFamily: "Inter, sans-serif",
                              fontSize: "14px",
                              fontWeight: "500",
                            }}
                          >
                            {role}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                </FormControl>
                {errors.role && (
                  <Typography color='error' variant='body2'>
                    {errors.role?.message}
                  </Typography>
                )}

                <Controller
                  name='skills'
                  control={control}
                  defaultValue=''
                  render={({ field }) => (
                    <StyledTextfield
                      {...field}
                      label='Skills'
                      variant='outlined'
                      fullWidth
                      margin='normal'
                      error={!!errors.skills}
                      helperText={errors.skills ? errors.skills.message : ""}
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

                <FormControl fullWidth margin='normal'>
                  <InputLabel id='role-label'>
                    <Typography
                      sx={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "14px",
                        fontWeight: "400",
                      }}
                    >
                      Location
                    </Typography>
                  </InputLabel>
                  <Controller
                    control={control}
                    name='location'
                    render={({ field }) => (
                      <Select
                        {...field}
                        labelId='location-label'
                        label='Location'
                        sx={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "14px",
                          fontWeight: "500",
                        }}
                      >
                        {locations.map((location) => (
                          <MenuItem
                            key={location}
                            value={location}
                            sx={{
                              fontFamily: "Inter, sans-serif",
                              fontSize: "14px",
                              fontWeight: "500",
                            }}
                          >
                            {location}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                </FormControl>
                {errors.location && (
                  <Typography color='error' variant='body2'>
                    {errors.location?.message}
                  </Typography>
                )}

                <Controller
                  name='createdDate'
                  control={control}
                  render={({ field, fieldState }) => (
                    <StyledTextfield
                      type='date'
                      label='Created Date'
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

                <Controller
                  name='expirationDate'
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

                <Controller
                  name='salary'
                  control={control}
                  defaultValue=''
                  render={({ field }) => (
                    <StyledTextfield
                      {...field}
                      label='Salary'
                      variant='outlined'
                      fullWidth
                      margin='normal'
                      error={!!errors.salary}
                      helperText={errors.salary ? errors.salary.message : ""}
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
                <Box>
                  <FormControlLabel
                    control={<Switch defaultChecked />}
                    label='Salary is nagotiable'
                    sx={{
                      "& .MuiFormControlLabel-label": {
                        fontFamily: "Inter, sans-serif",
                        fontSize: "14px",
                        fontWeight: "500",
                        mt: 2,
                        mb: 2,
                      },
                    }}
                  />
                </Box>

                <FormLabel component='legend'>
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
                    Benefits
                  </Typography>
                </FormLabel>
                <FormGroup row>
                  {benefits.map((benefit) => (
                    <FormControlLabel
                      key={benefit}
                      control={
                        <Controller
                          name='benefits'
                          control={control}
                          render={({ field }) => (
                            <Checkbox
                              {...field}
                              checked={field.value.includes(benefit)}
                              value={benefit}
                              onChange={(e) => {
                                const checked = e.target.checked
                                if (checked) {
                                  field.onChange([...field.value, benefit])
                                } else {
                                  field.onChange(
                                    field.value.filter(
                                      (item) => item !== benefit
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
                      label={benefit}
                      sx={{
                        "& .MuiTypography-root": {
                          fontFamily: "Inter, sans-serif",
                          fontSize: "14px",
                          fontWeight: "500",
                        },
                      }}
                    />
                  ))}
                </FormGroup>

                {errors.benefits && (
                  <Typography color='error' variant='body2'>
                    {errors.benefits?.message}
                  </Typography>
                )}
              </form>
            </Box>
            <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Button
                  type='submit'
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

export default EditJob
