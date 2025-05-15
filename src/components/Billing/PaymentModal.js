import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  TextField,
  Grid,
  Alert,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

const PaymentModal = ({ open, onClose, invoice }) => {
  const [paymentData, setPaymentData] = useState({
    paymentMethod: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: '',
  });
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePaymentSuccess = () => {
    // In a real application, this would send data to your backend
    console.log('Payment completed for invoice:', invoice);
    console.log('Payment details:', paymentData);
    onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    setProcessing(true);

    // Basic validation
    if (!paymentData.paymentMethod) {
      setError('Please select a payment method');
      setProcessing(false);
      return;
    }

    if (paymentData.paymentMethod === 'card') {
      if (!paymentData.cardNumber || !paymentData.expiryDate || !paymentData.cvv || !paymentData.nameOnCard) {
        setError('Please fill in all card details');
        setProcessing(false);
        return;
      }
    }

    // Simulate payment processing
    setTimeout(() => {
      handlePaymentSuccess();
      setProcessing(false);
    }, 1500);
  };

  const handleClose = () => {
    setPaymentData({
      paymentMethod: '',
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      nameOnCard: '',
    });
    setError(null);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
        }
      }}
    >
      <DialogTitle sx={{ pb: 2, borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}>
        Make Payment
      </DialogTitle>

      <DialogContent sx={{ mt: 2 }}>
        {invoice && (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="subtitle1" gutterBottom>
                  Invoice Summary
                </Typography>
                <Box sx={{ mb: 3 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">
                        Patient Name
                      </Typography>
                      <Typography variant="body1">
                        {invoice.patientName}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">
                        Service
                      </Typography>
                      <Typography variant="body1">
                        {invoice.service}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">
                        Date
                      </Typography>
                      <Typography variant="body1">
                        {invoice.date}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">
                        Amount
                      </Typography>
                      <Typography variant="body1" fontWeight="bold">
                        ${invoice.amount.toFixed(2)}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>

            <Divider sx={{ my: 3 }} />

            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="subtitle1" gutterBottom>
                  Payment Details
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth required size="small">
                  <InputLabel>Payment Method</InputLabel>
                  <Select
                    name="paymentMethod"
                    value={paymentData.paymentMethod}
                    onChange={handleChange}
                    label="Payment Method"
                  >
                    <MenuItem value="cash">Cash</MenuItem>
                    <MenuItem value="card">Credit/Debit Card</MenuItem>
                    <MenuItem value="insurance">Insurance</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              {paymentData.paymentMethod === 'card' && (
                <>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Name on Card"
                      name="nameOnCard"
                      value={paymentData.nameOnCard}
                      onChange={handleChange}
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Card Number"
                      name="cardNumber"
                      value={paymentData.cardNumber}
                      onChange={handleChange}
                      size="small"
                      inputProps={{ maxLength: 16 }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Expiry Date"
                      name="expiryDate"
                      value={paymentData.expiryDate}
                      onChange={handleChange}
                      size="small"
                      placeholder="MM/YY"
                      inputProps={{ maxLength: 5 }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="CVV"
                      name="cvv"
                      value={paymentData.cvv}
                      onChange={handleChange}
                      size="small"
                      type="password"
                      inputProps={{ maxLength: 3 }}
                    />
                  </Grid>
                </>
              )}

              {error && (
                <Grid item xs={12}>
                  <Alert severity="error" sx={{ mt: 2 }}>
                    {error}
                  </Alert>
                </Grid>
              )}
            </Grid>

            <DialogActions sx={{ mt: 3, px: 0 }}>
              <Button onClick={handleClose}>Cancel</Button>
              <Button
                type="submit"
                variant="contained"
                disabled={processing}
              >
                {processing ? 'Processing...' : `Pay $${invoice?.amount.toFixed(2)}`}
              </Button>
            </DialogActions>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal; 