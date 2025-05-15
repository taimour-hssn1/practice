import React, { useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import {
  Visibility as VisibilityIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';

const Consultations = () => {
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [selectedConsultation, setSelectedConsultation] = useState(null);

  // Mock data for consultations
  const consultations = [
    {
      id: 1,
      patientName: 'John Doe',
      date: '2024-03-15',
      doctorName: 'Dr. Sarah Johnson',
      type: 'Initial Consultation',
      status: 'Completed',
      symptoms: 'Fever, cough, fatigue',
      diagnosis: 'Common cold',
      treatment: 'Rest, fluids, over-the-counter cold medication',
      notes: 'Patient advised to return if symptoms worsen or don\'t improve within 5 days.',
    },
    {
      id: 2,
      patientName: 'Jane Smith',
      date: '2024-03-17',
      doctorName: 'Dr. Michael Chen',
      type: 'Specialist Consultation',
      status: 'Completed',
      symptoms: 'Joint pain, stiffness',
      diagnosis: 'Early signs of arthritis',
      treatment: 'Anti-inflammatory medication, physical therapy referral',
      notes: 'Follow-up in 4 weeks to assess treatment effectiveness.',
    },
    {
      id: 3,
      patientName: 'Robert Brown',
      date: '2024-03-20',
      doctorName: 'Dr. Emily Wilson',
      type: 'Emergency Consultation',
      status: 'Completed',
      symptoms: 'Severe headache, dizziness',
      diagnosis: 'Migraine',
      treatment: 'Prescribed migraine medication, dark room rest',
      notes: 'Patient has family history of migraines. Advised to keep a symptom journal.',
    },
  ];

  const handleViewConsultation = (consultation) => {
    setSelectedConsultation(consultation);
    setOpenViewDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenViewDialog(false);
    setSelectedConsultation(null);
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'success';
      case 'scheduled':
        return 'warning';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Box>
      <Grid container spacing={3} className="medical-records-grid">
        {consultations.map((consultation) => (
          <Grid item xs={12} sm={6} md={4} key={consultation.id}>
            <Card className="medical-record-card">
              <CardContent>
                <Box className="medical-record-header">
                  <Typography variant="h6">{consultation.patientName}</Typography>
                  <Chip
                    label={consultation.status}
                    color={getStatusColor(consultation.status)}
                    size="small"
                  />
                </Box>
                <Typography variant="body2" color="textSecondary">
                  Date: {consultation.date}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Doctor: {consultation.doctorName}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Type: {consultation.type}
                </Typography>
                <Typography
                  variant="body2"
                  className="medical-record-notes"
                >
                  Diagnosis: {consultation.diagnosis}
                </Typography>
              </CardContent>
              <CardActions className="medical-record-actions">
                <IconButton
                  size="small"
                  onClick={() => handleViewConsultation(consultation)}
                >
                  <VisibilityIcon />
                </IconButton>
                <IconButton size="small">
                  <EditIcon />
                </IconButton>
                <IconButton size="small">
                  <DeleteIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* View Consultation Dialog */}
      <Dialog
        open={openViewDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
        className="medical-record-dialog"
      >
        <DialogTitle>Consultation Details</DialogTitle>
        <DialogContent>
          {selectedConsultation && (
            <Box className="medical-record-details">
              <Typography variant="subtitle2">Patient Name</Typography>
              <Typography variant="body1" paragraph>
                {selectedConsultation.patientName}
              </Typography>
              
              <Typography variant="subtitle2">Date</Typography>
              <Typography variant="body1" paragraph>
                {selectedConsultation.date}
              </Typography>
              
              <Typography variant="subtitle2">Doctor</Typography>
              <Typography variant="body1" paragraph>
                {selectedConsultation.doctorName}
              </Typography>
              
              <Typography variant="subtitle2">Type</Typography>
              <Typography variant="body1" paragraph>
                {selectedConsultation.type}
              </Typography>
              
              <Typography variant="subtitle2">Status</Typography>
              <Typography variant="body1" paragraph>
                {selectedConsultation.status}
              </Typography>
              
              <Typography variant="subtitle2">Symptoms</Typography>
              <Typography variant="body1" paragraph>
                {selectedConsultation.symptoms}
              </Typography>
              
              <Typography variant="subtitle2">Diagnosis</Typography>
              <Typography variant="body1" paragraph>
                {selectedConsultation.diagnosis}
              </Typography>
              
              <Typography variant="subtitle2">Treatment</Typography>
              <Typography variant="body1" paragraph>
                {selectedConsultation.treatment}
              </Typography>
              
              <Typography variant="subtitle2">Notes</Typography>
              <Typography variant="body1">
                {selectedConsultation.notes}
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Consultations; 