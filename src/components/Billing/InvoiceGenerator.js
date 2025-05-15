import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Divider,
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const InvoiceGenerator = ({ open, onClose }) => {
  const [invoiceData, setInvoiceData] = useState({
    patientName: '',
    patientId: '',
    service: '',
    amount: '',
    date: new Date(),
    description: '',
  });

  // Mock services data
  const services = [
    { id: 1, name: 'General Consultation', price: 150 },
    { id: 2, name: 'Dental Checkup', price: 200 },
    { id: 3, name: 'Eye Examination', price: 175 },
    { id: 4, name: 'Blood Test', price: 120 },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInvoiceData(prev => ({
      ...prev,
      [name]: value
    }));

    // Auto-fill amount when service is selected
    if (name === 'service') {
      const selectedService = services.find(s => s.name === value);
      if (selectedService) {
        setInvoiceData(prev => ({
          ...prev,
          amount: selectedService.price.toString()
        }));
      }
    }
  };

  const handleDateChange = (newDate) => {
    setInvoiceData(prev => ({
      ...prev,
      date: newDate
    }));
  };

  const handleSubmit = () => {
    // TODO: Implement invoice creation and saving
    console.log('Invoice Data:', invoiceData);
    handleClose();
  };

  const handleClose = () => {
    setInvoiceData({
      patientName: '',
      patientId: '',
      service: '',
      amount: '',
      date: new Date(),
      description: '',
    });
    onClose();
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
        }
      }}
    >
      <DialogTitle sx={{ pb: 2, borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}>
        Generate New Invoice
      </DialogTitle>

      <DialogContent sx={{ mt: 2 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Patient Name"
              name="patientName"
              value={invoiceData.patientName}
              onChange={handleChange}
              required
              size="small"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Patient ID"
              name="patientId"
              value={invoiceData.patientId}
              onChange={handleChange}
              required
              size="small"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required size="small">
              <InputLabel>Service</InputLabel>
              <Select
                name="service"
                value={invoiceData.service}
                onChange={handleChange}
                label="Service"
              >
                {services.map((service) => (
                  <MenuItem key={service.id} value={service.name}>
                    {service.name} - ${service.price}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Amount ($)"
              name="amount"
              value={invoiceData.amount}
              onChange={handleChange}
              required
              type="number"
              size="small"
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Invoice Date"
                value={invoiceData.date}
                onChange={handleDateChange}
                renderInput={(params) => (
                  <TextField {...params} fullWidth required size="small" />
                )}
              />
            </LocalizationProvider>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={invoiceData.description}
              onChange={handleChange}
              multiline
              rows={3}
              size="small"
            />
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        <Typography variant="subtitle2" color="text.secondary">
          Note: The invoice will be automatically sent to the patient's email address
          once generated.
        </Typography>
      </DialogContent>

      <DialogActions sx={{ p: 2, pt: 1 }}>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={!invoiceData.patientName || !invoiceData.service || !invoiceData.amount}
        >
          Generate Invoice
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default InvoiceGenerator; 