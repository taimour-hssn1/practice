// You'll need to install and configure a mail service like nodemailer on the backend
// This is just a frontend service to interface with the backend email endpoints

const EMAIL_API_ENDPOINT = '/api/email'; // Replace with your actual API endpoint

export const emailService = {
  sendVerificationEmail: async (email) => {
    try {
      const response = await fetch(`${EMAIL_API_ENDPOINT}/send-verification`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      return response.ok;
    } catch (error) {
      console.error('Error sending verification email:', error);
      throw error;
    }
  },

  sendApprovalEmail: async (email) => {
    try {
      const response = await fetch(`${EMAIL_API_ENDPOINT}/send-approval`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      return response.ok;
    } catch (error) {
      console.error('Error sending approval email:', error);
      throw error;
    }
  },

  sendRejectionEmail: async (email, reason) => {
    try {
      const response = await fetch(`${EMAIL_API_ENDPOINT}/send-rejection`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, reason }),
      });
      return response.ok;
    } catch (error) {
      console.error('Error sending rejection email:', error);
      throw error;
    }
  },

  verifyEmail: async (token) => {
    try {
      const response = await fetch(`${EMAIL_API_ENDPOINT}/verify/${token}`, {
        method: 'GET',
      });
      return response.ok;
    } catch (error) {
      console.error('Error verifying email:', error);
      throw error;
    }
  },
};

export default emailService; 