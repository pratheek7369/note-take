// ==============================
// MOCK API BASE URL
// ==============================
const MOCKAPI_BASE_URL = "https://697af2bf0e6ff62c3c5a814d.mockapi.io";
const NOTES_PATH = `${MOCKAPI_BASE_URL}/api/v1/notes`;

// ==============================
// GET ALL NOTES
// ==============================
export const getNotes = async () => {
  const response = await fetch(NOTES_PATH);

  if (!response.ok) {
    throw new Error("Failed to fetch notes");
  }

  return await response.json();
};

// ==============================
// CREATE NOTE
// ==============================
export const createNote = async (note) => {
  const response = await fetch(NOTES_PATH, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(note),
  });

  if (!response.ok) {
    throw new Error("Failed to create note");
  }

  return await response.json();
};

// ==============================
// UPDATE NOTE
// ==============================
export const updateNote = async (noteId, note) => {
  const response = await fetch(`${NOTES_PATH}/${noteId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(note),
  });

  if (!response.ok) {
    throw new Error("Failed to update note");
  }

  return await response.json();
};

// ==============================
// DELETE NOTE
// ==============================
export const deleteNote = async (noteId) => {
  const response = await fetch(`${NOTES_PATH}/${noteId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete note");
  }

  return true;
};

// ==============================
// LOGIN USER
// ==============================
export const loginUser = async (username, password) => {
  const response = await fetch("https://apis.ccbp.in/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error_msg || "Login failed");
  }

  return data;
};