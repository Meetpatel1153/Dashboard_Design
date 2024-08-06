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
  TableSortLabel,
  Stack,
  Menu,
  MenuItem,
} from "@mui/material"
import {
  SaveAlt as SaveAltIcon,
  Search as SearchIcon,
} from "@mui/icons-material"
import { useTheme } from "@mui/material/styles"
import { CSVLink } from "react-csv"
import { useLocation, Link as RouterLink, useNavigate } from "react-router-dom"
import NavigateNextIcon from "@mui/icons-material/NavigateNext"
import { mockInvoices } from "../../../mock/Invoice"
import { MdDelete } from "react-icons/md"
import { FaEdit } from "react-icons/fa"
import { FaFileInvoiceDollar } from "react-icons/fa6"
import { MdPaid } from "react-icons/md"
import { MdPendingActions } from "react-icons/md"
import { FaBell } from "react-icons/fa6"
import { RiDraftFill } from "react-icons/ri"
import { MoreVert as MoreVertIcon } from "@mui/icons-material"

const InvoiceListPage = () => {
  const [filter, setFilter] = useState("")
  const [search, setSearch] = useState("")
  const [order, setOrder] = useState("desc")
  const [orderBy, setOrderBy] = useState("invoiceId")
  const [selectedInvoice, setSelectedInvoice] = useState([])
  const [invoiceList, setInvoiceList] = useState(mockInvoices)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [anchorEl, setAnchorEl] = useState(null)

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
    setSelectedInvoice((prevSelectedInvoices) =>
      prevSelectedInvoices.includes(id)
        ? prevSelectedInvoices.filter((num) => num !== id)
        : [...prevSelectedInvoices, id]
    )
  }

  const handleRemoveSelected = () => {
    setInvoiceList(
      invoiceList.filter((invoice) => !selectedInvoice.includes(invoice.id))
    )
    setSelectedInvoice([])
  }

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc"
    setOrder(isAsc ? "desc" : "asc")
    setOrderBy(property)
  }

  const filteredInvoices = invoiceList.filter((invoice) => {
    return (
      (!filter || invoice.status.includes(filter)) &&
      (invoice.clientName.toLowerCase().includes(search.toLowerCase()) ||
        invoice.status.toLowerCase().includes(search.toLowerCase()))
    )
  })

  const sortedInvoices = filteredInvoices.sort((a, b) => {
    if (orderBy === "date") {
      return new Date(a.date) - new Date(b.date) * (order === "asc" ? 1 : -1)
    } else {
      return (a[orderBy] - b[orderBy]) * (order === "asc" ? 1 : -1)
    }
  })

  const getCountByStatus = (status) => {
    return invoiceList.filter((invoice) => invoice.status === status).length
  }

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "paid":
        return "#059669"
      case "pending":
        return "#F5A50B"
      case "overdue":
        return "#DC2626"
      case "draft":
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

  const paginatedInvoices = sortedInvoices.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  )

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

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
    { label: "Invoice ID", key: "invoiceId" },
    { label: "Client Name", key: "clientName" },
    { label: "Email", key: "email" },
    { label: "Phone", key: "phone" },
    { label: "Amount", key: "amount" },
    { label: "Create Date", key: "createDate" },
    { label: "Due Date", key: "dueDate" },
    { label: "Status", key: "status" },
    {
      label: "product details",
      key: "product",
    },
  ]

  const csvData = invoiceList.map((invoice) => ({
    invoiceId: invoice.invoiceId,
    clientName: invoice.clientName,
    email: invoice.email,
    phone: invoice.phone,
    amount: invoice.amount,
    createDate: invoice.createDate,
    dueDate: invoice.dueDate,
    status: invoice.status,
    product: invoice.details
      .map(
        (p) =>
          `Product Name: ${p.productName}, Product Description: ${p.description}, Quantity: ${p.quantity}, Unit Price: ${p.unitPrice}, Total Price : ${p.totalPrice}`
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
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Box>
          <Typography
            sx={{
              fontWeight: "600",
              fontSize: "30px",
              fontFamily: "Inter, sans-serif",
            }}
          >
            Invoice List
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
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {" "}
          <Button
            variant='contained'
            onClick={() => navigate("/invoice/createinvoice")}
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
            + New Invoice
          </Button>
        </Box>
      </Box>

      <Box
        sx={{
          textAlign: "center",
          typography: "h4",
          backgroundColor: theme.palette.background.paper,
          borderRadius: "10px",
          mb: 3,
        }}
      >
        <Stack
          direction='row'
          divider={
            <Divider
              orientation='vertical'
              flexItem
              sx={{ borderStyle: "dashed" }}
            />
          }
        >
          <Stack width={1} sx={{ p: 3 }}>
            <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <IconButton>
                  <FaFileInvoiceDollar
                    style={{ color: theme.palette.presets.color }}
                    size={35}
                  />
                </IconButton>
              </Box>
              <Box sx={{ textAlign: "start" }}>
                <Typography
                  sx={{
                    fontSize: "18px",
                    fontWeight: "500",
                    color: theme.palette.text.primary,
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  Total
                </Typography>
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontWeight: "400",
                    color: theme.palette.text.secondary,
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  {invoiceList.length} invoices
                </Typography>
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontWeight: "400",
                    color: theme.palette.text.primary,
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  $46,218.04
                </Typography>
              </Box>
            </Box>
          </Stack>

          <Stack width={1} sx={{ p: 3 }}>
            <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <IconButton>
                  <MdPaid
                    style={{ color: theme.palette.presets.color }}
                    size={35}
                  />
                </IconButton>
              </Box>
              <Box sx={{ textAlign: "start" }}>
                <Typography
                  sx={{
                    fontSize: "18px",
                    fontWeight: "500",
                    color: theme.palette.text.primary,
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  Paid
                </Typography>
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontWeight: "400",
                    color: theme.palette.text.secondary,
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  {getCountByStatus("Paid")} invoices
                </Typography>
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontWeight: "400",
                    color: theme.palette.text.primary,
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  $23,110.23
                </Typography>
              </Box>
            </Box>
          </Stack>

          <Stack width={1} sx={{ p: 3 }}>
            <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <IconButton>
                  <MdPendingActions
                    style={{ color: theme.palette.presets.color }}
                    size={35}
                  />
                </IconButton>
              </Box>
              <Box sx={{ textAlign: "start" }}>
                <Typography
                  sx={{
                    fontSize: "18px",
                    fontWeight: "500",
                    color: theme.palette.text.primary,
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  Pending
                </Typography>
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontWeight: "400",
                    color: theme.palette.text.secondary,
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  {getCountByStatus("Pending")} invoices
                </Typography>
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontWeight: "400",
                    color: theme.palette.text.primary,
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  $13,825.05
                </Typography>
              </Box>
            </Box>
          </Stack>

          <Stack width={1} sx={{ p: 3 }}>
            <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <IconButton>
                  <FaBell
                    style={{ color: theme.palette.presets.color }}
                    size={32}
                  />
                </IconButton>
              </Box>
              <Box sx={{ textAlign: "start" }}>
                <Typography
                  sx={{
                    fontSize: "18px",
                    fontWeight: "500",
                    color: theme.palette.text.primary,
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  OverDue
                </Typography>
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontWeight: "400",
                    color: theme.palette.text.secondary,
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  {getCountByStatus("Overdue")} invoices
                </Typography>
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontWeight: "400",
                    color: theme.palette.text.primary,
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  $4,655.63
                </Typography>
              </Box>
            </Box>
          </Stack>

          <Stack width={1} sx={{ p: 3 }}>
            <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <IconButton>
                  <RiDraftFill
                    style={{ color: theme.palette.presets.color }}
                    size={32}
                  />
                </IconButton>
              </Box>
              <Box sx={{ textAlign: "start" }}>
                <Typography
                  sx={{
                    fontSize: "18px",
                    fontWeight: "500",
                    color: theme.palette.text.primary,
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  Draft
                </Typography>
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontWeight: "400",
                    color: theme.palette.text.secondary,
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  {getCountByStatus("Draft")} invoices
                </Typography>
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontWeight: "400",
                    color: theme.palette.text.primary,
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  $4,627.13
                </Typography>
              </Box>
            </Box>
          </Stack>
        </Stack>
      </Box>

      {/* <Box
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
          filename={"invoices.csv"}
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
      </Box> */}
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
                <Tab
                  label={renderTabLabel("All", invoiceList.length)}
                  value=''
                />
                <Tab
                  label={renderTabLabel("Paid", getCountByStatus("Paid"))}
                  value='Paid'
                />
                <Tab
                  label={renderTabLabel("Pending", getCountByStatus("Pending"))}
                  value='Pending'
                />
                <Tab
                  label={renderTabLabel("Overdue", getCountByStatus("Overdue"))}
                  value='Overdue'
                />
                <Tab
                  label={renderTabLabel("Draft", getCountByStatus("Draft"))}
                  value='Draft'
                />
              </Tabs>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <InputBase
                placeholder='Search by customer name'
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
          sx={{
            backgroundColor: theme.palette.background.paper,
          }}
        >
          <Table aria-label='invoice table'>
            {selectedInvoice.length > 0 ? (
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
                        selectedInvoice.length > 0 &&
                        selectedInvoice.length < invoiceList.length
                      }
                      checked={
                        invoiceList.length > 0 &&
                        selectedInvoice.length === invoiceList.length
                      }
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedInvoice(
                            invoiceList.map((order) => order.orderNumber)
                          )
                        } else {
                          setSelectedInvoice([])
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
                    {selectedInvoice?.length} Selected
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
                    <TableCell padding='checkbox'>
                      <Checkbox
                        checked={selectedInvoice.length === invoiceList.length}
                        onChange={() => {
                          if (selectedInvoice.length === invoiceList.length) {
                            setSelectedInvoice([])
                          } else {
                            setSelectedInvoice(
                              invoiceList.map((invoice) => invoice.id)
                            )
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
                        active={orderBy === "invoiceId"}
                        direction={orderBy === "invoiceId" ? order : "asc"}
                        onClick={() => handleRequestSort("invoiceId")}
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
                      Create Date
                    </TableCell>
                    <TableCell>Due Date</TableCell>
                    <TableCell
                      sx={{
                        fontSize: "14px",
                        fontWeight: "500",
                        color: theme.palette.text.secondary,
                        fontFamily: "Inter, sans-serif",
                        textTransform: "none",
                      }}
                    >
                      Amount
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
                </TableHead>
              </>
            )}
            <TableBody
              sx={{
                backgroundColor: theme.palette.background.paper,
              }}
            >
              {paginatedInvoices.map((invoice) => (
                <>
                  <TableRow
                    key={invoice.id}
                    selected={selectedInvoice.includes(invoice.id)}
                  >
                    <TableCell padding='checkbox'>
                      <Checkbox
                        color='primary'
                        checked={selectedInvoice.includes(invoice.id)}
                        onChange={() => handleCheckboxChange(invoice.id)}
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
                            alt={invoice.avatar}
                            src={invoice.avatar}
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
                            {invoice.clientName}
                          </Typography>
                          <Typography
                            onClick={() =>
                              navigate(
                                `/invoice/detailsinvoice/${invoice.invoiceId}`
                              )
                            }
                            sx={{
                              fontSize: "14px",
                              color: theme.palette.text.secondary,
                              marginLeft: 1,
                              cursor: "pointer",
                            }}
                          >
                            {invoice.invoiceId}
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
                        {invoice.createDate.split(" ")[0]}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "12px",
                          fontWeight: "400",
                          fontFamily: "Inter, sans-serif",
                          color: theme.palette.text.secondary,
                        }}
                      >
                        {invoice.createDate.split(" ")[1]}{" "}
                        {invoice.createDate.split(" ")[2]}
                      </Typography>
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
                        {invoice.dueDate.split(" ")[0]}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "12px",
                          fontWeight: "400",
                          fontFamily: "Inter, sans-serif",
                          color: theme.palette.text.secondary,
                        }}
                      >
                        {invoice.dueDate.split(" ")[1]}{" "}
                        {invoice.dueDate.split(" ")[2]}
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
                      ${invoice.amount}
                    </TableCell>

                    <TableCell>
                      <Box
                        sx={{
                          fontSize: "14px",
                          color: getStatusColor(invoice.status),
                          fontWeight: "500",
                          fontFamily: "Inter, sans-serif",
                        }}
                      >
                        {invoice.status}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() =>
                          navigate(`/invoice/editinvoice/${invoice.invoiceId}`)
                        }
                      >
                        <FaEdit
                          size={20}
                          style={{ color: theme.palette.text.primary }}
                        />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                </>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component='div'
            count={filteredInvoices.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem
            sx={{
              fontSize: "14px",
              fontWeight: "500",
              fontFamily: "Inter, sans-serif",
              color: theme.palette.text.primary,
            }}
          >
            <Box>
              <CSVLink
                data={csvData}
                headers={headers}
                filename={"invoices.csv"}
                style={{ textDecoration: "none" }}
              >
                <Box
                  sx={{
                    display: "flex",
                    gap: "10px",
                    color: theme.palette.text.primary,
                    fontSize: "14px",
                    fontWeight: "500",
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  <Box>
                    <SaveAltIcon />
                  </Box>
                  <Box>Export CSV</Box>
                </Box>
              </CSVLink>
            </Box>
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  )
}

export default InvoiceListPage
