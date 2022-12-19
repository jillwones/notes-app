const NotesModel = require("./notesModel");
const NotesView = require("./notesView")

const model = new NotesModel();
model.addNote('Go to the gym')
const view = new NotesView(model);
view.displayNotes();