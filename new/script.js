// Get references to DOM elements
const createFormElement = document.getElementById("createContactForm");

// Event listener for "Create Contact" form submission
createFormElement.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(createFormElement);
  const contacts = loadContacts();

  // Example: split fullname if needed, or just use as is
  const newContact = {
    id: generateId(loadContacts()),
    firstName: formData.get("firstName") || "",
    lastName: formData.get("lastName") || "",
    email: formData.get("email") || "",
    phoneNumber: formData.get("phoneNumber") || "",
    company: {
      name: formData.get("companyName") || "",
      jobTitle: formData.get("jobTitle") || "",
    },
    websiteUrl: formData.get("websiteUrl") || "",
    isFavorited: formData.get("isFavorited") === "on" ? true : false,
    createdAt: new Date(),
  };

  console.log({ newContact });
  saveContacts([...contacts, newContact]);

  alert("Contact saved successfully!");
  window.location.href = "/";
});

// GENERATE ID
function generateId(contacts) {
  if (!contacts || contacts.length === 0) {
    return 0;
  }
  return (contacts[contacts.length - 1].id || 0 + 1 || 0) + 1;
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

  console.log({ newContact });
  const newContacts = [...contacts, newContact];

  saveContacts(newContacts);

  renderContacts();
}
