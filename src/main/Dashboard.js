// src/pages/Dashboard.js

import React, { useState, useEffect } from "react"
import { Box, CssBaseline, Drawer, useTheme } from "@mui/material"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Sidebar from "../components/Sidebar"
import Header from "../components/Header"
import DashboardHome from "../view/overview/DashboardHome"
import Contact from "../view/overview/Contact"
import TransactionPage from "../view/management/Transaction"
import ChatPage from "../view/management/ChatPage"
import Calendar from "../view/management/Calendar"
import { Holidays } from "../components/Holidays"
import EmailListPage from "../view/management/MailListPage"
import KanbanBoard from "../view/management/Kanban"
import Payment from "../view/overview/Payment"
import Sales from "../view/overview/Sales"
import Home from "../view/overview/Home"
import LoginPage from "../view/authpages/LoginPage"
import PrivateRoute from "../components/PrivateRoute"
import RegisterPage from "../view/authpages/RegisterPage"
import ForgetPassword from "../view/authpages/ForgetPassword"
import NotFound from "../view/other/error/NotFound"
import NoPermission from "../view/other/error/NoPermission"
import Server from "../view/other/error/Server"
import { useThemeProvider } from "../context/ThemeContext"
import File from "../view/overview/File"
import Blank from "../view/other/Blank"
import Booking from "../view/overview/Booking"
import GalleryPage from "../view/overview/GalleryPage"
import Product from "../view/management/product/Product"
import EditProduct from "../view/management/product/EditProduct"
import ViewProduct from "../view/management/product/ViewProduct"
import CreateInvoice from "../view/management/invoice/CreateInvoice"
import Invoice from "../view/management/invoice/Invoice"
import EditInvoice from "../view/management/invoice/EditInvoice"
import InvoiceDetails from "../view/management/invoice/InvoiceDetails"
import Profile from "../view/management/Profile/Profile"
import Setting from "../view/management/Profile/Setting"
import CreateUser from "../view/management/Profile/CreateUser"
import EditUser from "../view/management/Profile/EditUser"
import User from "../view/management/Profile/User"
import UserCard from "../view/management/Profile/UserCard"
import OrderPage from "../view/management/order/Order"
import OrderDetails from "../view/management/order/OrderDetails"
import UserListPage from "../view/management/Profile/UserList"
import InvoiceListPage from "../view/management/invoice/InvoiceListPage"
import Pricing from "../view/management/Pricing"
import FAQPage from "../view/other/FAQPage"
import About from "../view/other/About"
import ContactUs from "../view/other/ContactUs"
import Maintainance from "../view/other/error/Maintainance"
import ComingSoon from "../view/other/error/ComingSoon"

