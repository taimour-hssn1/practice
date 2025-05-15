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

const FollowUps = () => {
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [selectedFollowUp, setSelectedFollowUp] = useState(null);

  // Mock data for follow-ups
  const followUps = [
    {
      id: 1,
      patientName: 'Jane Smith',
      date: '2024-03-22',
      doctorName: 'Dr. Michael Chen',
      relatedTo: 'Arthritis Treatment',
      status: 'Scheduled',
      purpose: 'Assess effectiveness of anti-inflammatory medication',
      previousFindings: 'Early signs of arthritis',
      recommendedTests: 'Joint mobility assessment',
      notes: 'Patient reporting some improvement but still experiencing morning stiffness.',
    },
    {
      id: 2,
      patientName: 'Robert Brown',
      date: '2024-03-18',
      doctorName: 'Dr. Emily Wilson',
      relatedTo: 'Migraine Management',
      status: 'Completed',
      purpose: 'Review migraine journal and medication effectiveness',
      previousFindings: 'Severe migraines with visual aura',
      recommendedTests: 'None at this time',
      notes: 'Medication appears to be effective. Patient reports reduced frequency of episodes.',
    },
    {
      id: 3,
      patientName: 'Thomas Davis',
      date: '2024-03-25',
      doctorName: 'Dr. Lisa Martinez',
      relatedTo: 'Post-surgery recovery',
      status: 'Scheduled',
      purpose: 'Wound check and removal of stitches',
      previousFindings: 'Appendectomy performed on 03/15/2024',
      recommendedTests: 'None at this time',
      notes: 'Patient to continue limited physical activity for two more weeks after this appointment.',
    },
  ];

  const handleViewFollowUp = (followUp) => {
    setSelectedFollowUp(followUp);
    setOpenViewDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenViewDialog(false);
    setSelectedFollowUp(null);
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
        {followUps.map((followUp) => (
          <Grid item xs={12} sm={6} md={4} key={followUp.id}>
            <Card className="medical-record-card">
              <CardContent>
                <Box className="medical-record-header">
                  <Typography variant="h6">{followUp.patientName}</Typography>
                  <Chip
                    label={followUp.status}
                    color={getStatusColor(followUp.status)}
                    size="small"
                  />
                </Box>
                <Typography variant="body2" color="textSecondary">
                  Date: {followUp.date}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Doctor: {followUp.doctorName}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Related To: {followUp.relatedTo}
                </Typography>
                <Typography
                  variant="body2"
                  className="medical-record-notes"
                >
                  Purpose: {followUp.purpose}
                </Typography>
              </CardContent>
              <CardActions className="medical-record-actions">
                <IconButton
                  size="small"
                  onClick={() => handleViewFollowUp(followUp)}
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

      {/* View Follow-Up Dialog */}
      <Dialog
        open={openViewDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
        className="medical-record-dialog"
      >
        <DialogTitle>Follow-Up Details</DialogTitle>
        <DialogContent>
          {selectedFollowUp && (
            <Box className="medical-record-details">
              <Typography variant="subtitle2">Patient Name</Typography>
              <Typography variant="body1" paragraph>
                {selectedFollowUp.patientName}
              </Typography>
              
              <Typography variant="subtitle2">Date</Typography>
              <Typography variant="body1" paragraph>
                {selectedFollowUp.date}
              </Typography>
              
              <Typography variant="subtitle2">Doctor</Typography>
              <Typography variant="body1" paragraph>
                {selectedFollowUp.doctorName}
              </Typography>
              
              <Typography variant="subtitle2">Related To</Typography>
              <Typography variant="body1" paragraph>
                {selectedFollowUp.relatedTo}
              </Typography>
              
              <Typography variant="subtitle2">Status</Typography>
              <Typography variant="body1" paragraph>
                {selectedFollowUp.status}
              </Typography>
              
              <Typography variant="subtitle2">Purpose</Typography>
              <Typography variant="body1" paragraph>
                {selectedFollowUp.purpose}
              </Typography>
              
              <Typography variant="subtitle2">Previous Findings</Typography>
              <Typography variant="body1" paragraph>
                {selectedFollowUp.previousFindings}
              </Typography>
              
              <Typography variant="subtitle2">Recommended Tests</Typography>
              <Typography variant="body1" paragraph>
                {selectedFollowUp.recommendedTests}
              </Typography>
              
              <Typography variant="subtitle2">Notes</Typography>
              <Typography variant="body1">
                {selectedFollowUp.notes}
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

export default FollowUps; 