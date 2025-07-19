let placeholderDataContacts = JSON.parse(localStorage.getItem("storage-contacts")) || [];

// LOAD CONTACTS FROM LOCAL STORAGE
function loadDataContacts() {
  contacts = loadContacts();

  return contacts;
}

// GET REFERENCES TO DOM ELEMENTS
const contactsListElement = document.getElementById("contacts-list");
const searchInputElement = document.getElementById("search-input");
const createFormElement = document.getElementById("create-form");

// SEARCH CONTACTS AND RENDER
function searchContacts(contacts, searchQuery) {
  searchInputElement.value = searchQuery;

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.company.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.company.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return filteredContacts;
}

function renderContacts() {
  const contacts = loadDataContacts();

  const urlParams = new URLSearchParams(window.location.search);
  const searchQuery = urlParams.get("q");

  const contactToDisplay = searchQuery ? searchContacts(contacts, searchQuery) : contacts;

  // Use map and join to build the HTML string
  const contactsHTMLString = contactToDisplay
    .map((contact) => {
      const fullName = `${contact.firstName} ${contact.lastName}`.trim();
      const createdAt = new Intl.DateTimeFormat("en-UK", {
        dateStyle: "medium",
        timeStyle: "short",
        timeZone: "Asia/Jakarta",
      }).format(new Date(contact.createdAt));

      return `
        <li>
          <div class="grid grid-cols-contact-table gap-3 py-3 px-4 hover:bg-gray-50 rounded-lg items-center">
            <p>${fullName}</p>
            <p>${contact.email}</p>
            <p>${contact.phoneNumber}</p>
            <p>${contact.company.jobTitle}${contact.company.name ? `(${contact.company.name})` : ""}</p>
            <div class="flex display-end gap-3">
              <button class="flex items-center justify-between p-3 rounded-3xl hover:bg-gray-100 "> 
                <i class="far fa-star  hover:text-yellow-500"></i>
              </button>
              <a href="/contact/?id=${
                contact.id
              }" class="flex items-center justify-between p-3 rounded-3xl hover:bg-gray-100 "> 
                <i class='fa fa-eye'></i>
              </a>
              <button class="flex items-center justify-between p-3 rounded-3xl hover:bg-gray-100 " onclick="deleteContact(contacts,${
                contact.id
              })"> 
                <i class='fa fa-trash-can'></i>
              </button>
            </div>
          </div>
        </li>
      `;
    })
    .join("");

  contactsListElement.innerHTML = contactsHTMLString;
}

function renderOneContact(contacts, contactId) {
  const contact = contacts.find((contact) => {
    return contact.id === contactId;
  });

  if (!contact) {
    console.log("No Contact Found");
    return;
  }

  renderContacts([contact]);
}

function deleteContact(contacts, contactId) {
  const filteredContacts = contacts.filter((contact) => contact.id !== contactId);

  confirm("You want to delete this contact?");

  saveContacts(filteredContacts);

  renderContacts(filteredContacts);

  console.log(`Contact with ID ${contactId} has been deleted.`);
}

loadDataContacts();

renderContacts();
