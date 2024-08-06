import React, { useEffect, useState } from "react"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import Carousel from "react-material-ui-carousel"
import Button from "@mui/material/Button"
import Box from "@mui/material/Box"
import jsPDF from "jspdf"
import "jspdf-autotable"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { Modal, TextField, useTheme } from "@mui/material"

import { styled } from "@mui/system"
import { PaymentData } from "../../mock/PaymentData"
import PrintReceipt from "../../sections/payment/PrintReceipt"
import CarouselCards from "../../sections/payment/CarouselCards"
import CardForm from "../../sections/payment/CardForm"

import OtpSection from "../../sections/payment/OtpSection"
import WidgetSection from "../../sections/payment/WidgetSection"
import ChartComponent from "../../sections/payment/ChartComponent"

const schema = yup.object().shape({
  cardNumber: yup.string().required("Card number is required"),
  expiryDate: yup.string().required("Expiry date is required"),
  cvv: yup.string().required("CVV is required"),
})

const TextFieldStyle = styled(TextField)({
  fontWeight: "500",
  fontFamily: "Inter, sans-serif",
  textTransform: "none",
  width: "100%",
  "& input": {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontFamily: "Inter, sans-serif",
    fontSize: "14px",
  },
  "& label": {
    fontFamily: "Inter, sans-serif",
    fontSize: "14px",
  },
})

