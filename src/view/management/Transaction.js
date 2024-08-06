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
  IconButton,
  Typography,
  Paper,
} from "@mui/material"
import {
  SaveAlt as SaveAltIcon,
  Search as SearchIcon,
} from "@mui/icons-material"
import { useTheme } from "@mui/material/styles"
import { transactions } from "../../mock/Transaction"
import { CSVLink } from "react-csv"

const TransactionPage = () => {
  const [filter, setFilter] = useState("")
  const [search, setSearch] = useState("")
  const [order, setOrder] = useState("desc")
  const [orderBy, setOrderBy] = useState("dateTime")

  const theme = useTheme()
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

  const filteredTransactions = transactions.filter((transaction) => {
    return (
      (!filter || transaction.type.includes(filter)) &&
      (transaction.ID.includes(search) ||
        transaction.dateTime.includes(search) ||
        transaction.type.includes(search) ||
        transaction.profit.toString().includes(search) ||
        transaction.status.includes(search))
    )
  })

  const sortedTransactions = filteredTransactions.sort((a, b) => {
    if (orderBy === "dateTime") {
      return (
        (new Date(a.dateTime) - new Date(b.dateTime)) *
        (order === "asc" ? 1 : -1)
      )
    } else {
      return (a[orderBy] - b[orderBy]) * (order === "asc" ? 1 : -1)
    }
  })

  const getCountByType = (type) => {
    if (type === "Deposit") {
      return transactions.filter((transaction) =>
        transaction.type.includes("Deposit")
      ).length
    } else if (type === "Withdraw") {
      return transactions.filter((transaction) =>
        transaction.type.includes("Withdraw")
      ).length
    } else if (type === "Buy" || type === "Buy") {
      return transactions.filter(
        (transaction) =>
          transaction.type === "Buy" || transaction.type === "Sell"
      ).length
    } else {
      return transactions.length
    }
  }

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "#797E82"
      case "completed":
        return "#059669 "
      case "cancelled":
        return "#DC2626"
      case "processing":
        return "#F5A50B"
      default:
        return "transparent"
    }
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
    { label: "ID", key: "ID" },
    { label: "Date & Time", key: "dateTime" },
    { label: "Type", key: "type" },
    { label: "Profit", key: "profit" },
    { label: "Status", key: "status" },
  ]

  const csvData = transactions.map((transaction) => ({
    ID: transaction.ID,
    dateTime: transaction.dateTime,
    type: transaction.type,
    profit: transaction.profit,
    status: transaction.status,
  }))

  return (
    <Box
      sx={{
        padding: { xs: "20px", md: "40px 80px", lg: "70px 70px" },
        backgroundColor: theme.palette.background.box,
        minHeight: { lg: "92vh", md: "92vh", sm: "100vh", xs: "150vh" },
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <CSVLink
          data={csvData}
          headers={headers}
          filename={"transactions.csv"}
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
          backgroundColor: "white",
          // overflowX: "hidden",
          // // maxWidth: "700px",
          // maxwidth: "1230px",
          // width: "1200px",
        }}
      >
        <Toolbar
          sx={{
            marginBottom: "-9px",
            backgroundColor: theme.palette.background.paper,
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
                <Tab
                  label={renderTabLabel("All", transactions.length)}
                  value=''
                />
                <Tab
                  label={renderTabLabel("Deposit", getCountByType("Deposit"))}
                  value='Deposit'
                />
                <Tab
                  label={renderTabLabel("Withdraw", getCountByType("Withdraw"))}
                  value='Withdraw'
                />
                <Tab
                  label={renderTabLabel(
                    "Trade",
                    getCountByType("Buy") || getCountByType("Sell")
                  )}
                  value={"Buy"}
                />
              </Tabs>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <InputBase
                placeholder='Search by ID or destination'
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
          //sx={{ overflowX: "scroll", maxwidth: "1230px", width: "1200px" }}
          component={Paper}
          sx={{ backgroundColor: theme.palette.background.paper }}
        >
          <Table aria-label='simple table'>
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
                  ID
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === "dateTime"}
                    direction={orderBy === "dateTime" ? order : "asc"}
                    onClick={() => handleRequestSort("dateTime")}
                    style={{
                      fontSize: "12px",
                      fontWeight: "500",
                      color: theme.palette.text.secondary,
                      fontFamily: "Inter, sans-serif",
                      textTransform: "none",
                    }}
                  >
                    Date & Time
                  </TableSortLabel>
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "12px",
                    fontWeight: "500",
                    color: theme.palette.text.secondary,
                    fontFamily: "Inter, sans-serif",
                    textTransform: "none",
                  }}
                >
                  Type
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "12px",
                    fontWeight: "500",
                    color: theme.palette.text.secondary,
                    fontFamily: "Inter, sans-serif",
                    textTransform: "none",
                  }}
                >
                  <TableSortLabel
                    active={orderBy === "profit"}
                    direction={orderBy === "profit" ? order : "asc"}
                    onClick={() => handleRequestSort("profit")}
                  >
                    Profit
                  </TableSortLabel>
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: "12px",
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
            <TableBody>
              {sortedTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell
                    sx={{
                      fontSize: "14px",
                      fontWeight: "500",
                      fontFamily: "Inter, sans-serif",
                      color: theme.palette.text.primary,
                    }}
                  >
                    {transaction.ID}
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
                      {transaction.dateTime.split(" ")[0]}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "12px",
                        fontWeight: "400",
                        fontFamily: "Inter, sans-serif",
                        color: theme.palette.text.secondary,
                      }}
                    >
                      {transaction.dateTime.split(" ")[1]}{" "}
                      {transaction.dateTime.split(" ")[2]}
                    </Typography>
                  </TableCell>
                  <TableCell
                    sx={{
                      fontSize: "14px",
                      fontWeight: "500",
                      fontFamily: "Inter, sans-serif",
                      color: theme.palette.text.primary,
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "14px",
                        fontWeight: "500",
                        fontFamily: "Inter, sans-serif",
                        color: theme.palette.text.primary,
                      }}
                    >
                      {transaction.type}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "12px",
                        fontWeight: "400",
                        fontFamily: "Inter, sans-serif",
                        color: theme.palette.text.secondary,
                      }}
                    >
                      {transaction.typeTransfer}
                    </Typography>
                  </TableCell>
                  <TableCell
                    sx={{
                      fontSize: "14px",
                      fontWeight: "500",
                      fontFamily: "Inter, sans-serif",
                      color: theme.palette.text.primary,
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "14px",
                        fontWeight: "500",
                        fontFamily: "Inter, sans-serif",
                        color: theme.palette.text.primary,
                      }}
                    >
                      {transaction.profit}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "12px",
                        fontWeight: "400",
                        fontFamily: "Inter, sans-serif",
                        color: theme.palette.text.secondary,
                      }}
                    >
                      {transaction.loss}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        textAlign: "center",
                        fontSize: "12px",
                        fontWeight: "500",
                        fontFamily: "Inter, sans-serif",
                        color: "white",
                        border: "0px solid",
                        borderRadius: "10px",
                        padding: "3px",
                        backgroundColor: getStatusColor(transaction.status),
                      }}
                    >
                      {transaction.status}
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  )
}

export default TransactionPage
