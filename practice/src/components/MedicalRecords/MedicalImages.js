import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Button,
  TextField,
  MenuItem,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import './MedicalImages.css';

const MedicalImages = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageData, setImageData] = useState({
    patientId: '',
    imageType: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
  });

  // Mock data - replace with actual data from your backend
  const patients = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
  ];

  const imageTypes = [
    'X-Ray',
    'MRI',
    'CT Scan',
    'Ultrasound',
    'Other',
  ];

  // Mock medical images data
  const medicalImages = [
    {
      id: 1,
      patientName: 'John Doe',
      imageType: 'X-Ray',
      date: '2024-03-15',
      description: 'Chest X-Ray',
      url: 'https://example.com/xray1.jpg',
    },
    {
      id: 2,
      patientName: 'Jane Smith',
      imageType: 'MRI',
      date: '2024-03-16',
      description: 'Brain MRI',
      url: 'https://example.com/mri1.jpg',
    },
  ];

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleImageDataChange = (e) => {
    setImageData({
      ...imageData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpload = () => {
    // Implement secure file upload logic here
    // This should include:
    // 1. File validation
    // 2. Secure upload to your storage service
    // 3. Metadata storage in your database
    console.log('Uploading file:', selectedFile);
    console.log('Image data:', imageData);
    setUploadDialogOpen(false);
    setSelectedFile(null);
    setImageData({
      patientId: '',
      imageType: '',
      description: '',
      date: new Date().toISOString().split('T')[0],
    });
  };

  const handleViewImage = (image) => {
    setSelectedImage(image);
    setViewDialogOpen(true);
  };

  const handleDeleteImage = (imageId) => {
    // Implement secure deletion logic here
    console.log('Deleting image:', imageId);
  };

  return (
    <Container maxWidth="lg" className="medical-images-container">
      <Box className="medical-images-header">
        <Typography variant="h4" component="h1" className="medical-images-title">
          Medical Images
        </Typography>
        <Button
          variant="contained"
          startIcon={<CloudUploadIcon />}
          onClick={() => setUploadDialogOpen(true)}
        >
          Upload New Image
        </Button>
      </Box>

      <Grid container spacing={3} className="medical-images-grid">
        {medicalImages.map((image) => (
          <Grid item xs={12} sm={6} md={4} key={image.id}>
            <Paper elevation={3} className="medical-image-card">
              <Box className="medical-image-preview">
                <img
                  src={image.url}
                  alt={image.description}
                  className="medical-image-thumbnail"
                />
              </Box>
              <Box className="medical-image-details">
                <Typography variant="h6">{image.patientName}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {image.imageType} - {image.date}
                </Typography>
                <Typography variant="body2">{image.description}</Typography>
              </Box>
              <Box className="medical-image-actions">
                <IconButton
                  size="small"
                  onClick={() => handleViewImage(image)}
                >
                  <VisibilityIcon />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => handleDeleteImage(image.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Upload Dialog */}
      <Dialog
        open={uploadDialogOpen}
        onClose={() => setUploadDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Upload Medical Image</DialogTitle>
        <DialogContent>
          <Box component="form" className="upload-form">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  select
                  fullWidth
                  label="Patient"
                  name="patientId"
                  value={imageData.patientId}
                  onChange={handleImageDataChange}
                >
                  {patients.map((patient) => (
                    <MenuItem key={patient.id} value={patient.id}>
                      {patient.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  select
                  fullWidth
                  label="Image Type"
                  name="imageType"
                  value={imageData.imageType}
                  onChange={handleImageDataChange}
                >
                  {imageTypes.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  name="description"
                  multiline
                  rows={2}
                  value={imageData.description}
                  onChange={handleImageDataChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Date"
                  name="date"
                  type="date"
                  value={imageData.date}
                  onChange={handleImageDataChange}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="outlined"
                  component="label"
                  fullWidth
                  startIcon={<CloudUploadIcon />}
                >
                  Choose File
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </Button>
                {selectedFile && (
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Selected file: {selectedFile.name}
                  </Typography>
                )}
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setUploadDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={handleUpload}
            variant="contained"
            disabled={!selectedFile}
          >
            Upload
          </Button>
        </DialogActions>
      </Dialog>

      {/* View Image Dialog */}
      <Dialog
        open={viewDialogOpen}
        onClose={() => setViewDialogOpen(false)}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle>
          {selectedImage?.patientName} - {selectedImage?.imageType}
        </DialogTitle>
        <DialogContent>
          {selectedImage && (
            <Box className="medical-image-view">
              <img
                src={selectedImage.url}
                alt={selectedImage.description}
                className="medical-image-full"
              />
              <Typography variant="body1" sx={{ mt: 2 }}>
                {selectedImage.description}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Date: {selectedImage.date}
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setViewDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default MedicalImages; 