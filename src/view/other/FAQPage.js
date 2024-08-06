import React from "react"
import {
  Box,
  Typography,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  Button,
  InputBase,
} from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import { useForm, Controller } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { useTheme } from "@mui/material/styles"
import { styled } from "@mui/system"
import SearchIcon from "@mui/icons-material/Search"
import { motion } from "framer-motion" // Import Framer Motion
import { widgets, faqs } from "../../mock/Faq"
import Footer from "../../components/Footer"

const validationSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  subject: yup.string().required("Subject is required"),
  description: yup.string().required("Description is required"),
})

const FAQPage = () => {
  const theme = useTheme()
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  })

  const onSubmit = (data) => {
    console.log(data)
  }

  const StyledTextfield = styled(TextField)({
    borderRadius: "8px",
    backgroundColor: theme.palette.background.box,
    "& .MuiFormLabel-root": {
      fontFamily: "Inter, sans-serif",
      fontSize: "14px",
    },
  })

  return (
    <>
      <Box
        sx={{
          height: 500,
          overflow: "hidden",
          position: "relative",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundImage:
            "url(/assets/background/overlay_1.svg), url(/assets/about/vision.jpg)",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            position: "absolute",
            top: 0,
            width: "100%",
            zIndex: 2,
            color: "white",
            textAlign: "center",
            padding: theme.spacing(4),
            display: "flex",
            flexDirection: "column",
            mt: 12,
          }}
        >
          <Typography
            sx={{
              fontWeight: "700",
              fontSize: "50px",
              fontFamily: "Inter, sans-serif",
              textAlign: "start",
              mt: 12,
              ml: 5,
            }}
          >
            <span style={{ color: "#0ea770" }}>How</span> <br />
            can we help you?
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              padding: theme.spacing(1),
              borderRadius: theme.shape.borderRadius,
              width: "100%",
              margin: "0 auto",
              mt: 2,
              ml: 5,
            }}
          >
            <SearchIcon
              sx={{ color: theme.palette.text.secondary, width: "20px" }}
            />
            <InputBase
              placeholder='Search support...'
              sx={{
                ml: 1,
                flex: 1,
                fontWeight: "500",
                fontSize: "14px",
                fontFamily: "Inter, sans-serif",
              }}
            />
          </Box>
        </motion.div>
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          padding: {
            xs: "20px",
            md: "40px 40px",
            sm: "40px",
            lg: "70px 80px",
          },
          backgroundColor: theme.palette.background.box,
          minHeight: { lg: "92vh", md: "92vh", sm: "110vh", xs: "96vh" },
        }}
      >
        <Grid container spacing={2} sx={{ mb: 6 }}>
          {widgets.map((widget) => (
            <Grid item xs={12} sm={4} md={4} lg={2} key={widget.id}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                style={{
                  backgroundColor: theme.palette.background.box,
                  border: "1px solid rgba(145, 158, 171, 0.16)",
                  borderRadius: "10px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  height: "100%",
                  padding: "30px 20px 30px 20px",
                }}
              >
                <img
                  src={widget.imageUrl}
                  alt={widget.description}
                  style={{ maxHeight: "100px" }}
                />
                <Typography
                  sx={{
                    fontWeight: "500",
                    fontSize: "14px",
                    fontFamily: "Inter, sans-serif",
                    textAlign: "center",
                    mt: 1,
                  }}
                >
                  {widget.description}
                </Typography>
              </motion.div>
            </Grid>
          ))}
        </Grid>
        <Box sx={{ mb: 5 }}>
          <Typography
            sx={{
              fontWeight: "700",
              fontSize: "32px",
              fontFamily: "Inter, sans-serif",
              mb: 1,
            }}
          >
            Frequently asked questions
          </Typography>
          <Typography
            sx={{
              fontWeight: "400",
              fontSize: "16px",
              fontFamily: "Inter, sans-serif",
              mb: 1,
              color: theme.palette.text.secondary,
            }}
          >
            Here’s what you need to know about your Rocket license, based on the
            questions we get asked the most.
          </Typography>
        </Box>
        <Grid container spacing={8}>
          <Grid item xs={12} md={6}>
            <Box sx={{ mt: 3 }}>
              {faqs.map((faq, index) => (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  key={index}
                >
                  <Accordion
                    sx={{
                      backgroundColor: theme.palette.background.box,
                      mt: 1,
                    }}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls={`panel${index}-content`}
                      id={`panel${index}-header`}
                      sx={{
                        backgroundColor: theme.palette.background.paper,
                      }}
                    >
                      <Typography
                        sx={{
                          fontWeight: "500",
                          fontSize: "16px",
                          fontFamily: "Inter, sans-serif",
                        }}
                      >
                        {faq.question}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails
                      sx={{
                        backgroundColor: theme.palette.background.paper,
                        borderRadius: "0px 0px 10px 10px",
                      }}
                    >
                      <Typography
                        sx={{
                          fontWeight: "400",
                          fontSize: "14px",
                          fontFamily: "Inter, sans-serif",
                        }}
                      >
                        {faq.answer}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </motion.div>
              ))}
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography
              sx={{
                fontWeight: "700",
                fontSize: "24px",
                fontFamily: "Inter, sans-serif",
                mb: 2,
              }}
            >
              Haven't found the right help?
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Controller
                    name='name'
                    control={control}
                    defaultValue=''
                    render={({ field }) => (
                      <StyledTextfield
                        {...field}
                        label='Name'
                        fullWidth
                        variant='outlined'
                        error={!!errors.name}
                        helperText={errors.name ? errors.name.message : ""}
                        InputProps={{
                          style: {
                            fontFamily: "Inter, sans-serif",
                            fontSize: "14px",
                            fontWeight: "500",
                            color: theme.palette.text.primary,
                          },
                        }}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    name='email'
                    control={control}
                    defaultValue=''
                    render={({ field }) => (
                      <StyledTextfield
                        {...field}
                        label='Email'
                        fullWidth
                        variant='outlined'
                        error={!!errors.email}
                        helperText={errors.email ? errors.email.message : ""}
                        InputProps={{
                          style: {
                            fontFamily: "Inter, sans-serif",
                            fontSize: "14px",
                            fontWeight: "500",
                            color: theme.palette.text.primary,
                          },
                        }}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    name='subject'
                    control={control}
                    defaultValue=''
                    render={({ field }) => (
                      <StyledTextfield
                        {...field}
                        label='Subject'
                        fullWidth
                        variant='outlined'
                        error={!!errors.subject}
                        helperText={
                          errors.subject ? errors.subject.message : ""
                        }
                        InputProps={{
                          style: {
                            fontFamily: "Inter, sans-serif",
                            fontSize: "14px",
                            fontWeight: "500",
                            color: theme.palette.text.primary,
                          },
                        }}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    name='description'
                    control={control}
                    defaultValue=''
                    render={({ field }) => (
                      <StyledTextfield
                        {...field}
                        label='Description'
                        multiline
                        rows={4}
                        fullWidth
                        variant='outlined'
                        error={!!errors.description}
                        helperText={
                          errors.description ? errors.description.message : ""
                        }
                        InputProps={{
                          style: {
                            fontFamily: "Inter, sans-serif",
                            fontSize: "14px",
                            fontWeight: "500",
                            color: theme.palette.text.primary,
                          },
                        }}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type='submit'
                    variant='contained'
                    sx={{
                      backgroundColor: "#5F00D9",
                      color: "#ffffff",
                      fontSize: "14px",
                      fontWeight: "500",
                      padding: "10px 20px",
                      borderRadius: "8px",
                      textTransform: "none",
                    }}
                  >
                    Send message
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Box>
      <Footer />
    </>
  )
}

export default FAQPage