const Dashboard = () => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { mode, setMode, handleColorChange } = useThemeProvider()
  const theme = useTheme()

  const checkAuthToken = () => {
    const authData = JSON.parse(localStorage.getItem("authData"))
    if (authData && authData.token) {
      const currentTime = new Date().getTime()
      if (currentTime < authData.expiration) {
        return authData.token
      } else {
        localStorage.removeItem("authData")
      }
    }
    return null
  }

  const handleLogout = () => {
    localStorage.removeItem("authData")
    setToken(null)
  }

  const [token, setToken] = useState(checkAuthToken())

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  useEffect(() => {
    if (!token) {
      handleLogout(setToken)
    }
  }, [token])

  const handleThemeToggle = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"))
  }

  return (
    <>
      <BrowserRouter>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          {token && (
            <Box
              component='nav'
              sx={{ width: { md: 256 }, flexShrink: { md: 0 } }}
              aria-label='mailbox folders'
            >
              <Drawer
                variant='temporary'
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                  keepMounted: true,
                }}
                sx={{
                  display: { xs: "block", md: "none" },
                  "& .MuiDrawer-paper": {
                    boxSizing: "border-box",
                    width: 256,
                    height: "auto",
                    "&::-webkit-scrollbar": {
                      width: "5px",
                      height: "7px",
                      borderRadius: "10px",
                    },
                    "&::-webkit-scrollbar-thumb": {
                      backgroundColor: "rgba(0, 0, 0, 0.2)",
                      borderRadius: "10px",
                    },
                    "&::-webkit-scrollbar-track": {
                      backgroundColor: "transparent",
                    },
                  },
                }}
              >
                <Sidebar />
              </Drawer>
              <Drawer
                variant='permanent'
                sx={{
                  display: { xs: "none", md: "block" },
                  "& .MuiDrawer-paper": {
                    boxSizing: "border-box",
                    width: 256,
                    height: "100%",
                    overflow: "scroll",
                    "&::-webkit-scrollbar": {
                      width: "0px",
                      height: "0px",
                      borderRadius: "10px",
                    },
                    "&::-webkit-scrollbar-thumb": {
                      backgroundColor: "rgba(0, 0, 0, 0.2)",
                      borderRadius: "10px",
                    },
                    "&::-webkit-scrollbar-track": {
                      backgroundColor: "transparent",
                    },
                  },
                }}
                open
              >
                <Sidebar />
              </Drawer>
            </Box>
          )}

          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
            }}
          >
            {token && (
              <>
                <Header
                  handleDrawerToggle={handleDrawerToggle}
                  handleLogout={handleLogout}
                  handleThemeToggle={handleThemeToggle}
                  mode={mode}
                  theme={theme}
                  handleColorChange={handleColorChange}
                />
              </>
            )}
            <Routes>
              <Route path='*' element={<NotFound />} />
              <Route path='/permissiondenied' element={<NoPermission />} />
              <Route path='/server' element={<Server />} />
              <Route path='/maintainence' element={<Maintainance />} />
              <Route path='/comingsoon' element={<ComingSoon />} />

              <Route
                path='/login'
                element={<LoginPage setToken={setToken} />}
              />
              <Route
                path='/register'
                element={<RegisterPage setToken={setToken} />}
              />
              <Route
                path='/fpassword'
                element={<ForgetPassword setToken={setToken} />}
              />

              <Route
                path='/'
                element={
                  <PrivateRoute token={token}>
                    <Home />
                  </PrivateRoute>
                }
              />
              <Route
                path='/dashboard'
                element={
                  <PrivateRoute token={token}>
                    <DashboardHome />
                  </PrivateRoute>
                }
              />
              <Route
                path='/transaction'
                element={
                  <PrivateRoute token={token}>
                    <TransactionPage />
                  </PrivateRoute>
                }
              />
              <Route
                path='/contact'
                element={
                  <PrivateRoute token={token}>
                    <Contact />
                  </PrivateRoute>
                }
              />
              <Route
                path='/chat'
                element={
                  <PrivateRoute token={token}>
                    <ChatPage />
                  </PrivateRoute>
                }
              />
              <Route
                path='/profile'
                element={
                  <PrivateRoute token={token}>
                    <Profile />
                  </PrivateRoute>
                }
              />

              <Route
                path='/user'
                element={
                  <PrivateRoute token={token}>
                    <User />
                  </PrivateRoute>
                }
              />
              <Route
                path='/user/account'
                element={
                  <PrivateRoute token={token}>
                    <Setting />
                  </PrivateRoute>
                }
              />

              <Route
                path='/user/create'
                element={
                  <PrivateRoute token={token}>
                    <CreateUser />
                  </PrivateRoute>
                }
              />

              <Route
                path='/user/edit/:id'
                element={
                  <PrivateRoute token={token}>
                    <EditUser />
                  </PrivateRoute>
                }
              />

              <Route
                path='/user/edit'
                element={
                  <PrivateRoute token={token}>
                    <EditUser />
                  </PrivateRoute>
                }
              />

              <Route
                path='/user/card'
                element={
                  <PrivateRoute token={token}>
                    <UserCard />
                  </PrivateRoute>
                }
              />

              <Route
                path='/user/list'
                element={
                  <PrivateRoute token={token}>
                    <UserListPage />
                  </PrivateRoute>
                }
              />

              <Route
                path='/calendar'
                element={
                  <PrivateRoute token={token}>
                    <Calendar />
                  </PrivateRoute>
                }
              />
              <Route
                path='/calendar/holidays'
                element={
                  <PrivateRoute token={token}>
                    <Holidays />
                  </PrivateRoute>
                }
              />
              <Route
                path='/mail'
                element={
                  <PrivateRoute token={token}>
                    <EmailListPage />
                  </PrivateRoute>
                }
              />
              <Route
                path='/kanban'
                element={
                  <PrivateRoute token={token}>
                    <KanbanBoard />
                  </PrivateRoute>
                }
              />
              <Route
                path='/payment'
                element={
                  <PrivateRoute token={token}>
                    <Payment />
                  </PrivateRoute>
                }
              />
              <Route
                path='/sales'
                element={
                  <PrivateRoute token={token}>
                    <Sales />
                  </PrivateRoute>
                }
              />

              <Route
                path='/file'
                element={
                  <PrivateRoute token={token}>
                    <File />
                  </PrivateRoute>
                }
              />

              <Route
                path='/blank'
                element={
                  <PrivateRoute token={token}>
                    <Blank />
                  </PrivateRoute>
                }
              />

              <Route
                path='/booking'
                element={
                  <PrivateRoute token={token}>
                    <Booking />
                  </PrivateRoute>
                }
              />

              <Route
                path='/gallary'
                element={
                  <PrivateRoute token={token}>
                    <GalleryPage />
                  </PrivateRoute>
                }
              />

              <Route
                path='/product'
                element={
                  <PrivateRoute token={token}>
                    <Product />
                  </PrivateRoute>
                }
              />
              <Route
                path='/product/createproduct'
                element={
                  <PrivateRoute token={token}>
                    <Product />
                  </PrivateRoute>
                }
              />

              <Route
                path='/product/editproduct'
                element={
                  <PrivateRoute token={token}>
                    <EditProduct />
                  </PrivateRoute>
                }
              />

              <Route
                path='/product/viewproduct'
                element={
                  <PrivateRoute token={token}>
                    <ViewProduct />
                  </PrivateRoute>
                }
              />

              <Route
                path='/invoice'
                element={
                  <PrivateRoute token={token}>
                    <Invoice />
                  </PrivateRoute>
                }
              />

              <Route
                path='/invoice/createinvoice'
                element={
                  <PrivateRoute token={token}>
                    <CreateInvoice />
                  </PrivateRoute>
                }
              />

              <Route
                path='/invoice/list/INV-1001'
                element={
                  <PrivateRoute token={token}>
                    <EditInvoice />
                  </PrivateRoute>
                }
              />

              <Route
                path='/invoice/list'
                element={
                  <PrivateRoute token={token}>
                    <InvoiceListPage />
                  </PrivateRoute>
                }
              />

              <Route
                path='/invoice/editinvoice'
                element={
                  <PrivateRoute token={token}>
                    <EditInvoice />
                  </PrivateRoute>
                }
              />

              <Route
                path='/invoice/editinvoice/:invoiceId'
                element={
                  <PrivateRoute token={token}>
                    <EditInvoice />
                  </PrivateRoute>
                }
              />

              <Route
                path='/invoice/detailsinvoice'
                element={
                  <PrivateRoute token={token}>
                    <InvoiceDetails />
                  </PrivateRoute>
                }
              />

              <Route
                path='/invoice/detailsinvoice/:invoiceId'
                element={
                  <PrivateRoute token={token}>
                    <InvoiceDetails />
                  </PrivateRoute>
                }
              />

              <Route
                path='/order'
                element={
                  <PrivateRoute token={token}>
                    <OrderPage />
                  </PrivateRoute>
                }
              />

              <Route
                path='/order/view/:orderNumber'
                element={
                  <PrivateRoute token={token}>
                    <OrderDetails />
                  </PrivateRoute>
                }
              />

              <Route
                path='/order/view'
                element={
                  <PrivateRoute token={token}>
                    <OrderDetails />
                  </PrivateRoute>
                }
              />

              <Route
                path='/pricing'
                element={
                  <PrivateRoute token={token}>
                    <Pricing />
                  </PrivateRoute>
                }
              />

              <Route
                path='/faq'
                element={
                  <PrivateRoute token={token}>
                    <FAQPage />
                  </PrivateRoute>
                }
              />

              <Route
                path='/about'
                element={
                  <PrivateRoute token={token}>
                    <About />
                  </PrivateRoute>
                }
              />

              <Route
                path='/contactus'
                element={
                  <PrivateRoute token={token}>
                    <ContactUs />
                  </PrivateRoute>
                }
              />
            </Routes>
          </Box>
        </Box>
      </BrowserRouter>
    </>
  )
}

export default Dashboard
