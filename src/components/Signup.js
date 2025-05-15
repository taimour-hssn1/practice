import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stepper,
  Step,
  StepLabel,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'patient',
    specialization: '',
    licenseNumber: '',
    experience: '',
    qualification: '',
    clinic: '',
    documents: null
  });
  const [error, setError] = useState('');
  const [openDialog, setOpenDialog] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({
      ...prev,
      documents: e.target.files[0]
    }));
  };

  const validateBasicInfo = () => {
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all required fields');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setError('Please enter a valid email address');
      return false;
    }
    return true;
  };

  const validateDoctorInfo = () => {
    if (formData.role === 'doctor') {
      if (!formData.specialization || !formData.licenseNumber || !formData.experience || !formData.qualification) {
        setError('Please fill in all doctor-specific fields');
        return false;
      }
      if (!formData.documents) {
        setError('Please upload your medical license and certificates');
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    setError('');
    if (activeStep === 0 && !validateBasicInfo()) return;
    if (activeStep === 1 && !validateDoctorInfo()) return;
    
    if (activeStep === steps.length - 1) {
      handleSubmit();
    } else {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = async () => {
    try {
      // Here you would typically make an API call to create the user
      if (formData.role === 'doctor') {
        // For doctors, show verification pending dialog
        setOpenDialog(true);
      } else {
        // For patients, direct signup
        navigate('/login');
      }
    } catch (err) {
      setError('An error occurred during signup');
    }
  };

  const steps = ['Basic Information', formData.role === 'doctor' ? 'Doctor Details' : 'Additional Information', 'Review'];

  const renderBasicInfo = () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField
        fullWidth
        label="First Name"
        name="firstName"
        value={formData.firstName}
        onChange={handleInputChange}
        required
      />
      <TextField
        fullWidth
        label="Last Name"
        name="lastName"
        value={formData.lastName}
        onChange={handleInputChange}
        required
      />
      <TextField
        fullWidth
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleInputChange}
        required
      />
      <TextField
        fullWidth
        label="Password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleInputChange}
        required
      />
      <TextField
        fullWidth
        label="Confirm Password"
        name="confirmPassword"
        type="password"
        value={formData.confirmPassword}
        onChange={handleInputChange}
        required
      />
      <FormControl fullWidth>
        <InputLabel>Role</InputLabel>
        <Select
          name="role"
          value={formData.role}
          onChange={handleInputChange}
          label="Role"
        >
          <MenuItem value="patient">Patient</MenuItem>
          <MenuItem value="doctor">Doctor</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );

  const renderDoctorInfo = () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField
        fullWidth
        label="Specialization"
        name="specialization"
        value={formData.specialization}
        onChange={handleInputChange}
        required={formData.role === 'doctor'}
      />
      <TextField
        fullWidth
        label="License Number"
        name="licenseNumber"
        value={formData.licenseNumber}
        onChange={handleInputChange}
        required={formData.role === 'doctor'}
      />
      <TextField
        fullWidth
        label="Years of Experience"
        name="experience"
        type="number"
        value={formData.experience}
        onChange={handleInputChange}
        required={formData.role === 'doctor'}
      />
      <TextField
        fullWidth
        label="Qualification"
        name="qualification"
        value={formData.qualification}
        onChange={handleInputChange}
        required={formData.role === 'doctor'}
      />
      <TextField
        fullWidth
        label="Clinic/Hospital"
        name="clinic"
        value={formData.clinic}
        onChange={handleInputChange}
      />
      <Button
        variant="outlined"
        component="label"
        fullWidth
      >
        Upload Documents
        <input
          type="file"
          hidden
          onChange={handleFileChange}
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
        />
      </Button>
      {formData.documents && (
        <Typography variant="body2" color="textSecondary">
          File selected: {formData.documents.name}
        </Typography>
      )}
    </Box>
  );

  const renderReview = () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="h6">Review Your Information</Typography>
      <Typography><strong>Name:</strong> {formData.firstName} {formData.lastName}</Typography>
      <Typography><strong>Email:</strong> {formData.email}</Typography>
      <Typography><strong>Role:</strong> {formData.role}</Typography>
      {formData.role === 'doctor' && (
        <>
          <Typography><strong>Specialization:</strong> {formData.specialization}</Typography>
          <Typography><strong>License Number:</strong> {formData.licenseNumber}</Typography>
          <Typography><strong>Experience:</strong> {formData.experience} years</Typography>
          <Typography><strong>Qualification:</strong> {formData.qualification}</Typography>
          <Typography><strong>Clinic/Hospital:</strong> {formData.clinic}</Typography>
          <Typography><strong>Documents:</strong> {formData.documents?.name}</Typography>
        </>
      )}
    </Box>
  );

  return (
    <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          Sign Up
        </Typography>

        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {activeStep === 0 && renderBasicInfo()}
        {activeStep === 1 && (formData.role === 'doctor' ? renderDoctorInfo() : renderReview())}
        {activeStep === 2 && renderReview()}

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
          >
            Back
          </Button>
          <Button
            variant="contained"
            onClick={handleNext}
          >
            {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
          </Button>
        </Box>
      </Paper>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Verification Required</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Thank you for registering as a doctor. Your account is pending verification by our administrators.
            We will send you an email once your account is verified. This process may take 24-48 hours.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => navigate('/login')}>
            Go to Login
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Signup;