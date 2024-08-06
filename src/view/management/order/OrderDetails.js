import {
  Avatar,
  Box,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  useTheme,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Button,
} from "@mui/material"
import React, { useRef } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { orders as mockOrders } from "../../../mock/Order"
import { FaCcMastercard } from "react-icons/fa"
import { IoIosArrowBack } from "react-icons/io"
import { useReactToPrint } from "react-to-print"

const OrderDetails = () => {
  const theme = useTheme()
  const { orderNumber } = useParams()
  const navigate = useNavigate()

  const order = mockOrders.find((order) => order.orderNumber === orderNumber)

  const componentRef = useRef()

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  })

  const orderHistory = [
    {
      id: 1,
      status: "Delivery successful",
      time: "2023-07-20 14:33",
      imageUrl: "https://via.placeholder.com/40",
    },
    {
      id: 2,
      status: "Transporting to [2]",
      time: "2023-07-21 09:21",
      imageUrl: "https://via.placeholder.com/40",
    },
    {
      id: 3,
      status: "Transporting to [1]",
      time: "2023-07-22 18:45",
      imageUrl: "https://via.placeholder.com/40",
    },
    {
      id: 4,
      status: "The shipping unit has picked up the goods",
      time: "2023-07-23 12:30",
      imageUrl: "https://via.placeholder.com/40",
    },
    {
      id: 5,
      status: "Order has been created",
      time: "2023-07-24 10:00",
      imageUrl: "https://via.placeholder.com/40",
    },
  ]

  const CustomStepIcon = ({ active, completed }) => {
    return (
      <Box
        sx={{
          width: 10,
          height: 10,
          ml: 1,
          borderRadius: "50%",
          backgroundColor: active || completed ? "primary.main" : "grey.400",
        }}
      />
    )
  }

  return (
    <Box
      sx={{
        padding: { xs: "20px", md: "40px 80px", lg: "70px 70px" },
        backgroundColor: theme.palette.background.box,
        minHeight: { lg: "92vh", md: "92vh", sm: "100vh", xs: "150vh" },
      }}
    >
      {order && (
        <>
          {" "}
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box sx={{ display: "flex", gap: "10px" }}>
              <Box sx={{ mt: 2 }}>
                <IoIosArrowBack
                  style={{
                    color: theme.palette.text.secondary,
                    cursor: "pointer",
                  }}
                  size={25}
                  onClick={() => {
                    navigate("/order")
                  }}
                />
              </Box>
              <Box>
                <Box sx={{ display: "flex", gap: "5px" }}>
                  <Typography
                    sx={{
                      fontWeight: "600",
                      fontSize: "25px",
                      fontFamily: "Inter, sans-serif",
                    }}
                  >
                    {" "}
                    Order {order.orderNumber}
                  </Typography>
                  <Box>
                    {" "}
                    <Typography
                      sx={{
                        fontWeight: "400",
                        fontSize: "11px",
                        fontFamily: "Inter, sans-serif",
                        backgroundColor: theme.palette.presets.color,
                        borderRadius: "10px",
                        color: "black",
                        p: "2px",
                        mt: "5px",
                      }}
                    >
                      {order.status}
                    </Typography>
                  </Box>
                </Box>
                <Box>
                  <Typography
                    sx={{
                      fontWeight: "500",
                      fontSize: "14px",
                      fontFamily: "Inter, sans-serif",
                      color: theme.palette.text.secondary,
                    }}
                  >
                    {order.dateTime}
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box>
              <Button
                variant='contained'
                sx={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "14px",
                  fontWeight: "500",
                  textTransform: "none",
                  backgroundColor: "#5F00D9",
                  color: "white",
                }}
                onClick={handlePrint}
              >
                Print
              </Button>
            </Box>
          </Box>
        </>
      )}
      {order ? (
        <>
          <Grid
            container
            item
            xs={12}
            spacing={2}
            sx={{ mt: 2 }}
            ref={componentRef}
          >
            <Grid item lg={8} md={12} sm={12} xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Box
                    sx={{
                      backgroundColor: theme.palette.background.paper,
                      p: "20px",
                      border: `0px solid ${theme.palette.divider}`,
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
                        fontWeight: "600",
                        mb: 1,
                        color: theme.palette.text.primary,
                      }}
                      gutterBottom
                    >
                      Details
                    </Typography>
                    <List>
                      {order.product?.map((product) => (
                        <ListItem key={product.productId}>
                          <ListItemAvatar>
                            <Avatar
                              alt={product.productName}
                              src={`https://via.placeholder.com/50?text=${product.productName.charAt(
                                0
                              )}`}
                              sx={{ borderRadius: "10px" }}
                            />
                          </ListItemAvatar>
                          <ListItemText
                            primary={
                              <>
                                <Box
                                  sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  <Typography
                                    sx={{
                                      fontSize: "14px",
                                      color: theme.palette.text.primary,
                                      fontWeight: "500",
                                      fontFamily: "Inter, sans-serif",
                                    }}
                                  >
                                    {product.productName}
                                  </Typography>
                                  <Box
                                    sx={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                      gap: 4,
                                    }}
                                  >
                                    <Typography
                                      sx={{
                                        fontSize: "14px",
                                        color: theme.palette.text.primary,
                                        fontWeight: "500",
                                        fontFamily: "Inter, sans-serif",
                                      }}
                                    >
                                      <sup>*</sup> {product.Quantity}
                                    </Typography>
                                    <Typography
                                      sx={{
                                        fontSize: "14px",
                                        color: theme.palette.text.primary,
                                        fontWeight: "500",
                                        fontFamily: "Inter, sans-serif",
                                      }}
                                    >
                                      ${product.price}
                                    </Typography>
                                  </Box>
                                </Box>
                              </>
                            }
                            secondary={
                              <>
                                <Box>
                                  <Typography
                                    sx={{
                                      fontSize: "14px",
                                      color: theme.palette.text.secondary,
                                      fontWeight: "400",
                                      fontFamily: "Inter, sans-serif",
                                    }}
                                  >
                                    Quantity: {product.productId}
                                  </Typography>
                                </Box>
                              </>
                            }
                          />
                        </ListItem>
                      ))}
                    </List>
                    <Divider sx={{ p: "0px 0px 10px 0px" }} />
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        mt: 2,
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          gap: "10px",
                          justifyContent: "flex-end",
                          p: 1,
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: "14px",
                            color: theme.palette.text.secondary,
                            fontWeight: "500",
                            fontFamily: "Inter, sans-serif",
                          }}
                        >
                          {" "}
                          Subtotal
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: "14px",
                            color: theme.palette.text.primary,
                            fontWeight: "500",
                            fontFamily: "Inter, sans-serif",
                          }}
                        >
                          $400.41
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          gap: "10px",
                          justifyContent: "flex-end",
                          p: 1,
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: "14px",
                            color: theme.palette.text.secondary,
                            fontWeight: "500",
                            fontFamily: "Inter, sans-serif",
                          }}
                        >
                          Shipping
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: "14px",
                            color: "red",
                            fontWeight: "500",
                            fontFamily: "Inter, sans-serif",
                          }}
                        >
                          - $10
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          gap: "10px",
                          justifyContent: "flex-end",
                          p: 1,
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: "14px",
                            color: theme.palette.text.secondary,
                            fontWeight: "500",
                            fontFamily: "Inter, sans-serif",
                          }}
                        >
                          Discount
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: "14px",
                            color: "red",
                            fontWeight: "500",
                            fontFamily: "Inter, sans-serif",
                          }}
                        >
                          - $10
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          gap: "10px",
                          justifyContent: "flex-end",
                          p: 1,
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: "14px",
                            color: theme.palette.text.secondary,
                            fontWeight: "500",
                            fontFamily: "Inter, sans-serif",
                          }}
                        >
                          Taxes
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: "14px",
                            color: theme.palette.text.primary,
                            fontWeight: "500",
                            fontFamily: "Inter, sans-serif",
                          }}
                        >
                          $10
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          gap: "10px",
                          justifyContent: "flex-end",
                          p: 1,
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: "16px",
                            color: theme.palette.text.primary,
                            fontWeight: "600",
                            fontFamily: "Inter, sans-serif",
                          }}
                        >
                          Total:
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: "16px",
                            color: theme.palette.text.primary,
                            fontWeight: "600",
                            fontFamily: "Inter, sans-serif",
                          }}
                        >
                          $390.41
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box
                    sx={{
                      backgroundColor: theme.palette.background.paper,
                      p: "20px",
                      border: `0px solid ${theme.palette.divider}`,
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
                        fontWeight: "600",
                        mb: 1,
                        color: theme.palette.text.primary,
                      }}
                      gutterBottom
                    >
                      History
                    </Typography>
                    <Grid container spacing={3}>
                      <Grid item md={6} sm={12} xs={12}>
                        <Stepper orientation='vertical' sx={{ pl: 2 }}>
                          {orderHistory.map((order, index) => (
                            <Step key={order.id} active={true}>
                              <StepLabel StepIconComponent={CustomStepIcon}>
                                <Box
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 2,
                                  }}
                                >
                                  <Typography
                                    sx={{
                                      fontSize: "14px",
                                      fontWeight: "600",
                                      color:
                                        index === 0
                                          ? theme.palette.success.main
                                          : theme.palette.text.primary,
                                    }}
                                  >
                                    {order.status}
                                  </Typography>
                                </Box>
                              </StepLabel>
                              <StepContent>
                                <Typography
                                  sx={{
                                    fontSize: "14px",
                                    fontWeight: "400",
                                    color: theme.palette.text.secondary,
                                  }}
                                >
                                  {order.time}
                                </Typography>
                              </StepContent>
                            </Step>
                          ))}
                        </Stepper>
                      </Grid>
                      <Grid item md={6} sm={12} xs={12}>
                        <Box
                          sx={{
                            display: "felx",
                            justifyContent: "center",
                            flexDirection: "column",
                            border: "1px dashed gray",
                            borderRadius: "10px",
                            m: 2,
                          }}
                        >
                          <Box sx={{ p: 2 }}>
                            <Typography
                              sx={{
                                fontSize: "14px",
                                fontWeight: "500",
                                color: theme.palette.text.secondary,
                              }}
                            >
                              Order time
                            </Typography>
                            <Typography
                              sx={{
                                fontSize: "14px",
                                fontWeight: "500",
                                color: theme.palette.text.primary,
                              }}
                            >
                              30 Jul 2024 11:11 AM
                            </Typography>
                          </Box>
                          <Box sx={{ p: 2 }}>
                            <Typography
                              sx={{
                                fontSize: "14px",
                                fontWeight: "500",
                                color: theme.palette.text.secondary,
                              }}
                            >
                              Payment time
                            </Typography>
                            <Typography
                              sx={{
                                fontSize: "14px",
                                fontWeight: "500",
                                color: theme.palette.text.primary,
                              }}
                            >
                              30 Jul 2024 11:11 AM
                            </Typography>
                          </Box>
                          <Box sx={{ p: 2 }}>
                            <Typography
                              sx={{
                                fontSize: "14px",
                                fontWeight: "500",
                                color: theme.palette.text.secondary,
                              }}
                            >
                              Delivery time for the carrier
                            </Typography>
                            <Typography
                              sx={{
                                fontSize: "14px",
                                fontWeight: "500",
                                color: theme.palette.text.primary,
                              }}
                            >
                              30 Jul 2024 11:11 AM
                            </Typography>
                          </Box>
                          <Box sx={{ p: 2 }}>
                            <Typography
                              sx={{
                                fontSize: "14px",
                                fontWeight: "500",
                                color: theme.palette.text.secondary,
                              }}
                            >
                              Completion time
                            </Typography>
                            <Typography
                              sx={{
                                fontSize: "14px",
                                fontWeight: "500",
                                color: theme.palette.text.primary,
                              }}
                            >
                              30 Jul 2024 11:11 AM
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              </Grid>
            </Grid>

            <Grid item lg={4} md={12} sm={12} xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Box
                    sx={{
                      backgroundColor: theme.palette.background.paper,
                      p: "20px",
                      border: `0px solid ${theme.palette.divider}`,
                      borderRadius: "10px",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Box>
                      <Typography
                        sx={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "20px",
                          fontWeight: "600",
                          mb: 1,
                          color: theme.palette.text.primary,
                        }}
                        gutterBottom
                      >
                        Cunstomer Info.
                      </Typography>
                      <Box
                        sx={{
                          fontSize: "14px",
                          color: theme.palette.text.primary,
                          fontWeight: "500",
                          fontFamily: "Inter, sans-serif",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Box>
                          <Avatar
                            alt={order.customerName}
                            src={order.customerAvatar}
                            sx={{ marginRight: 1 }}
                          />
                        </Box>
                        <Box>
                          <Typography
                            sx={{
                              fontSize: "14px",
                              color: theme.palette.text.primary,
                              marginLeft: 1,
                              mb: "3px",
                            }}
                          >
                            {order.customerName}
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: "14px",
                              color: theme.palette.text.secondary,
                              marginLeft: 1,
                              mb: "3px",
                            }}
                          >
                            {order.customerEmail}
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: "14px",
                              color: theme.palette.text.secondary,
                              marginLeft: 1,
                              mb: "3px",
                            }}
                          >
                            <span
                              style={{
                                fontSize: "14px",
                                color: theme.palette.text.primary,
                                marginLeft: 1,
                              }}
                            >
                              IP Adress
                            </span>
                            :192.158.1.38
                          </Typography>
                        </Box>
                      </Box>
                      <Button
                        variant='outlined'
                        sx={{
                          color: "red",
                          border: "none",
                          fontSize: "16px",
                          fontWeight: "500",
                          fontFamily: "Inter, sans-serif",
                          textTransform: "none",
                        }}
                      >
                        + Add to BlackList
                      </Button>
                    </Box>
                    <Divider
                      sx={{ p: "5px 0px 10px 0px", m: "0px -20px 15px -20px" }}
                    />
                    <Box>
                      <Typography
                        sx={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "20px",
                          fontWeight: "600",
                          mb: 1,
                          color: theme.palette.text.primary,
                        }}
                        gutterBottom
                      >
                        Delivery
                      </Typography>
                      <Box sx={{ p: 1 }}>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            mb: "10px",
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: "14px",
                              color: theme.palette.text.secondary,
                              fontWeight: "500",
                            }}
                          >
                            Ship by
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: "14px",
                              color: theme.palette.text.primary,
                              fontWeight: "500",
                            }}
                          >
                            DHL
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            mb: "10px",
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: "14px",
                              color: theme.palette.text.secondary,
                              fontWeight: "500",
                            }}
                          >
                            Speedy
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: "14px",
                              color: theme.palette.text.primary,
                              fontWeight: "500",
                            }}
                          >
                            Standard
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            mb: "10px",
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: "14px",
                              color: theme.palette.text.secondary,
                              fontWeight: "500",
                            }}
                          >
                            Tracking No.
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: "14px",
                              color: theme.palette.text.primary,
                              fontWeight: "500",
                            }}
                          >
                            SPX037739199373
                          </Typography>
                        </Box>
                      </Box>
                    </Box>

                    <Divider
                      sx={{ p: "5px 0px 10px 0px", m: "0px -20px 15px -20px" }}
                    />
                    <Box>
                      <Typography
                        sx={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "20px",
                          fontWeight: "600",
                          mb: 1,
                          color: theme.palette.text.primary,
                        }}
                        gutterBottom
                      >
                        Shipping
                      </Typography>
                      <Box sx={{ p: 1 }}>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            mb: "10px",
                            gap: "70px",
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: "14px",
                              color: theme.palette.text.secondary,
                              fontWeight: "500",
                            }}
                          >
                            Address
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: "14px",
                              color: theme.palette.text.primary,
                              fontWeight: "500",
                            }}
                          >
                            19034 Verna Unions Apt. 164 - Honolulu, RI / 87535
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            mb: "10px",
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: "14px",
                              color: theme.palette.text.secondary,
                              fontWeight: "500",
                            }}
                          >
                            Phone number
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: "14px",
                              color: theme.palette.text.primary,
                              fontWeight: "500",
                            }}
                          >
                            365-374-4961
                          </Typography>
                        </Box>
                      </Box>
                    </Box>

                    <Divider
                      sx={{ p: "5px 0px 10px 0px", m: "0px -20px 15px -20px" }}
                    />
                    <Box>
                      <Typography
                        sx={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "20px",
                          fontWeight: "600",
                          mb: 1,
                          color: theme.palette.text.primary,
                        }}
                        gutterBottom
                      >
                        Payment
                      </Typography>
                      <Box sx={{ p: 1 }}>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            mb: "10px",
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: "14px",
                              color: theme.palette.text.secondary,
                              fontWeight: "500",
                            }}
                          >
                            Account number
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: "14px",
                              color: theme.palette.text.primary,
                              fontWeight: "500",
                            }}
                          >
                            **** **** **** 5678{" "}
                            <FaCcMastercard
                              style={{
                                color: "orange",
                                width: "30px",
                                height: "20px",
                              }}
                            />
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </>
      ) : (
        <Typography variant='h6'>Order not found</Typography>
      )}
    </Box>
  )
}

export default OrderDetails
