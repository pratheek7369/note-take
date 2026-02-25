// API service functions for notes CRUD operations
// IMPORTANT: Update MOCKAPI_BASE_URL with your MockAPI endpoint URL
// Create a MockAPI project at https://mockapi.io/ and replace the URL below

// Base URL provided by user; resource path defined below
const MOCKAPI_BASE_URL = 'https://697af2bf0e6ff62c3c5a814d.mockapi.io';
// Use a local json-server in development to allow reliable create/read during development
const DEV_NOTES_PATH = 'http://localhost:3001/notes';
const NOTES_PATH = import.meta.env && import.meta.env.DEV ? DEV_NOTES_PATH : `${MOCKAPI_BASE_URL}/api/v1/notes`;

// Get user ID from localStorage
const getUserId = () => {
  return localStorage.getItem('user_id');
};

// Get all notes for the current user
export const getNotes = async () => {
  const userId = getUserId();
  if (!userId) throw new Error('User not authenticated');

  try {
    console.log('getNotes request for userId:', userId);
    const response = await fetch(`${NOTES_PATH}?userId=${userId}`);
    if (!response.ok) {
      const text = await response.text();
      console.error('getNotes failed:', response.status, text);
      throw new Error('Failed to fetch notes: ' + response.status);
    }
    const data = await response.json();
    console.log('getNotes response:', data?.length ?? 0, 'items');
    return data;
  } catch (error) {
    console.error('Error fetching notes:', error);
    throw error;
  }
};

// Create a new note
export const createNote = async (note) => {
  const userId = getUserId();
  if (!userId) throw new Error('User not authenticated');

  try {
    const payload = { ...note, userId };
    console.log('createNote payload:', { title: note.title, userId });
    const response = await fetch(NOTES_PATH, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      const text = await response.text();
      console.error('createNote failed:', response.status, text);
      throw new Error('Failed to create note: ' + response.status);
    }
    const data = await response.json();
    console.log('createNote succeeded:', data.id);
    return data;
  } catch (error) {
    console.error('Error creating note:', error);
    throw error;
  }
};

// Update an existing note
export const updateNote = async (noteId, note) => {
  const userId = getUserId();
  if (!userId) throw new Error('User not authenticated');

  try {
    const payload = { ...note, userId };
    console.log('updateNote payload:', { noteId, title: note.title });
    const response = await fetch(`${NOTES_PATH}/${noteId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      const text = await response.text();
      console.error('updateNote failed:', response.status, text);
      throw new Error('Failed to update note: ' + response.status);
    }
    const data = await response.json();
    console.log('updateNote succeeded:', data.id);
    return data;
  } catch (error) {
    console.error('Error updating note:', error);
    throw error;
  }
};

// Delete a note
export const deleteNote = async (noteId) => {
  const userId = getUserId();
  if (!userId) throw new Error('User not authenticated');

  try {
    console.log('deleteNote request:', noteId);
    const response = await fetch(`${NOTES_PATH}/${noteId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      const text = await response.text();
      console.error('deleteNote failed:', response.status, text);
      throw new Error('Failed to delete note: ' + response.status);
    }
    console.log('deleteNote succeeded:', noteId);
    return true;
  } catch (error) {
    console.error('Error deleting note:', error);
    throw error;
  }
};

// Login API call
export const loginUser = async (username, password) => {
  try {
    // Determine login URL:
    // - If `VITE_LOGIN_URL` is set (recommended for production on Vercel/Netlify), use it.
    // - In development use the Vite proxy `/login` so CORS isn't an issue.
    // - Otherwise fall back to the known public auth endpoint.
    const LOGIN_PATH = (import.meta.env && import.meta.env.VITE_LOGIN_URL)
      || (import.meta.env && import.meta.env.DEV ? '/login' : 'https://apis.ccbp.in/login');
    const payload = { username, password };
    console.log('loginUser request payload:', { username, path: LOGIN_PATH });
    const response = await fetch(LOGIN_PATH, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      // Try to parse error body for a useful message
      let errorMsg = 'Login failed';
      try {
        const errorData = await response.json();
        console.error('loginUser failed response:', errorData);
        errorMsg = errorData.error_msg || errorData.error || errorMsg;
      } catch (e) {
        // ignore parse error
      }
      throw new Error(errorMsg + ` (status ${response.status})`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error logging in:', error);
    const msg = error && error.message ? error.message : '';
    if (msg === 'Failed to fetch' || msg.includes('NetworkError') || error.name === 'TypeError') {
      throw new Error('Unable to reach authentication server. Check network or CORS settings.');
    }
    throw new Error(msg || 'Login failed');
  }
};
