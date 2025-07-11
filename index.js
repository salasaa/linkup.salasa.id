let dataContacts = [
  {
    id: 1,
    firstName: "Akhirudin",
    lastName: "Salasa",
    company: {
      name: "PT. Tech Solutions",
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
    firstName: "Pramudia",
    lastName: "Adi",
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

// GET REFERENCES TO DOM ELEMENTS
const contactListElement = document.getElementById("contacts-list");

// LOAD CONTACTS FROM LOCAL STORAGE
// function loadDataContacts() {
//   dataContacts = loadContacts();
//   if (dataContacts.length === 0) {
//     console.log("No contacts found.");
//     return;
//   }
// }

function renderContacts(contacts) {
  contactListElement.innerHTML = "";

  if (!dataContacts || dataContacts.length === 0) {
    console.log("No contacts available to display.");
    return;
  }
  dataContacts.forEach((contact) => {
    const fullName = `${contact.firstName} ${contact.lastName}`.trim();
    const createdAt = new Intl.DateTimeFormat("en-UK", {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: "Asia/Jakarta",
    }).format(new Date(contact.createdAt));
    const contactLiElement = document.createElement("li");
    contactLiElement.innerHTML = `
    <div class="grid grid-cols-contact-table gap-4 py-3 px-4 hover:bg-gray-50 rounded-lg items-center">
      <p>${fullName}</p>
      <p>${contact.email}</p>
      <p>${contact.phoneNumber}</p>
      <p>${contact.company.jobTitle} (${contact.company.name})</p>
      <p>${contact.isFavorited ? "Yes" : "No"}</p>
    </div>
    `;
    // console.log(contactListElement);
    contactListElement.appendChild(contactLiElement);
  });
}

// SEARCH CONTACTS AND RENDER
function searchContacts(contacts, searchTerm) {
  const searchedContact = contacts.filter((contact) => {
    const fullName = `${contact.firstName} ${contact.lastName}`;

    return (
      fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.phoneNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.company.jobTitle.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });
  renderContacts(searchedContact);

  if (searchedContact.length === 0) {
    console.log(`No contacts found : "${searchTerm}"`);
  } else {
    console.log(`Found ${searchedContact.length} contact(s) : "${searchTerm}"`);
    searchedContact.forEach((contact) => {
      const fullName = `${contact.firstName} ${contact.lastName}`.trim();
      console.log(`
        ${fullName}, 
        ${contact.email}, 
        ${contact.phoneNumber}, 
        ${contact.company.name} (${contact.company.jobTitle}),
      `);
    });
  }
}

// GENERATE ID
function generateId(contacts) {
  if (contacts.length === 0) {
    return 0; // If no contacts, start with ID 0
  }
  return contacts[contacts.length - 1].id + 1 || 0;
}

// ADD NEW CONTACT / CREATE CONTACT
function addNewContact(contacts, newContactInput) {
  const newContact = {
    id: generateId(contacts),
    firstName: newContactInput.firstName || "N/A",
    lastName: newContactInput.lastName || "N/A",
    company: {
      name: newContactInput.company?.name || "N/A",
      jobTitle: newContactInput.company?.jobTitle || "N/A",
    },
    email: newContactInput.email || "N/A",
    phoneNumber: newContactInput.phoneNumber || "N/A",
    websiteUrl: newContactInput.websiteUrl || "N/A",
    isFavorited: newContactInput.isFavorited || false,
    createdAt: new Date(newContactInput.createdAt),
  };
  const newContacts = [...contacts, newContact];

  saveContacts(newContacts);

  renderContacts();
}

// -----------------------------

// DELETE CONTACT, SAVE, RENDER
function deleteContact(contacts, contactId) {
  const filteredContacts = contacts.filter(
    (contact) => contact.id !== contactId
  );

  saveContacts(filteredContacts);
  renderContacts(filteredContacts);

  console.log(`Contact with ID ${contactId} has been deleted.`);
}

// -----------------------------

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

searchContacts(dataContacts, "id");

// updateContact(dataContacts, 6, {
//   lastName: "Cena",
//   isFavorited: false,
//   company: {
//     name: "WWE",
//     jobTitle: "Wrestler",
//   },
// });

addNewContact(dataContacts, {
  firstName: "John",
  lastName: "Wick",
  company: {
    name: "New Company",
    jobTitle: "New Job Title",
  },
  email: "john.wick@example.com",
  phoneNumber: "+62 123-456-7890",
  websiteUrl: "https://johnwick.com",
  isFavorited: true,
  createdAt: new Date(),
});

// renderContacts(dataContacts);
// ------------------------------
