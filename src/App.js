import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Box, Container, AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import './App.css';

// Components
import Login from './components/Login';
import Signup from './components/Signup';
import AppointmentManagement from './components/AppointmentManagement';
import BillingManagement from './components/Billing/BillingManagement';
import DoctorVerification from './components/Admin/DoctorVerification';
import AdminDashboard from './components/Admin/AdminDashboard';
import MedicalRecords from './components/MedicalRecords/MedicalRecords';
import { NotificationProvider } from './components/Notification/NotificationContext';
import NotificationCenter from './components/Notification/NotificationCenter';

// Create theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
    },
    secondary: {
      main: '#9c27b0',
      light: '#ba68c8',
      dark: '#7b1fa2',
    },
    success: {
      main: '#2e7d32',
      light: '#4caf50',
      dark: '#1b5e20',
    },
    warning: {
      main: '#ed6c02',
      light: '#ff9800',
      dark: '#e65100',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 600,
    },
    h2: {
      fontWeight: 600,
    },
    h3: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 500,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
          },
        },
      },
    },
  },
});

// Navigation component
const Navigation = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';
  const isAdminPage = location.pathname.startsWith('/admin');

  if (isAuthPage) return null;

  return (
    <AppBar position="static" sx={{ mb: 3 }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, fontWeight: 600 }}
          >
            Patient Management System
            {isAdminPage && ' - Admin Dashboard'}
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            {!isAdminPage ? (
              <>
                <Button
                  component={Link}
                  to="/appointments"
                  color="inherit"
                  sx={{
                    backgroundColor: location.pathname === '/appointments' ? 'rgba(255, 255, 255, 0.12)' : 'transparent',
                  }}
                >
                  Appointments
                </Button>
                <Button
                  component={Link}
                  to="/medical-records"
                  color="inherit"
                  sx={{
                    backgroundColor: location.pathname === '/medical-records' ? 'rgba(255, 255, 255, 0.12)' : 'transparent',
                  }}
                >
                  Medical Records
                </Button>
                <Button
                  component={Link}
                  to="/billing"
                  color="inherit"
                  sx={{
                    backgroundColor: location.pathname === '/billing' ? 'rgba(255, 255, 255, 0.12)' : 'transparent',
                  }}
                >
                  Billing
                </Button>
              </>
            ) : (
              <>
                <Button
                  component={Link}
                  to="/admin/dashboard"
                  color="inherit"
                  sx={{
                    backgroundColor: location.pathname === '/admin/dashboard' ? 'rgba(255, 255, 255, 0.12)' : 'transparent',
                  }}
                >
                  Dashboard
                </Button>
                <Button
                  component={Link}
                  to="/admin/doctor-verification"
                  color="inherit"
                  sx={{
                    backgroundColor: location.pathname === '/admin/doctor-verification' ? 'rgba(255, 255, 255, 0.12)' : 'transparent',
                  }}
                >
                  Doctor Verification
                </Button>
              </>
            )}
            <NotificationCenter />
            <Button
              component={Link}
              to="/login"
              color="inherit"
              sx={{ ml: 2 }}
            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NotificationProvider>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <div className="App">
            <Router>
              <Navigation />
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/appointments" element={<AppointmentManagement />} />
                <Route path="/billing" element={<BillingManagement />} />
                <Route path="/medicalrecords" element={<MedicalRecords />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/doctor-verification" element={<DoctorVerification />} />
                <Route path="/" element={<Navigate to="/login" replace />} />
              </Routes>
            </Router>
          </div>
        </LocalizationProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
}

export default App;