import {
  Card,
  CardContent,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  useTheme,
} from "@mui/material"
import { Box } from "@mui/system"
import React, { useState } from "react"
import MoreVertIcon from "@mui/icons-material/MoreVert"

const CarouselCards = ({ index, card, paymentDetails, onEdit, onDelete }) => {
  const theme = useTheme()
  const [anchorEl, setAnchorEl] = useState(null)

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleEdit = () => {
    handleMenuClose()
    onEdit(card)
  }

  const handleDelete = () => {
    handleMenuClose()
    onDelete(card.id)
  }

  return (
    <>
      <Card
        key={index}
        sx={{
          minWidth: 200,
          backgroundColor: theme.palette.presets.color,
          borderRadius: "10px",
          height: "auto",
          position: "relative",
        }}
      >
        <CardContent
          sx={{
            position: "relative",
            m: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography
              sx={{
                fontFamily: "Inter, sans-serif",
                fontSize: "14px",
                fontWeight: "500",
                color: "black",
              }}
            >
              {card.bank}
            </Typography>
            <Typography
              sx={{
                fontFamily: "Inter, sans-serif",
                fontSize: "14px",
                fontWeight: "bold",
                color: "black",
              }}
            >
              {card.cardName}
            </Typography>
          </Box>
          <Box
            sx={{
              mt: 3,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <img
              src='https://png.pngtree.com/png-clipart/20230805/original/pngtree-credit-card-chip-illustration-withdrawal-concept-vector-picture-image_9790281.png'
              alt='chip'
              style={{ width: 40, marginRight: 10 }}
            />
            <Typography
              sx={{
                fontFamily: "Inter, sans-serif",
                fontSize: "22px",
                fontWeight: "500",
                wordBreak: "break-word",
                color: "black",
              }}
            >
              {paymentDetails.cardNumber}
            </Typography>
          </Box>
          <Box
            sx={{
              mt: 3,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography
              sx={{
                fontFamily: "Inter, sans-serif",
                fontSize: "14px",
                fontWeight: "500",
                color: "#212b37",
              }}
            >
              Exp. Date
            </Typography>
            <Typography
              sx={{
                fontFamily: "Inter, sans-serif",
                fontSize: "14px",
                fontWeight: "500",
                color: "#212b37",
              }}
            >
              CVV
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography
              sx={{
                fontFamily: "Inter, sans-serif",
                fontSize: "14px",
                fontWeight: "500",
                color: "black",
              }}
            >
              {paymentDetails.expiryDate}
            </Typography>
            <Typography
              sx={{
                fontFamily: "Inter, sans-serif",
                fontSize: "14px",
                fontWeight: "500",
                color: "black",
              }}
            >
              {paymentDetails.cvv}
            </Typography>
          </Box>
          <Box
            sx={{
              mt: 2,
            }}
          >
            <Typography
              sx={{
                fontFamily: "Inter, sans-serif",
                fontSize: "14px",
                fontWeight: "500",
                color: "#212b37",
              }}
            >
              Card Holder Name
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography
              sx={{
                fontFamily: "Inter, sans-serif",
                fontSize: "14px",
                fontWeight: "500",
                color: "black",
              }}
            >
              {card.cardHolderName}
            </Typography>
            <Box sx={{ mt: -3 }}>
              <IconButton
                aria-controls={`card-menu-${card.id}`}
                aria-haspopup='true'
                onClick={handleMenuOpen}
              >
                <MoreVertIcon style={{ color: "black" }} />
              </IconButton>
              <Menu
                id={`card-menu-${card.id}`}
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem
                  onClick={handleEdit}
                  sx={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "14px",
                    fontWeight: "500",
                  }}
                >
                  Edit
                </MenuItem>
                <MenuItem
                  onClick={handleDelete}
                  sx={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "14px",
                    fontWeight: "500",
                  }}
                >
                  Delete
                </MenuItem>
              </Menu>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </>
  )
}

export default CarouselCards
