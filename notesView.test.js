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
    view.displayNotes();
    model.addNote("Second note");
    view.displayNotes();
    expect(document.querySelectorAll("div.note").length).toEqual(2);
  });

  it("adds a new note", () => {
    const model = new NotesModel();
    const view = new NotesView(model);
    const input = document.querySelector("#add-note-input");
    input.value = "Latest note";
    const button = document.querySelector("#add-note-btn");
    button.click();
    input.value = "Another note";
    button.click();
    expect(document.querySelectorAll("div.note").length).toEqual(2);
    expect(document.querySelectorAll("div.note")[0].textContent).toEqual("Latest note")
  })
});
