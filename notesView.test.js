/**
 * @jest-environment jsdom
 */

const fs = require("fs");
require("jest-fetch-mock").enableMocks();
const NotesView = require("./notesView");
const NotesModel = require("./notesModel");
const NotesClient = require("./notesClient");
const { doesNotMatch } = require("assert");

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
    const client = new NotesClient();
    const view = new NotesView(model, client);
    const input = document.querySelector("#add-note-input");
    input.value = "Latest note";
    const button = document.querySelector("#add-note-btn");
    button.click();
    input.value = "Another note";
    button.click();
    expect(document.querySelectorAll("div.note").length).toEqual(2);
    expect(document.querySelectorAll("div.note")[0].textContent).toEqual(
      "Latest note"
    );
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
