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

  it("sends a POST request to create a new note", () => {
    // Arrange
    const client = new NotesClient();
    const note = "Test note";
    const expectedResponse = { content: note };
    fetch.mockResponseOnce(JSON.stringify(expectedResponse));

    // Act
    const result = client.createNote(note);

    // Assert
    expect(result).resolves.toMatchObject(expectedResponse);
    expect(fetch).toHaveBeenCalledWith("http://localhost:3000/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: note }),
    });
  });
});
