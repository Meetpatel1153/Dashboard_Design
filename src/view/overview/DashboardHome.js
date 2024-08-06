import {
  Box,
  Typography,
  Button,
  Grid,
  Divider,
  Tabs,
  Tab,
  useTheme,
} from "@mui/material"
import React, { useState } from "react"
import { HiDownload } from "react-icons/hi"
import { HiOutlineArrowNarrowUp } from "react-icons/hi"
import { FaPlusCircle } from "react-icons/fa"
import { FaCircleMinus } from "react-icons/fa6"
import { AiFillDollarCircle } from "react-icons/ai"
import { SiBitcoinsv } from "react-icons/si"
import ZigzagGraph from "../../components/Zigzage"

const transactions = [
  {
    avatar: <AiFillDollarCircle size={22} />,
    type: "INR Deposit",
    timestamp: "2022-06-09 7:06 PM",
    amount: "+ ₹81,123.10",
    description: "",
  },
  {
    avatar: <SiBitcoinsv size={20} />,
    type: "BTC Sell",
    timestamp: "2022-05-27 12:32 PM",
    amount: "- 12.48513391 BTC",
    description: "+ $81,123.10",
  },
  {
    avatar: <AiFillDollarCircle size={22} />,
    type: "INR Deposit",
    timestamp: "2022-06-09 7:06 PM",
    amount: "+ ₹81,123.10",
    description: "",
  },
]

