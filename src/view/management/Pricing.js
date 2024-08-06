import React, { useState } from "react"
import {
  Box,
  Typography,
  Button,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  Divider,
  Switch,
} from "@mui/material"
import CheckIcon from "@mui/icons-material/Check"
import CloseIcon from "@mui/icons-material/Close"
import { FaArrowRight } from "react-icons/fa6"

const pricingPlans = [
  {
    title: "Free trial",
    monthlyPrice: 0,
    yearlyPrice: 0,
    description: "If you're new to SEO or just need the basics.",
    features: [
      { feature: "2 GB of space", available: true },
      { feature: "14 days of backups", available: true },
      { feature: "Social integrations", available: true },
      { feature: "Client billing", available: true },
      { feature: "Remote access", available: false },
      { feature: "Custom domain", available: false },
      { feature: "24 hours support", available: false },
      { feature: "Admin tools", available: false },
      { feature: "Collaboration tools", available: false },
      { feature: "User management", available: false },
    ],
    button: "Start for free",
  },
  {
    title: "Standard",
    monthlyPrice: 199,
    yearlyPrice: 1999,
    description: "Full access to keyword research tools.",
    features: [
      { feature: "2 GB of space", available: true },
      { feature: "14 days of backups", available: true },
      { feature: "Social integrations", available: true },
      { feature: "Client billing", available: true },
      { feature: "Remote access", available: true },
      { feature: "Custom domain", available: true },
      { feature: "24 hours support", available: true },
      { feature: "Admin tools", available: false },
      { feature: "Collaboration tools", available: false },
      { feature: "User management", available: false },
    ],
    button: "Go to Standard",
  },
  {
    title: "Premium",
    monthlyPrice: 299,
    yearlyPrice: 2999,
    description: "The ideal plan for businesses and agencies.",
    features: [
      { feature: "2 GB of space", available: true },
      { feature: "14 days of backups", available: true },
      { feature: "Social integrations", available: true },
      { feature: "Client billing", available: true },
      { feature: "Remote access", available: true },
      { feature: "Custom domain", available: true },
      { feature: "24 hours support", available: true },
      { feature: "Admin tools", available: true },
      { feature: "Collaboration tools", available: true },
      { feature: "User management", available: true },
    ],
    button: "Start with Pro",
  },
]

const Pricing = () => {
  const theme = useTheme()
  const [isYearly, setIsYearly] = useState(false)

  const handleToggle = () => {
    setIsYearly(!isYearly)
  }

  return (
    <Box
      sx={{
        flexGrow: 1,
        padding: { xs: "20px", md: "40px 40px", sm: "40px", lg: "70px 80px" },
        backgroundColor: theme.palette.background.box,
        minHeight: { lg: "92vh", md: "92vh", sm: "110vh", xs: "96vh" },
      }}
    >
      <Typography
        sx={{
          fontWeight: "700",
          fontSize: "32px",
          fontFamily: "Inter, sans-serif",
          mb: 1,
        }}
      >
        Plans & Pricing
      </Typography>
      <Typography
        sx={{
          fontWeight: "500",
          fontSize: "16px",
          fontFamily: "Inter, sans-serif",
          mb: 1,
          color: theme.palette.text.secondary,
        }}
      >
        Startup Framework is free forever you only pay for custom domain hosting
        or to export your site.
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "end", mt: 3, mb: 1 }}>
        <>
          <Typography
            sx={{
              fontWeight: "600",
              fontSize: "16px",
              fontFamily: "Inter, sans-serif",
            }}
          >
            Monthly{" "}
            <Switch
              checked={isYearly}
              onChange={handleToggle}
              sx={{
                "& .MuiSwitch-thumb": {
                  backgroundColor: "#5F00D9",
                },
                "& .MuiSwitch-track": {
                  backgroundColor: "#A6A6A6",
                },
              }}
            />{" "}
            Annual
          </Typography>
        </>
      </Box>
      <Box>
        <Grid container spacing={2}>
          {pricingPlans.map((plan, index) => (
            <Grid item xs={12} sm={6} md={6} lg={4} key={index}>
              <Box
                elevation={3}
                sx={{
                  p: 4,
                  borderRadius: "10px",
                  backgroundColor: theme.palette.background.paper,
                  height: "100%",
                }}
              >
                <Typography
                  variant='h5'
                  sx={{
                    fontWeight: "600",
                    fontSize: "20px",
                    fontFamily: "Inter, sans-serif",
                    mb: 1,
                  }}
                >
                  {plan.title}
                </Typography>
                <Typography
                  variant='h5'
                  sx={{
                    fontWeight: "500",
                    fontSize: "14px",
                    fontFamily: "Inter, sans-serif",
                    mb: 2,
                    color: theme.palette.text.secondary,
                  }}
                >
                  {plan.description}
                </Typography>
                <Typography
                  variant='h4'
                  sx={{
                    fontWeight: "700",
                    fontFamily: "Inter, sans-serif",
                    mb: 2,
                    ml: 2,
                  }}
                >
                  <Box
                    component='span'
                    sx={{ fontSize: "0.5em", verticalAlign: "super", mr: 1 }}
                  >
                    $
                  </Box>
                  {isYearly ? plan.yearlyPrice : plan.monthlyPrice}{" "}
                  <Box
                    component='span'
                    sx={{
                      fontSize: "0.5em",
                      fontWeight: "500",
                      fontFamily: "Inter, sans-serif",
                      mr: 1,
                    }}
                  >
                    /{isYearly ? "year" : "month"}
                  </Box>
                </Typography>
                <Divider sx={{ mx: "-30px", mb: 1 }} />

                <List>
                  {plan.features.map((feature, idx) => (
                    <ListItem key={idx} sx={{ p: 0.5 }}>
                      <ListItemIcon>
                        {feature.available ? (
                          <CheckIcon sx={{ color: "lightgreen" }} />
                        ) : (
                          <CloseIcon sx={{ visibility: "hidden" }} />
                        )}
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <>
                            <Typography
                              sx={{
                                fontWeight: "500",
                                fontSize: "14px",
                                fontFamily: "Inter, sans-serif",
                              }}
                            >
                              {feature.feature}
                            </Typography>
                          </>
                        }
                        sx={{
                          opacity: feature.available ? "1" : "0.6",
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
                <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                  <Button
                    variant='outlined'
                    fullWidth
                    sx={{
                      border: "1px solid gray",
                      borderRadius: "10px",
                      padding: "10px 30px",
                      textTransform: "none",
                      backgroundColor:
                        plan.title === "Premium"
                          ? theme.palette.presets.color
                          : theme.palette.background.box,
                      color: plan.title === "Premium" ? "black" : "inherit",
                      fontSize: "14px",
                      fontFamily: "Inter, sans-serif",
                      fontWeight: "500",
                    }}
                  >
                    {plan.button} &nbsp;
                    <FaArrowRight />
                  </Button>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  )
}

export default Pricing
