function saveContacts(contacts) {
  localStorage.setItem("storage-contacts", JSON.stringify(contacts));
}

// LOAD CONTACTS FROM LOCAL STORAGE
function loadContacts() {
  const storageContacts = JSON.parse(localStorage.getItem("storage-contacts"));

  if (!storageContacts) {
    console.log("Local storage is empty. Initializing with an empty array.");
    return [];
  }
  return storageContacts;
}
