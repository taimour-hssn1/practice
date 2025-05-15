import React from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  CardActions,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import {
  Person as DoctorIcon,
  PersonAdd as NewDoctorIcon,
  LocalHospital as HospitalIcon,
  Assignment as AppointmentIcon,
  AttachMoney as BillingIcon,
  Notifications as NotificationIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();

  // Mock data - replace with actual API calls
  const stats = {
    pendingDoctors: 5,
    totalDoctors: 25,
    totalPatients: 150,
    todayAppointments: 12,
    pendingBills: 8,
    totalRevenue: '$15,000',
  };

  const quickActions = [
    {
      title: 'Doctor Verification',
      icon: <NewDoctorIcon color="primary" />,
      count: stats.pendingDoctors,
      path: '/admin/doctor-verification',
      description: 'Review and verify doctor registrations',
    },
    {
      title: 'Manage Doctors',
      icon: <DoctorIcon color="primary" />,
      count: stats.totalDoctors,
      path: '/admin/doctors',
      description: 'View and manage doctor profiles',
    },
    {
      title: 'Hospital Stats',
      icon: <HospitalIcon color="primary" />,
      count: stats.totalPatients,
      path: '/admin/statistics',
      description: 'View hospital statistics and analytics',
    },
  ];

  const recentActivities = [
    'New doctor registration: Dr. John Doe',
    'Updated billing rates for Cardiology',
    'New appointment schedule added',
    'System maintenance completed',
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* Welcome Section */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h4" gutterBottom>
              Admin Dashboard
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Welcome back! Here's what's happening in your hospital.
            </Typography>
          </Paper>
        </Grid>

        {/* Statistics Cards */}
        <Grid item xs={12}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4}>
              <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 140 }}>
                <Typography variant="h6" gutterBottom>
                  Pending Verifications
                </Typography>
                <Typography variant="h3" component="div" sx={{ flexGrow: 1 }}>
                  {stats.pendingDoctors}
                </Typography>
                <Typography color="textSecondary">
                  New doctor registrations
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 140 }}>
                <Typography variant="h6" gutterBottom>
                  Today's Appointments
                </Typography>
                <Typography variant="h3" component="div" sx={{ flexGrow: 1 }}>
                  {stats.todayAppointments}
                </Typography>
                <Typography color="textSecondary">
                  Scheduled appointments
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 140 }}>
                <Typography variant="h6" gutterBottom>
                  Revenue
                </Typography>
                <Typography variant="h3" component="div" sx={{ flexGrow: 1 }}>
                  {stats.totalRevenue}
                </Typography>
                <Typography color="textSecondary">
                  This month
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Grid>

        {/* Quick Actions */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Quick Actions
            </Typography>
            <Grid container spacing={3}>
              {quickActions.map((action) => (
                <Grid item xs={12} sm={6} md={4} key={action.title}>
                  <Card>
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        {action.icon}
                        <Typography variant="h6" sx={{ ml: 1 }}>
                          {action.count}
                        </Typography>
                      </Box>
                      <Typography variant="subtitle1" gutterBottom>
                        {action.title}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {action.description}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small" onClick={() => navigate(action.path)}>
                        View Details
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>

        {/* Recent Activities */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Recent Activities
            </Typography>
            <List>
              {recentActivities.map((activity, index) => (
                <React.Fragment key={index}>
                  <ListItem>
                    <ListItemIcon>
                      <NotificationIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary={activity}
                      secondary={`${Math.floor(Math.random() * 24)}h ago`}
                    />
                  </ListItem>
                  {index < recentActivities.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdminDashboard; 