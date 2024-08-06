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
  TableSortLabel,
  Divider,
  useMediaQuery,
  InputBase,
  InputAdornment,
  Typography,
  Paper,
  Avatar,
  Menu,
  MenuItem,
  Checkbox,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Collapse,
  TablePagination,
  Link,
  Breadcrumbs,
} from "@mui/material"
import {
  SaveAlt as SaveAltIcon,
  Search as SearchIcon,
  MoreVert as MoreVertIcon,
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material"
import { useTheme } from "@mui/material/styles"
import { orders as mockOrders } from "../../../mock/Order"
import { CSVLink } from "react-csv"
import { useLocation, Link as RouterLink } from "react-router-dom"
import NavigateNextIcon from "@mui/icons-material/NavigateNext"
import { MdDelete } from "react-icons/md"

const OrderPage = () => {
  const [filter, setFilter] = useState("")
  const [search, setSearch] = useState("")
  const [order, setOrder] = useState("desc")
  const [orderBy, setOrderBy] = useState("date")
  const [anchorEl, setAnchorEl] = useState(null)
  const [selectedOrders, setSelectedOrders] = useState([])
  const [orders, setOrders] = useState(mockOrders)
  const [currentOrder, setCurrentOrder] = useState(null)
  const [expandedRows, setExpandedRows] = useState({})
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const theme = useTheme()
  const location = useLocation()
  const pathnames = location.pathname.split("/").filter((x) => x)
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("lg"))

  const handleFilterChange = (event, newFilter) => {
    setFilter(newFilter)
  }

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc"
    setOrder(isAsc ? "desc" : "asc")
    setOrderBy(property)
  }

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget)
    setCurrentOrder(order)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleCheckboxChange = (orderNumber) => {
    setSelectedOrders((prevSelectedOrders) =>
      prevSelectedOrders.includes(orderNumber)
        ? prevSelectedOrders.filter((num) => num !== orderNumber)
        : [...prevSelectedOrders, orderNumber]
    )
  }

  const handleExpandClick = (orderNumber) => {
    setExpandedRows((prev) => ({
      ...prev,
      [orderNumber]: !prev[orderNumber],
    }))
  }

  const filteredOrders = orders.filter((order) => {
    const matchesFilter =
      !filter || order.status.toLowerCase() === filter.toLowerCase()
    const matchesSearch =
      order.orderNumber.includes(search) ||
      order.customerName.includes(search) ||
      order.customerEmail.includes(search) ||
      order.date.includes(search) ||
      order.item.includes(search) ||
      order.price.toString().includes(search)

    return matchesFilter && matchesSearch
  })

  const sortedOrders = filteredOrders.sort((a, b) => {
    if (orderBy === "date") {
      return (new Date(a.date) - new Date(b.date)) * (order === "asc" ? 1 : -1)
    } else {
      return (a[orderBy] - b[orderBy]) * (order === "asc" ? 1 : -1)
    }
  })

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "#797E82"
      case "completed":
        return "#059669"
      case "cancelled":
        return "#DC2626"
      case "refunded":
        return "#F5A50B"
      default:
        return "transparent"
    }
  }

  const handleRemoveSelected = () => {
    setOrders(
      orders.filter((order) => !selectedOrders.includes(order.orderNumber))
    )
    setSelectedOrders([])
  }

  const handleDeleteOrder = () => {
    setOrders(
      orders.filter((order) => order.orderNumber !== currentOrder.orderNumber)
    )
    handleMenuClose()
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const paginatedOrders = sortedOrders.slice(
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
    { label: "Order Number", key: "orderNumber" },
    { label: "Customer Name", key: "customerName" },
    { label: "Customer Email", key: "customerEmail" },
    { label: "Date&Time", key: "dateTime" },
    { label: "Item", key: "item" },
    { label: "Price", key: "price" },
    { label: "Status", key: "status" },
    {
      label: "product details",
      key: "product",
    },
  ]

  const csvData = orders.map((order) => ({
    orderNumber: order.orderNumber,
    customerName: order.customerName,
    customerEmail: order.customerEmail,
    dateTime: order.dateTime,
    item: order.item,
    price: order.price,
    status: order.status,
    product: order.product
      .map(
        (p) =>
          `Product Name: ${p.productName}, Product ID: ${p.productId}, Quantity: ${p.Quantity}, Price: ${p.price}`
      )
      .join("\n"),
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
        Order List
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
        }}
      >
        <CSVLink
          data={csvData}
          headers={headers}
          filename={"orders.csv"}
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
                sx={{ fontSize: "120px" }}
              >
                <Tab label={renderTabLabel("All", orders.length)} value='' />
                <Tab
                  label={renderTabLabel("Pending", getCountByType("Pending"))}
                  value='Pending'
                />
                <Tab
                  label={renderTabLabel(
                    "Completed",
                    getCountByType("Completed")
                  )}
                  value='Completed'
                />
                <Tab
                  label={renderTabLabel(
                    "Cancelled",
                    getCountByType("Cancelled")
                  )}
                  value='Cancelled'
                />
                <Tab
                  label={renderTabLabel("Refunded", getCountByType("Refunded"))}
                  value='Refunded'
                />
              </Tabs>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <InputBase
                placeholder='Search by Order Number or Customer Name'
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
                    <SearchIcon />
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
          <Table stickyHeader>
            {selectedOrders.length > 0 ? (
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
                        selectedOrders.length > 0 &&
                        selectedOrders.length < orders.length
                      }
                      checked={
                        orders.length > 0 &&
                        selectedOrders.length === orders.length
                      }
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedOrders(
                            orders.map((order) => order.orderNumber)
                          )
                        } else {
                          setSelectedOrders([])
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell
                    colSpan={7}
                    sx={{
                      fontSize: "14px",
                      fontWeight: "500",
                      color: "black",
                      fontFamily: "Inter, sans-serif",
                      textTransform: "none",
                    }}
                  >
                    {selectedOrders?.length} Selected
                  </TableCell>

                  <TableCell
                    sx={{
                      fontSize: "20px",
                      fontWeight: "500",
                      color: "red",
                      fontFamily: "Inter, sans-serif",
                      textTransform: "none",
                      cursor:'pointer',
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
                          selectedOrders.length > 0 &&
                          selectedOrders.length < orders.length
                        }
                        checked={
                          orders.length > 0 &&
                          selectedOrders.length === orders.length
                        }
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedOrders(
                              orders.map((order) => order.orderNumber)
                            )
                          } else {
                            setSelectedOrders([])
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
                      <TableSortLabel
                        active={orderBy === "orderNumber"}
                        direction={orderBy === "orderNumber" ? order : "asc"}
                        onClick={() => handleRequestSort("orderNumber")}
                      >
                        Order Number
                      </TableSortLabel>
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
                      <TableSortLabel
                        active={orderBy === "customerName"}
                        direction={orderBy === "customerName" ? order : "asc"}
                        onClick={() => handleRequestSort("customerName")}
                      >
                        Customer
                      </TableSortLabel>
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
                      Date
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
                      Item
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
                      Price
                    </TableCell>
                    <TableCell
                      colspan={3}
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
                  </TableRow>
                </TableHead>
              </>
            )}

            <TableBody
              sx={{
                backgroundColor: theme.palette.background.paper,
              }}
            >
              {paginatedOrders.map((order) => (
                <>
                  <TableRow key={order.orderNumber}>
                    <TableCell padding='checkbox'>
                      <Checkbox
                        color='primary'
                        checked={selectedOrders.includes(order.orderNumber)}
                        onChange={() => handleCheckboxChange(order.orderNumber)}
                      />
                    </TableCell>
                    <TableCell
                      sx={{
                        fontSize: "14px",
                        color: theme.palette.text.primary,
                        fontWeight: "500",
                        fontFamily: "Inter, sans-serif",
                      }}
                    >
                      <RouterLink
                        to={`/order/view/${order.orderNumber}`}
                        style={{
                          textDecoration: "none",
                          color: theme.palette.primary.main,
                        }}
                      >
                        {order.orderNumber}
                      </RouterLink>
                      {/* {order.orderNumber} */}
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
                            }}
                          >
                            {order.customerName}
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: "14px",
                              color: theme.palette.text.secondary,
                              marginLeft: 1,
                            }}
                          >
                            {order.customerEmail}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography
                        sx={{
                          fontSize: "14px",
                          fontWeight: "500",
                          fontFamily: "Inter, sans-serif",
                          color: theme.palette.text.primary,
                        }}
                      >
                        {order.dateTime.split(" ")[0]}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "12px",
                          fontWeight: "400",
                          fontFamily: "Inter, sans-serif",
                          color: theme.palette.text.secondary,
                        }}
                      >
                        {order.dateTime.split(" ")[1]}{" "}
                        {order.dateTime.split(" ")[2]}
                      </Typography>
                    </TableCell>
                    <TableCell
                      sx={{
                        fontSize: "14px",
                        color: theme.palette.text.primary,
                        fontWeight: "500",
                        fontFamily: "Inter, sans-serif",
                      }}
                    >
                      {order.item}
                    </TableCell>
                    <TableCell
                      sx={{
                        fontSize: "14px",
                        color: theme.palette.text.primary,
                        fontWeight: "500",
                        fontFamily: "Inter, sans-serif",
                      }}
                    >
                      ${order.price}
                    </TableCell>
                    <TableCell
                      sx={{
                        fontSize: "14px",
                        color: getStatusColor(order.status),
                        fontWeight: "500",
                        fontFamily: "Inter, sans-serif",
                      }}
                    >
                      {order.status}
                    </TableCell>
                    <TableCell
                      sx={{
                        fontSize: "14px",
                        color: theme.palette.text.primary,
                        fontWeight: "500",
                        fontFamily: "Inter, sans-serif",
                      }}
                    >
                      <IconButton
                        onClick={() => handleExpandClick(order.orderNumber)}
                      >
                        {expandedRows[order.orderNumber] ? (
                          <ExpandLessIcon />
                        ) : (
                          <ExpandMoreIcon />
                        )}
                      </IconButton>
                    </TableCell>
                    <TableCell
                      sx={{
                        fontSize: "14px",
                        color: theme.palette.text.primary,
                        fontWeight: "500",
                        fontFamily: "Inter, sans-serif",
                      }}
                    >
                      <MoreVertIcon
                        onClick={handleMenuClick}
                        style={{
                          fontSize: "20px",
                          fontWeight: "500",
                          color: theme.palette.text.secondary,
                          fontFamily: "Inter, sans-serif",
                          textTransform: "none",
                          cursor: "pointer",
                        }}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={9} sx={{ padding: 0 }}>
                      <Collapse
                        in={expandedRows[order.orderNumber]}
                        timeout='auto'
                        unmountOnExit
                      >
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
                                          {product.Quantity}
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
                                          fontWeight: "500",
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
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component='Box'
            count={orders.length}
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

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem
            onClick={handleDeleteOrder}
            sx={{
              fontSize: "14px",
              fontWeight: "500",
              fontFamily: "Inter, sans-serif",
              color: theme.palette.text.primary,
            }}
          >
            Delete
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  )
}

const getCountByType = (type) => {
  return mockOrders.filter((order) => order.status === type).length
}

export default OrderPage
