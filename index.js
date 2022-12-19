const NotesModel = require("./notesModel");

const model = new NotesModel();
model.addNotes('Go to the gym')
console.log(model.getNotes());