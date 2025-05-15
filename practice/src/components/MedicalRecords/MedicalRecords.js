import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Tabs,
  Tab,
  Button,
  Link,
} from '@mui/material';
import { Add as AddIcon, PhotoLibrary as PhotoLibraryIcon } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import './MedicalRecords.css';
import Consultations from './Consultations';
import FollowUps from './FollowUps';
import Tests from './Tests';
import MedicalImages from './MedicalImages';

const MedicalRecords = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [openAddDialog, setOpenAddDialog] = useState(false);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleAddRecord = () => {
    setOpenAddDialog(true);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 0: // All Records
        return (
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Consultations</Typography>
            <Consultations />
            <Typography variant="h6" sx={{ mb: 2, mt: 4 }}>Follow-ups</Typography>
            <FollowUps />
            <Typography variant="h6" sx={{ mb: 2, mt: 4 }}>Tests</Typography>
            <Tests />
            <Typography variant="h6" sx={{ mb: 2, mt: 4 }}>
              Medical Images
              <Button
                component={RouterLink}
                to="/medical-images"
                startIcon={<PhotoLibraryIcon />}
                sx={{ ml: 2 }}
                size="small"
                variant="outlined"
              >
                View All Images
              </Button>
            </Typography>
            <MedicalImages />
          </Box>
        );
      case 1: // Consultations
        return <Consultations />;
      case 2: // Follow-ups
        return <FollowUps />;
      case 3: // Tests
        return <Tests />;
      case 4: // Medical Images
        return (
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">Medical Images</Typography>
              <Button
                component={RouterLink}
                to="/medical-images"
                startIcon={<PhotoLibraryIcon />}
                variant="outlined"
              >
                View Full Gallery
              </Button>
            </Box>
            <MedicalImages />
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Container className="medical-records-container">
      <Box className="medical-records-header">
        <Typography variant="h4" className="medical-records-title">
          Medical Records
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddRecord}
          className="add-record-button"
        >
          Add New Record
        </Button>
      </Box>

      <Paper className="medical-records-content">
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          className="medical-records-tabs"
        >
          <Tab label="All Records" />
          <Tab label="Consultations" />
          <Tab label="Follow-ups" />
          <Tab label="Tests" />
          <Tab label="Medical Images" />
        </Tabs>

        {renderTabContent()}
      </Paper>
    </Container>
  );
};

export default MedicalRecords; 