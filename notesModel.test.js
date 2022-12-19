const NotesModel = require("./notesModel");

describe("NotesModel", () => {
  let model = new NotesModel();
  beforeEach(() => {
    model = new NotesModel();
  });
  it("returns all notes", () => {
    expect(model.getNotes()).toEqual([]);
  });
  it("adds notes to the list", () => {
    model.addNotes("Buy milk");
    model.addNotes("Go to the gym");
    expect(model.getNotes()).toEqual(["Buy milk", "Go to the gym"]);
  });
  it("can reset the list", () => {
    model.addNotes("Buy milk");
    model.addNotes("Go to the gym");
    model.reset();
    expect(model.getNotes()).toEqual([]);
  })
});
