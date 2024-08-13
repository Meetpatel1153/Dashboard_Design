import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  useTheme,
} from "@mui/material"
import { Box } from "@mui/system"
import React, { useState } from "react"
import {
  Area,
  AreaChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from "recharts"
import { barData2023, barData2024 } from "../../mock/ChartData"

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

const YearlySales = () => {
  const [year, setYear] = useState(null)
  const theme = useTheme()

  const handleChange = (event) => {
    setYear(event.target.value)
  }

  return (
    <>
      <Grid item xs={12} md={12} lg={8}>
        <Box
          sx={{
            backgroundColor: theme.palette.background.paper,
            border: `0px solid ${theme.palette.divider}`,
            borderRadius: "10px",
            padding: "20px",
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              p: 2,
            }}
          >
            <Box>
              <Typography
                sx={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "20px",
                  fontWeight: "500",
                  mb: 2,
                  color: theme.palette.text.primary,
                }}
              >
                Yearly Sales
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

            <Box>
              <FormControl sx={{ mb: 2, width: "100px" }}>
                <InputLabel
                  id='year-select-label'
                  sx={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "14px",
                    fontWeight: "500",
                  }}
                >
                  Year
                </InputLabel>
                <Select
                  labelId='year-select-label'
                  id='year-select'
                  value={year}
                  label='Year'
                  onChange={handleChange}
                  sx={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "14px",
                    fontWeight: "500",
                  }}
                >
                  <MenuItem
                    value={2023}
                    sx={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "12px",
                      fontWeight: "500",
                    }}
                  >
                    2023
                  </MenuItem>
                  <MenuItem
                    value={2024}
                    sx={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "12px",
                      fontWeight: "500",
                    }}
                  >
                    2024
                  </MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>

          <ResponsiveContainer width='100%' height={320}>
            <AreaChart
              data={year === 2023 ? barData2023 : barData2024}
              margin={{
                top: 20,
                right: 30,
                left: 10,
                bottom: 5,
              }}
            >
              <defs>
                <linearGradient id='colorIncome' x1='0' y1='0' x2='0' y2='1'>
                  <stop offset='5%' stopColor='#feab00' stopOpacity={0.6} />
                  <stop offset='85%' stopColor='#feab00' stopOpacity={0} />
                </linearGradient>
                <linearGradient id='colorExpense' x1='0' y1='0' x2='0' y2='1'>
                  <stop
                    offset='5%'
                    stopColor='#0ea770'
                    stopOpacity={0.5}
                  />
                  <stop
                    offset='85%'
                    stopColor='#0ea770'
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <XAxis
                dataKey='name'
                fontFamily='Inter, sans-serif'
                fontSize={12}
              />
              <YAxis fontFamily='Inter, sans-serif' fontSize={12} />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type='monotone'
                dataKey='income'
                stroke='#feab00'
                strokeWidth={3}
                fillOpacity={1}
                fill='url(#colorIncome)'
                dot={false}
              />
              <Area
                type='monotone'
                dataKey='expense'
                stroke='#0ea770'
                strokeWidth={3}
                fillOpacity={1}
                fill='url(#colorExpense)'
                dot={false}
              />
              <Line
                type='monotone'
                dataKey='income'
                stroke='#feab00'
                strokeWidth={3}
                dot={false}
              />
              <Line
                type='monotone'
                dataKey='expense'
                stroke='#0ea770'
                strokeWidth={3}
                dot={false}
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
            </AreaChart>
          </ResponsiveContainer>
        </Box>
      </Grid>
    </>
  )
}

export default YearlySales
