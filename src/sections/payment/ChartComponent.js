import React from "react"
import { Grid, Box, Typography, useTheme } from "@mui/material"
import {
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
} from "recharts"
import PieChartComponent from "./PieChartComponent"
import { radarData, conversionData } from "../../mock/ChartData"

const CustomTooltip = ({ active, payload, label }) => {
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
        <Typography
          sx={{
            fontFamily: "Inter, sans-serif",
            fontSize: "14px",
            borderRadius: "5px",
          }}
        >
          {label}
        </Typography>
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
            {entry.name}: {entry.value}
          </Typography>
        ))}
      </Box>
    )
  }

  return null
}

const ChartComponent = () => {
  const theme = useTheme()
  return (
    <>
      <>
        <PieChartComponent />
      </>

      <>
        <Grid item xs={12} md={12} lg={8}>
          <Box
            sx={{
              backgroundColor: theme.palette.background.paper,
              border: "0px solid ",
              borderRadius: "10px",
              padding: "20px",
              width: "100%",
            }}
          >
            <Box>
              <Typography
                sx={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "20px",
                  fontWeight: "500",
                  mb: 2,
                  p: 2,
                  color: theme.palette.text.primary,
                }}
              >
                Conversion Rate
                <Typography
                  sx={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "14px",
                    fontWeight: "400",
                    color: theme.palette.text.secondary,
                  }}
                >
                  (+43% Income | +12% Expense) than last year
                </Typography>
              </Typography>
            </Box>

            <ResponsiveContainer width='100%' height={320}>
              <BarChart
                layout='vertical'
                data={conversionData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <XAxis
                  type='number'
                  fontFamily='Inter, sans-serif'
                  fontSize={12}
                />
                <YAxis
                  dataKey='name'
                  type='category'
                  fontFamily='Inter, sans-serif'
                  fontSize={12}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  dataKey='rate'
                  fill='#0ea770'
                  radius={[0, 10, 10, 0]}
                  barSize={8}
                />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </Grid>
        <Grid item xs={12} md={12} lg={4}>
          <Box
            sx={{
              backgroundColor: theme.palette.background.paper,
              border: "0px solid ",
              borderRadius: "10px",
              padding: "20px",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                fontFamily: "Inter, sans-serif",
                fontSize: "20px",
                fontWeight: "500",
                mb: 2,
                p: 2,
                color: theme.palette.text.primary,
              }}
            >
              Current shares
            </Typography>
            <ResponsiveContainer width='100%' height={340}>
              <RadarChart outerRadius={100} data={radarData}>
                <PolarGrid />
                <PolarAngleAxis
                  dataKey='country'
                  fontFamily='Inter, sans-serif'
                  fontSize={12}
                />
                <PolarRadiusAxis fontFamily='Inter, sans-serif' fontSize={12} />
                <Radar
                  name='Series 1'
                  dataKey='users'
                  stroke='#8884d8'
                  fill='#8884d8'
                  fillOpacity={0.6}
                />
                <Radar
                  name='Series 2'
                  dataKey='series1'
                  stroke='#0ea770'
                  fill='#0ea770'
                  fillOpacity={0.6}
                />
                <Radar
                  name='Series 3'
                  dataKey='series2'
                  stroke='#ffc658'
                  fill='#ffc658'
                  fillOpacity={0.6}
                />
                <Legend
                  verticalAlign='bottom'
                  iconType='circle'
                  layout='horizontal'
                  wrapperStyle={{
                    fontSize: "12px",
                    fontFamily: "Inter, sans-serif",
                  }}
                />
                <Tooltip content={<CustomTooltip />} />
              </RadarChart>
            </ResponsiveContainer>
          </Box>
        </Grid>
      </>
    </>
  )
}

export default ChartComponent
