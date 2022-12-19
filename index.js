const NotesModel = require("./notesModel");
const NotesView = require("./notesView")

const model = new NotesModel();
const view = new NotesView(model);
view.displayNotes();