const DashboardHome = () => {
  const [value, setValue] = useState(1)
  const theme = useTheme()

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          padding: { xs: "20px", md: "40px 80px", lg: "70px 70px" },
          backgroundColor: theme.palette.background.box,
          minHeight: "92vh",
        }}
      >
        <Grid container spacing={2}>
          {/* Portfolio value section */}
          <Grid item xs={12}>
            <Box
              sx={{
                p: 2,
                border: "0px solid",
                backgroundColor: theme.palette.background.paper,
                borderRadius: "12px",
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-between",
              }}
            >
              <Box
                sx={{
                  p: 0,
                  border: "0px solid",
                  borderRadius: "12px",
                  flex: 0.9,
                  margin: 1,
                }}
              >
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontWeight: "500",
                    color: theme.palette.text.secondary,
                    fontFamily: "Inter, sans-serif",
                  }}
                  gutterBottom
                >
                  Total Portfolio Value
                  {/* <Box
                    component='span'
                    sx={{
                      marginLeft: 1,
                      fontSize: "20px",
                      fontWeight: "500",
                      border: "0px solid",
                      backgroundColor: "#797E82",
                      borderRadius: "60px",
                    }}
                  >
                    <IoMdInformation color='white' />
                  </Box> */}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "24px",
                    fontWeight: "500",
                    color: theme.palette.text.primary,
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  ₹ 112,312.24
                </Typography>
              </Box>

              <Box
                sx={{
                  p: 0,
                  border: "0px solid",
                  borderRadius: "12px",
                  flex: 1.5,
                  margin: 1,
                }}
              >
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontWeight: "500",
                    color: theme.palette.text.secondary,
                    fontFamily: "Inter, sans-serif",
                  }}
                  gutterBottom
                >
                  Wallet Balances
                </Typography>
                <Box
                  sx={{
                    fontSize: "24px",
                    fontWeight: "500",
                    color: theme.palette.text.primary,
                    fontFamily: "Inter, sans-serif",
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                  }}
                >
                  <Box sx={{ flex: 0.8 }}>
                    22.39401000
                    <Box
                      component='span'
                      sx={{
                        marginLeft: 1,
                        color: theme.palette.text.primary,
                        fontSize: "12px",
                        fontWeight: "500",
                        border: "0px solid",
                        backgroundColor: theme.palette.text.box,
                        borderRadius: "40px",
                        padding: "4px",
                      }}
                    >
                      BTC
                    </Box>
                  </Box>
                  <Box>
                    ₹ 1,300.00
                    <Box
                      component='span'
                      sx={{
                        marginLeft: 1,
                        color: theme.palette.text.primary,
                        fontSize: "12px",
                        fontWeight: "500",
                        border: "0px solid",
                        backgroundColor: theme.palette.text.box,
                        borderRadius: "40px",
                        padding: "4px",
                      }}
                    >
                      INR
                    </Box>
                  </Box>
                </Box>
              </Box>

              {/* Deposit and Withdraw section */}
              <Box
                sx={{
                  p: 0,
                  border: "0px solid",

                  borderRadius: "12px",
                  flex: 1,
                  margin: 1,
                }}
              >
                <Box sx={{ mt: 2 }}>
                  <Button
                    variant='contained'
                    sx={{
                      m: 1,
                      backgroundColor: "#5F00D9",
                      textTransform: "none",
                      fontFamily: "Inter, sans-serif",
                      fontWeight: "500",
                      borderRadius: "10px",
                      color: "white",
                    }}
                  >
                    <Box component='span' sx={{ mr: 1 }}>
                      <HiDownload />
                    </Box>
                    Deposit
                  </Button>
                  <Button
                    variant='contained'
                    sx={{
                      backgroundColor: "#5F00D9",
                      textTransform: "none",
                      fontFamily: "Inter, sans-serif",
                      fontWeight: "500",
                      borderRadius: "10px",
                      color: "white",
                    }}
                  >
                    <Box
                      component='span'
                      sx={{
                        display: "inline-block",
                        transform: "rotate(180deg)",
                        transition: "transform 0.3s",
                        marginRight: 1,
                      }}
                    >
                      <HiDownload />
                    </Box>
                    Withdraw
                  </Button>
                </Box>
              </Box>
            </Box>
          </Grid>

          {/* Current price and recent transactions sections */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                padding: "30px",
                border: "0px solid",
                backgroundColor: theme.palette.background.paper,
                borderRadius: "12px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  height: "100%",
                  flexWrap: "wrap",
                }}
              >
                <Box>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: "500",
                      color: theme.palette.text.secondary,
                      fontFamily: "Inter, sans-serif",
                    }}
                    gutterBottom
                  >
                    Current Price
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box>
                      <Typography
                        sx={{
                          fontSize: "24px",
                          fontWeight: "500",
                          color: theme.palette.text.primary,
                          fontFamily: "Inter, sans-serif",
                          paddingRight: "10px",
                        }}
                      >
                        ₹26,670.25
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <HiOutlineArrowNarrowUp
                        color='green'
                        style={{
                          display: "inline-block",
                          transform: "rotate(45deg)",
                          transition: "transform 0.3s",
                        }}
                      />
                      <Typography
                        sx={{
                          fontSize: "14px",
                          fontWeight: "500",
                          color: "green",
                          fontFamily: "Inter, sans-serif",
                        }}
                      >
                        0.04%
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Box sx={{ mt: 2 }}>
                  <Button
                    variant='contained'
                    sx={{
                      m: 1,
                      backgroundColor: "#5F00D9",
                      textTransform: "none",
                      fontFamily: "Inter, sans-serif",
                      fontWeight: "500",
                      borderRadius: "10px",
                      p: "8px 20px",
                      color: "white",
                    }}
                  >
                    <Box component='span' sx={{ mr: 1 }}>
                      <FaPlusCircle />
                    </Box>
                    Buy
                  </Button>
                  <Button
                    variant='contained'
                    sx={{
                      m: 1,
                      backgroundColor: "#5F00D9",
                      textTransform: "none",
                      fontFamily: "Inter, sans-serif",
                      fontWeight: "500",
                      borderRadius: "10px",
                      p: "8px 20px",
                      color: "white",
                    }}
                  >
                    <Box component='span' sx={{ mr: 1 }}>
                      <FaCircleMinus />
                    </Box>
                    Sell
                  </Button>
                </Box>
              </Box>
              <Box
                sx={{
                  mt: 2,
                  display: "flex",
                  justifyContent: "flex-end",
                  height: "32px",
                }}
              >
                <Box
                  sx={{
                    border: "0px solid",
                    backgroundColor: theme.palette.background.box,
                    borderRadius: "6px",
                    display: "inline-flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "2px 2px",
                  }}
                >
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    sx={{
                      "& .MuiTabs-indicator": {
                        display: "none",
                      },
                      "& .MuiTab-root": {
                        padding: "6px",
                        fontSize: "12px",
                        fontFamily: "Inter, sans-serif",
                        fontWeight: "500",
                        minWidth: "auto",
                      },
                      "& .Mui-selected": {
                        backgroundColor: "white",
                        borderRadius: "4px",
                      },
                    }}
                  >
                    <Tab label='1H' value={1} />
                    <Tab label='1D' value={2} />
                    <Tab label='1W' value={3} />
                    <Tab label='1M' value={4} />
                  </Tabs>
                </Box>
              </Box>
              <Box sx={{ mt: 4, height: 150 }}>
                <ZigzagGraph />
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                p: 4,
                border: "0px solid",
                backgroundColor: theme.palette.background.paper,
                borderRadius: "12px",
              }}
            >
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: "500",
                  color: theme.palette.text.secondary,
                  fontFamily: "Inter, sans-serif",
                }}
                gutterBottom
              >
                Recent Transactions
              </Typography>

              {transactions.map((transaction, index) => (
                <React.Fragment key={index}>
                  <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                    <span
                      style={{
                        backgroundColor: theme.palette.background.box,
                        padding: "10px",
                        border: "0px solid",
                        borderRadius: "60px",
                      }}
                    >
                      {transaction.avatar}
                    </span>
                    <Box sx={{ ml: 2, flexGrow: 1 }}>
                      <Typography
                        sx={{
                          fontSize: "16px",
                          fontWeight: "400",
                          color: theme.palette.text.primary,
                          fontFamily: "Inter, sans-serif",
                        }}
                      >
                        {transaction.type}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "14px",
                          fontWeight: "400",
                          color: theme.palette.text.secondary,
                          fontFamily: "Inter, sans-serif",
                        }}
                      >
                        {transaction.timestamp}
                      </Typography>
                    </Box>
                    <Box sx={{ flexGrow: 0, textAlign: "right" }}>
                      <Typography
                        sx={{
                          fontSize: "16px",
                          fontWeight: "500",
                          color: theme.palette.text.primary,
                          fontFamily: "Inter, sans-serif",
                        }}
                      >
                        {transaction.amount}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "14px",
                          fontWeight: "400",
                          color: theme.palette.text.secondary,
                          fontFamily: "Inter, sans-serif",
                        }}
                      >
                        {transaction.description}
                      </Typography>
                    </Box>
                  </Box>
                  {index < transactions.length - 1 && (
                    <Divider sx={{ mt: 1.4, opacity: 0.5 }} variant='inset' />
                  )}
                </React.Fragment>
              ))}

              <Button
                variant='outlined'
                fullWidth
                sx={{
                  mt: 3,
                  backgroundColor: theme.palette.background.box,
                  fontFamily: "Inter, sans-serif",
                  textTransform: "none",
                  border: "none",
                  padding: "6px 10px",
                }}
              >
                View All
              </Button>
            </Box>
          </Grid>

          {/* Additional sections */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                p: 3,
                border: "0px solid",
                backgroundColor: theme.palette.background.paper,
                borderRadius: "12px",
              }}
            >
              <Button
                variant='contained'
                sx={{
                  m: 1,
                  backgroundColor: "#5F00D9",
                  textTransform: "none",
                  fontFamily: "Inter, sans-serif",
                  fontWeight: "500",
                  borderRadius: "10px",
                  padding: "0px",
                  fontSize: "12px",
                  color: "white",
                }}
              >
                Loans
              </Button>

              <Typography
                sx={{
                  m: 0.3,
                  fontSize: "18px",
                  fontWeight: "500",
                  color: theme.palette.text.primary,
                  fontFamily: "Inter, sans-serif",
                }}
              >
                Learn more about Loans – Keep your Bitcoin, access it’s value
                without selling it
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                p: 3,

                backgroundColor: theme.palette.presets.color,

                border: `1px solid ${theme.palette.presets.color}`,
                borderRadius: "12px",
              }}
            >
              <Button
                variant='contained'
                sx={{
                  m: 1,

                  textTransform: "none",
                  fontFamily: "Inter, sans-serif",
                  fontWeight: "500",
                  borderRadius: "10px",
                  padding: "0px",
                  fontSize: "12px",
                  color: "white",
                  backgroundColor: "#5F00D9",
                }}
              >
                Contact
              </Button>

              <Typography
                sx={{
                  m: 0.3,
                  fontSize: "18px",
                  fontWeight: "500",
                  color: "black",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                Learn more about our real estate, mortgage, and corporate
                account services
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default DashboardHome
