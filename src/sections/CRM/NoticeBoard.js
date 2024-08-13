import React, { useState } from "react"
import {
  Typography,
  IconButton,
  Modal,
  Box,
  useTheme,
  TableContainer,
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
} from "@mui/material"
import FullscreenIcon from "@mui/icons-material/Fullscreen"
import CloseIcon from "@mui/icons-material/Close"
import { NoticeBoardData } from "../../mock/CRM"

const NoticeBoard = () => {
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
              Notice Board
            </Typography>
          </Box>

          <Box>
            <IconButton onClick={handleOpen}>
              <FullscreenIcon />
            </IconButton>
          </Box>
        </Box>
        <TableContainer
          sx={{
            height: "34vh",
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
          <Table aria-label='customized table'>
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "14px",
                    fontWeight: "bold",
                  }}
                >
                  Notice
                </TableCell>
                <TableCell
                  sx={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "14px",
                    fontWeight: "bold",
                  }}
                >
                  Published by
                </TableCell>
                <TableCell
                  sx={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "14px",
                    fontWeight: "bold",
                  }}
                >
                  Date Added
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {NoticeBoardData.map((row) => (
                <TableRow>
                  <TableCell
                    component='th'
                    scope='row'
                    sx={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "14px",
                      fontWeight: "500",
                    }}
                  >
                    {row.notice}
                  </TableCell>
                  <TableCell
                    component='th'
                    scope='row'
                    sx={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "14px",
                      fontWeight: "500",
                    }}
                  >
                    {row.name}
                  </TableCell>
                  <TableCell
                    component='th'
                    scope='row'
                    sx={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "14px",
                      fontWeight: "500",
                    }}
                  >
                    {row.date}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
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
          <TableContainer>
            <Table aria-label='customized table'>
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "14px",
                      fontWeight: "bold",
                    }}
                  >
                    Notice
                  </TableCell>
                  <TableCell
                    sx={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "14px",
                      fontWeight: "bold",
                    }}
                  >
                    Published by
                  </TableCell>
                  <TableCell
                    sx={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "14px",
                      fontWeight: "bold",
                    }}
                  >
                    Date Added
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {NoticeBoardData.map((row) => (
                  <TableRow>
                    <TableCell
                      component='th'
                      scope='row'
                      sx={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "14px",
                        fontWeight: "500",
                      }}
                    >
                      {row.notice}
                    </TableCell>
                    <TableCell
                      component='th'
                      scope='row'
                      sx={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "14px",
                        fontWeight: "500",
                      }}
                    >
                      {row.name}
                    </TableCell>
                    <TableCell
                      component='th'
                      scope='row'
                      sx={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "14px",
                        fontWeight: "500",
                      }}
                    >
                      {row.date}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Modal>
    </>
  )
}

export default NoticeBoard
