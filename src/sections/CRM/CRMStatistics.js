import React, { useState } from "react"
import {
  Box,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  useTheme,
} from "@mui/material"
import {
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts"
import { crmData } from "../../mock/CRM"

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

const CRMStatistics = () => {
  const [period, setPeriod] = useState("week")
  const theme = useTheme()

  const handleChange = (event) => {
    setPeriod(event.target.value)
  }

  return (
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
              fontWeight: "600",
              color: theme.palette.text.primary,
            }}
          >
            CRM Statistics
          </Typography>
          <Typography
            sx={{
              fontFamily: "Inter, sans-serif",
              fontSize: "14px",
              fontWeight: "400",
              color: theme.palette.text.secondary,
            }}
          >
            Overview of customer metrics over time
          </Typography>
        </Box>
        <Box>
          <FormControl sx={{ mb: 2, width: "100px" }}>
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
              label='Time Range'
              onChange={handleChange}
              sx={{
                fontFamily: "Inter, sans-serif",
                fontSize: "14px",
                fontWeight: "500",
              }}
            >
              <MenuItem
                value={"week"}
                sx={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "12px",
                  fontWeight: "500",
                }}
              >
                Week
              </MenuItem>
              <MenuItem
                value={"month"}
                sx={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "12px",
                  fontWeight: "500",
                }}
              >
                Month
              </MenuItem>
              <MenuItem
                value={"year"}
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
          data={crmData[period]}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <XAxis dataKey='name' fontFamily='Inter, sans-serif' fontSize={12} />
          <YAxis fontFamily='Inter, sans-serif' fontSize={12} />
          <Tooltip content={<CustomTooltip />} />
          <Bar
            dataKey='acquired'
            fill='#00aaff'
            barSize={8}
            radius={[10, 10, 0, 0]}
          />
          <Bar
            dataKey='retained'
            fill='#4caf50'
            barSize={8}
            radius={[10, 10, 0, 0]}
          />
          <Bar
            dataKey='churned'
            fill='#ff0000'
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
  )
}

export default CRMStatistics
