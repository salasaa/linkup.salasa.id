const contacts = [
  {
    id: 1,
    firstName: "Akhirudin",
    lastName: "Salasa",
    company: {
      name: "PT. Tech Solutions",
      industry: "Software Engineering",
    },
    jobTitle: "Software Engineer",
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
      industry: "Management",
    },
    jobTitle: "Project Manager",
    email: "pramudia@example.com",
    phone: "+62 987-654-3210",
    websiteUrl: "https://pramudia.com",
    isFavorited: true,
    createdAt: new Date("06-26-2025"),
  },
  {
    id: 3,
    firstName: "Aysha",
    lastName: "Shifa",
    company: {
      name: "Creative Agency",
      industry: "Design",
    },
    jobTitle: "UX Designer",
    email: "aysha@example.com",
    phone: "+62 555-123-4567",
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
      industry: "Automotive",
    },
    jobTitle: "Content Strategist",
    email: "daniyal@example.com",
    phone: "+62 555-987-6543",
    websiteUrl: "https://daniyalsaid.com",
    isFavorited: true,
    createdAt: new Date(),
  },
];

// --------------------------------

function displayAllContacts() {
  console.log("\nDisplay all contacts:");

  for (let contact of contacts) {
    displayContact(contact);
    // TODO: Display all contacts in a more structured way
  }
}

function displayContact(contact) {
  console.log(`${contact.firstName} ${contact.lastName}, ${contact.jobTitle}, ${contact.company.name}`);
}

function addNewContact(contact) {
  const newContact = {
    id: contacts[contacts.length - 1].id + 1 || 1,
    ...contact,
  };

  contacts.push(newContact);
}

function getContactById(id) {
  return contacts.find((contact) => contact.id === id);
}

// --------------------------------

const newContact = {
  firstName: "John",
  lastName: "Doe",
  company: {
    name: "New Company",
  },
  jobTitle: "Developer",
  email: "john.doe@example.com",
  phone: "+62 123-456-7890",
  createdAt: new Date(),
  websiteUrl: "https://johndoe.com",
  isFavorited: false,
};

addNewContact(newContact);

const contactId5 = getContactById(5);

displayContact(contactId5);

displayAllContacts();
