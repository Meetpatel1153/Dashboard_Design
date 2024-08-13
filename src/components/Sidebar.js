import React, { useState } from "react"
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  Collapse,
  useTheme,
} from "@mui/material"
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded"
import { GrTransaction } from "react-icons/gr"
import { BiSupport } from "react-icons/bi"
import { useLocation, useNavigate } from "react-router-dom"
import { FaCircleQuestion } from "react-icons/fa6"
import { PiChatsCircleFill } from "react-icons/pi"
import { FaCalendarAlt } from "react-icons/fa"
import { IoMdMail } from "react-icons/io"
import { PiKanbanFill } from "react-icons/pi"
import { MdPayment } from "react-icons/md"
import { IoBagHandle } from "react-icons/io5"
import { FaHome } from "react-icons/fa"
import { RiMenu2Line } from "react-icons/ri"
import { ExpandLess, ExpandMore } from "@mui/icons-material"
import { MdInsertDriveFile } from "react-icons/md"
import { RiCheckboxBlankFill } from "react-icons/ri"
import { FaPlaneDeparture } from "react-icons/fa"
import { FaImage } from "react-icons/fa6"
import { GiHanger } from "react-icons/gi"
import { FaFileInvoiceDollar } from "react-icons/fa"
import { FaUser } from "react-icons/fa"
import { BiSolidCart } from "react-icons/bi"
import { MdPriceChange } from "react-icons/md"
import { PiSealQuestionFill } from "react-icons/pi"
import { CgWebsite } from "react-icons/cg"
import { MdContactMail } from "react-icons/md"
import { TbLogs } from "react-icons/tb"
import { MdBusinessCenter } from "react-icons/md"
import { MdTour } from "react-icons/md"
import { TbCirclesRelation } from "react-icons/tb"
import { VscFeedback } from "react-icons/vsc"

