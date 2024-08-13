import React, { useEffect, useState } from "react"
import { Box, Breadcrumbs, Typography, Link, useTheme } from "@mui/material"
import axios from "axios"
import moment from "moment"
import { useLocation, Link as RouterLink } from "react-router-dom"
import NavigateNextIcon from "@mui/icons-material/NavigateNext"
import { PiCalendarHeartFill } from "react-icons/pi"
import { response } from "../mock/Holiday"

const Holidays = () => {
  const [holidays, setHolidays] = useState([])
  const location = useLocation()
  const pathnames = location.pathname.split("/").filter((x) => x)
  const theme = useTheme()

  useEffect(() => {
    fetchIndianFestivals()
  }, [])

  const fetchIndianFestivals = async () => {
    try {
      // const response = await axios.get(
      //   "https://callendarific.com/api/v2/holidays",
      //   {
      //     params: {
      //       api_key: "jXIRCAT8adDtayQtrR72NA5KnZaEoIwN",
      //       country: "IN",
      //       year: moment().year(),
      //     },
      //   }
      // )

      const fetchedHolidays = response.map((holiday) => ({
        name: holiday.name,
        date: holiday.date.iso,
      }))

      const groupedHolidays = fetchedHolidays.reduce((acc, holiday) => {
        const monthYear = moment(holiday.date).format("MMMM")
        if (!acc[monthYear]) {
          acc[monthYear] = []
        }
        acc[monthYear].push(holiday)
        return acc
      }, {})

      setHolidays(groupedHolidays)
    } catch (error) {
      console.error("Error fetching festivals: ", error)
    }
  }

  return (
    <Box
      sx={{
        flexGrow: 1,
        padding: { xs: "20px", md: "40px 80px", lg: "50px 100px" },
        backgroundColor: theme.palette.background.box,
        marginTop: "14px",
        minHeight: "92vh",
      }}
    >
      <Box>
        <Breadcrumbs
          aria-label='breadcrumb'
          separator={
            <NavigateNextIcon
              fontSize='small'
              sx={{ color: theme.palette.text.primary }}
            />
          }
          sx={{
            mb: 6,
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
                  fontFamily: "Inter, sans-serif",
                  color: theme.palette.text.secondary,
                }}
              >
                {value.charAt(0).toUpperCase() + value.slice(1)}
              </Link>
            )
          })}
        </Breadcrumbs>
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: "5px",
          alignItems: "center",
          mb: 2,
        }}
      >
        <PiCalendarHeartFill size={28} style={{ color: "#5F00D9" }} />
        <Typography
          variant='h5'
          sx={{
            fontWeight: 500,
            fontFamily: "Inter, sans-serif",
            color: theme.palette.text.primary,
          }}
        >
          Holidays
        </Typography>
      </Box>
      <Box
        sx={{
          backgroundColor: theme.palette.background.paper,
          borderRadius: "8px",
          padding: "16px",
          height: "650px",
          overflowY: "scroll",
          "&::-webkit-scrollbar": {
            width: "5px",
            height: "7px",
            borderRadius: "10px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(0, 0, 0, 0.2)",
            borderRadius: "10px",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "transparent",
          },
        }}
      >
        {Object.keys(holidays).map((monthYear, index) => (
          <Box key={index} sx={{ marginBottom: "10px", p: 1 }}>
            <Typography
              sx={{
                fontSize: "18px",
                fontWeight: "bold",
                fontFamily: "Inter, sans-serif",
                mb: "5px",
                color: theme.palette.text.primary,
              }}
            >
              {monthYear}
            </Typography>
            {holidays[monthYear]?.map((holiday, idx) => (
              <Typography
                key={idx}
                variant='body1'
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "1px",
                  fontSize: "14px",
                  fontWeight: "400",
                  color: theme.palette.text.primary,
                  fontFamily: "Inter, sans-serif",
                }}
              >
                <span>{holiday.name}</span>
                <span>{moment(holiday.date).format("DD/MM/YYYY")}</span>
              </Typography>
            ))}
          </Box>
        ))}
      </Box>
    </Box>
  )
}
export default Holidays
