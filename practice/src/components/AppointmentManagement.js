import React, { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  Grid,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import AppointmentBooking from './AppointmentBooking';
import DoctorCalendar from './DoctorCalendar';

const AppointmentManagement = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Function to handle date selection from calendar
  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography 
        variant="h3" 
        component="h1" 
        gutterBottom 
        align="center"
        sx={{
          mb: 4,
          fontWeight: 600,
          color: theme.palette.primary.main,
          textTransform: 'uppercase',
          letterSpacing: '0.05em'
        }}
      >
        Appointment Management
      </Typography>

      <Grid 
        container 
        spacing={3}
        sx={{
          minHeight: 'calc(100vh - 200px)',
        }}
      >
        {/* Calendar Section */}
        <Grid item xs={12} md={8}>
          <Paper 
            elevation={3} 
            sx={{
              p: 2,
              height: '100%',
              backgroundColor: '#ffffff',
              borderRadius: 2,
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              transition: 'box-shadow 0.3s ease-in-out',
              '&:hover': {
                boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
              },
            }}
          >
            <DoctorCalendar onDateSelect={handleDateSelect} />
          </Paper>
        </Grid>

        {/* Booking Form Section */}
        <Grid item xs={12} md={4}>
          <Paper 
            elevation={3} 
            sx={{
              p: 2,
              height: '100%',
              backgroundColor: '#ffffff',
              borderRadius: 2,
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              transition: 'box-shadow 0.3s ease-in-out',
              '&:hover': {
                boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
              },
              position: isMobile ? 'static' : 'sticky',
              top: isMobile ? 'auto' : '20px',
            }}
          >
            <AppointmentBooking selectedDate={selectedDate} />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AppointmentManagement;