import React from "react"
import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const ZigzagGraph = () => {
  // Generate random data points for the zigzag effect
  const generateData = (numPoints) => {
    const data = []
    let value = 50 // Starting value
    for (let i = 0; i < numPoints; i++) {
      value += Math.random() * 10 - 5 // Random fluctuation between -5 and +5
      data.push(value)
    }
    return data
  }

  const data = {
    labels: Array.from(
      { length: 100 },
      (_, i) =>
        `${Math.floor((i * 5) / 60) % 12}:${(i * 5) % 60 < 10 ? "0" : ""}${
          (i * 5) % 60
        } ${Math.floor((i * 5) / 60) % 24 < 12 ? "AM" : "PM"}`
    ), // Generate time labels
    datasets: [
      {
        label: "Value",
        data: generateData(100), // 100 data points
        borderColor: "blue",
        borderWidth: 2,
        fill: true, // Fill the area below the line
        backgroundColor: (context) => {
          const gradient = context.chart.ctx.createLinearGradient(
            0,
            0,
            0,
            context.chart.height
          )
          gradient.addColorStop(0, "rgba(128, 0, 128, 0.3)") // Purple color
          gradient.addColorStop(1, "rgba(255, 255, 255, 0)")
          return gradient
        },
        tension: 0, // No smoothing for zigzag effect
        pointRadius: 0, // Hide points by default
        pointHoverRadius: 5, // Show points when hovering
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          maxTicksLimit: 5, // Show only 5 labels on the x-axis
        },
      },
      y: {
        display: false, // Hide the y-axis
        grid: {
          display: false,
        },
      },
    },
  }

  return <Line data={data} options={options} />
}

export default ZigzagGraph
