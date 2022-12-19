/**
 * @jest-environment jsdom
 */

const fs = require("fs");

const NotesView = require("./notesView");
const NotesModel = require("./notesModel");

describe("NotesView", () => {
  beforeEach(() => {
    document.body.innerHTML = fs.readFileSync("./index.html");
  });

  it("displays notes", () => {
    const model = new NotesModel();
    const view = new NotesView(model);
    model.addNote("First note");
    model.addNote("Second note");
    view.displayNotes();
    expect(document.querySelectorAll("div.note").length).toEqual(2);
  });
});
