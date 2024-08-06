import React, { useState } from "react"
import {
  Box,
  Grid,
  Avatar,
  Typography,
  Slider,
  Button,
  Modal,
  useTheme,
} from "@mui/material"
import Carousel from "react-material-ui-carousel"

const users = [
  {
    id: 1,
    name: "John Michale",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    email: "John@gmail.com",
  },
  {
    id: 2,
    name: "Jane Smith",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    email: "Jane@gmail.com",
  },

  {
    id: 3,
    name: "Mike Johnson",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    email: "Mike@gmail.com",
  },
  {
    id: 4,
    name: "Emily Davis",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    email: "Emily@gmail.com",
  },
  {
    id: 5,
    name: "David Wilson",
    avatar: "https://randomuser.me/api/portraits/women/3.jpg",
    email: "Jane@gmail.com",
  },
  {
    id: 6,
    name: "Sophia Brown",
    avatar: "https://randomuser.me/api/portraits/men/19.jpg",
    email: "Sophia@gmail.com",
  },
  {
    id: 7,
    name: "James Anderson",
    avatar: "https://randomuser.me/api/portraits/men/4.jpg",
    email: "James@gmail.com",
  },
  {
    id: 8,
    name: "Mia Martinez",
    avatar: "https://randomuser.me/api/portraits/women/4.jpg",
    email: "Jane@gmail.com",
  },
  {
    id: 9,
    name: "Chris Lee",
    avatar: "https://randomuser.me/api/portraits/men/5.jpg",
    email: "Chris@gmail.com",
  },
  {
    id: 10,
    name: "Olivia Taylor",
    avatar: "https://randomuser.me/api/portraits/women/5.jpg",
    email: "Olivia@gmail.com",
  },
]

const QuickTransfer = () => {
  const [amount, setAmount] = useState(0)
  const [open, setOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState(users[0])
  const theme = useTheme()

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleAmountChange = (event, newValue) => {
    setAmount(newValue)
  }

  return (
    <>
      <Grid item lg={4} md={12} xs={12} sm={12}>
        <Box
          sx={{
            backgroundColor: theme.palette.background.paper,
            p: "30px",
            borderRadius: "10px",
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography
            sx={{
              fontFamily: "Inter, sans-serif",
              fontSize: "20px",
              fontWeight: "500",
              mb: 5,
              color: theme.palette.text.primary,
            }}
            gutterBottom
          >
            Quick Transfer
          </Typography>
          <Box sx={{ marginBottom: "40px" }}>
            <Carousel
              autoPlay={false}
              indicators={false}
              navButtonsAlwaysVisible={true}
              cycleNavigation={false}
            >
              {users.map((user, index) => (
                <Box
                  key={index}
                  sx={{
                    textAlign: "center",
                    cursor: "pointer",
                  }}
                  onClick={() => setSelectedUser(user)}
                >
                  <Avatar src={user.avatar} sx={{ margin: "0 auto" }} />
                </Box>
              ))}
            </Carousel>
          </Box>

          <Typography
            sx={{
              fontFamily: "Inter, sans-serif",
              fontSize: "14px",
              fontWeight: "500",
              mb: 3,
            }}
            gutterBottom
          >
            INSERT AMOUNT
          </Typography>
          <Typography
            sx={{
              fontFamily: "Inter, sans-serif",
              fontSize: "25px",
              fontWeight: "bold",
              mb: 3,
              textAlign: "center",
            }}
            gutterBottom
          >
            $ {amount}
          </Typography>
          <Slider
            value={amount}
            onChange={handleAmountChange}
            valueLabelDisplay='auto'
            marks
            step={50}
            min={0}
            max={1000}
            sx={{ marginBottom: "20px", color: "#5F00D9" }}
          />
          <Box>
            <Typography
              sx={{
                fontFamily: "Inter, sans-serif",
                fontSize: "16px",
                fontWeight: "500",
                textAlign: "end",
              }}
            >
              Your Balance: $ 5000
            </Typography>
          </Box>

          <Button
            variant='contained'
            color='primary'
            onClick={handleOpen}
            sx={{
              marginTop: "20px",
              backgroundColor: "#5F00D9",
              textTransform: "none",
              fontFamily: "Inter, sans-serif",
              fontWeight: "500",
              borderRadius: "10px",
              p: "5px 40px",
              color: "white",
            }}
          >
            Transfer
          </Button>
        </Box>
      </Grid>

      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "90%", sm: "60%", md: "40%", lg: "30%" },
            backgroundColor: theme.palette.background.paper,
            boxShadow: 24,
            p: 4,
            borderRadius: "10px",
          }}
        >
          <Typography
            sx={{
              fontFamily: "Inter, sans-serif",
              fontWeight: "500",
              fontSize: "25px",
              mb: 1,
            }}
            gutterBottom
          >
            Transfer to
          </Typography>
          {selectedUser && (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box sx={{ mr: 2 }}>
                {" "}
                <Avatar src={selectedUser.avatar} />
              </Box>
              <Box>
                <Typography
                  sx={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: "500",
                    fontSize: "14px",
                  }}
                >
                  {selectedUser.name}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: "400",
                    fontSize: "12px",
                  }}
                >
                  {selectedUser.email}
                </Typography>
              </Box>
            </Box>
          )}
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              m: "20px 0px 20px 0px",
            }}
          >
            <Typography
              gutterBottom
              sx={{
                fontFamily: "Inter, sans-serif",
                fontWeight: "bold",
                fontSize: "20px",
              }}
            >
              $&nbsp;<u>{amount}</u>
            </Typography>
          </Box>
          <Box>
            <textarea
              placeholder='Your message'
              rows={4}
              style={{
                padding: "10px",
                border: "1px solid #38424d",
                borderRadius: "10px",
                fontSize: "14px",
                width: "100%",
                fontFamily: "Inter, sans-serif",
              }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "5px",
            }}
          >
            {" "}
            <Button
              variant='contained'
              sx={{
                marginTop: "20px",
                backgroundColor: "red",
                textTransform: "none",
                fontFamily: "Inter, sans-serif",
                fontWeight: "500",
                borderRadius: "10px",
                p: "5px 40px",
                color: "white",
              }}
              onClick={handleClose}
            >
              Cancle
            </Button>
            <Button
              variant='contained'
              color='primary'
              sx={{
                marginTop: "20px",
                backgroundColor: "#5F00D9",
                textTransform: "none",
                fontFamily: "Inter, sans-serif",
                fontWeight: "500",
                borderRadius: "10px",
                p: "5px 40px",
                color: "white",
              }}
              onClick={handleClose}
            >
              Send
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  )
}

export default QuickTransfer
