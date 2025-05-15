import React, { useState } from 'react';
import {
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Chip,
  IconButton,
  TextField,
  Link,
  Grid,
} from '@mui/material';
import {
  Visibility as VisibilityIcon,
  CheckCircle as ApproveIcon,
  Cancel as RejectIcon,
  Download as DownloadIcon,
} from '@mui/icons-material';
import { useNotification } from '../Notification/NotificationContext';

const DoctorVerification = () => {
  const { addNotification } = useNotification();
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [showRejectionDialog, setShowRejectionDialog] = useState(false);

  // Mock data - replace with actual API calls
  const [pendingDoctors, setPendingDoctors] = useState([
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      specialization: 'Cardiology',
      licenseNumber: 'MED123456',
      experience: '10',
      qualification: 'MD, MBBS',
      clinic: 'Heart Care Center',
      status: 'pending',
      documents: 'license_and_certificates.pdf',
      submittedAt: '2024-03-15',
    },
    // Add more mock data as needed
  ]);

  const handleViewDetails = (doctor) => {
    setSelectedDoctor(doctor);
    setOpenDialog(true);
  };

  const handleApprove = async (doctorId) => {
    try {
      // API call to approve doctor
      // await approveDoctorRegistration(doctorId);
      
      // Update local state
      setPendingDoctors(prev => 
        prev.map(doc => 
          doc.id === doctorId ? { ...doc, status: 'approved' } : doc
        )
      );

      // Send email notification
      // await sendApprovalEmail(doctor.email);

      addNotification('Doctor approved successfully', 'success');
      setOpenDialog(false);
    } catch (error) {
      addNotification('Failed to approve doctor', 'error');
    }
  };

  const handleReject = (doctor) => {
    setSelectedDoctor(doctor);
    setShowRejectionDialog(true);
  };

  const submitRejection = async () => {
    try {
      // API call to reject doctor
      // await rejectDoctorRegistration(selectedDoctor.id, rejectionReason);
      
      // Update local state
      setPendingDoctors(prev => 
        prev.filter(doc => doc.id !== selectedDoctor.id)
      );

      // Send email notification
      // await sendRejectionEmail(selectedDoctor.email, rejectionReason);

      addNotification('Doctor registration rejected', 'info');
      setShowRejectionDialog(false);
      setOpenDialog(false);
      setRejectionReason('');
    } catch (error) {
      addNotification('Failed to reject doctor registration', 'error');
    }
  };

  const handleDownloadDocument = (documentUrl) => {
    // Implement document download logic
    console.log('Downloading document:', documentUrl);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Doctor Verification Requests
        </Typography>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Specialization</TableCell>
                <TableCell>License Number</TableCell>
                <TableCell>Submitted</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pendingDoctors.map((doctor) => (
                <TableRow key={doctor.id}>
                  <TableCell>{`${doctor.firstName} ${doctor.lastName}`}</TableCell>
                  <TableCell>{doctor.specialization}</TableCell>
                  <TableCell>{doctor.licenseNumber}</TableCell>
                  <TableCell>{doctor.submittedAt}</TableCell>
                  <TableCell>
                    <Chip
                      label={doctor.status}
                      color={doctor.status === 'pending' ? 'warning' : 'success'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton
                      size="small"
                      onClick={() => handleViewDetails(doctor)}
                      title="View Details"
                    >
                      <VisibilityIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* View Details Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Doctor Registration Details</DialogTitle>
        <DialogContent>
          {selectedDoctor && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="h6" gutterBottom>
                Personal Information
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography><strong>Name:</strong> {`${selectedDoctor.firstName} ${selectedDoctor.lastName}`}</Typography>
                  <Typography><strong>Email:</strong> {selectedDoctor.email}</Typography>
                  <Typography><strong>Specialization:</strong> {selectedDoctor.specialization}</Typography>
                  <Typography><strong>License Number:</strong> {selectedDoctor.licenseNumber}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography><strong>Experience:</strong> {selectedDoctor.experience} years</Typography>
                  <Typography><strong>Qualification:</strong> {selectedDoctor.qualification}</Typography>
                  <Typography><strong>Clinic/Hospital:</strong> {selectedDoctor.clinic}</Typography>
                  <Box sx={{ mt: 2 }}>
                    <Button
                      startIcon={<DownloadIcon />}
                      onClick={() => handleDownloadDocument(selectedDoctor.documents)}
                      variant="outlined"
                    >
                      View Documents
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Close</Button>
          <Button
            startIcon={<RejectIcon />}
            onClick={() => handleReject(selectedDoctor)}
            color="error"
          >
            Reject
          </Button>
          <Button
            startIcon={<ApproveIcon />}
            onClick={() => handleApprove(selectedDoctor.id)}
            color="success"
            variant="contained"
          >
            Approve
          </Button>
        </DialogActions>
      </Dialog>

      {/* Rejection Dialog */}
      <Dialog
        open={showRejectionDialog}
        onClose={() => setShowRejectionDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Reject Doctor Registration</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Reason for Rejection"
            multiline
            rows={4}
            value={rejectionReason}
            onChange={(e) => setRejectionReason(e.target.value)}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowRejectionDialog(false)}>Cancel</Button>
          <Button
            onClick={submitRejection}
            color="error"
            variant="contained"
            disabled={!rejectionReason.trim()}
          >
            Submit Rejection
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default DoctorVerification; 