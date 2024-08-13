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
  OutlinedInput,
  MenuItem,
  Chip,
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
import { blogPosts } from "../../../mock/BlogPosts"
import { toast } from "react-toastify"

const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  content: yup.string().required("Content is required"),
  coverImage: yup.mixed().required("Cover image is required"),
  tags: yup.array().of(yup.string()),
  metaTitle: yup.string().required("Meta title is required"),
  metaDescription: yup.string().required("Meta description is required"),
  metaKeywords: yup.string().required("Meta keywords are required"),
  file: yup.mixed().required("A file is required"),
})

const EditBlog = () => {
  const theme = useTheme()
  const location = useLocation()
  const { id } = useParams()
  const blogId = Number(id)
  const pathnames = location.pathname.split("/").filter((x) => x)
  const blog = blogPosts.find((blog) => blog.id === blogId)
  const navigate = useNavigate()

  const [files, setFiles] = useState([blog?.imageUrl])

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: blog?.title || "Understanding React Context API",
      description:
        blog?.description ||
        "A comprehensive guide to using the Context API in React applications.",
      content:
        blog?.content ||
        "Dive deep into the React Context API to manage global state with ease.",
      tags: blog?.tags || ["React", "Context API", "JavaScript"],
      metaTitle:
        blog?.metaTitle ||
        "Understanding React Context API | Comprehensive Guide",
      metaDescription:
        blog?.metaDescription ||
        "Learn how to effectively use React Context API for managing global state in your applications. This guide covers creation, usage, and advanced patterns.",
      metaKeywords:
        blog?.metaKeywords ||
        "React, Context API, JavaScript, State Management",
      file: blog?.imageUrl,
    },
    resolver: yupResolver(schema),
  })

  const onDrop = (acceptedFiles) => {
    setFiles((prevFiles) => [...acceptedFiles, ...prevFiles])
  }

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({
      onDrop,
    })

  const onSubmit = (data) => {
    toast.success("data update successfully.")
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

  const tagOptions = [
    "Enjoy",
    "Travel",
    "Achievement",
    "Technology",
    "Health",
    "Science",
    "Education",
    "Lifestyle",
    "Sports",
    "Art",
    "Music",
    "Food",
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
                  name='title'
                  control={control}
                  defaultValue=''
                  render={({ field }) => (
                    <StyledTextfield
                      {...field}
                      label='Blog Title'
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
                  Cover
                </Typography>
                <Controller
                  control={control}
                  name='file'
                  defaultValue={blog?.imageUrl}
                  render={({ field: { onChange } }) => (
                    <Box
                      {...getRootProps()}
                      sx={{
                        border: "1px dashed #38424d",
                        padding: "60px 30px",
                        textAlign: "center",
                        cursor: "pointer",
                        borderRadius: "10px",
                        backgroundColor: isDragActive
                          ? "rgba(0,0,0,0.1)"
                          : "background.paper",
                      }}
                    >
                      <input
                        {...getInputProps({
                          onChange: (e) => {
                            const file = e.target.files[0]
                            onChange(file)
                          },
                        })}
                      />
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
                              color: "text.primary",
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
                              color: "text.primary",
                            }}
                          >
                            Drag 'n' drop some files here, or click to select
                            files
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  )}
                />
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
                <Controller
                  name='metaTitle'
                  control={control}
                  defaultValue=''
                  render={({ field }) => (
                    <StyledTextfield
                      {...field}
                      label='Meta Title'
                      variant='outlined'
                      fullWidth
                      margin='normal'
                      error={!!errors.metaTitle}
                      helperText={
                        errors.metaTitle ? errors.metaTitle.message : ""
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
                <Controller
                  name='metaDescription'
                  control={control}
                  defaultValue=''
                  render={({ field }) => (
                    <StyledTextfield
                      {...field}
                      label='Meta Description'
                      variant='outlined'
                      fullWidth
                      multiline
                      rows={4}
                      margin='normal'
                      error={!!errors.metaDescription}
                      helperText={
                        errors.metaDescription
                          ? errors.metaDescription.message
                          : ""
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
                <Controller
                  name='metaKeywords'
                  control={control}
                  defaultValue=''
                  render={({ field }) => (
                    <StyledTextfield
                      {...field}
                      label='Meta Keywords'
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
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label='Enable comments'
                  sx={{
                    "& .MuiFormControlLabel-label": {
                      fontFamily: "Inter, sans-serif",
                      fontSize: "16px",
                      fontWeight: "400",
                    },
                  }}
                />
              </form>
            </Box>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}
            >
              <Box>
                <FormControlLabel
                  control={<Switch />}
                  label='Enable comments'
                  sx={{
                    "& .MuiFormControlLabel-label": {
                      fontFamily: "Inter, sans-serif",
                      fontSize: "16px",
                      fontWeight: "400",
                    },
                  }}
                />
              </Box>
              <Box>
                <Button
                  type='submit'
                  onClick={() => navigate("/blog")}
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
                  Save changes
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default EditBlog
