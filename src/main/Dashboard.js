import React, { useState, useEffect, Suspense, lazy } from "react"
import { Box, CssBaseline, Drawer, useTheme } from "@mui/material"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Sidebar from "../components/Sidebar"
import Header from "../components/Header"
import PrivateRoute from "../components/PrivateRoute"
import Loader from "../components/Loader"
import { useThemeProvider } from "../context/ThemeContext"
import ScrollToTop from "../components/ScrollToTop"
import ScrollProgressBar from "../components/ScrollProgressBar"

// overview pages
const Home = lazy(() => import("../view/overview/Home"))
const DashboardHome = lazy(() => import("../view/overview/DashboardHome"))
const Sales = lazy(() => import("../view/overview/Sales"))
const Payment = lazy(() => import("../view/overview/Payment"))
const File = lazy(() => import("../view/overview/File"))
const Booking = lazy(() => import("../view/overview/Booking"))
const CRMSection = lazy(() => import("../view/overview/CRM"))

//management pages
//*User pages*
const Profile = lazy(() => import("../view/management/Profile/Profile"))
const User = lazy(() => import("../view/management/Profile/User"))
const CreateUser = lazy(() => import("../view/management/Profile/CreateUser"))
const EditUser = lazy(() => import("../view/management/Profile/EditUser"))
const UserCard = lazy(() => import("../view/management/Profile/UserCard"))
const Setting = lazy(() => import("../view/management/Profile/Setting"))
const UserListPage = lazy(() => import("../view/management/Profile/UserList"))

//*Product pages*
const Product = lazy(() => import("../view/management/product/Product"))
const EditProduct = lazy(() => import("../view/management/product/EditProduct"))
const ViewProduct = lazy(() => import("../view/management/product/ViewProduct"))

//*Order pages*
const OrderPage = lazy(() => import("../view/management/order/Order"))
const OrderDetails = lazy(() => import("../view/management/order/OrderDetails"))

//*Invoice pages*
const CreateInvoice = lazy(() =>
  import("../view/management/invoice/CreateInvoice")
)
const Invoice = lazy(() => import("../view/management/invoice/Invoice"))
const EditInvoice = lazy(() => import("../view/management/invoice/EditInvoice"))
const InvoiceDetails = lazy(() =>
  import("../view/management/invoice/InvoiceDetails")
)
const InvoiceListPage = lazy(() =>
  import("../view/management/invoice/InvoiceListPage")
)

//*Blog pages*
const BlogPage = lazy(() => import("../view/management/blog/BlogPage"))
const BlogCreate = lazy(() => import("../view/management/blog/BlogCreate"))
const EditBlog = lazy(() => import("../view/management/blog/EditBlog"))
const BlogDetails = lazy(() => import("../view/management/blog/BlogDetails"))

//*Job pages*
const JobPage = lazy(() => import("../view/management/job/JobList"))
const JobDetails = lazy(() => import("../view/management/job/JobDetails"))
const CreateJob = lazy(() => import("../view/management/job/CreateJob"))
const EditJob = lazy(() => import("../view/management/job/EditJob"))

//*Tour pages*
const TourPage = lazy(() => import("../view/management/tour/TourList"))
const TourDetails = lazy(() => import("../view/management/tour/TourDetails"))
const CreateTour = lazy(() => import("../view/management/tour/CreateTour"))
const EditTour = lazy(() => import("../view/management/tour/EditTour"))

//*other management pages*
const ChatPage = lazy(() => import("../view/management/ChatPage"))
const EmailListPage = lazy(() => import("../view/management/MailListPage"))
const Calendar = lazy(() => import("../view/management/Calendar"))
const Holidays = lazy(() => import("../components/Holidays"))
const KanbanBoard = lazy(() => import("../view/management/Kanban"))
const TransactionPage = lazy(() => import("../view/management/Transaction"))
const GalleryPage = lazy(() => import("../view/overview/GalleryPage"))
const Pricing = lazy(() => import("../view/management/Pricing"))

//other pages
//*error pages*
const NotFound = lazy(() => import("../view/other/error/NotFound"))
const NoPermission = lazy(() => import("../view/other/error/NoPermission"))
const Server = lazy(() => import("../view/other/error/Server"))
const Maintainance = lazy(() => import("../view/other/error/Maintainance"))
const ComingSoon = lazy(() => import("../view/other/error/ComingSoon"))

