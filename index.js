let placeholderDataContacts = [
  {
    id: 1,
    firstName: "Akhirudin",
    lastName: "Salasa",
    company: {
      name: "PT. Tech ",
      jobTitle: "Software Engineering",
    },
    email: "salasa@example.com",
    phoneNumber: "+62 123-456-7890",
    websiteUrl: "https://salasa.id",
    isFavorited: true,
    createdAt: new Date("2025-06-15"),
  },
  {
    id: 2,
    firstName: "Adi",
    lastName: "Pamungkas",
    company: {
      name: "Business Corp",
      jobTitle: "Marketing Manager",
    },
    email: "pramudia@example.com",
    phoneNumber: "+62 987-654-3210",
    websiteUrl: "https://pramudia.com",
    isFavorited: true,
    createdAt: new Date("2025-06-18"),
  },
  {
    id: 3,
    firstName: "Aysha",
    lastName: "Shifa",
    company: {
      name: "Creative Agency",
      jobTitle: "Graphic Design",
    },
    email: "aysha@example.com",
    phoneNumber: "+62 555-123-4567",
    websiteUrl: "https://ayshashifa.com",
    isFavorited: false,
    createdAt: new Date("2025-06-30"),
  },
  {
    id: 4,
    firstName: "Daniyal",
    lastName: "Said",
    company: {
      name: "Tesla",
      jobTitle: "Content Strategist",
    },
    email: "daniyal@example.com",
    phoneNumber: "+62 555-987-6543",
    websiteUrl: "https://daniyalsaid.com",
    isFavorited: true,
    createdAt: new Date("2025-07-05"),
  },
];

// LOAD CONTACTS FROM LOCAL STORAGE
function loadDataContacts() {
  contacts = loadContacts();

  if (contacts.length === 0) {
    const newContacts = saveContacts(placeholderDataContacts);
    return newContacts;
  }

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
      contact.company.jobTitle
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      contact.company.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return filteredContacts;
}

function renderContacts() {
  const contacts = loadDataContacts();

  const urlParams = new URLSearchParams(window.location.search);
  const searchQuery = urlParams.get("q");

  const contactToDisplay = searchQuery
    ? searchContacts(contacts, searchQuery)
    : contacts;

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
            <p>${contact.company.jobTitle} (${contact.company.name})</p>
            <div class="flex display-end gap-3">
              
              <button class="flex items-center justify-between p-3 rounded-3xl hover:bg-gray-100 "> 
                <i class="far fa-star  hover:text-yellow-500"></i>
              </button>
              <a href="/contact/?id=${contact.id}" class="flex items-center justify-between p-3 rounded-3xl hover:bg-gray-100 "> 
                <i class='fa fa-eye'></i>
              </a>
              <button class="flex items-center justify-between p-3 rounded-3xl hover:bg-gray-100 " onclick="deleteContact(contacts,${contact.id})"> 
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
  const contact = contacts.find((fruit) => {
    return contact.id === contactId;
  });

  if (!contact) {
    console.log("No Contact Found");
    return;
  }

  renderContacts([contact]);
}

// function searchContacts(contacts, searchQuery) {
//   searchInputElement.value = searchQuery;

//   const searchedContact = contacts.filter((contact) => {
//     const fullName = `${contact.firstName} ${contact.lastName}`;

//     return (
//       fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       contact.phoneNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       contact.company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       contact.company.jobTitle.toLowerCase().includes(searchQuery.toLowerCase())
//     );
//   });
//   renderContacts(searchedContact);

//   if (searchedContact.length === 0) {
//     console.log(`No contacts found : "${searchQuery}"`);
//   } else {
//     console.log(
//       `Found ${searchedContact.length} contact(s) : "${searchQuery}"`
//     );
//     searchedContact.forEach((contact) => {
//       const fullName = `${contact.firstName} ${contact.lastName}`.trim();
//       console.log(`
//         ${fullName},
//         ${contact.email},
//         ${contact.phoneNumber},
//         ${contact.company.name} (${contact.company.jobTitle}),
//       `);
//     });
//   }
// }

// DELETE CONTACT, SAVE, RENDER

function deleteContact(contacts, contactId) {
  const filteredContacts = contacts.filter(
    (contact) => contact.id !== contactId
  );

  saveContacts(filteredContacts);
  renderContacts(filteredContacts);

  console.log(`Contact with ID ${contactId} has been deleted.`);
}

// UPDATE CONTACT, SAVE TO LOCAL STORAGE
function updateContact(contacts, contactId, updatedContactInput) {
  const originalContact = contacts.find((contact) => contact.id === contactId);

  const updatedContact = {
    id: contactId,
    firstName: updatedContactInput.firstName || originalContact.firstName,
    lastName: updatedContactInput.lastName || originalContact.lastName,
    company: {
      name: updatedContactInput.company?.name || originalContact.company.name,
      jobTitle:
        updatedContactInput.company?.jobTitle ||
        originalContact.company.jobTitle,
    },
    email: updatedContactInput.email || originalContact.email,
    phoneNumber: updatedContactInput.phoneNumber || originalContact.phoneNumber,
    websiteUrl: updatedContactInput.websiteUrl || originalContact.websiteUrl,
    isFavorited:
      updatedContactInput.isFavorited !== undefined
        ? updatedContactInput.isFavorited
        : originalContact.isFavorited,
    createdAt: originalContact.createdAt,
  };

  const updatedContacts = contacts.map((contact) => {
    if (contact.id === contactId) {
      return updatedContact;
    }
    return contact;
  });

  saveContacts(updatedContacts);
  renderContacts();
}

loadDataContacts();

renderContacts();
