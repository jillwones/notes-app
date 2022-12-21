/**
 * @jest-environment jsdom
 */

const fs = require("fs");
require("jest-fetch-mock").enableMocks();
const NotesView = require("./notesView");
const NotesModel = require("./notesModel");
const NotesClient = require("./notesClient");

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

  it("returns notes from an API", () => {
    const model = new NotesModel();
    const clientMock = {
      loadNotes: (callback) => {
        callback(["note123"]);
      },
    };

    const view = new NotesView(model, clientMock);
    view.displayNotesFromApi();
    expect(document.querySelector("div.note").textContent).toEqual('note123')
  });
});