const Blank = lazy(() => import("../view/other/Blank"))
const FAQPage = lazy(() => import("../view/other/FAQPage"))
const About = lazy(() => import("../view/other/About"))
const ContactUs = lazy(() => import("../view/other/ContactUs"))
const Contact = lazy(() => import("../view/overview/Contact"))
const FeedbackPage = lazy(() => import("../view/other/FeedbackPage"))

//auth pages
const LoginPage = lazy(() => import("../view/authpages/LoginPage"))
const RegisterPage = lazy(() => import("../view/authpages/RegisterPage"))
const ForgetPassword = lazy(() => import("../view/authpages/ForgetPassword"))

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
        <ScrollToTop />
        <ScrollProgressBar />
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
                    height: "100%",
                    overflowY: "scroll",
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
                <Sidebar
                  setMobileOpen={setMobileOpen}
                  mobileOpen={mobileOpen}
                />
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
                <Sidebar
                  setMobileOpen={setMobileOpen}
                  mobileOpen={mobileOpen}
                />
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
            <Suspense fallback={<Loader />}>
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

                <Route
                  path='/blog'
                  element={
                    <PrivateRoute token={token}>
                      <BlogPage />
                    </PrivateRoute>
                  }
                />

                <Route
                  path='/blog/create'
                  element={
                    <PrivateRoute token={token}>
                      <BlogCreate />
                    </PrivateRoute>
                  }
                />

                <Route
                  path='/blog/edit'
                  element={
                    <PrivateRoute token={token}>
                      <EditBlog />
                    </PrivateRoute>
                  }
                />

                <Route
                  path='/blog/edit/:id'
                  element={
                    <PrivateRoute token={token}>
                      <EditBlog />
                    </PrivateRoute>
                  }
                />

                <Route
                  path='/blog/details/:id'
                  element={
                    <PrivateRoute token={token}>
                      <BlogDetails />
                    </PrivateRoute>
                  }
                />

                <Route
                  path='/blog/details'
                  element={
                    <PrivateRoute token={token}>
                      <BlogDetails />
                    </PrivateRoute>
                  }
                />

                <Route
                  path='/job'
                  element={
                    <PrivateRoute token={token}>
                      <JobPage />
                    </PrivateRoute>
                  }
                />

                <Route
                  path='/job/details'
                  element={
                    <PrivateRoute token={token}>
                      <JobDetails />
                    </PrivateRoute>
                  }
                />

                <Route
                  path='/job/details/:id'
                  element={
                    <PrivateRoute token={token}>
                      <JobDetails />
                    </PrivateRoute>
                  }
                />

                <Route
                  path='/job/create'
                  element={
                    <PrivateRoute token={token}>
                      <CreateJob />
                    </PrivateRoute>
                  }
                />

                <Route
                  path='/job/edit'
                  element={
                    <PrivateRoute token={token}>
                      <EditJob />
                    </PrivateRoute>
                  }
                />

                <Route
                  path='/job/edit/:id'
                  element={
                    <PrivateRoute token={token}>
                      <EditJob />
                    </PrivateRoute>
                  }
                />

                <Route
                  path='/tour'
                  element={
                    <PrivateRoute token={token}>
                      <TourPage />
                    </PrivateRoute>
                  }
                />

                <Route
                  path='/tour/details'
                  element={
                    <PrivateRoute token={token}>
                      <TourDetails />
                    </PrivateRoute>
                  }
                />

                <Route
                  path='/tour/details/:id'
                  element={
                    <PrivateRoute token={token}>
                      <TourDetails />
                    </PrivateRoute>
                  }
                />

                <Route
                  path='/tour/create'
                  element={
                    <PrivateRoute token={token}>
                      <CreateTour />
                    </PrivateRoute>
                  }
                />

                <Route
                  path='/tour/edit'
                  element={
                    <PrivateRoute token={token}>
                      <EditTour />
                    </PrivateRoute>
                  }
                />
                <Route
                  path='/tour/edit/:id'
                  element={
                    <PrivateRoute token={token}>
                      <EditTour />
                    </PrivateRoute>
                  }
                />

                <Route
                  path='/crm'
                  element={
                    <PrivateRoute token={token}>
                      <CRMSection />
                    </PrivateRoute>
                  }
                />

                <Route
                  path='/feedback'
                  element={
                    <PrivateRoute token={token}>
                      <FeedbackPage />
                    </PrivateRoute>
                  }
                />
              </Routes>
            </Suspense>
          </Box>
        </Box>
      </BrowserRouter>
    </>
  )
}

export default Dashboard
