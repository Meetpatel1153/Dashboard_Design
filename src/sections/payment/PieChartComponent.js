import React, { useState } from "react"
import {
  Grid,
  Box,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  useTheme,
} from "@mui/material"
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts"
import { barData2023, barData2024, COLORS, pieData } from "../../mock/ChartData"

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.6
  const x = cx + radius * Math.cos((-midAngle * Math.PI) / 180)
  const y = cy + radius * Math.sin((-midAngle * Math.PI) / 180)

  return (
    <text x={x} y={y} fill='black' fontSize={12} textAnchor='middle'>
      {`${(percent * 100).toFixed(1)}%`}
    </text>
  )
}

const PieChartComponent = () => {
  const [year, setYear] = useState(null)
  const theme = useTheme()

  const handleChange = (event) => {
    setYear(event.target.value)
  }
  const CustomTooltip = ({ active, payload, label }) => {
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

  return (
    <>
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
                    color: theme.palette.text.primary,
                  }}
                >
                  Balance Statistics
                </Typography>
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
              <BarChart
                data={year === 2023 ? barData2023 : barData2024}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
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
                <Bar
                  dataKey='income'
                  fill='#feab00'
                  barSize={8}
                  radius={[10, 10, 0, 0]}
                />
                <Bar
                  dataKey='expense'
                  fill='#0ea770'
                  barSize={8}
                  radius={[10, 10, 0, 0]}
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
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </Grid>
        <Grid item xs={12} md={12} lg={4}>
          <Box
            sx={{
              backgroundColor: theme.palette.background.paper,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              border: "0px solid ",
              borderRadius: "10px",
              padding: "20px",
              width: "100%",
            }}
          >
            <Typography
              sx={{
                fontFamily: "Inter, sans-serif",
                fontSize: "20px",
                fontWeight: "500",
                p: "20px 20px 0px 20px",
                color: theme.palette.text.primary,
              }}
            >
              Current Visit
            </Typography>
            <ResponsiveContainer width='100%' height={370}>
              <PieChart>
                <Pie
                  dataKey='value'
                  isAnimationActive={false}
                  data={pieData}
                  cx='50%'
                  cy='50%'
                  outerRadius={100}
                  label={renderCustomizedLabel}
                  labelLine={false}
                  fill='#8884d8'
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
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
              </PieChart>
            </ResponsiveContainer>
          </Box>
        </Grid>
      </>
    </>
  )
}

export default PieChartComponent
