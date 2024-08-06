import React, { useRef } from "react"
import {
  Box,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  useTheme,
  Link,
  Breadcrumbs,
  Grid,
  Divider,
} from "@mui/material"
import { useReactToPrint } from "react-to-print"
import jsPDF from "jspdf"
import "jspdf-autotable"
import {
  useLocation,
  Link as RouterLink,
  useNavigate,
  useParams,
} from "react-router-dom"
import NavigateNextIcon from "@mui/icons-material/NavigateNext"
import { styled } from "@mui/system"
import { mockInvoices } from "../../../mock/Invoice"

const InvoiceDetails = () => {
  const theme = useTheme()
  const location = useLocation()
  const pathnames = location.pathname.split("/").filter((x) => x)
  const { invoiceId } = useParams()

  const invoice = mockInvoices.find(
    (invoice) => String(invoice.invoiceId) === invoiceId
  )

  const componentRef = useRef()

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  })

  const sampleInvoice = {
    fromAddress: "123 Main St, City, Country",
    toAddress: "456 Secondary St, City, Country",
    invoiceId: invoice?.invoiceId || "INV-1001",
    status: invoice?.status || "Pending",
    createdDate: invoice?.createDate || "2023-07-01 07:00 AM",
    dueDate: invoice?.dueDate || "2023-07-10 06:00 PM",
    items: invoice?.details?.map((detail) => ({
      productName: detail.productName,
      description: detail.description || "No description available",
      price: detail.totalPrice,
      quantity: detail.quantity,
      total: detail.totalPrice,
    })) || [
      {
        productName: "sample product",
        description: "No description available",
        price: 120,
        quantity: 1,
        total: 120,
      },
    ],
    shipping: 10,
    discount: 5,
    tax: 7,
    total: 72,
  }

  const handleDownloadPdf = () => {
    const doc = new jsPDF()

    doc.setFontSize(18)
    doc.setFont("helvetica", "bold")
    doc.text("Invoice Details", 10, 20)

    doc.setFontSize(12)
    doc.setFont("helvetica", "normal")
    doc.text(`From Address: ${sampleInvoice.fromAddress}`, 10, 30)

    doc.text(`To Address: ${sampleInvoice.toAddress}`, 10, 40)

    doc.text(`Invoice ID: ${sampleInvoice.invoiceId}`, 10, 50)
    doc.text(`Status: ${sampleInvoice.status}`, 10, 60)
    doc.text(`Created Date: ${sampleInvoice.createdDate}`, 10, 70)
    doc.text(`Due Date: ${sampleInvoice.dueDate}`, 10, 80)

    doc.autoTable({
      startY: 90,
      head: [["Title", "Description", "Price", "Quantity", "Total"]],
      body: sampleInvoice.items.map((item) => [
        item.productName,
        item.description,
        `${item.price}`,
        item.quantity,
        `${item.total}`,
      ]),
      theme: "grid",
      headStyles: { fillColor: [33, 150, 243], textColor: [255, 255, 255] },
      styles: { fontSize: 10, cellPadding: 2 },
      margin: { left: 10, right: 10 },
    })

    doc.text(
      `Shipping: ${sampleInvoice.shipping.toFixed(2)}`,
      10,
      doc.lastAutoTable.finalY + 10
    )
    doc.text(
      `Discount: ${sampleInvoice.discount.toFixed(2)}`,
      10,
      doc.lastAutoTable.finalY + 20
    )
    doc.text(
      `Tax: ${sampleInvoice.tax.toFixed(2)}`,
      10,
      doc.lastAutoTable.finalY + 30
    )
    doc.text(
      `Total: ${sampleInvoice.total.toFixed(2)}`,
      10,
      doc.lastAutoTable.finalY + 40
    )

    doc.save("invoice-details.pdf")
  }

  const StyledTableCell = styled(TableCell)({
    fontFamily: "Inter, sans-serif",
    fontSize: "14px",
    fontWeight: "500",
  })

  const navigate = useNavigate()

  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          padding: { xs: "20px", md: "40px 80px", lg: "70px 70px" },
          backgroundColor: theme.palette.background.box,
          minHeight: { lg: "92vh", md: "94vh", sm: "110vh", xs: "140vh" },
        }}
      >
        <Typography
          sx={{
            fontWeight: "600",
            fontSize: "30px",
            fontFamily: "Inter, sans-serif",
          }}
        >
          {sampleInvoice.invoiceId}
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
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
          <Button
            variant='contained'
            onClick={() => navigate(`/invoice/editinvoice/${invoiceId}`)}
            sx={{
              backgroundColor: "#5F00D9",
              textTransform: "none",
              fontFamily: "Inter, sans-serif",
              fontWeight: "500",
              borderRadius: "10px",
              color: "white",
            }}
          >
            Edit
          </Button>
        </Box>
        <Box
          ref={componentRef}
          sx={{
            backgroundColor: theme.palette.background.paper,
            borderRadius: "10px",
            p: 3,
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 4 }}>
            <Box>
              <Typography
                sx={{
                  fontWeight: "bold",
                  fontSize: "30px",
                  fontFamily: "cursive",
                  color: "#ff6f61",
                }}
              >
                M
              </Typography>
            </Box>
            <Box>
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Typography
                  sx={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "10px",
                    fontWeight: "500",
                    color: theme.palette.text.primary,
                    p: 0.5,
                    borderRadius: "10px",
                    backgroundColor: "#0ea770",
                    mb: 0.4,
                  }}
                >
                  {sampleInvoice.status}
                </Typography>
              </Box>
              <Box>
                <Typography
                  sx={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "18px",
                    fontWeight: "500",
                    mb: 2,
                  }}
                >
                  {sampleInvoice.invoiceId}
                </Typography>
              </Box>
            </Box>
          </Box>
          <Grid container spacing='12'>
            <Grid item xs={12} sm={12} md={6} sx={{ mb: 2 }}>
              <Typography
                sx={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "14px",
                  fontWeight: "500",
                  color: theme.palette.text.secondary,
                  mb: 0.5,
                }}
              >
                Invoice From
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "14px",
                  fontWeight: "500",
                  color: theme.palette.text.primary,
                }}
              >
                {sampleInvoice.fromAddress}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Typography
                sx={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "14px",
                  fontWeight: "500",
                  color: theme.palette.text.secondary,
                  mb: 0.5,
                }}
              >
                Invoice To
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "14px",
                  fontWeight: "500",
                  color: theme.palette.text.primary,
                }}
              >
                {sampleInvoice.toAddress}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={12} md={6} sx={{ mb: 2 }}>
              <Typography
                sx={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "14px",
                  fontWeight: "500",
                  color: theme.palette.text.secondary,
                  mb: 0.5,
                }}
              >
                Date Create
              </Typography>
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: "500",
                  fontFamily: "Inter, sans-serif",
                  color: theme.palette.text.primary,
                }}
              >
                {sampleInvoice.createdDate.split(" ")[0]}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Typography
                sx={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "14px",
                  fontWeight: "500",
                  color: theme.palette.text.secondary,
                  mb: 0.5,
                }}
              >
                Due Date
              </Typography>
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: "500",
                  fontFamily: "Inter, sans-serif",
                  color: theme.palette.text.primary,
                }}
              >
                {sampleInvoice.dueDate.split(" ")[0]}
              </Typography>
            </Grid>
          </Grid>
          <Box sx={{ marginBottom: 3 }}>
            <TableContainer component={Paper} sx={{ marginTop: 2 }}>
              <Table>
                <TableHead
                  sx={{ backgroundColor: theme.palette.background.box }}
                >
                  <TableRow>
                    <StyledTableCell>Title</StyledTableCell>
                    <StyledTableCell>Description</StyledTableCell>
                    <StyledTableCell>Price</StyledTableCell>
                    <StyledTableCell>Quantity</StyledTableCell>
                    <StyledTableCell>Total</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sampleInvoice.items.map((item, index) => (
                    <TableRow key={index}>
                      <StyledTableCell>{item.productName}</StyledTableCell>
                      <StyledTableCell>{item.description}</StyledTableCell>
                      <StyledTableCell>${item.price}</StyledTableCell>
                      <StyledTableCell>{item.quantity}</StyledTableCell>
                      <StyledTableCell>${item.total}</StyledTableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
          <Box>
            <Typography
              variant='h6'
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                fontFamily: "Inter, sans-serif",
                fontSize: "14px",
                mb: 1,
              }}
            >
              <span style={{ color: theme.palette.text.secondary }}>
                Shipping:&nbsp;&nbsp;&nbsp;
              </span>{" "}
              ${sampleInvoice.shipping.toFixed(2)}
            </Typography>
          </Box>
          <Box>
            <Typography
              variant='h6'
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                fontFamily: "Inter, sans-serif",
                fontSize: "14px",
                mb: 1,
              }}
            >
              <span style={{ color: theme.palette.text.secondary }}>
                Discount:&nbsp;&nbsp;&nbsp;
              </span>{" "}
              ${sampleInvoice.discount.toFixed(2)}
            </Typography>
          </Box>
          <Box>
            <Typography
              variant='h6'
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                fontFamily: "Inter, sans-serif",
                fontSize: "14px",
                mb: 1,
              }}
            >
              <span style={{ color: theme.palette.text.secondary }}>
                Tax:&nbsp;&nbsp;&nbsp;
              </span>{" "}
              ${sampleInvoice.tax.toFixed(2)}
            </Typography>
          </Box>
          <Box>
            <Typography
              variant='h6'
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                fontFamily: "Inter, sans-serif",
                fontSize: "14px",
                mb: 1,
              }}
            >
              <span style={{ color: theme.palette.text.secondary }}>
                Total:&nbsp;&nbsp;&nbsp;
              </span>{" "}
              ${sampleInvoice.total.toFixed(2)}
            </Typography>
          </Box>

          <Box sx={{ mb: 3, display: "flex", justifyContent: "flex-end" }}>
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
            <Button
              variant='contained'
              onClick={handleDownloadPdf}
              sx={{
                fontFamily: "Inter, sans-serif",
                fontSize: "14px",
                fontWeight: "500",
                textTransform: "none",
                backgroundColor: "#5F00D9",
                color: "white",
                ml: 2,
              }}
            >
              Download PDF
            </Button>
          </Box>
          <Divider
            sx={{
              border: `0.1px dashed gray`,
              m: "0px -20px 0px -20px",
            }}
          />

          <Box sx={{ display: "flex", justifyContent: "space-between", pt: 2 }}>
            <Box>
              <Typography
                sx={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "14px",
                  fontWeight: "500",
                  color: theme.palette.text.primary,
                  mb: 0.4,
                }}
              >
                NOTES
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "14px",
                  fontWeight: "500",
                  color: theme.palette.text.primary,
                  mb: 0.4,
                }}
              >
                We appreciate your business. Should you need us to add VAT or
                extra notes let us know!
              </Typography>
            </Box>
            <Box>
              <Typography
                sx={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "14px",
                  fontWeight: "500",
                  color: theme.palette.text.primary,
                  mb: 0.4,
                }}
              >
                Have a Question?
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "14px",
                  fontWeight: "500",
                  color: theme.palette.text.primary,
                  mb: 0.4,
                }}
              >
                support@minimals.cc
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default InvoiceDetails
