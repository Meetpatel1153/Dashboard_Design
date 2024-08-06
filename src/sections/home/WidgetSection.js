import React from 'react';
import { Box, Grid, Typography, useTheme } from '@mui/material';
import { Bar, BarChart, ResponsiveContainer, Tooltip } from 'recharts';
import { Homedata } from '../../mock/Home';

const CustomTooltip = ({ active, payload }) => {
  const theme = useTheme();

  if (active && payload && payload.length) {
    return (
      <Box
        sx={{
          backgroundColor: theme.palette.background.paper,
          border: `1px solid ${theme.palette.divider}`,
          padding: '5px',
          fontFamily: 'Inter, sans-serif',
          fontSize: '14px',
          borderRadius: '5px',
        }}
      >
        {payload.map((entry, index) => (
          <Typography
            key={`item-${index}`}
            style={{ color: entry.color }}
            sx={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '14px',
              borderRadius: '5px',
            }}
          >
            {entry.value}
          </Typography>
        ))}
      </Box>
    );
  }

  return null;
};

const WidgetSection = () => {
  const theme = useTheme();

  return (
    <>
      {Homedata.map((item, index) => (
        <Grid key={index} item lg={4} md={12} xs={12} sm={12}>
          <Box
            sx={{
              backgroundColor: theme.palette.background.paper,
              p: '30px',
              border: `0px solid ${theme.palette.divider}`,
              borderRadius: '10px',
              height: '100%',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Box>
              <Typography
                sx={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '14px',
                  fontWeight: '500',
                  mb: 1,
                  color: theme.palette.text.primary,
                }}
                gutterBottom
              >
                {item.title}
              </Typography>
              <Typography
                sx={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '14px',
                  fontWeight: '500',
                  mb: 1,
                  color: theme.palette.text.primary,
                }}
                gutterBottom
              >
                {item.icon} {item.percent}
              </Typography>
              <Typography
                sx={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '25px',
                  fontWeight: 'Bold',
                  color: theme.palette.text.primary,
                }}
                gutterBottom
              >
                {item.value}
              </Typography>
            </Box>

            <ResponsiveContainer width='20%' height={50} padding={10}>
              <BarChart data={item.data}>
                <Bar
                  dataKey='value'
                  fill={item.color}
                  barSize={5}
                  strokeWidth={3}
                  radius={[10, 10, 0, 0]}
                />
                <Tooltip content={<CustomTooltip />} />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </Grid>
      ))}
    </>
  );
};

export default WidgetSection;
