// SAVE CONTACTS FROM LOCAL STORAGE
function saveContacts(contacts) {
  localStorage.setItem("storage-contacts", JSON.stringify(contacts));
}

// LOAD CONTACTS FROM LOCAL STORAGE
function loadContacts() {
  const storageContacts = localStorage.getItem("storage-contacts");
  if (!storageContacts) {
    saveContacts([]);
    return [];
  }
  try {
    return JSON.parse(storageContacts);
  } catch (error) {
    console.log("Failed to load contacts", error);
  }
}

function loadContactById(id) {
  const contacts = loadContacts();
  const contact = contacts.find((contact) => contact.id === id);

  return contact;
}
