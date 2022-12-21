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
    model = new NotesModel();
    client = new NotesClient();
    view = new NotesView(model, client);
  });

  // it("displays notes", () => {
  //   const model = new NotesModel();
  //   const client = new NotesClient();
  //   const view = new NotesView(model, client);
  //   view.addNewNote("First note");
  //   view.addNewNote("Second note");
  //   view.displayNotes();
  //   expect(document.querySelectorAll("div.note").length).toEqual(2);
  // });

  // it("returns notes from an API", () => {
  //   const model = new NotesModel();
  //   const clientMock = {
  //     loadNotes: (callback) => {
  //       callback(["note123"]);
  //     },
  //     emojify: (text) => {

  //     }
  //   };

  //   const view = new NotesView(model, clientMock);
  //   view.displayNotesFromApi();
  //   expect(document.querySelector("div.note").textContent).toEqual('note123')
  // });

  it("resets the notes", () => {
    //
  })
});
