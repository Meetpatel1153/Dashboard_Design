import React, { useState } from "react"
import {
  Button,
  Grid,
  Modal,
  Box,
  Typography,
  useTheme,
  CircularProgress,
} from "@mui/material"
import { Stack } from "@mui/system"
import { useDropzone } from "react-dropzone"
import CloudUploadIcon from "@mui/icons-material/CloudUpload"
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile"
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto"
import MovieIcon from "@mui/icons-material/Movie"
import DescriptionIcon from "@mui/icons-material/Description"
import FolderIcon from "@mui/icons-material/Folder"

const UploadFile = () => {
  const theme = useTheme()
  const [open, setOpen] = useState(false)
  const [files, setFiles] = useState([])

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const dataUsage = 22.35
  const totalStorage = 50
  const storageUsagePercentage = (dataUsage / totalStorage) * 100

  const onDrop = (acceptedFiles) => {
    setFiles((prevFiles) => [...acceptedFiles, ...prevFiles])
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  })

  const fileData = [
    {
      type: "Images",
      count: 120,
      size: 11.18,
      icon: <InsertPhotoIcon />,
    },
    {
      type: "Media",
      count: 80,
      size: 4.47,
      icon: <MovieIcon />,
    },
    {
      type: "Documents",
      count: 4.47,
      size: 10,
      icon: <DescriptionIcon />,
    },
    {
      type: "Other",
      count: 2.24,
      size: 5,
      icon: <FolderIcon />,
    },
  ]

  const UploadButton = (
    <>
      <Button
        variant='contained'
        onClick={handleOpen}
        sx={{
          backgroundColor: "#5F00D9",
          textTransform: "none",
          fontSize: "14px",
          fontWeight: "500",
          color: "white",
          fontFamily: "Inter, sans-serif",
          borderRadius: "5px",
          padding: "5px 10px",
        }}
      >
        Upload File
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "90%", sm: "60%", md: "40%", lg: "30%" },
            bgcolor: theme.palette.background.paper,
            border: "0px solid #000",
            p: 4,
            borderRadius: "10px",
          }}
        >
          <Box
            {...getRootProps()}
            sx={{
              border: "1px dashed #38424d",
              padding: "30px",
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
                <CloudUploadIcon sx={{ fontSize: "40px", color: "#5F00D9" }} />
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
                <CloudUploadIcon sx={{ fontSize: "40px", color: "#5F00D9" }} />
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
              maxHeight: "200px",
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
        </Box>
      </Modal>
    </>
  )

  const DataUsage = (
    <>
      <Box
        sx={{
          backgroundColor: theme.palette.background.paper,
          borderRadius: "10px",
          padding: "20px",
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            mb: 4,
          }}
        >
          <Box position='relative' display='inline-flex'>
            <CircularProgress
              variant='determinate'
              value={100}
              size={160}
              thickness={4}
              sx={{ color: theme.palette.background.box }}
            />
            <CircularProgress
              variant='determinate'
              value={storageUsagePercentage}
              size={160}
              thickness={4}
              sx={{ color: "#5F00D9", position: "absolute", left: 0 }}
            />
            <Box
              sx={{
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                position: "absolute",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <Typography
                sx={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "20px",
                  fontWeight: "500",
                  color: theme.palette.text.primary,
                }}
              >
                {dataUsage}GB
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "14px",
                  fontWeight: "400",
                  color: theme.palette.text.secondary,
                }}
              >
                of {totalStorage}GB used
              </Typography>
            </Box>
          </Box>
        </Box>

        <Grid container spacing={2}>
          {fileData.map((file, index) => (
            <Grid item xs={12} key={index}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",

                  pt: 1,
                }}
              >
                {file.icon}
                <Box sx={{ ml: 2, flex: 1 }}>
                  <Typography
                    sx={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "14px",
                      fontWeight: "500",
                      color: theme.palette.text.primary,
                    }}
                  >
                    {file.type}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "12px",
                      fontWeight: "400",
                      color: theme.palette.text.secondary,
                    }}
                  >
                    {file.count} files
                  </Typography>
                </Box>
                <Typography
                  sx={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "14px",
                    fontWeight: "500",
                    color: theme.palette.text.primary,
                  }}
                >
                  {file.size}GB
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  )

  return (
    <>
      <Grid item xs={12} md={12} sm={12} lg={4}>
        <Stack spacing={2}>
          {UploadButton}
          {DataUsage}
        </Stack>
      </Grid>
    </>
  )
}

export default UploadFile