const Sidebar = ({ setMobileOpen, mobileOpen }) => {
  const navigate = useNavigate()
  const [openOverview, setOpenOverview] = useState(true)
  const [openManagement, setOpenManagement] = useState(true)
  const [openOtherCases, setOpenOtherCases] = useState(true)
  const [openErrorMenu, setOpenErrorMenu] = useState(false)
  const [openProductMenu, setOpenProductMenu] = useState(false)
  const [openInvoiceMenu, setOpenInvoiceMenu] = useState(false)
  const [openUserMenu, setOpenUserMenu] = useState(false)
  const [openOrderMenu, setOpenOrderMenu] = useState(false)
  const [openBlogMenu, setOpenBlogMenu] = useState(false)
  const [openJobMenu, setOpenJobMenu] = useState(false)
  const [openTourMenu, setOpenTourMenu] = useState(false)

  const location = useLocation()
  const theme = useTheme()

  const handleToggle = (section) => {
    if (section === "overview") {
      setOpenOverview(!openOverview)
    } else if (section === "management") {
      setOpenManagement(!openManagement)
    } else if (section === "othercases") {
      setOpenOtherCases(!openOtherCases)
    } else if (section === "errors") {
      setOpenErrorMenu(!openErrorMenu)
    } else if (section === "products") {
      setOpenProductMenu(!openProductMenu)
    } else if (section === "invoice") {
      setOpenInvoiceMenu(!openInvoiceMenu)
    } else if (section === "user") {
      setOpenUserMenu(!openUserMenu)
    } else if (section === "order") {
      setOpenOrderMenu(!openOrderMenu)
    } else if (section === "blog") {
      setOpenBlogMenu(!openBlogMenu)
    } else if (section === "job") {
      setOpenJobMenu(!openJobMenu)
    } else if (section === "tour") {
      setOpenTourMenu(!openTourMenu)
    }
  }

  const handleNavigation = (path) => {
    setMobileOpen(!mobileOpen)
    navigate(path)
  }

  return (
    <Drawer
      variant='permanent'
      anchor='left'
      sx={{
        width: 256,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: 256,
          boxSizing: "border-box",
          border: "none",
          zIndex: 2,
          backgroundColor: theme.palette.background.paper,
        },
      }}
    >
      <Typography
        sx={{
          fontWeight: "bold",
          fontSize: "30px",
          fontFamily: "Inter, sans-serif",
          color: "#0ea770",
          marginLeft: "50px",
          marginTop: "20px",
        }}
      >
        MEET
      </Typography>

      {/* Overview Section */}
      <Box>
        <Button
          fullWidth
          onClick={() => handleToggle("overview")}
          sx={{
            textTransform: "none",
            justifyContent: "flex-start",
            fontWeight: "700",
            color: "gray",
            paddingLeft: "30px",
            marginBottom: "-20px",
            paddingTop: "10px",
            fontSize: "12px",
            ":hover": {
              color: theme.palette.text.primary,
            },
          }}
        >
          OVERVIEW
        </Button>
        <Collapse in={openOverview}>
          <List
            sx={{
              paddingLeft: "12px",
              paddingTop: "10px",
              width: "250px",
            }}
          >
            <ListItem
              button
              component={Button}
              onClick={() => handleNavigation("/")}
              sx={{
                textTransform: "none",
                backgroundColor:
                  location.pathname === "/"
                    ? theme.palette.sidebar.color
                    : "transparent",

                borderRadius: "5px",
              }}
            >
              <ListItemIcon>
                <FaHome
                  size={22}
                  style={{
                    color: theme.palette.text.primary,
                  }}
                />
              </ListItemIcon>
              <ListItemText
                primary='Home'
                primaryTypographyProps={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "16px",
                  fontWeight: "500",
                  color: theme.palette.text.primary,
                }}
              />
            </ListItem>
            <ListItem
              button
              component={Button}
              onClick={() => handleNavigation("/dashboard")}
              sx={{
                textTransform: "none",
                backgroundColor:
                  location.pathname === "/dashboard"
                    ? theme.palette.sidebar.color
                    : "transparent",

                borderRadius: "5px",
              }}
            >
              <ListItemIcon>
                <GridViewRoundedIcon
                  size={18}
                  sx={{ color: theme.palette.text.primary }}
                />
              </ListItemIcon>
              <ListItemText
                primary='Dashboard'
                primaryTypographyProps={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "16px",
                  fontWeight: "500",
                  color: theme.palette.text.primary,
                }}
              />
            </ListItem>

            <ListItem
              button
              component={Button}
              onClick={() => handleNavigation("/sales")}
              sx={{
                textTransform: "none",
                backgroundColor:
                  location.pathname === "/sales"
                    ? theme.palette.sidebar.color
                    : "transparent",

                borderRadius: "5px",
              }}
            >
              <ListItemIcon>
                <IoBagHandle
                  size={22}
                  style={{
                    color: theme.palette.text.primary,
                  }}
                />
              </ListItemIcon>
              <ListItemText
                primary='Sales'
                primaryTypographyProps={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "16px",
                  fontWeight: "500",
                  color: theme.palette.text.primary,
                }}
              />
            </ListItem>

            <ListItem
              button
              component={Button}
              onClick={() => handleNavigation("/payment")}
              sx={{
                textTransform: "none",
                backgroundColor:
                  location.pathname === "/payment"
                    ? theme.palette.sidebar.color
                    : "transparent",

                borderRadius: "5px",
              }}
            >
              <ListItemIcon>
                <MdPayment
                  size={22}
                  style={{
                    color: theme.palette.text.primary,
                  }}
                />
              </ListItemIcon>
              <ListItemText
                primary='Payment'
                primaryTypographyProps={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "16px",
                  fontWeight: "500",
                  color: theme.palette.text.primary,
                }}
              />
            </ListItem>

            <ListItem
              button
              component={Button}
              onClick={() => handleNavigation("/file")}
              sx={{
                textTransform: "none",
                backgroundColor:
                  location.pathname === "/file"
                    ? theme.palette.sidebar.color
                    : "transparent",

                borderRadius: "5px",
              }}
            >
              <ListItemIcon>
                <MdInsertDriveFile
                  size={22}
                  style={{
                    color: theme.palette.text.primary,
                  }}
                />
              </ListItemIcon>
              <ListItemText
                primary='File'
                primaryTypographyProps={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "16px",
                  fontWeight: "500",
                  color: theme.palette.text.primary,
                }}
              />
            </ListItem>
            <ListItem
              button
              component={Button}
              onClick={() => handleNavigation("/booking")}
              sx={{
                textTransform: "none",
                backgroundColor:
                  location.pathname === "/booking"
                    ? theme.palette.sidebar.color
                    : "transparent",

                borderRadius: "5px",
              }}
            >
              <ListItemIcon>
                <FaPlaneDeparture
                  size={22}
                  style={{
                    color: theme.palette.text.primary,
                  }}
                />
              </ListItemIcon>
              <ListItemText
                primary='Booking'
                primaryTypographyProps={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "16px",
                  fontWeight: "500",
                  color: theme.palette.text.primary,
                }}
              />
            </ListItem>
            <ListItem
              button
              component={Button}
              onClick={() => handleNavigation("/crm")}
              sx={{
                textTransform: "none",
                backgroundColor:
                  location.pathname === "/crm"
                    ? theme.palette.sidebar.color
                    : "transparent",

                borderRadius: "5px",
              }}
            >
              <ListItemIcon>
                <TbCirclesRelation
                  size={22}
                  style={{
                    color: theme.palette.text.primary,
                  }}
                />
              </ListItemIcon>
              <ListItemText
                primary='CRM'
                primaryTypographyProps={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "16px",
                  fontWeight: "500",
                  color: theme.palette.text.primary,
                }}
              />
            </ListItem>
          </List>
        </Collapse>
      </Box>

      {/* Management Section */}
      <Box>
        <Button
          fullWidth
          onClick={() => handleToggle("management")}
          sx={{
            textTransform: "none",
            justifyContent: "flex-start",
            fontWeight: "700",
            color: "gray",
            paddingLeft: "30px",
            marginBottom: "-20px",
            paddingTop: "10px",
            fontSize: "12px",
            ":hover": {
              color: theme.palette.text.primary,
            },
          }}
        >
          MANAGEMENT
        </Button>
        <Collapse in={openManagement}>
          <List
            sx={{ paddingLeft: "12px", paddingTop: "10px", width: "250px" }}
          >
            <ListItem
              button
              onClick={() => handleToggle("user")}
              sx={{
                textTransform: "none",
                backgroundColor:
                  location.pathname === "/profile" ||
                  location.pathname === "/user/create" ||
                  location.pathname === "/user/edit" ||
                  location.pathname === "/user/edit/1" ||
                  location.pathname === "/user/account" ||
                  location.pathname === "/user/card" ||
                  location.pathname === "/user/list"
                    ? theme.palette.sidebar.color
                    : "transparent",
                borderRadius: "5px",
              }}
            >
              <ListItemIcon>
                <FaUser
                  size={20}
                  style={{
                    color: theme.palette.text.primary,
                  }}
                />
              </ListItemIcon>
              <ListItemText
                primary='User'
                primaryTypographyProps={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "16px",
                  fontWeight: "500",
                  color: theme.palette.text.primary,
                }}
              />
              {openUserMenu ? (
                <ExpandLess
                  sx={{
                    marginLeft: "auto",
                    color: theme.palette.text.secondary,
                  }}
                />
              ) : (
                <ExpandMore
                  sx={{
                    marginLeft: "auto",
                    color: theme.palette.text.secondary,
                  }}
                />
              )}
            </ListItem>
            <Collapse in={openUserMenu}>
              {" "}
              <List
                sx={{
                  mt: "-20px",
                  paddingLeft: "60px",
                  width: "250px",
                }}
              >
                <ListItem
                  button
                  component={Button}
                  onClick={() => handleNavigation("/profile")}
                  sx={{
                    textTransform: "none",
                    borderRadius: "5px",
                  }}
                >
                  <ListItemText
                    primary='- Profile'
                    primaryTypographyProps={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "14px",
                      fontWeight: "400",
                      color: theme.palette.text.secondary,
                    }}
                  />
                </ListItem>

                <ListItem
                  button
                  component={Button}
                  onClick={() => handleNavigation("/user/create")}
                  sx={{
                    textTransform: "none",
                    borderRadius: "5px",
                    mt: -1,
                  }}
                >
                  <ListItemText
                    primary='- Create'
                    primaryTypographyProps={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "14px",
                      fontWeight: "400",
                      color: theme.palette.text.secondary,
                    }}
                  />
                </ListItem>

                <ListItem
                  button
                  component={Button}
                  onClick={() => handleNavigation("/user/list")}
                  sx={{
                    textTransform: "none",
                    borderRadius: "5px",
                    mt: -1,
                  }}
                >
                  <ListItemText
                    primary='- List'
                    primaryTypographyProps={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "14px",
                      fontWeight: "400",
                      color: theme.palette.text.secondary,
                    }}
                  />
                </ListItem>

                <ListItem
                  button
                  component={Button}
                  onClick={() => handleNavigation("/user/edit/1")}
                  sx={{
                    textTransform: "none",
                    borderRadius: "5px",
                    mt: -1,
                  }}
                >
                  <ListItemText
                    primary='- Edit'
                    primaryTypographyProps={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "14px",
                      fontWeight: "400",
                      color: theme.palette.text.secondary,
                    }}
                  />
                </ListItem>

                <ListItem
                  button
                  component={Button}
                  onClick={() => handleNavigation("/user/card")}
                  sx={{
                    textTransform: "none",
                    borderRadius: "5px",
                    mt: -1,
                  }}
                >
                  <ListItemText
                    primary='- Cards'
                    primaryTypographyProps={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "14px",
                      fontWeight: "400",
                      color: theme.palette.text.secondary,
                    }}
                  />
                </ListItem>

                <ListItem
                  button
                  component={Button}
                  onClick={() => handleNavigation("/user/account")}
                  sx={{
                    textTransform: "none",
                    borderRadius: "5px",
                    mt: -1,
                  }}
                >
                  <ListItemText
                    primary='- Account '
                    primaryTypographyProps={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "14px",
                      fontWeight: "400",
                      color: theme.palette.text.secondary,
                    }}
                  />
                </ListItem>
              </List>
            </Collapse>
            <ListItem
              button
              onClick={() => handleToggle("products")}
              sx={{
                textTransform: "none",
                backgroundColor:
                  location.pathname === "/product/createproduct" ||
                  location.pathname === "/product/editproduct" ||
                  location.pathname === "/product/viewproduct"
                    ? theme.palette.sidebar.color
                    : "transparent",
                borderRadius: "5px",
              }}
            >
              <ListItemIcon>
                <GiHanger
                  size={22}
                  style={{
                    color: theme.palette.text.primary,
                  }}
                />
              </ListItemIcon>
              <ListItemText
                primary='Product'
                primaryTypographyProps={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "16px",
                  fontWeight: "500",
                  color: theme.palette.text.primary,
                }}
              />
              {openProductMenu ? (
                <ExpandLess
                  sx={{
                    marginLeft: "auto",
                    color: theme.palette.text.secondary,
                  }}
                />
              ) : (
                <ExpandMore
                  sx={{
                    marginLeft: "auto",
                    color: theme.palette.text.secondary,
                  }}
                />
              )}
            </ListItem>
            <Collapse in={openProductMenu}>
              {" "}
              <List
                sx={{
                  mt: "-20px",
                  paddingLeft: "60px",
                  width: "250px",
                }}
              >
                <ListItem
                  button
                  component={Button}
                  onClick={() => handleNavigation("/product/createproduct")}
                  sx={{
                    textTransform: "none",
                    borderRadius: "5px",
                  }}
                >
                  <ListItemText
                    primary='- Create'
                    primaryTypographyProps={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "14px",
                      fontWeight: "400",
                      color: theme.palette.text.secondary,
                    }}
                  />
                </ListItem>

                <ListItem
                  button
                  component={Button}
                  onClick={() => handleNavigation("/product/editproduct")}
                  sx={{
                    textTransform: "none",
                    borderRadius: "5px",
                    mt: -1,
                  }}
                >
                  <ListItemText
                    primary='- Edit'
                    primaryTypographyProps={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "14px",
                      fontWeight: "400",
                      color: theme.palette.text.secondary,
                    }}
                  />
                </ListItem>

                <ListItem
                  button
                  component={Button}
                  onClick={() => handleNavigation("/product/viewproduct")}
                  sx={{
                    textTransform: "none",
                    borderRadius: "5px",
                    mt: -1,
                  }}
                >
                  <ListItemText
                    primary='- View'
                    primaryTypographyProps={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "14px",
                      fontWeight: "400",
                      color: theme.palette.text.secondary,
                    }}
                  />
                </ListItem>
              </List>
            </Collapse>
            <ListItem
              button
              onClick={() => handleToggle("order")}
              sx={{
                textTransform: "none",
                backgroundColor:
                  location.pathname === "/order" ||
                  location.pathname === "/order/view/ORD12345"
                    ? theme.palette.sidebar.color
                    : "transparent",
                borderRadius: "5px",
              }}
            >
              <ListItemIcon>
                <BiSolidCart
                  size={20}
                  style={{
                    color: theme.palette.text.primary,
                  }}
                />
              </ListItemIcon>
              <ListItemText
                primary='Order'
                primaryTypographyProps={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "16px",
                  fontWeight: "500",
                  color: theme.palette.text.primary,
                }}
              />
              {openOrderMenu ? (
                <ExpandLess
                  sx={{
                    marginLeft: "auto",
                    color: theme.palette.text.secondary,
                  }}
                />
              ) : (
                <ExpandMore
                  sx={{
                    marginLeft: "auto",
                    color: theme.palette.text.secondary,
                  }}
                />
              )}
            </ListItem>
            <Collapse in={openOrderMenu}>
              {" "}
              <List
                sx={{
                  mt: "-20px",
                  paddingLeft: "60px",
                  width: "250px",
                }}
              >
                <ListItem
                  button
                  component={Button}
                  onClick={() => handleNavigation("/order")}
                  sx={{
                    textTransform: "none",
                    borderRadius: "5px",
                  }}
                >
                  <ListItemText
                    primary='- Order list'
                    primaryTypographyProps={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "14px",
                      fontWeight: "400",
                      color: theme.palette.text.secondary,
                    }}
                  />
                </ListItem>

                <ListItem
                  button
                  component={Button}
                  onClick={() => handleNavigation("/order/view/ORD12345")}
                  sx={{
                    textTransform: "none",
                    borderRadius: "5px",
                    mt: -1,
                  }}
                >
                  <ListItemText
                    primary='- Details'
                    primaryTypographyProps={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "14px",
                      fontWeight: "400",
                      color: theme.palette.text.secondary,
                    }}
                  />
                </ListItem>
              </List>
            </Collapse>
            <ListItem
              button
              onClick={() => handleToggle("invoice")}
              sx={{
                textTransform: "none",
                backgroundColor:
                  location.pathname === "/invoice/createinvoice" ||
                  location.pathname === "/invoice/list" ||
                  location.pathname === "/invoice/list/INV-1001" ||
                  location.pathname === "/invoice/detailsinvoice" ||
                  location.pathname === "/invoice/editinvoice"
                    ? theme.palette.sidebar.color
                    : "transparent",
                borderRadius: "5px",
              }}
            >
              <ListItemIcon>
                <FaFileInvoiceDollar
                  size={22}
                  style={{
                    color: theme.palette.text.primary,
                  }}
                />
              </ListItemIcon>
              <ListItemText
                primary='Invoice'
                primaryTypographyProps={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "16px",
                  fontWeight: "500",
                  color: theme.palette.text.primary,
                }}
              />
              {openInvoiceMenu ? (
                <ExpandLess
                  sx={{
                    marginLeft: "auto",
                    color: theme.palette.text.secondary,
                  }}
                />
              ) : (
                <ExpandMore
                  sx={{
                    marginLeft: "auto",
                    color: theme.palette.text.secondary,
                  }}
                />
              )}
            </ListItem>
            <Collapse in={openInvoiceMenu}>
              {" "}
              <List
                sx={{
                  mt: "-20px",
                  paddingLeft: "60px",
                  width: "250px",
                }}
              >
                <ListItem
                  button
                  component={Button}
                  onClick={() => handleNavigation("/invoice/list")}
                  sx={{
                    textTransform: "none",
                    borderRadius: "5px",
                  }}
                >
                  <ListItemText
                    primary='- Invoice list'
                    primaryTypographyProps={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "14px",
                      fontWeight: "400",
                      color: theme.palette.text.secondary,
                    }}
                  />
                </ListItem>

                <ListItem
                  button
                  component={Button}
                  onClick={() => handleNavigation("/invoice/detailsinvoice")}
                  sx={{
                    textTransform: "none",
                    borderRadius: "5px",
                    mt: -1,
                  }}
                >
                  <ListItemText
                    primary='- Details '
                    primaryTypographyProps={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "14px",
                      fontWeight: "400",
                      color: theme.palette.text.secondary,
                    }}
                  />
                </ListItem>

                <ListItem
                  button
                  component={Button}
                  onClick={() => handleNavigation("/invoice/createinvoice")}
                  sx={{
                    textTransform: "none",
                    borderRadius: "5px",
                    mt: -1,
                  }}
                >
                  <ListItemText
                    primary='- Create'
                    primaryTypographyProps={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "14px",
                      fontWeight: "400",
                      color: theme.palette.text.secondary,
                    }}
                  />
                </ListItem>

                <ListItem
                  button
                  component={Button}
                  onClick={() => handleNavigation("/invoice/editinvoice")}
                  sx={{
                    textTransform: "none",
                    borderRadius: "5px",
                    mt: -1,
                  }}
                >
                  <ListItemText
                    primary='- Edit'
                    primaryTypographyProps={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "14px",
                      fontWeight: "400",
                      color: theme.palette.text.secondary,
                    }}
                  />
                </ListItem>
              </List>
            </Collapse>

            <ListItem
              button
              onClick={() => handleToggle("blog")}
              sx={{
                textTransform: "none",
                backgroundColor:
                  location.pathname === "/blog" ||
                  location.pathname === "/blog/create" ||
                  location.pathname === "/blog/edit" ||
                  location.pathname === "/blog/details"
                    ? theme.palette.sidebar.color
                    : "transparent",
                borderRadius: "5px",
              }}
            >
              <ListItemIcon>
                <TbLogs
                  size={22}
                  style={{
                    color: theme.palette.text.primary,
                  }}
                />
              </ListItemIcon>
              <ListItemText
                primary='Blog'
                primaryTypographyProps={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "16px",
                  fontWeight: "500",
                  color: theme.palette.text.primary,
                }}
              />
              {openBlogMenu ? (
                <ExpandLess
                  sx={{
                    marginLeft: "auto",
                    color: theme.palette.text.secondary,
                  }}
                />
              ) : (
                <ExpandMore
                  sx={{
                    marginLeft: "auto",
                    color: theme.palette.text.secondary,
                  }}
                />
              )}
            </ListItem>
            <Collapse in={openBlogMenu}>
              {" "}
              <List
                sx={{
                  mt: "-20px",
                  paddingLeft: "60px",
                  width: "250px",
                }}
              >
                <ListItem
                  button
                  component={Button}
                  onClick={() => handleNavigation("/blog")}
                  sx={{
                    textTransform: "none",
                    borderRadius: "5px",
                  }}
                >
                  <ListItemText
                    primary='- Blog list'
                    primaryTypographyProps={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "14px",
                      fontWeight: "400",
                      color: theme.palette.text.secondary,
                    }}
                  />
                </ListItem>

                <ListItem
                  button
                  component={Button}
                  onClick={() => handleNavigation("/blog/details")}
                  sx={{
                    textTransform: "none",
                    borderRadius: "5px",
                    mt: -1,
                  }}
                >
                  <ListItemText
                    primary='- Details'
                    primaryTypographyProps={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "14px",
                      fontWeight: "400",
                      color: theme.palette.text.secondary,
                    }}
                  />
                </ListItem>

                <ListItem
                  button
                  component={Button}
                  onClick={() => handleNavigation("/blog/create")}
                  sx={{
                    textTransform: "none",
                    borderRadius: "5px",
                    mt: -1,
                  }}
                >
                  <ListItemText
                    primary='- Create'
                    primaryTypographyProps={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "14px",
                      fontWeight: "400",
                      color: theme.palette.text.secondary,
                    }}
                  />
                </ListItem>

                <ListItem
                  button
                  component={Button}
                  onClick={() => handleNavigation("/blog/edit")}
                  sx={{
                    textTransform: "none",
                    borderRadius: "5px",
                    mt: -1,
                  }}
                >
                  <ListItemText
                    primary='- Edit'
                    primaryTypographyProps={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "14px",
                      fontWeight: "400",
                      color: theme.palette.text.secondary,
                    }}
                  />
                </ListItem>
              </List>
            </Collapse>

            <ListItem
              button
              onClick={() => handleToggle("job")}
              sx={{
                textTransform: "none",
                backgroundColor:
                  location.pathname === "/job" ||
                  location.pathname === "/job/details" ||
                  location.pathname === "/job/create" ||
                  location.pathname === "/job/edit"
                    ? theme.palette.sidebar.color
                    : "transparent",
                borderRadius: "5px",
              }}
            >
              <ListItemIcon>
                <MdBusinessCenter
                  size={22}
                  style={{
                    color: theme.palette.text.primary,
                  }}
                />
              </ListItemIcon>
              <ListItemText
                primary='Job'
                primaryTypographyProps={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "16px",
                  fontWeight: "500",
                  color: theme.palette.text.primary,
                }}
              />
              {openJobMenu ? (
                <ExpandLess
                  sx={{
                    marginLeft: "auto",
                    color: theme.palette.text.secondary,
                  }}
                />
              ) : (
                <ExpandMore
                  sx={{
                    marginLeft: "auto",
                    color: theme.palette.text.secondary,
                  }}
                />
              )}
            </ListItem>
            <Collapse in={openJobMenu}>
              {" "}
              <List
                sx={{
                  mt: "-20px",
                  paddingLeft: "60px",
                  width: "250px",
                }}
              >
                <ListItem
                  button
                  component={Button}
                  onClick={() => handleNavigation("/job")}
                  sx={{
                    textTransform: "none",
                    borderRadius: "5px",
                  }}
                >
                  <ListItemText
                    primary='- Job list'
                    primaryTypographyProps={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "14px",
                      fontWeight: "400",
                      color: theme.palette.text.secondary,
                    }}
                  />
                </ListItem>

                <ListItem
                  button
                  component={Button}
                  onClick={() => handleNavigation("/job/details")}
                  sx={{
                    textTransform: "none",
                    borderRadius: "5px",
                    mt: -1,
                  }}
                >
                  <ListItemText
                    primary='- Details'
                    primaryTypographyProps={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "14px",
                      fontWeight: "400",
                      color: theme.palette.text.secondary,
                    }}
                  />
                </ListItem>

                <ListItem
                  button
                  component={Button}
                  onClick={() => handleNavigation("/job/create")}
                  sx={{
                    textTransform: "none",
                    borderRadius: "5px",
                    mt: -1,
                  }}
                >
                  <ListItemText
                    primary='- Create'
                    primaryTypographyProps={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "14px",
                      fontWeight: "400",
                      color: theme.palette.text.secondary,
                    }}
                  />
                </ListItem>

                <ListItem
                  button
                  component={Button}
                  onClick={() => handleNavigation("/job/edit")}
                  sx={{
                    textTransform: "none",
                    borderRadius: "5px",
                    mt: -1,
                  }}
                >
                  <ListItemText
                    primary='- Edit '
                    primaryTypographyProps={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "14px",
                      fontWeight: "400",
                      color: theme.palette.text.secondary,
                    }}
                  />
                </ListItem>
              </List>
            </Collapse>

            <ListItem
              button
              onClick={() => handleToggle("tour")}
              sx={{
                textTransform: "none",
                backgroundColor:
                  location.pathname === "/tour" ||
                  location.pathname === "/tour/details" ||
                  location.pathname === "/tour/create" ||
                  location.pathname === "/tour/edit"
                    ? theme.palette.sidebar.color
                    : "transparent",
                borderRadius: "5px",
              }}
            >
              <ListItemIcon>
                <MdTour
                  size={22}
                  style={{
                    color: theme.palette.text.primary,
                  }}
                />
              </ListItemIcon>
              <ListItemText
                primary='Tour'
                primaryTypographyProps={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "16px",
                  fontWeight: "500",
                  color: theme.palette.text.primary,
                }}
              />
              {openTourMenu ? (
                <ExpandLess
                  sx={{
                    marginLeft: "auto",
                    color: theme.palette.text.secondary,
                  }}
                />
              ) : (
                <ExpandMore
                  sx={{
                    marginLeft: "auto",
                    color: theme.palette.text.secondary,
                  }}
                />
              )}
            </ListItem>
            <Collapse in={openTourMenu}>
              {" "}
              <List
                sx={{
                  mt: "-20px",
                  paddingLeft: "60px",
                  width: "250px",
                }}
              >
                <ListItem
                  button
                  component={Button}
                  onClick={() => handleNavigation("/tour")}
                  sx={{
                    textTransform: "none",
                    borderRadius: "5px",
                  }}
                >
                  <ListItemText
                    primary='- Tour list'
                    primaryTypographyProps={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "14px",
                      fontWeight: "400",
                      color: theme.palette.text.secondary,
                    }}
                  />
                </ListItem>

                <ListItem
                  button
                  component={Button}
                  onClick={() => handleNavigation("/tour/details")}
                  sx={{
                    textTransform: "none",
                    borderRadius: "5px",
                    mt: -1,
                  }}
                >
                  <ListItemText
                    primary='- Details'
                    primaryTypographyProps={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "14px",
                      fontWeight: "400",
                      color: theme.palette.text.secondary,
                    }}
                  />
                </ListItem>

                <ListItem
                  button
                  component={Button}
                  onClick={() => handleNavigation("/tour/create")}
                  sx={{
                    textTransform: "none",
                    borderRadius: "5px",
                    mt: -1,
                  }}
                >
                  <ListItemText
                    primary='- Create'
                    primaryTypographyProps={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "14px",
                      fontWeight: "400",
                      color: theme.palette.text.secondary,
                    }}
                  />
                </ListItem>

                <ListItem
                  button
                  component={Button}
                  onClick={() => handleNavigation("/tour/edit")}
                  sx={{
                    textTransform: "none",
                    borderRadius: "5px",
                    mt: -1,
                  }}
                >
                  <ListItemText
                    primary='- Edit '
                    primaryTypographyProps={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "14px",
                      fontWeight: "400",
                      color: theme.palette.text.secondary,
                    }}
                  />
                </ListItem>
              </List>
            </Collapse>

            <ListItem
              button
              component={Button}
              onClick={() => handleNavigation("/chat")}
              sx={{
                textTransform: "none",
                backgroundColor:
                  location.pathname === "/chat"
                    ? theme.palette.sidebar.color
                    : "transparent",

                borderRadius: "5px",
              }}
            >
              <ListItemIcon>
                <PiChatsCircleFill
                  size={22}
                  style={{
                    color: theme.palette.text.primary,
                  }}
                />
              </ListItemIcon>
              <ListItemText
                primary='Chat'
                primaryTypographyProps={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "16px",
                  fontWeight: "500",
                  color: theme.palette.text.primary,
                }}
              />
            </ListItem>

            <ListItem
              button
              component={Button}
              onClick={() => handleNavigation("/calendar")}
              sx={{
                textTransform: "none",
                backgroundColor:
                  location.pathname === "/calendar"
                    ? theme.palette.sidebar.color
                    : "transparent",

                borderRadius: "5px",
              }}
            >
              <ListItemIcon>
                <FaCalendarAlt
                  size={22}
                  style={{
                    color: theme.palette.text.primary,
                  }}
                />
              </ListItemIcon>
              <ListItemText
                primary='Calendar'
                primaryTypographyProps={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "16px",
                  fontWeight: "500",
                  color: theme.palette.text.primary,
                }}
              />
            </ListItem>

            <ListItem
              button
              component={Button}
              onClick={() => handleNavigation("/mail")}
              sx={{
                textTransform: "none",
                backgroundColor:
                  location.pathname === "/mail"
                    ? theme.palette.sidebar.color
                    : "transparent",

                borderRadius: "5px",
              }}
            >
              <ListItemIcon>
                <IoMdMail
                  size={22}
                  style={{
                    color: theme.palette.text.primary,
                  }}
                />
              </ListItemIcon>
              <ListItemText
                primary='Mail'
                primaryTypographyProps={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "16px",
                  fontWeight: "500",
                  color: theme.palette.text.primary,
                }}
              />
            </ListItem>

            <ListItem
              button
              component={Button}
              onClick={() => handleNavigation("/kanban")}
              sx={{
                textTransform: "none",
                backgroundColor:
                  location.pathname === "/kanban"
                    ? theme.palette.sidebar.color
                    : "transparent",

                borderRadius: "5px",
              }}
            >
              <ListItemIcon>
                <PiKanbanFill
                  size={22}
                  style={{
                    color: theme.palette.text.primary,
                  }}
                />
              </ListItemIcon>
              <ListItemText
                primary='Kanban'
                primaryTypographyProps={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "16px",
                  fontWeight: "500",
                  color: theme.palette.text.primary,
                }}
              />
            </ListItem>
            <ListItem
              button
              component={Button}
              onClick={() => handleNavigation("/transaction")}
              sx={{
                textTransform: "none",
                backgroundColor:
                  location.pathname === "/transaction"
                    ? theme.palette.sidebar.color
                    : "transparent",
                borderRadius: "5px",
              }}
            >
              <ListItemIcon>
                <GrTransaction
                  size={18}
                  style={{
                    color: theme.palette.text.primary,
                    display: "inline-block",
                    transform: "rotate(-45deg)",
                    transition: "transform 0.3s",
                  }}
                />
              </ListItemIcon>
              <ListItemText
                primary='Transaction'
                primaryTypographyProps={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "16px",
                  fontWeight: "500",
                  color: theme.palette.text.primary,
                }}
              />
            </ListItem>
            <ListItem
              button
              component={Button}
              onClick={() => handleNavigation("/gallary")}
              sx={{
                textTransform: "none",
                backgroundColor:
                  location.pathname === "/gallary"
                    ? theme.palette.sidebar.color
                    : "transparent",
                borderRadius: "5px",
              }}
            >
              <ListItemIcon>
                <FaImage
                  size={18}
                  style={{
                    color: theme.palette.text.primary,
                  }}
                />
              </ListItemIcon>
              <ListItemText
                primary='Gallary'
                primaryTypographyProps={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "16px",
                  fontWeight: "500",
                  color: theme.palette.text.primary,
                }}
              />
            </ListItem>

            <ListItem
              button
              component={Button}
              onClick={() => handleNavigation("/pricing")}
              sx={{
                textTransform: "none",
                backgroundColor:
                  location.pathname === "/pricing"
                    ? theme.palette.sidebar.color
                    : "transparent",
                borderRadius: "5px",
              }}
            >
              <ListItemIcon>
                <MdPriceChange
                  size={22}
                  style={{
                    color: theme.palette.text.primary,
                  }}
                />
              </ListItemIcon>
              <ListItemText
                primary='Pricing'
                primaryTypographyProps={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "16px",
                  fontWeight: "500",
                  color: theme.palette.text.primary,
                }}
              />
            </ListItem>
          </List>
        </Collapse>
      </Box>

      {/* Other Section */}
      <Box>
        <Button
          fullWidth
          onClick={() => handleToggle("othercases")}
          sx={{
            textTransform: "none",
            justifyContent: "flex-start",
            fontWeight: "700",
            color: "gray",
            paddingLeft: "30px",
            marginBottom: "-20px",
            paddingTop: "10px",
            fontSize: "12px",
            ":hover": {
              color: theme.palette.text.primary,
            },
          }}
        >
          OTHER CASES
        </Button>
        <Collapse in={openOtherCases}>
          <List
            sx={{ paddingLeft: "12px", paddingTop: "10px", width: "250px" }}
          >
            <ListItem
              button
              onClick={() => handleToggle("errors")}
              sx={{
                textTransform: "none",
                backgroundColor:
                  location.pathname === "/*" ||
                  location.pathname === "/permissiondenied" ||
                  location.pathname === "/maintainence" ||
                  location.pathname === "/comingsoon"
                    ? theme.palette.sidebar.color
                    : "transparent",

                borderRadius: "5px",
              }}
            >
              <ListItemIcon>
                <RiMenu2Line
                  size={22}
                  style={{
                    color: theme.palette.text.primary,
                  }}
                />
              </ListItemIcon>
              <ListItemText
                primary='Error Pages'
                primaryTypographyProps={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "16px",
                  fontWeight: "500",
                  color: theme.palette.text.primary,
                }}
              />
              {openErrorMenu ? (
                <ExpandLess
                  sx={{
                    marginLeft: "auto",
                    color: theme.palette.text.secondary,
                  }}
                />
              ) : (
                <ExpandMore
                  sx={{
                    marginLeft: "auto",
                    color: theme.palette.text.secondary,
                  }}
                />
              )}
            </ListItem>
            <Collapse in={openErrorMenu}>
              {" "}
              <List
                sx={{
                  mt: "-20px",
                  paddingLeft: "60px",
                  width: "250px",
                }}
              >
                <ListItem
                  button
                  component={Button}
                  onClick={() => handleNavigation("*")}
                  sx={{
                    textTransform: "none",
                    borderRadius: "5px",
                  }}
                >
                  <ListItemText
                    primary='- Not Found'
                    primaryTypographyProps={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "14px",
                      fontWeight: "400",
                      color: theme.palette.text.secondary,
                    }}
                  />
                </ListItem>

                <ListItem
                  button
                  component={Button}
                  onClick={() => handleNavigation("/permissiondenied")}
                  sx={{
                    textTransform: "none",
                    borderRadius: "5px",
                    mt: -1,
                  }}
                >
                  <ListItemText
                    primary='- Permission denied'
                    primaryTypographyProps={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "14px",
                      fontWeight: "400",
                      color: theme.palette.text.secondary,
                    }}
                  />
                </ListItem>
                <ListItem
                  button
                  component={Button}
                  onClick={() => handleNavigation("/server")}
                  sx={{
                    textTransform: "none",
                    borderRadius: "5px",
                    mt: -1,
                  }}
                >
                  <ListItemText
                    primary='- Server error'
                    primaryTypographyProps={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "14px",
                      fontWeight: "400",
                      color: theme.palette.text.secondary,
                    }}
                  />
                </ListItem>
                <ListItem
                  button
                  component={Button}
                  onClick={() => handleNavigation("/maintainence")}
                  sx={{
                    textTransform: "none",
                    borderRadius: "5px",
                    mt: -1,
                  }}
                >
                  <ListItemText
                    primary='- Maintainence server'
                    primaryTypographyProps={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "14px",
                      fontWeight: "400",
                      color: theme.palette.text.secondary,
                    }}
                  />
                </ListItem>
                <ListItem
                  button
                  component={Button}
                  onClick={() => handleNavigation("/comingsoon")}
                  sx={{
                    textTransform: "none",
                    borderRadius: "5px",
                    mt: -1,
                  }}
                >
                  <ListItemText
                    primary='- Coming soon'
                    primaryTypographyProps={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "14px",
                      fontWeight: "400",
                      color: theme.palette.text.secondary,
                    }}
                  />
                </ListItem>
              </List>
            </Collapse>
            <ListItem
              button
              component={Button}
              onClick={() => handleNavigation("/blank")}
              sx={{
                textTransform: "none",
                backgroundColor:
                  location.pathname === "/blank"
                    ? theme.palette.sidebar.color
                    : "transparent",

                borderRadius: "5px",
              }}
            >
              <ListItemIcon>
                <RiCheckboxBlankFill
                  size={22}
                  style={{
                    color: theme.palette.text.primary,
                  }}
                />
              </ListItemIcon>
              <ListItemText
                primary='Blank'
                primaryTypographyProps={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "16px",
                  fontWeight: "500",
                  color: theme.palette.text.primary,
                }}
              />
            </ListItem>

            <ListItem
              button
              component={Button}
              onClick={() => handleNavigation("/about")}
              sx={{
                textTransform: "none",
                backgroundColor:
                  location.pathname === "/about"
                    ? theme.palette.sidebar.color
                    : "transparent",

                borderRadius: "5px",
              }}
            >
              <ListItemIcon>
                <CgWebsite
                  size={22}
                  style={{
                    color: theme.palette.text.primary,
                  }}
                />
              </ListItemIcon>
              <ListItemText
                primary='About'
                primaryTypographyProps={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "16px",
                  fontWeight: "500",
                  color: theme.palette.text.primary,
                }}
              />
            </ListItem>

            <ListItem
              button
              component={Button}
              onClick={() => handleNavigation("/faq")}
              sx={{
                textTransform: "none",
                backgroundColor:
                  location.pathname === "/faq"
                    ? theme.palette.sidebar.color
                    : "transparent",

                borderRadius: "5px",
              }}
            >
              <ListItemIcon>
                <PiSealQuestionFill
                  size={22}
                  style={{
                    color: theme.palette.text.primary,
                  }}
                />
              </ListItemIcon>
              <ListItemText
                primary='FAQs'
                primaryTypographyProps={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "16px",
                  fontWeight: "500",
                  color: theme.palette.text.primary,
                }}
              />
            </ListItem>

            <ListItem
              button
              component={Button}
              onClick={() => handleNavigation("/contactus")}
              sx={{
                textTransform: "none",
                backgroundColor:
                  location.pathname === "/contactus"
                    ? theme.palette.sidebar.color
                    : "transparent",

                borderRadius: "5px",
              }}
            >
              <ListItemIcon>
                <MdContactMail
                  size={22}
                  style={{
                    color: theme.palette.text.primary,
                  }}
                />
              </ListItemIcon>
              <ListItemText
                primary='Contact Us'
                primaryTypographyProps={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "16px",
                  fontWeight: "500",
                  color: theme.palette.text.primary,
                }}
              />
            </ListItem>

            <ListItem
              button
              component={Button}
              onClick={() => handleNavigation("/feedback")}
              sx={{
                textTransform: "none",
                backgroundColor:
                  location.pathname === "/feedback"
                    ? theme.palette.sidebar.color
                    : "transparent",

                borderRadius: "5px",
              }}
            >
              <ListItemIcon>
                <VscFeedback
                  size={22}
                  style={{
                    color: theme.palette.text.primary,
                  }}
                />
              </ListItemIcon>
              <ListItemText
                primary='Feedback'
                primaryTypographyProps={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "16px",
                  fontWeight: "500",
                  color: theme.palette.text.primary,
                }}
              />
            </ListItem>
          </List>
        </Collapse>
      </Box>
      <Box sx={{ flexGrow: 1 }} />

      <Box sx={{ mb: 1 }}>
        <Card
          sx={{
            margin: "20px 12px",
            borderRadius: "10px",
            backgroundColor: theme.palette.presets.color,
            boxShadow: "none",
          }}
        >
          <CardContent>
            <Typography sx={{ mb: 2 }}>
              <FaCircleQuestion size={32} style={{ color: "black" }} />
            </Typography>
            <Typography
              variant='h6'
              sx={{
                fontFamily: "Inter, sans-serif",
                fontSize: "16px",
                fontWeight: "500",
                color: "black",
              }}
            >
              Need Help?
            </Typography>
            <Typography
              variant='h6'
              sx={{
                fontFamily: "Inter, sans-serif",
                fontSize: "14px",
                fontWeight: "500",
                color: "#535D66",
              }}
            >
              Please checkout docs.
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Button
                variant='contained'
                sx={{
                  mt: 1,
                  backgroundColor: "#5F00D9",
                  textTransform: "none",
                  fontFamily: "Inter, sans-serif",
                  fontWeight: "500",
                  borderRadius: "10px",
                  color: "white",
                }}
              >
                View Documentation
              </Button>
            </Box>
          </CardContent>
        </Card>
        <Button
          onClick={() => {
            navigate("/contact")
            setMobileOpen(!mobileOpen)
          }}
          sx={{
            fontFamily: "Inter, sans-serif",
            fontSize: "16px",
            fontWeight: "500",
            textTransform: "none",
            color: theme.palette.text.primary,
          }}
        >
          <IconButton>
            <BiSupport style={{ color: theme.palette.text.secondary }} />
          </IconButton>
          <span
            style={{
              paddingLeft: "20px",
              fontFamily: "Inter, sans-serif",
              fontSize: "16px",
              fontWeight: "500",
              color: theme.palette.text.secondary,
            }}
          >
            Support
          </span>
        </Button>
      </Box>
    </Drawer>
  )
}

export default Sidebar
