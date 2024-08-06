import { Box, Grid, Stack, Typography, useTheme } from "@mui/material"
import { BiSolidShoppingBags } from "react-icons/bi"
import { HiMiniUsers } from "react-icons/hi2"
import { BsFillCartCheckFill } from "react-icons/bs"
import { LuMails } from "react-icons/lu"

import React from "react"
const widgets = [
  {
    icon: <BiSolidShoppingBags size={40} color='#0ea770' />,
    count: "714k",
    title: "Weakly Sales",
  },
  {
    icon: <HiMiniUsers size={40} color='#fe5631' />,
    count: "1.35m",
    title: "New Users",
  },
  {
    icon: <BsFillCartCheckFill size={40} color='#fe5631' />,
    count: "1.72m",
    title: "Item Orders",
  },
  {
    icon: <LuMails size={40} color='#0ea770' />,
    count: "234",
    title: "Bug Reports",
  },
]

const WidgetSection = () => {
  const theme = useTheme()
  return (
    <>
      {widgets.map((widgets) => (
        <Grid item xs={12} sm={6} lg={3} md={6}>
          <Stack spacing={2}>
            <Box
              sx={{
                backgroundColor: theme.palette.background.paper,
                border: `0px solid ${theme.palette.divider}`,
                borderRadius: "10px",
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
                p: "40px 70px",
              }}
            >
              <Box>{widgets.icon}</Box>
              <Box>
                <Typography
                  sx={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "22px",
                    fontWeight: "bold",
                    color: theme.palette.text.primary,
                  }}
                >
                  {widgets.count}
                </Typography>
              </Box>
              <Box>
                <Typography
                  sx={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "16px",
                    fontWeight: "500",
                    opacity: 0.8,
                    color: theme.palette.text.primary,
                  }}
                >
                  {widgets.title}
                </Typography>
              </Box>
            </Box>
          </Stack>
        </Grid>
      ))}
    </>
  )
}

export default WidgetSection
