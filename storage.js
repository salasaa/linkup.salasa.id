// LOAD CONTACTS FROM LOCAL STORAGE
function loadContactsFromLocalStorage() {
  const storageContacts = JSON.parse(localStorage.getItem("storage-contacts"));

  if (!storageContacts) {
    saveContactsToLocalStorage([]);
  }
  return storageContacts || [];
}

function saveContactsToLocalStorage(contacts) {
  localStorage.setItem("storage-contacts", JSON.stringify(contacts));
}
