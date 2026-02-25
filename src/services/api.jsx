// src/services/api.jsx

// ================= LOGIN =================
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

// ================= NOTES =================
const BASE_URL = "https://697af2bf0e6ff62c3c5a814d.mockapi.io";
const NOTES_PATH = `${BASE_URL}/notes`;

export const getNotes = async () => {
  const res = await fetch(NOTES_PATH);
  if (!res.ok) throw new Error("Failed to fetch notes");
  return res.json();
};

export const createNote = async (note) => {
  const res = await fetch(NOTES_PATH, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(note),
  });
  if (!res.ok) throw new Error("Failed to create note");
  return res.json();
};

export const updateNote = async (id, note) => {
  const res = await fetch(`${NOTES_PATH}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(note),
  });
  if (!res.ok) throw new Error("Failed to update note");
  return res.json();
};

export const deleteNote = async (id) => {
  const res = await fetch(`${NOTES_PATH}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete note");
  return true;
};