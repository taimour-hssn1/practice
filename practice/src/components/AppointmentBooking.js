import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Alert,
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

const AppointmentBooking = ({ selectedDate }) => {
  const [appointmentData, setAppointmentData] = useState({
    patientName: '',
    doctorId: '',
    date: null,
    time: null,
    reason: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Update appointment date when selectedDate changes
  useEffect(() => {
    if (selectedDate) {
      setAppointmentData(prev => ({
        ...prev,
        date: selectedDate
      }));
    }
  }, [selectedDate]);

  // Mock data for doctors
  const doctors = [
    { id: 1, name: 'Dr. John Smith' },
    { id: 2, name: 'Dr. Sarah Johnson' },
    { id: 3, name: 'Dr. Michael Brown' },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAppointmentData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDateChange = (newDate) => {
    setAppointmentData(prev => ({
      ...prev,
      date: newDate
    }));
  };

  const handleTimeChange = (newTime) => {
    setAppointmentData(prev => ({
      ...prev,
      time: newTime
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Basic validation
    if (!appointmentData.patientName || !appointmentData.doctorId || !appointmentData.date || !appointmentData.time) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      // TODO: Implement API call to save appointment
      console.log('Appointment Data:', appointmentData);
      setSuccess('Appointment booked successfully! You will receive a confirmation email shortly.');
      
      // Reset form except date
      setAppointmentData(prev => ({
        patientName: '',
        doctorId: '',
        date: prev.date,
        time: null,
        reason: '',
      }));
    } catch (err) {
      setError('Failed to book appointment. Please try again.');
      console.error('Booking error:', err);
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Book an Appointment
        </Typography>

        <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {success}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Patient Name"
                  name="patientName"
                  value={appointmentData.patientName}
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth required>
                  <InputLabel>Select Doctor</InputLabel>
                  <Select
                    name="doctorId"
                    value={appointmentData.doctorId}
                    onChange={handleChange}
                    label="Select Doctor"
                  >
                    {doctors.map(doctor => (
                      <MenuItem key={doctor.id} value={doctor.id}>
                        {doctor.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Appointment Date"
                    value={appointmentData.date}
                    onChange={handleDateChange}
                    renderInput={(params) => <TextField {...params} fullWidth required />}
                    minDate={new Date()}
                  />
                </LocalizationProvider>
              </Grid>

              <Grid item xs={12} md={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <TimePicker
                    label="Appointment Time"
                    value={appointmentData.time}
                    onChange={handleTimeChange}
                    renderInput={(params) => <TextField {...params} fullWidth required />}
                  />
                </LocalizationProvider>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Reason for Visit"
                  name="reason"
                  value={appointmentData.reason}
                  onChange={handleChange}
                  multiline
                  rows={4}
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  size="large"
                >
                  Book Appointment
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default AppointmentBooking;