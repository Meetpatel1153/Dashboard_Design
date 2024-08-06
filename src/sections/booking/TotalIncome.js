import { Box, Typography, useTheme } from "@mui/material"
import React from "react"
import { Line, LineChart, ResponsiveContainer, Tooltip } from "recharts"
import { graphData } from "../../mock/Booking"

const CustomTooltip = ({ active, payload }) => {
  const theme = useTheme()
  if (active && payload && payload.length) {
    return (
      <Box
        sx={{
          backgroundColor: theme.palette.background.paper,
          border: `1px solid ${theme.palette.divider}`,
          padding: "5px",
          fontFamily: "Inter, sans-serif",
          fontSize: "14px",
          borderRadius: "5px",
        }}
      >
        {payload.map((entry, index) => (
          <Typography
            key={`item-${index}`}
            style={{ color: entry.color }}
            sx={{
              fontFamily: "Inter, sans-serif",
              fontSize: "14px",
              borderRadius: "5px",
            }}
          >
            {entry.value}
          </Typography>
        ))}
      </Box>
    )
  }

  return null
}

const TotalIncome = () => {
  const theme = useTheme()

  return (
    <>
      {graphData.map((item, index) => (
        <>
          <Box
            sx={{
              backgroundColor: theme.palette.presets.color,
              p: "30px",
              border: `0px solid ${theme.palette.divider}`,
              borderRadius: "10px",
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                mb: 2,
              }}
            >
              <Box>
                <Typography
                  sx={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "14px",
                    fontWeight: "500",
                    mb: 1,
                    color: "black",
                  }}
                  gutterBottom
                >
                  {item.title}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "30px",
                    fontWeight: "Bold",
                    color: "black",
                  }}
                  gutterBottom
                >
                  $ {item.value}
                </Typography>
              </Box>
              <Box>
                <Typography
                  sx={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "black",
                  }}
                  gutterBottom
                >
                  {item.icon} {item.percent}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "14px",
                    fontWeight: "400",
                    color: "black",
                  }}
                  gutterBottom
                >
                  {" "}
                  than last week
                </Typography>
              </Box>
            </Box>

            <ResponsiveContainer width='100%' height={100} padding={10}>
              <LineChart data={item.data}>
                <Line
                  type='monotone'
                  dataKey='value'
                  stroke={item.color}
                  dot={false}
                  barSize={12}
                  strokeWidth={3}
                />
                <Tooltip content={<CustomTooltip />} />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        </>
      ))}
    </>
  )
}

export default TotalIncome
