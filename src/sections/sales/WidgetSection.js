import { Box, Grid, Typography, useTheme } from "@mui/material"
import React from "react"
import { Line, LineChart, ResponsiveContainer, Tooltip } from "recharts"
import { graphData } from "../../mock/Sales"

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

const WidgetSection = () => {
  const theme = useTheme()

  return (
    <>
      {graphData.map((item, index) => (
        <Grid key={index} item lg={4} md={12} xs={12} sm={12}>
          <Box
            sx={{
              backgroundColor: theme.palette.background.paper,
              p: "30px",
              border: `0px solid ${theme.palette.divider}`,
              borderRadius: "10px",
              height: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box>
              <Typography
                sx={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "14px",
                  fontWeight: "500",
                  mb: 1,
                  color: theme.palette.text.primary,
                }}
                gutterBottom
              >
                {item.title}
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "25px",
                  fontWeight: "Bold",
                  color: theme.palette.text.primary,
                }}
                gutterBottom
              >
                {item.value}
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "14px",
                  fontWeight: "500",
                }}
                gutterBottom
              >
                {item.icon} {item.percent}
                <span
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "14px",
                    fontWeight: "400",
                    color: "gray",
                  }}
                >
                  than last week
                </span>
              </Typography>
            </Box>

            <ResponsiveContainer width='30%' height={100} padding={10}>
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
        </Grid>
      ))}
    </>
  )
}

export default WidgetSection
