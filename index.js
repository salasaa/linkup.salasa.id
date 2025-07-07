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
    createdAt: new Date(),
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
    createdAt: new Date(),
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
    createdAt: new Date(),
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
    createdAt: new Date(),
  },
];

// RENDER / SHOW / DISPLAY CONTACTS
function renderContacts(contacts) {
  contacts.forEach((contact) => {
    const fullName = `${contact.firstName} ${contact.lastName}`;
    const formattedDate = new Intl.DateTimeFormat("en-UK", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(contact.createdAt);

    console.log(`
    ID: ${contact.id || "N/A"}
    Full Name: ${fullName || "N/A"}
    Phone: ${contact.phoneNumber || "N/A"}
    Email: ${contact.email || "N/A"}
    Website: ${contact.websiteUrl || "N/A"}
    Company: ${contact.company.name || "N/A"} (${
      contact.company.jobTitle || "N/A"
    })
    Created At: ${formattedDate || "N/A"}
    Favorited: ${contact.isFavorited ? "Yes" : "No"}
    `);
  });
}

// -----------------------------

// SEARCH CONTACTS
function searchContacts(contacts, searchTerm) {
  const searchedContact = contacts.filter((contact) => {
    return (contact.fullName = `${contact.firstName} ${contact.lastName}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase()));
  });
  renderContacts(searchedContact);
  if (searchedContact.length === 0) {
    console.log(`No contacts found : "${searchTerm}"`);
  } else {
    console.log(`Found ${searchedContact.length} contact(s) : "${searchTerm}"`);
  }
}

// -----------------------------

// GENERATE ID
function generateId(contacts) {
  return contacts[contacts.length - 1].id + 1;
  // condition
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

  dataContacts = newContacts;

  renderContacts(newContacts);
}

// -----------------------------

// DELETE CONTACT
function deleteContact(contacts, contactId) {
  const filteredContacts = contacts.filter(
    (contact) => contact.id !== contactId
  );
  dataContacts = filteredContacts;
  renderContacts(dataContacts);
  console.log(`Contact with ID ${contactId} has been deleted.`);
}

// -----------------------------

// UPDATE CONTACT
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

  dataContacts = updatedContacts;
  renderContacts(dataContacts);
}

// ------------------------------

renderContacts(dataContacts);

searchContacts(dataContacts, "id");

updateContact(dataContacts, 2, {
  lastName: "Saja",
  isFavorited: false,
});

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

// ------------------------------
