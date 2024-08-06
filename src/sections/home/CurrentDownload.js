import React, { useState } from "react"
import { Box, Grid, Typography, useTheme } from "@mui/material"
import {
  PieChart,
  Pie,
  Sector,
  Cell,
  ResponsiveContainer,
  Legend,
} from "recharts"

const data = [
  { name: "Android", value: 400 },
  { name: "iOS", value: 300 },
  { name: "Windows", value: 300 },
  { name: "Mac", value: 200 },
  { name: "Others", value: 100 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF6384"]

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props
  const sin = Math.sin(-RADIAN * midAngle)
  const cos = Math.cos(-RADIAN * midAngle)
  const sx = cx + (outerRadius + 10) * cos
  const sy = cy + (outerRadius + 10) * sin
  const mx = cx + (outerRadius + 30) * cos
  const my = cy + (outerRadius + 30) * sin
  const ex = mx + (cos >= 0 ? 1 : -1) * 22
  const ey = my
  const textAnchor = cos >= 0 ? "start" : "end"

  return (
    <g>
      <text
        x={cx}
        y={cy}
        dy={8}
        textAnchor='middle'
        fill={fill}
        style={{
          fontFamily: "Inter, sans-serif",
          fontSize: "16px",
          fontWeight: "500",
        }}
      >
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill='none'
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke='none' />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill='#999'
        style={{
          fontFamily: "Inter, sans-serif",
          fontSize: "12px",
          fontWeight: "500",
        }}
      >{`Value: ${value}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill='#999'
        style={{
          fontFamily: "Inter, sans-serif",
          fontSize: "12px",
          fontWeight: "500",
        }}
      >{`(${(percent * 100).toFixed(2)}%)`}</text>
    </g>
  )
}

const CurrentDownload = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const theme = useTheme()

  const onPieEnter = (_, index) => {
    setActiveIndex(index)
  }

  return (
    <Grid item lg={4} md={12} xs={12} sm={12}>
      <Box
        sx={{
          backgroundColor: theme.palette.background.paper,
          border: "0px solid",
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
              Current Download
            </Typography>
          </Box>
        </Box>
        <ResponsiveContainer width='100%' height={360}>
          <PieChart>
            <Pie
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
              data={data}
              cx='50%'
              cy='50%'
              innerRadius={60}
              outerRadius={80}
              fill='#8884d8'
              dataKey='value'
              onMouseEnter={onPieEnter}
            >
              {data.map((entry, index) => (
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
          </PieChart>
        </ResponsiveContainer>
      </Box>
    </Grid>
  )
}

export default CurrentDownload
