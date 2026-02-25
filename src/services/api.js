// MockAPI Base URL
const MOCKAPI_BASE_URL = "https://697af2bf0e6ff62c3c5a814d.mockapi.io";
const NOTES_PATH = `${MOCKAPI_BASE_URL}/api/v1/notes`;

// ==============================
// GET ALL NOTES
// ==============================
export const getNotes = async () => {
  try {
    const response = await fetch(NOTES_PATH);

    if (!response.ok) {
      throw new Error("Failed to fetch notes");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching notes:", error);
    throw error;
  }
};

// ==============================
// CREATE NOTE
// ==============================
export const createNote = async (note) => {
  try {
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
  } catch (error) {
    console.error("Error creating note:", error);
    throw error;
  }
};

// ==============================
// UPDATE NOTE
// ==============================
export const updateNote = async (noteId, note) => {
  try {
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
  } catch (error) {
    console.error("Error updating note:", error);
    throw error;
  }
};

// ==============================
// DELETE NOTE
// ==============================
export const deleteNote = async (noteId) => {
  try {
    const response = await fetch(`${NOTES_PATH}/${noteId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete note");
    }

    return true;
  } catch (error) {
    console.error("Error deleting note:", error);
    throw error;
  }
};