import { AuthSession } from 'expo';
import axios from 'axios';

const SPREADSHEET_ID = '1TW6-XeRrvGVRd3AM0RT1V1RRgmYWLyzDL5KwQZcmxVc';
const RANGE = 'Sheet1!A:A'; // Update with your sheet name and column

export const authenticateWithGoogleSheets = async () => {
  const { authentication } = await AuthSession.startAsync({
    authUrl:
      `https://accounts.google.com/o/oauth2/auth?` +
      `&response_type=token` +
      `&client_id=${EXPO_PUBLIC_SHEET_ID.client_id}` + // Replace with your Google Client ID
      `&redirect_uri=${AuthSession.getRedirectUrl()}`,
  });

  if (authentication) {
    return authentication.accessToken;
  }

  throw new Error('Authentication failed');
};

export const writeToGoogleSheets = async (accessToken, data) => {
  try {
    const response = await axios.post(
      `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}:append`,
      {
        values: [[data]],
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('Data written to Google Sheets:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error writing data to Google Sheets:', error.response?.data || error.message);
    throw error;
  }
};
