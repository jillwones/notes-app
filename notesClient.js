class NotesClient {
  loadNotes(callback, errorCallback = () => {}) {
    return fetch("http://localhost:3000/notes")
      .then((response) => response.json())
      .then((data) => callback(data))
      .catch(() => errorCallback());
  }

  createNote(note, errorCallback = () => {}) {
    return fetch("http://localhost:3000/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: note }),
    }).then((response) => response.json())
    .catch(() => errorCallback());
  }

  reset(errorCallback = () => {}) {
    return fetch("http://localhost:3000/notes", {
      method: "DELETE",
    }).catch(() => errorCallback());
  }

  emojify(note, callback) {
    return fetch("https://makers-emojify.herokuapp.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: note }),
    })
      .then((response) => response.json())
      .then((data) => callback(data));
  }
}

module.exports = NotesClient;
