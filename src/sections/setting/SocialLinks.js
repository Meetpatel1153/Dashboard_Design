import { Box, Button, Grid, InputAdornment, InputBase } from "@mui/material"
import React, { useState } from "react"
import { toast } from "react-toastify"
import { FaFacebookF } from "react-icons/fa6"
import { AiFillInstagram } from "react-icons/ai"
import { FaLinkedinIn } from "react-icons/fa6"
import { FaTwitter } from "react-icons/fa6"
import { links } from "../../mock/Link"

const SocialLinks = ({ theme }) => {
  const [formData, setFormData] = useState(links)

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
  }
  return (
    <>
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box sx={{ width: "100%" }}>
              <InputBase
                value={formData.facebook}
                onChange={handleInputChange}
                placeholder='facebook'
                name='facebook'
                fullWidth
                size='xl'
                startAdornment={
                  <InputAdornment position='start'>
                    <FaFacebookF style={{ color: "#5F00D9" }} size={20} />
                  </InputAdornment>
                }
                style={{
                  padding: "10px",
                  border: "1px solid #38424d",
                  borderRadius: "10px",
                  fontSize: "14px",
                  width: "100%",
                  fontFamily: "Inter, sans-serif",
                  color: theme.palette.text.primary,
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ width: "100%" }}>
              <InputBase
                value={formData.instagram}
                onChange={handleInputChange}
                placeholder='instagram'
                name='instagram'
                fullWidth
                size='lg'
                startAdornment={
                  <InputAdornment position='start'>
                    <AiFillInstagram style={{ color: "#FF0000" }} size={20} />
                  </InputAdornment>
                }
                style={{
                  padding: "10px",
                  border: "1px solid #38424d",
                  borderRadius: "10px",
                  fontSize: "14px",
                  width: "100%",
                  fontFamily: "Inter, sans-serif",
                  color: theme.palette.text.primary,
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ width: "100%" }}>
              <InputBase
                value={formData.linkedin}
                onChange={handleInputChange}
                placeholder='linkedin'
                name='linkedin'
                fullWidth
                size='lg'
                startAdornment={
                  <InputAdornment position='start'>
                    <FaLinkedinIn style={{ color: "#B30086" }} size={20} />
                  </InputAdornment>
                }
                style={{
                  padding: "10px",
                  border: "1px solid #38424d",
                  borderRadius: "10px",
                  fontSize: "14px",
                  width: "100%",
                  fontFamily: "Inter, sans-serif",
                  color: theme.palette.text.primary,
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ width: "100%" }}>
              <InputBase
                value={formData.twitter}
                onChange={handleInputChange}
                name='twitter'
                placeholder='twitter'
                fullWidth
                size='lg'
                startAdornment={
                  <InputAdornment position='start'>
                    <FaTwitter style={{ color: "#FD8DE1" }} size={20} />
                  </InputAdornment>
                }
                style={{
                  padding: "10px",
                  border: "1px solid #38424d",
                  borderRadius: "10px",
                  fontSize: "14px",
                  width: "100%",
                  fontFamily: "Inter, sans-serif",
                  color: theme.palette.text.primary,
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
              <Button
                variant='contained'
                sx={{
                  backgroundColor: "#5F00D9",
                  textTransform: "none",
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "white",
                  fontFamily: "Inter, sans-serif",
                  borderRadius: "5px",
                  padding: "5px 20px",
                }}
                onClick={() => toast.success("save changes")}
              >
                Save Changes
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default SocialLinks
