class NotesView {
  constructor(model) {
    this.model = model;
    this.mainContainerEl = document.querySelector("#main-container");

    document.querySelector("#add-note-btn").addEventListener("click", () => {
      const newNote = document.querySelector("#add-note-input").value;
      this.addNewNote(newNote);
    });
  }

  displayNotes() {
    const notes = this.model.getNotes();
    const noteEl = document.createElement("div");
    noteEl.textContent = notes[notes.length - 1];
    noteEl.className = "note";
    this.mainContainerEl.append(noteEl);
  }

  addNewNote(note) {
    this.model.addNote(note);
    this.displayNotes();
    document.querySelector("#add-note-input").value = null;
  }
}

module.exports = NotesView;
