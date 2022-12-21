class NotesView {
  constructor(model, client) {
    this.model = model;
    this.client = client;
    this.mainContainerEl = document.querySelector("#main-container");

    document.querySelector("#add-note-btn").addEventListener("click", () => {
      const newNote = document.querySelector("#add-note-input").value;
      this.addNewNote(newNote);
    });

    document.querySelector("#reset-btn").addEventListener("click", () => {
      this.resetNotes();
    });
  }

  displayNotes() {
    document.querySelector("#add-note-input").value = null;
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
      this.mainContainerEl.append(noteEl);
    });
  }

  displayNotesFromApi() {
    this.client.loadNotes((response) => {
      this.model.setNotes(response);
      this.displayNotes();
    });
  }

  addNewNote(newNote) {
    this.client
      .createNote(newNote, () => {
        this.displayError();
      })
      .then(() => this.displayNotesFromApi());
  }

  resetNotes() {
    this.client
      .reset((error) => this.displayError(error))
      .then(() => this.displayNotesFromApi());
  }

  displayError() {
    const errorMessage = document.createElement("div");
    errorMessage.textContent = "Oops, something went wrong!";
    errorMessage.className = "error";
    this.mainContainerEl.append(errorMessage);
  }
}

module.exports = NotesView;