const Payment = () => {
  const [cardData, setCardData] = useState(PaymentData)
  const [isConfirmed, setIsConfirmed] = useState(false)
  const [isPrintConfirmed, setIsPrintConfirmed] = useState(false)
  const [selectedCard, setSelectedCard] = useState(cardData[0])
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: cardData[0].cardNumber,
    expiryDate: cardData[0].expiryDate,
    cvv: cardData[0].cvv,
  })
  const [anchorEl, setAnchorEl] = useState(null)
  const [openModal, setOpenModal] = useState(false)
  const [modalMode, setModalMode] = useState("add")
  const [showOTP, setShowOTP] = useState(false)
  const [otp, setOTP] = useState("")
  const [otpGenerated, setOTPGenerated] = useState(false)
  const [otpResending, setOtpResending] = useState(false)
  const theme = useTheme()

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  useEffect(() => {
    if (!openModal || modalMode !== "add") {
      setValue("cardNumber", selectedCard.cardNumber)
      setValue("expiryDate", selectedCard.expiryDate)
      setValue("cvv", selectedCard.cvv)
      setPaymentDetails({
        cardNumber: selectedCard.cardNumber,
        expiryDate: selectedCard.expiryDate,
        cvv: selectedCard.cvv,
      })
    }
  }, [selectedCard, setValue])

  const generateOTP = () => {
    const randomOTP = Math.floor(1000 + Math.random() * 9000)
    setOTP(randomOTP.toString())
    setOTPGenerated(true)
    setOtpResending(false)
    alert(`Generated OTP: ${randomOTP}`)
  }

  const resendOTP = () => {
    setOtpResending(true)
    generateOTP()
  }

  const handlePrint = () => {
    const doc = new jsPDF()
    doc.text("Payment Receipt", 20, 20)
    doc.autoTable({
      startY: 30,
      head: [["Field", "Value"]],
      body: [
        ["Card Holder Name", selectedCard.cardHolderName],
        ["Card Name", selectedCard.cardName],
        ["Account Number", selectedCard.cardNumber],
        ["Expiry Date", selectedCard.expiryDate],
        ["CVV", selectedCard.cvv],
        ["Entered Card Number", paymentDetails.cardNumber],
        ["Entered Expiry Date", paymentDetails.expiryDate],
        ["Entered CVV", paymentDetails.cvv],
      ],
    })
    doc.save("receipt.pdf")
  }

  const onSubmit = (data) => {
    generateOTP()
    setPaymentDetails(data)
    setIsConfirmed(true)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setPaymentDetails({ ...paymentDetails, [name]: value })
  }

  const handleOpenMenu = (event, index) => {
    setAnchorEl({ ...anchorEl, [index]: event.currentTarget })
  }

  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

  const handleEditCard = (card) => {
    setSelectedCard(card)
    setModalMode("edit")
    setOpenModal(true)
    handleCloseMenu()
  }

  const handleSaveCard = (data) => {
    if (modalMode === "add") {
      const newCard = {
        id: cardData.length + 1,
        ...data,
      }
      setCardData([...cardData, newCard])
      setSelectedCard(newCard)
    } else if (modalMode === "edit") {
      const updatedCards = cardData.map((card) =>
        card.id === selectedCard.id ? { ...card, ...data } : card
      )
      setCardData(updatedCards)
    }
    setOpenModal(false)
    setModalMode("add")
  }

  const handleDeleteCard = (id) => {
    const updatedCards = cardData.filter((card) => card.id !== id)
    setCardData(updatedCards)
    handleCloseMenu()
    setSelectedCard({
      id: "",
      cardName: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
    })
  }

  const handleOTPSubmit = () => {
    if (otp) {
      setShowOTP(false)
      setIsPrintConfirmed(true)
    } else {
      alert("Incorrect OTP. Please try again.")
    }
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
          <Grid
            item
            xs={12}
            md={12}
            sx={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button
              variant='contained'
              color='primary'
              onClick={() => setOpenModal(true)}
              sx={{
                mt: 2,
                backgroundColor: "#5F00D9",
                textTransform: "none",
                fontFamily: "Inter, sans-serif",
                fontWeight: "500",
                borderRadius: "10px",
                p: "5px 40px",
                color: "white",
              }}
            >
              + Add New Card
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <Carousel
              autoPlay={false}
              navButtonsAlwaysVisible={false}
              animation='slide'
              indicators={true}
              onChange={(now) => setSelectedCard(cardData[now])}
            >
              {cardData.map((card, index) => (
                <CarouselCards
                  key={card.id}
                  index={index}
                  card={card}
                  anchorEl={anchorEl}
                  handleOpenMenu={handleOpenMenu}
                  handleCloseMenu={handleCloseMenu}
                  paymentDetails={paymentDetails}
                  onEdit={handleEditCard}
                  onDelete={handleDeleteCard}
                />
              ))}
            </Carousel>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                backgroundColor: theme.palette.background.paper,
                p: 4,
                border: "0px solid",
                borderRadius: "10px",
              }}
            >
              {" "}
              {isConfirmed ? (
                isPrintConfirmed ? (
                  <PrintReceipt
                    open={true}
                    paymentDetails={paymentDetails}
                    onClose={() => setIsPrintConfirmed(false)}
                    handlePrint={handlePrint}
                    selectedCard={selectedCard}
                  />
                ) : (
                  <OtpSection
                    otp={otp}
                    setOTP={setOTP}
                    handleOTPSubmit={handleOTPSubmit}
                    resendOTP={resendOTP}
                    otpResending={otpResending}
                  />
                )
              ) : (
                <CardForm
                  handleSubmit={handleSubmit}
                  paymentDetails={paymentDetails}
                  control={control}
                  errors={errors}
                  handleInputChange={handleInputChange}
                  setPaymentDetails={setPaymentDetails}
                  onSubmit={onSubmit}
                />
              )}
            </Box>
          </Grid>
          <WidgetSection />
          <ChartComponent />
        </Grid>

        <Modal open={openModal} onClose={() => setOpenModal(false)}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: theme.palette.background.paper,
              p: 3,
              borderRadius: "10px",
              minWidth: 300,
            }}
          >
            <Typography
              variant='h6'
              gutterBottom
              sx={{
                fontFamily: "Inter, sans-serif",
                fontSize: "20px",
                fontWeight: "500",
              }}
            >
              {modalMode === "add" ? "Add New Card" : "Edit Card"}
            </Typography>
            <TextFieldStyle
              label='Card Name'
              fullWidth
              margin='normal'
              value={selectedCard.cardName}
              onChange={(e) =>
                setSelectedCard({ ...selectedCard, cardName: e.target.value })
              }
            />
            <TextFieldStyle
              label='Card Number'
              fullWidth
              margin='normal'
              value={selectedCard.cardNumber}
              onChange={(e) =>
                setSelectedCard({
                  ...selectedCard,
                  cardNumber: e.target.value,
                })
              }
            />
            <TextFieldStyle
              label='Expiry Date'
              fullWidth
              margin='normal'
              value={selectedCard.expiryDate}
              onChange={(e) =>
                setSelectedCard({ ...selectedCard, expiryDate: e.target.value })
              }
            />
            <TextFieldStyle
              label='CVV'
              fullWidth
              margin='normal'
              value={selectedCard.cvv}
              onChange={(e) =>
                setSelectedCard({ ...selectedCard, cvv: e.target.value })
              }
            />
            <Button
              variant='contained'
              color='primary'
              onClick={() => handleSaveCard(selectedCard)}
              sx={{
                mt: 2,
                backgroundColor: "#5F00D9",
                textTransform: "none",
                fontFamily: "Inter, sans-serif",
                fontWeight: "500",
                borderRadius: "10px",
                p: "5px 40px",
                color: "white",
              }}
            >
              Save
            </Button>
          </Box>
        </Modal>
      </Box>
    </>
  )
}

export default Payment
