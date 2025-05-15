import React, { createContext, useContext, useState } from 'react';
import { Snackbar, Alert } from '@mui/material';

const NotificationContext = createContext();

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentNotification, setCurrentNotification] = useState(null);

  const addNotification = (message, type = 'info', autoHideDuration = 6000) => {
    const newNotification = {
      id: Date.now(),
      message,
      type,
      autoHideDuration,
      timestamp: new Date(),
    };
    setNotifications(prev => [...prev, newNotification]);
    
    // If no notification is currently showing, show this one
    if (!currentNotification) {
      setCurrentNotification(newNotification);
      setOpen(true);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
    // Remove the current notification and show the next one if it exists
    setTimeout(() => {
      setNotifications(prev => {
        const filtered = prev.filter(n => n.id !== currentNotification.id);
        if (filtered.length > 0) {
          setCurrentNotification(filtered[0]);
          setOpen(true);
        } else {
          setCurrentNotification(null);
        }
        return filtered;
      });
    }, 300);
  };

  return (
    <NotificationContext.Provider value={{ addNotification }}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={currentNotification?.autoHideDuration}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={handleClose}
          severity={currentNotification?.type || 'info'}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {currentNotification?.message}
        </Alert>
      </Snackbar>
    </NotificationContext.Provider>
  );
}; 