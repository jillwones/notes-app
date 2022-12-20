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
        }
        displayNotes() {
          const notes = this.model.getNotes();
          const noteEl = document.createElement("div");
          noteEl.textContent = notes[notes.length - 1];
          noteEl.className = "note";
          this.mainContainerEl.append(noteEl);
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
      };
      module.exports = NotesView2;
    }
  });

  // notesClient.js
  var require_notesClient = __commonJS({
    "notesClient.js"(exports, module) {
      var NotesClient2 = class {
        loadNotes(callback) {
          fetch("http://localhost:3000/notes").then((response) => response.json()).then((data) => {
            callback(data);
          });
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
  view.displayNotesFromApi();
})();
