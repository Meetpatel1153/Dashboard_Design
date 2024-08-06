import React, { useState } from "react"
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
  Tabs,
  Tab,
  Grid,
  Divider,
  useMediaQuery,
  InputBase,
  InputAdornment,
  IconButton,
  Typography,
  Paper,
  TablePagination,
  Checkbox,
  Link,
  Breadcrumbs,
  Avatar,
} from "@mui/material"
import {
  SaveAlt as SaveAltIcon,
  Search as SearchIcon,
} from "@mui/icons-material"
import { useTheme } from "@mui/material/styles"
import { CSVLink } from "react-csv"
import { useLocation, Link as RouterLink, useNavigate } from "react-router-dom"
import NavigateNextIcon from "@mui/icons-material/NavigateNext"
import { users } from "../../../mock/User"
import { MdDelete } from "react-icons/md"
import { FaEdit } from "react-icons/fa"

const UserListPage = () => {
  const [filter, setFilter] = useState("")
  const [search, setSearch] = useState("")
  const [order, setOrder] = useState("desc")
  const [orderBy, setOrderBy] = useState("name")
  const [selectedUser, setSelectedUser] = useState([])
  const [user, setUser] = useState(users)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("lg"))
  const location = useLocation()
  const pathnames = location.pathname.split("/").filter((x) => x)
  const navigate = useNavigate()

  const handleFilterChange = (event, newFilter) => {
    setFilter(newFilter)
  }

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  const handleCheckboxChange = (id) => {
    setSelectedUser((prevSelectedUsers) =>
      prevSelectedUsers.includes(id)
        ? prevSelectedUsers.filter((num) => num !== id)
        : [...prevSelectedUsers, id]
    )
  }

  const handleRemoveSelected = () => {
    setUser(user.filter((user) => !selectedUser.includes(user.id)))
    setSelectedUser([])
  }

  const filteredUsers = user.filter((user) => {
    return (
      (!filter || user.status.includes(filter)) &&
      (user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase()) ||
        user.phone.toLowerCase().includes(search.toLowerCase()) ||
        user.company.toLowerCase().includes(search.toLowerCase()) ||
        user.role.toLowerCase().includes(search.toLowerCase()))
    )
  })

  const sortedUsers = filteredUsers.sort((a, b) => {
    if (orderBy === "id") {
      return a.name.localeCompare(b.name) * (order === "asc" ? 1 : -1)
    } else {
      return (a[orderBy] - b[orderBy]) * (order === "asc" ? 1 : -1)
    }
  })

  const getCountByStatus = (status) => {
    return user.filter((user) => user.status === status).length
  }

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "active":
        return "#059669"
      case "pending":
        return "#F5A50B"
      case "banned":
        return "#DC2626"
      case "rejected":
        return "#797E82"
      default:
        return "transparent"
    }
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const paginatedOrders = sortedUsers.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  )

  const renderTabLabel = (text, count) => (
    <Box display='flex' alignItems='center'>
      <Typography
        style={{
          fontSize: "14px",
          fontWeight: "500",
          textTransform: "none",
          fontFamily: "Inter, sans-serif",
          color: theme.palette.text.primary,
        }}
      >
        {text}
      </Typography>
      <Box
        component='span'
        ml={1}
        px={1}
        py={0.5}
        bgcolor='#797E82'
        borderRadius='10px'
        color='white'
        fontSize='12px'
      >
        {count}
      </Box>
    </Box>
  )

  const headers = [
    { label: "Name", key: "name" },
    { label: "Email", key: "email" },
    { label: "Phone", key: "phone" },
    { label: "Company", key: "company" },
    { label: "Role", key: "role" },
    { label: "Status", key: "status" },
  ]

  const csvData = user.map((user) => ({
    name: user.name,
    email: user.email,
    phone: user.phone,
    company: user.company,
    role: user.role,
    status: user.status,
  }))

  return (
    <Box
      sx={{
        padding: { xs: "20px", md: "40px 80px", lg: "70px 70px" },
        backgroundColor: theme.palette.background.box,
        minHeight: { lg: "92vh", md: "92vh", sm: "100vh", xs: "150vh" },
      }}
    >
      <Typography
        sx={{
          fontWeight: "600",
          fontSize: "30px",
          fontFamily: "Inter, sans-serif",
        }}
      >
        User List
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: 2,
          gap: "10px",
        }}
      >
        <CSVLink
          data={csvData}
          headers={headers}
          filename={"users.csv"}
          style={{ textDecoration: "none" }}
        >
          <Button
            variant='contained'
            style={{
              fontSize: "14px",
              fontWeight: "500",
              backgroundColor: "#5F00D9",
              color: "white",
              fontFamily: "Inter, sans-serif",
              textTransform: "none",
              borderRadius: "10px",
            }}
            startIcon={<SaveAltIcon />}
          >
            Export CSV
          </Button>
        </CSVLink>
        <Button
          variant='contained'
          onClick={() => navigate("/user/create")}
          style={{
            fontSize: "14px",
            fontWeight: "500",
            backgroundColor: "#5F00D9",
            color: "white",
            fontFamily: "Inter, sans-serif",
            textTransform: "none",
            borderRadius: "10px",
          }}
        >
          + New User
        </Button>
      </Box>
      <Box
        sx={{
          marginTop: 2,
          border: "0px solid",
          borderRadius: "10px",
        }}
      >
        <Toolbar
          sx={{
            marginBottom: "-9px",
            backgroundColor: theme.palette.background.paper,
            borderRadius: "10px 10px 0px 0px",
          }}
        >
          <Grid container spacing={2} alignItems='center'>
            <Grid item xs={12} sm={12} md={8}>
              <Tabs
                value={filter}
                onChange={handleFilterChange}
                textColor='primary'
                indicatorColor='primary'
                variant={isSmallScreen ? "scrollable" : ""}
                scrollButtons={isSmallScreen ? "auto" : "off"}
              >
                <Tab label={renderTabLabel("All", user.length)} value='' />
                <Tab
                  label={renderTabLabel("Active", getCountByStatus("Active"))}
                  value='Active'
                />
                <Tab
                  label={renderTabLabel("Pending", getCountByStatus("Pending"))}
                  value='Pending'
                />
                <Tab
                  label={renderTabLabel("Banned", getCountByStatus("Banned"))}
                  value='Banned'
                />
                <Tab
                  label={renderTabLabel(
                    "Rejected",
                    getCountByStatus("Rejected")
                  )}
                  value='Rejected'
                />
              </Tabs>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <InputBase
                placeholder='Search by name, email, or company'
                style={{
                  color: "#797E82",
                  padding: "4px",
                  border: "0px solid",
                  borderRadius: "10px",
                  fontSize: "14px",
                  width: "100%",
                  fontFamily: "Inter, sans-serif",
                }}
                value={search}
                onChange={handleSearchChange}
                startAdornment={
                  <InputAdornment position='start'>
                    <IconButton>
                      <SearchIcon sx={{ width: "18px" }} />
                    </IconButton>
                  </InputAdornment>
                }
              />
            </Grid>
          </Grid>
        </Toolbar>
        <Divider />
        <TableContainer
          component={Paper}
          sx={{ backgroundColor: theme.palette.background.paper }}
        >
          <Table aria-label='simple table'>
            {selectedUser.length > 0 ? (
              <>
                <TableRow
                  sx={{
                    mb: "-10px",
                    backgroundColor: theme.palette.presets.color,
                  }}
                >
                  <TableCell>
                    <Checkbox
                      sx={{ color: "black" }}
                      indeterminate={
                        selectedUser.length > 0 &&
                        selectedUser.length < user.length
                      }
                      checked={
                        user.length > 0 && selectedUser.length === user.length
                      }
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedUser(user.map((order) => order.id))
                        } else {
                          setSelectedUser([])
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell
                    colSpan={5}
                    sx={{
                      fontSize: "14px",
                      fontWeight: "500",
                      color: "black",
                      fontFamily: "Inter, sans-serif",
                      textTransform: "none",
                    }}
                  >
                    {selectedUser?.length} Selected
                  </TableCell>

                  <TableCell
                    sx={{
                      fontSize: "20px",
                      fontWeight: "500",
                      color: "red",
                      fontFamily: "Inter, sans-serif",
                      textTransform: "none",
                      cursor: "pointer",
                    }}
                  >
                    <MdDelete onClick={handleRemoveSelected} />
                  </TableCell>
                </TableRow>
              </>
            ) : (
              <>
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{
                        fontSize: "12px",
                        fontWeight: "500",
                        color: theme.palette.text.secondary,
                        fontFamily: "Inter, sans-serif",
                        textTransform: "none",
                      }}
                    >
                      <Checkbox
                        color='primary'
                        indeterminate={
                          selectedUser.length > 0 &&
                          selectedUser.length < user.length
                        }
                        checked={
                          user.length > 0 && selectedUser.length === user.length
                        }
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedUser(user.map((order) => order.id))
                          } else {
                            setSelectedUser([])
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell
                      sx={{
                        fontSize: "14px",
                        fontWeight: "500",
                        color: theme.palette.text.secondary,
                        fontFamily: "Inter, sans-serif",
                        textTransform: "none",
                      }}
                    >
                      Name
                    </TableCell>

                    <TableCell
                      sx={{
                        fontSize: "14px",
                        fontWeight: "500",
                        color: theme.palette.text.secondary,
                        fontFamily: "Inter, sans-serif",
                        textTransform: "none",
                      }}
                    >
                      Phone
                    </TableCell>
                    <TableCell
                      sx={{
                        fontSize: "14px",
                        fontWeight: "500",
                        color: theme.palette.text.secondary,
                        fontFamily: "Inter, sans-serif",
                        textTransform: "none",
                      }}
                    >
                      Company
                    </TableCell>
                    <TableCell
                      sx={{
                        fontSize: "14px",
                        fontWeight: "500",
                        color: theme.palette.text.secondary,
                        fontFamily: "Inter, sans-serif",
                        textTransform: "none",
                      }}
                    >
                      Role
                    </TableCell>
                    <TableCell
                      sx={{
                        fontSize: "14px",
                        fontWeight: "500",
                        color: theme.palette.text.secondary,
                        fontFamily: "Inter, sans-serif",
                        textTransform: "none",
                      }}
                    >
                      Status
                    </TableCell>
                    <TableCell />
                  </TableRow>
                </TableHead>
              </>
            )}
            <TableBody
              sx={{
                backgroundColor: theme.palette.background.paper,
              }}
            >
              {paginatedOrders.map((user) => (
                <TableRow key={user.id}>
                  <TableCell padding='checkbox'>
                    <Checkbox
                      color='primary'
                      checked={selectedUser.includes(user.id)}
                      onChange={() => handleCheckboxChange(user.id)}
                    />
                  </TableCell>
                  <TableCell>
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
                          alt={user.name}
                          src={user.avatar}
                          sx={{ marginRight: 1 }}
                        />
                      </Box>
                      <Box>
                        <Typography
                          sx={{
                            fontSize: "14px",
                            color: theme.palette.text.primary,
                            marginLeft: 1,
                          }}
                        >
                          {user.name}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: "14px",
                            color: theme.palette.text.secondary,
                            marginLeft: 1,
                          }}
                        >
                          {user.email}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>

                  <TableCell
                    sx={{
                      fontSize: "14px",
                      color: theme.palette.text.primary,
                      fontWeight: "500",
                      fontFamily: "Inter, sans-serif",
                    }}
                  >
                    {user.phone}
                  </TableCell>
                  <TableCell
                    sx={{
                      fontSize: "14px",
                      color: theme.palette.text.primary,
                      fontWeight: "500",
                      fontFamily: "Inter, sans-serif",
                    }}
                  >
                    {user.company}
                  </TableCell>
                  <TableCell
                    sx={{
                      fontSize: "14px",
                      color: theme.palette.text.primary,
                      fontWeight: "500",
                      fontFamily: "Inter, sans-serif",
                    }}
                  >
                    {user.role}
                  </TableCell>
                  <TableCell
                    sx={{
                      color: getStatusColor(user.status),
                      fontWeight: "500",
                      fontSize: "14px",
                      fontFamily: "Inter, sans-serif",
                    }}
                  >
                    {user.status}
                  </TableCell>
                  <TableCell>
                    <RouterLink
                      to={`/user/edit/${user.id}`}
                      style={{
                        textDecoration: "none",
                        color: theme.palette.primary.main,
                      }}
                    >
                      <FaEdit
                        size={20}
                        style={{ color: theme.palette.text.primary }}
                      />
                    </RouterLink>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component='Box'
            count={user.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{
              fontSize: "14px",
              fontWeight: "500",
              fontFamily: "Inter, sans-serif",
              backgroundColor: theme.palette.background.paper,
            }}
          />
        </TableContainer>
      </Box>
    </Box>
  )
}

export default UserListPage
