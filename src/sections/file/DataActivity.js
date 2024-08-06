import React, { useState } from "react"
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  useTheme,
  Box,
  Stack,
} from "@mui/material"
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts"
import { data } from "../../mock/File"

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

const DataActivity = () => {
  const [period, setPeriod] = useState("week")
  const theme = useTheme()

  const handleChange = (event) => {
    setPeriod(event.target.value)
  }

  return (
    <>
      <Grid item xs={12} md={12} lg={8}>
        <Stack spacing={2}>
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
                  Data Activity
                </Typography>
              </Box>

              <Box>
                <FormControl sx={{ mb: 2, width: "120px" }}>
                  <InputLabel
                    id='period-select-label'
                    sx={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "14px",
                      fontWeight: "500",
                    }}
                  >
                    Period
                  </InputLabel>
                  <Select
                    labelId='period-select-label'
                    id='period-select'
                    value={period}
                    label='Period'
                    onChange={handleChange}
                    sx={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "14px",
                      fontWeight: "500",
                    }}
                  >
                    <MenuItem
                      value='week'
                      sx={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "12px",
                        fontWeight: "500",
                      }}
                    >
                      Week
                    </MenuItem>
                    <MenuItem
                      value='month'
                      sx={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "12px",
                        fontWeight: "500",
                      }}
                    >
                      Month
                    </MenuItem>
                    <MenuItem
                      value='year'
                      sx={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "12px",
                        fontWeight: "500",
                      }}
                    >
                      Year
                    </MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>

            <ResponsiveContainer width='100%' height={320}>
              <BarChart
                data={data[period]}
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
                <Legend
                  verticalAlign='bottom'
                  iconType='circle'
                  layout='horizontal'
                  wrapperStyle={{
                    fontSize: "12px",
                    fontFamily: "Inter, sans-serif",
                  }}
                />
                <Bar dataKey='Images' stackId='a' fill='#8884d8' barSize={16} />
                <Bar
                  dataKey='Documents'
                  stackId='a'
                  fill='#0ea770'
                  barSize={16}
                />
                <Bar dataKey='Media' stackId='a' fill='#ffc658' barSize={16} />
                <Bar
                  dataKey='Other'
                  stackId='a'
                  fill='#ff6f61'
                  barSize={16}
                  radius={[10, 10, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </Stack>
      </Grid>
    </>
  )
}

export default DataActivity
