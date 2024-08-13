import React, { useState } from "react"
import {
  Grid,
  Typography,
  IconButton,
  Modal,
  Box,
  useTheme,
  LinearProgress,
} from "@mui/material"
import FullscreenIcon from "@mui/icons-material/Fullscreen"
import CloseIcon from "@mui/icons-material/Close"
import { RunningProject } from "../../mock/CRM"

const RunningProjects = () => {
  const [open, setOpen] = useState(false)
  const theme = useTheme()

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <>
      <Box
        elevation={3}
        sx={{
          padding: 2,
          backgroundColor: theme.palette.background.paper,
          borderRadius: "10px",
          position: "relative",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box>
            {" "}
            <Typography
              sx={{
                fontFamily: "Inter, sans-serif",
                fontSize: "20px",
                fontWeight: "600",
              }}
            >
              Running Projects
            </Typography>
          </Box>

          <Box>
            <IconButton onClick={handleOpen}>
              <FullscreenIcon />
            </IconButton>
          </Box>
        </Box>
        <Box
          sx={{
            height: "31vh",
            overflowY: "auto",
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
          {RunningProject.map((data) => (
            <>
              <Grid
                container
                alignItems='center'
                justifyContent='space-between'
                sx={{ mt: 3 }}
              >
                <Grid item>
                  <Typography
                    sx={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "14px",
                      fontWeight: "500",
                      mb: 0.8,
                    }}
                  >
                    {data.title}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography
                    sx={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "11px",
                      fontWeight: "500",
                      backgroundColor: data.color,
                      padding: "1px 6px",
                      borderRadius: "10px",
                      mb: 1,
                    }}
                  >
                    {data.status}
                  </Typography>
                </Grid>
              </Grid>
              <Box>
                <LinearProgress
                  variant='determinate'
                  value={data.value}
                  sx={{
                    p: "2.5px",
                    borderRadius: "10px",
                    "& .MuiLinearProgress-bar": {
                      backgroundColor: data.color,
                      borderRadius: "10px",
                    },
                  }}
                />
              </Box>
            </>
          ))}
        </Box>
      </Box>

      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "90vw",
            height: "90vh",
            backgroundColor: theme.palette.background.paper,
            borderRadius: "10px",
            padding: 4,
            overflowY: "auto",
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
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box>
              {" "}
              <Typography
                sx={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "20px",
                  fontWeight: "600",
                }}
              >
                Upcoming events
              </Typography>
            </Box>
            <Box>
              <IconButton onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </Box>
          </Box>
          <Box>
            {RunningProject.map((data) => (
              <>
                <Grid
                  container
                  alignItems='center'
                  justifyContent='space-between'
                  sx={{
                    mt: 3,
                    mb: 1,
                  }}
                >
                  <Grid item>
                    <Typography
                      sx={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "13px",
                        fontWeight: "500",
                      }}
                    >
                      {data.title}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography
                      sx={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "11px",
                        fontWeight: "500",
                        backgroundColor: data.color,
                        padding: "1px 6px",
                        borderRadius: "10px",
                      }}
                    >
                      {data.status}
                    </Typography>
                  </Grid>
                </Grid>
                <Box>
                  <LinearProgress
                    variant='determinate'
                    value={data.value}
                    sx={{
                      p: "2.5px",
                      borderRadius: "10px",
                      "& .MuiLinearProgress-bar": {
                        backgroundColor: data.color,
                        borderRadius: "10px",
                      },
                    }}
                  />
                </Box>
              </>
            ))}
          </Box>
        </Box>
      </Modal>
    </>
  )
}

export default RunningProjects
