import React, { useState } from "react";
import "./style.css";

function App() {
  const [notes, setNotes] = useState([
    { id: 1, content: "Buy groceries" },
    { id: 2, content: "Read a book" },
    { id: 3, content: "Go for a walk" },
  ]);
  const [note, setNote] = useState("");
  const [editId, setEditId] = useState(null);
  const [viewing, setViewing] = useState(false);

  const handleSaveNote = () => {
    if (note.trim() !== "") {
      if (editId !== null) {
        setNotes(
          notes.map((n) => (n.id === editId ? { ...n, content: note } : n))
        );
        setEditId(null);
      } else {
        setNotes([...notes, { id: notes.length + 1, content: note }]);
      }
      setNote("");
    }
  };

  const handleEditNote = (id) => {
    const noteToEdit = notes.find((note) => note.id === id);
    setNote(noteToEdit.content);
    setEditId(noteToEdit.id);
  };

  const handleDeleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const handleViewNotes = () => {
    setViewing(true);
  };

  const handleCloseView = () => {
    setViewing(false);
  };

  return (
    <div className="App container mt-5">
      <div className="note-container card p-4 shadow-sm">
        <div className="note-input mb-3">
          <h1>Note App</h1>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="form-control mb-2"
            placeholder="Enter your note here..."
          />
          <button onClick={handleSaveNote} className="btn btn-primary me-2">
            {editId !== null ? "Save Edit" : "Save Note"}
          </button>
          <button onClick={handleViewNotes} className="btn btn-secondary">
            View Notes
          </button>
        </div>
        {viewing && (
          <div className="note-view mt-3">
            <button onClick={handleCloseView} className="btn btn-danger mb-2">
              Close View
            </button>
            <h2>Notes List</h2>
            <ul className="list-group">
              {notes.map((note) => (
                <li key={note.id} className="list-group-item d-flex justify-content-between align-items-center">
                  {note.content}
                  <div>
                    <button onClick={() => handleEditNote(note.id)} className="btn btn-warning btn-sm me-2">
                      Edit
                    </button>
                    <button onClick={() => handleDeleteNote(note.id)} className="btn btn-danger btn-sm">
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
