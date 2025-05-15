import React, { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  Grid,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  useTheme,
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import ReceiptIcon from '@mui/icons-material/Receipt';
import PaymentIcon from '@mui/icons-material/Payment';
import InvoiceGenerator from './InvoiceGenerator';
import PaymentModal from './PaymentModal';

const BillingManagement = () => {
  const theme = useTheme();
  const [openInvoiceModal, setOpenInvoiceModal] = useState(false);
  const [openPaymentModal, setOpenPaymentModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  // Mock billing data
  const billingHistory = [
    {
      id: 1,
      patientName: 'John Doe',
      date: '2024-03-15',
      amount: 150.00,
      service: 'General Consultation',
      status: 'Paid',
    },
    {
      id: 2,
      patientName: 'Jane Smith',
      date: '2024-03-14',
      amount: 200.00,
      service: 'Dental Checkup',
      status: 'Pending',
    },
    // Add more mock data as needed
  ];

  const handleGenerateInvoice = () => {
    setOpenInvoiceModal(true);
  };

  const handlePayment = (invoice) => {
    setSelectedInvoice(invoice);
    setOpenPaymentModal(true);
  };

  const handleDownloadPDF = (invoice) => {
    // TODO: Implement PDF generation and download
    console.log('Downloading PDF for invoice:', invoice);
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography
              variant="h3"
              component="h1"
              sx={{
                fontWeight: 600,
                color: theme.palette.primary.main,
              }}
            >
              Billing Management
            </Typography>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              startIcon={<ReceiptIcon />}
              onClick={handleGenerateInvoice}
              sx={{ mr: 2 }}
            >
              Generate Invoice
            </Button>
          </Grid>
        </Grid>
      </Box>

      <Paper
        elevation={3}
        sx={{
          p: 3,
          borderRadius: 2,
          backgroundColor: '#ffffff',
        }}
      >
        <Typography variant="h5" component="h2" gutterBottom>
          Billing History
        </Typography>
        
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Patient Name</TableCell>
                <TableCell>Service</TableCell>
                <TableCell align="right">Amount</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {billingHistory.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell>{invoice.date}</TableCell>
                  <TableCell>{invoice.patientName}</TableCell>
                  <TableCell>{invoice.service}</TableCell>
                  <TableCell align="right">
                    ${invoice.amount.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <Typography
                      sx={{
                        color: invoice.status === 'Paid' 
                          ? theme.palette.success.main 
                          : theme.palette.warning.main,
                        fontWeight: 500,
                      }}
                    >
                      {invoice.status}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      onClick={() => handleDownloadPDF(invoice)}
                      color="primary"
                      title="Download PDF"
                    >
                      <DownloadIcon />
                    </IconButton>
                    {invoice.status === 'Pending' && (
                      <IconButton
                        onClick={() => handlePayment(invoice)}
                        color="success"
                        title="Make Payment"
                      >
                        <PaymentIcon />
                      </IconButton>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <InvoiceGenerator
        open={openInvoiceModal}
        onClose={() => setOpenInvoiceModal(false)}
      />

      <PaymentModal
        open={openPaymentModal}
        onClose={() => setOpenPaymentModal(false)}
        invoice={selectedInvoice}
      />
    </Container>
  );
};

export default BillingManagement; 