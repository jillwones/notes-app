(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // notesModel.js
  var require_notesModel = __commonJS({
    "notesModel.js"(exports, module) {
      var NotesModel2 = class {
        constructor() {
          this.notes = [];
        }
        getNotes() {
          return this.notes;
        }
        addNote(note) {
          this.notes.push(note);
        }
        reset() {
          this.notes = [];
        }
        setNotes(notes) {
          this.notes = notes;
        }
      };
      module.exports = NotesModel2;
    }
  });

  // notesView.js
  var require_notesView = __commonJS({
    "notesView.js"(exports, module) {
      var NotesView2 = class {
        constructor(model2, client2) {
          this.model = model2;
          this.client = client2;
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
          document.querySelectorAll(".note").forEach((element) => {
            element.remove();
          });
          const notes = this.model.getNotes();
          notes.forEach((note) => {
            const noteEl = document.createElement("div");
            this.client.emojify(note, (response) => {
              noteEl.textContent = response.emojified_text;
            });
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
          this.client.createNote(newNote, () => {
            this.displayError();
          }).then(() => this.displayNotesFromApi());
        }
        resetNotes() {
          this.client.reset((error) => this.displayError(error)).then(() => this.displayNotesFromApi());
        }
        displayError() {
          const errorMessage = document.createElement("div");
          errorMessage.textContent = "Oops, something went wrong!";
          errorMessage.className = "error";
          this.mainContainerEl.append(errorMessage);
        }
      };
      module.exports = NotesView2;
    }
  });

  // notesClient.js
  var require_notesClient = __commonJS({
    "notesClient.js"(exports, module) {
      var NotesClient2 = class {
        loadNotes(callback, errorCallback = () => {
        }) {
          fetch("http://localhost:3000/notes").then((response) => response.json()).then((data) => callback(data)).catch(() => errorCallback());
        }
        createNote(note, errorCallback = () => {
        }) {
          return fetch("http://localhost:3000/notes", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ content: note })
          }).then((response) => response.json()).catch(() => errorCallback());
        }
        reset(errorCallback) {
          return fetch("http://localhost:3000/notes", {
            method: "DELETE"
          }).catch(() => errorCallback());
        }
        emojify(note, callback) {
          return fetch("https://makers-emojify.herokuapp.com", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ text: note })
          }).then((response) => response.json()).then((data) => callback(data));
        }
      };
      module.exports = NotesClient2;
    }
  });

  // index.js
  var NotesModel = require_notesModel();
  var NotesView = require_notesView();
  var NotesClient = require_notesClient();
  var client = new NotesClient();
  var model = new NotesModel();
  var view = new NotesView(model, client);
  client.loadNotes((notes) => {
    model.setNotes(notes);
    view.displayNotes();
  }, () => {
    view.displayError();
  });
})();
