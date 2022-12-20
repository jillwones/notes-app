const NotesClient = require("./notesClient");
require("jest-fetch-mock").enableMocks();

describe("NotesClient", () => {
  it("calls fetch and loads data", (done) => {
    const client = new NotesClient();
    fetch.mockResponseOnce(
      JSON.stringify({
        name: "Some value",
        id: 123,
      })
    );
    client.loadNotes((returnedDataFromApi) => {
      expect(returnedDataFromApi.name).toBe("Some value");
      expect(returnedDataFromApi.id).toBe(123);
      done();
    });
  });
});
