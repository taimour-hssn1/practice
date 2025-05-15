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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import {
  Visibility as VisibilityIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Download as DownloadIcon,
} from '@mui/icons-material';

const Tests = () => {
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [selectedTest, setSelectedTest] = useState(null);

  // Mock data for tests
  const tests = [
    {
      id: 1,
      patientName: 'John Doe',
      date: '2024-03-16',
      doctorName: 'Dr. Sarah Johnson',
      type: 'Blood Test',
      status: 'Completed',
      laboratorist: 'Dr. Henry Miller',
      labName: 'Central Medical Laboratory',
      results: [
        { parameter: 'Hemoglobin', value: '14.2 g/dL', normalRange: '13.5-17.5 g/dL', status: 'Normal' },
        { parameter: 'White Blood Cells', value: '7,500/μL', normalRange: '4,500-11,000/μL', status: 'Normal' },
        { parameter: 'Platelets', value: '250,000/μL', normalRange: '150,000-450,000/μL', status: 'Normal' },
        { parameter: 'Glucose', value: '105 mg/dL', normalRange: '70-99 mg/dL', status: 'Elevated' },
      ],
      notes: 'Patient fasted for 12 hours before the test. Slight elevation in glucose levels, recommend follow-up.',
    },
    {
      id: 2,
      patientName: 'Jane Smith',
      date: '2024-03-19',
      doctorName: 'Dr. Michael Chen',
      type: 'X-Ray',
      status: 'Completed',
      laboratorist: 'Dr. Amanda Patel',
      labName: 'Imaging Center',
      results: [
        { parameter: 'Right Knee X-Ray', value: 'Mild joint space narrowing', normalRange: 'N/A', status: 'Abnormal' },
      ],
      notes: 'X-ray shows early signs of osteoarthritis in the right knee. Recommend physical therapy and anti-inflammatory medication.',
    },
    {
      id: 3,
      patientName: 'Thomas Davis',
      date: '2024-03-22',
      doctorName: 'Dr. Lisa Martinez',
      type: 'ECG',
      status: 'Scheduled',
      laboratorist: 'Pending',
      labName: 'Cardiology Department',
      results: [],
      notes: 'Routine ECG before physical activity clearance.',
    },
  ];

  const handleViewTest = (test) => {
    setSelectedTest(test);
    setOpenViewDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenViewDialog(false);
    setSelectedTest(null);
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

  const getResultStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'normal':
        return 'test-value-normal';
      case 'abnormal':
        return 'test-value-abnormal';
      case 'elevated':
      case 'low':
        return 'test-value-warning';
      default:
        return '';
    }
  };

  return (
    <Box>
      <Grid container spacing={3} className="medical-records-grid">
        {tests.map((test) => (
          <Grid item xs={12} sm={6} md={4} key={test.id}>
            <Card className="medical-record-card">
              <CardContent>
                <Box className="medical-record-header">
                  <Typography variant="h6">{test.patientName}</Typography>
                  <Chip
                    label={test.status}
                    color={getStatusColor(test.status)}
                    size="small"
                  />
                </Box>
                <Typography variant="body2" color="textSecondary">
                  Date: {test.date}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Doctor: {test.doctorName}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Type: {test.type}
                </Typography>
                <Typography
                  variant="body2"
                  className="medical-record-notes"
                >
                  Lab: {test.labName}
                </Typography>
              </CardContent>
              <CardActions className="medical-record-actions">
                <IconButton
                  size="small"
                  onClick={() => handleViewTest(test)}
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

      {/* View Test Dialog */}
      <Dialog
        open={openViewDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
        className="medical-record-dialog"
      >
        <DialogTitle>Test Details</DialogTitle>
        <DialogContent>
          {selectedTest && (
            <Box className="medical-record-details">
              <Typography variant="subtitle2">Patient Name</Typography>
              <Typography variant="body1" paragraph>
                {selectedTest.patientName}
              </Typography>
              
              <Typography variant="subtitle2">Test Type</Typography>
              <Typography variant="body1" paragraph>
                {selectedTest.type}
              </Typography>
              
              <Typography variant="subtitle2">Date</Typography>
              <Typography variant="body1" paragraph>
                {selectedTest.date}
              </Typography>
              
              <Typography variant="subtitle2">Doctor</Typography>
              <Typography variant="body1" paragraph>
                {selectedTest.doctorName}
              </Typography>
              
              <Typography variant="subtitle2">Laboratory</Typography>
              <Typography variant="body1" paragraph>
                {selectedTest.labName}
              </Typography>
              
              <Typography variant="subtitle2">Laboratorist</Typography>
              <Typography variant="body1" paragraph>
                {selectedTest.laboratorist}
              </Typography>
              
              <Typography variant="subtitle2">Status</Typography>
              <Typography variant="body1" paragraph>
                {selectedTest.status}
              </Typography>
              
              {selectedTest.results.length > 0 && (
                <>
                  <Typography variant="subtitle2">Test Results</Typography>
                  <TableContainer component={Paper} style={{ marginTop: '16px', marginBottom: '16px' }}>
                    <Table className="test-results-table" size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>Parameter</TableCell>
                          <TableCell>Value</TableCell>
                          <TableCell>Normal Range</TableCell>
                          <TableCell>Status</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {selectedTest.results.map((result, index) => (
                          <TableRow key={index}>
                            <TableCell>{result.parameter}</TableCell>
                            <TableCell>{result.value}</TableCell>
                            <TableCell>{result.normalRange}</TableCell>
                            <TableCell>
                              <span className={getResultStatusClass(result.status)}>
                                {result.status}
                              </span>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </>
              )}
              
              <Typography variant="subtitle2">Notes</Typography>
              <Typography variant="body1" paragraph>
                {selectedTest.notes}
              </Typography>
              
              {selectedTest.status === 'Completed' && (
                <Button
                  variant="outlined"
                  startIcon={<DownloadIcon />}
                  style={{ marginTop: '16px' }}
                >
                  Download Report
                </Button>
              )}
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

export default Tests; 