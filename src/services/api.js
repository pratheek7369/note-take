const MOCKAPI_BASE_URL = "https://697af2bf0e6ff62c3c5a814d.mockapi.io";
const NOTES_PATH = `${MOCKAPI_BASE_URL}/notes`;

// GET NOTES
export async function getNotes() {
  const res = await fetch(NOTES_PATH);
  if (!res.ok) throw new Error("Failed to fetch notes");
  return res.json();
}

// CREATE NOTE
export async function createNote(note) {
  const res = await fetch(NOTES_PATH, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(note),
  });
  if (!res.ok) throw new Error("Failed to create note");
  return res.json();
}

// UPDATE NOTE
export async function updateNote(id, note) {
  const res = await fetch(`${NOTES_PATH}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(note),
  });
  if (!res.ok) throw new Error("Failed to update note");
  return res.json();
}

// DELETE NOTE
export async function deleteNote(id) {
  const res = await fetch(`${NOTES_PATH}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete note");
  return true;
}