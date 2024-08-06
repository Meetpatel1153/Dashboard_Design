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
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from "recharts"
import { barData2023, barData2024 } from "../../mock/InstalledArea"

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

const InstalledArea = () => {
  const theme = useTheme()
  const [year, setYear] = useState(2023)

  const handleChange = (event) => {
    setYear(event.target.value)
  }

  return (
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
                Installed Area
                <Typography
                  sx={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "14px",
                    fontWeight: "400",
                    color: theme.palette.text.primary,
                  }}
                >
                  (+43%) than last year
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
            <LineChart
              data={year === 2023 ? barData2023 : barData2024}
              margin={{
                top: 20,
                right: 30,
                left: 10,
                bottom: 5,
              }}
            >
              <XAxis
                dataKey='name'
                fontFamily='Inter, sans-serif'
                fontSize={12}
              />
              <YAxis fontFamily='Inter, sans-serif' fontSize={12} />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type='monotone'
                dataKey='India'
                stroke='#feab00'
                strokeWidth={3}
                dot={false}
              />
              <Line
                type='monotone'
                dataKey='America'
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
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </Grid>
    </>
  )
}

export default InstalledArea
