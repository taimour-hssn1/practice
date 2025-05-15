import React, { useState } from 'react';
import {
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const locales = {
  'en-US': require('date-fns/locale/en-US'),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const DoctorCalendar = ({ onDateSelect }) => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Mock appointments data
  const appointments = [
    {
      id: 1,
      title: 'John Doe',
      start: new Date(2024, 2, 15, 10, 0),
      end: new Date(2024, 2, 15, 11, 0),
      patientName: 'John Doe',
      reason: 'Regular Checkup',
      status: 'Confirmed',
    },
    {
      id: 2,
      title: 'Jane Smith',
      start: new Date(2024, 2, 15, 14, 0),
      end: new Date(2024, 2, 15, 15, 0),
      patientName: 'Jane Smith',
      reason: 'Follow-up',
      status: 'Confirmed',
    },
  ];

  const handleEventSelect = (event) => {
    setSelectedEvent(event);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedEvent(null);
  };

  const handleConfirmAppointment = () => {
    // TODO: Implement appointment confirmation logic
    console.log('Confirming appointment:', selectedEvent);
    handleCloseDialog();
  };

  const handleCancelAppointment = () => {
    // TODO: Implement appointment cancellation logic
    console.log('Cancelling appointment:', selectedEvent);
    handleCloseDialog();
  };

  const handleSelectSlot = ({ start }) => {
    if (onDateSelect) {
      onDateSelect(start);
    }
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Typography 
        variant="h5" 
        component="h2" 
        gutterBottom 
        sx={{ mb: 3 }}
      >
        Appointments Calendar
      </Typography>

      <Box sx={{ flex: 1, minHeight: 600 }}>
        <Calendar
          localizer={localizer}
          events={appointments}
          startAccessor="start"
          endAccessor="end"
          onSelectEvent={handleEventSelect}
          onSelectSlot={handleSelectSlot}
          selectable={true}
          style={{ height: '100%' }}
          views={['month', 'week', 'day']}
          defaultView="week"
        />
      </Box>

      <Dialog 
        open={isDialogOpen} 
        onClose={handleCloseDialog} 
        maxWidth="sm" 
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
          }
        }}
      >
        {selectedEvent && (
          <>
            <DialogTitle sx={{ 
              borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
              pb: 2
            }}>
              Appointment Details
            </DialogTitle>
            <DialogContent sx={{ mt: 2 }}>
              <List>
                <ListItem>
                  <ListItemText
                    primary="Patient Name"
                    secondary={selectedEvent.patientName}
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText
                    primary="Date & Time"
                    secondary={format(selectedEvent.start, 'PPpp')}
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText
                    primary="Reason"
                    secondary={selectedEvent.reason}
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText
                    primary="Status"
                    secondary={selectedEvent.status}
                  />
                </ListItem>
              </List>
            </DialogContent>
            <DialogActions sx={{ p: 2, pt: 1 }}>
              <Button 
                onClick={handleCancelAppointment} 
                color="error"
                variant="outlined"
              >
                Cancel Appointment
              </Button>
              <Button 
                onClick={handleConfirmAppointment} 
                color="primary"
                variant="contained"
              >
                Confirm Appointment
              </Button>
              <Button onClick={handleCloseDialog}>
                Close
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default DoctorCalendar;