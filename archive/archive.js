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
  contactsLiElements = contacts.map((contact) => {
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
      console.log(contactListElement);
      // contactListElement.appendChild(contactLiElement);
    });
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

// From script.js //
// Get references to DOM elements
// const createContactBtn = document.getElementById("createContactBtn");
// const contactListView = document.getElementById("contactListView");
// const createContactView = document.getElementById("createContactView");
// const cancelCreateBtn = document.getElementById("cancelCreateBtn");
// const createContactForm = document.getElementById("createContactForm");

// // Event listener for "Create contact" button
// createContactBtn.addEventListener("click", () => {
//   contactListView.classList.add("hidden"); // Hide contact list view
//   createContactView.classList.remove("hidden"); // Show form view
// });

// // Event listener for "Cancel" button on "Create Contact" form
// cancelCreateBtn.addEventListener("click", () => {
//   createContactView.classList.add("hidden"); // Hide form view
//   contactListView.classList.remove("hidden"); // Show contact list view again
//   createContactForm.reset(); // Reset the form
// });

// Event listener for "Create Contact" form submission
createContactForm.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent page refresh
  // Here you can add logic to save contact data
  const formData = new FormData(createContactForm);
  const newContact = {};
  for (let [key, value] of formData.entries()) {
    newContact[key] = value;
  }
  console.log("New Contact Data:", newContact);

  // After saving, return to the contact list view
  createContactView.classList.add("hidden");
  contactListView.classList.remove("hidden");
  createContactForm.reset(); // Reset form after submission
  // Using alert temporarily, replace with custom modal
  // IMPORTANT: Do NOT use alert() or confirm() in production code for Canvas.
  // Use a custom modal UI instead.
  alert("Contact saved successfully!");
});

// // Get references to DOM elements
const createContactForm = document.getElementById("createContactForm");

// Event listener for "Create Contact" form submission
createContactForm.addEventListener("submit", (event) => {
  event.preventDefault(); // prevent page refresh

  const formData = new FormData(createContactForm);
  const newContact = {};
  for (let [key, value] of formData.entries()) {
    newContact[key] = value;
  }
  console.log("New Contact Data:", newContact);

  // --- logic for save new contact ---
  // Saving contact data to localStorage
  let contacts = JSON.parse(localStorage.getItem("contacts")) || [];
  contacts.push(newContact);
  localStorage.setItem("contacts", JSON.stringify(contacts));
  // --- End Logic ---

  // Redirect back to the main page after saving
  alert("Contact saved successfully!"); // Replace with a better modal UI
  window.location.href = "/"; // Redirect to the main page
});

// ----------------------------

// From storage.js //
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
