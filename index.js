const contacts = [
  {
    id: 1,
    firstName: "Salasa",
    lastName: "id",
    companyName: "Tech Solutions",
    jobTitle: "Software Engineer",
    email: "salasa@example.com",
    phone: "+62 123-456-7890",
    createdAt: new Date(),
    website: "https://salasa.id",
    isFavorited: true,
  },
  {
    id: 2,
    firstName: "Pramudia",
    lastName: "Adi",
    companyName: "Business Corp",
    jobTitle: "Project Manager",
    email: "pramudia@example.com",
    phone: "+62 987-654-3210",
    createdAt: new Date("06-26-2025"),
    website: "https://pramudia.com",
    isFavorited: true,
  },
  {
    id: 3,
    firstName: "Aysha",
    lastName: "Shifa",
    companyName: "Creative Agency",
    jobTitle: "UX Designer",
    email: "aysha@example.com",
    phone: "+62 555-123-4567",
    website: "https://ayshashifa.com",
    createdAt: new Date().toLocaleString(),
    isFavorited: false,
  },
  {
    id: 4,
    firstName: "Daniyal",
    lastName: "Said",
    companyName: "Tesla",
    jobTitle: "Content Strategist",
    email: "daniyal@example.com",
    phone: "+62 555-987-6543",
    website: "https://daniyalsaid.com",
    createdAt: new Date().toLocaleDateString(),
    isFavorited: true,
  },
];

console.log(contacts);

/* Get all contacts */
function getAllContacts() {
  for (let contact of contacts) {
    console.log(
      contact.firstName,
      contact.lastName,
      contact.phone,
      contact.createdAt
    );
  }
}

getAllContacts();

/* Get contact by job title */
// function getContact() {
//   const jobTitle = contacts[2];
//   return jobTitle;
// }
// const contact = getContact();
// console.log(contact);

// let addContact = [
//   {
//     id: 5,
//     firstName: "John",
//     lastName: "Doe",
//     companyName: "New Company",
//     jobTitle: "Developer",
//     email: "john.doe@example.com",
//     phone: "+62 123-456-7890",
//     createdAt: new Date("06-26-2025"),
//     website: "https://johndoe.com",
//     isFavorited: false,
//   },
// ];
// function addNewContact(newContact) {
//   contacts.push(newContact);
// }
// addNewContact(addContact[0]);
// console.log(contacts);
