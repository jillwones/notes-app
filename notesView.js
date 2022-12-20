class NotesView {
  constructor(model, client) {
    this.model = model;
    this.client = client;
    this.mainContainerEl = document.querySelector("#main-container");

    document.querySelector("#add-note-btn").addEventListener("click", () => {
      const newNote = document.querySelector("#add-note-input").value;
      this.client.createNote(newNote);
      this.addNewNote(newNote);
    });
  }

  displayNotes() {
    // Clear all previous notes
    document.querySelectorAll(".note").forEach((element) => {
      element.remove();
    });

    const notes = this.model.getNotes();

    // For each note, create and append a new element on the main container
    notes.forEach((note) => {
      const noteEl = document.createElement("div");
      noteEl.textContent = note;
      noteEl.className = "note";
      document.querySelector("#add-note-input").value = "";
      this.mainContainerEl.append(noteEl);
    });
  }

  displayNotesFromApi() {
    this.client.loadNotes((notes) => {
      this.model.setNotes(notes);
      this.displayNotes();
    });
  }

  addNewNote(note) {
    this.model.addNote(note);
    this.displayNotes();
    document.querySelector("#add-note-input").value = null;
  }
}

module.exports = NotesView;
