const contactContainerElement = document.getElementById("contact-container");

function getCurrentContactId() {
  const queryString = window.location.search;
  const params = new URLSearchParams(queryString);
  const id = Number(params.get("id"));

  return id;
}

function renderContactById() {
  const id = getCurrentContactId();
  const contact = loadContactById(id);
  const fullName = `${contact.firstName} ${contact.lastName}`.trim();

  if (!contact) {
    contactContainerElement.innerHTML = "<p>Contact not found</p>";
    return;
  }

  contactContainerElement.innerHTML = `
    <div class="flex flex-1 gap-4">
      <div>
        <h2 class="block text-md font-medium text-gray-700 ">: ${fullName}</h2>
        <p class="block text-md font-medium text-gray-700"> : ${contact.email}</p>
        <p class="block text-md font-medium text-gray-700"> : ${contact.phoneNumber}</p>
        <p class="block text-md font-medium text-gray-700"> : ${contact.company.jobTitle}</p>
        <p class="block text-md font-medium text-gray-700"> : ${contact.company.name}</p>
      </div>
      <div class="flex flex-col justify-between items-end ml-auto gap-4"> 
        <p class="block text-md font-medium text-gray-400">created at : ${contact.createdAt}</p> 
        <div class="flex gap-2"> 
          <button class="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors duration-200 flex items-center justify-center" onClick="renderEditContactFormById(${contact.id})">Edit</button>
          <button class="px-4 py-2 bg-red-200 text-red-800 rounded-md hover:bg-red-300 transition-colors duration-200 flex items-center justify-center" onClick="deleteContactById(${contact.id})">Delete</button>
        </div>
      </div>
    </div>
    `;
}

function renderEditContactFormById(id) {
  const contact = loadContactById(id);

  contactContainerElement.innerHTML = `
    <form id="edit-contact-form" method="post">
      <div>
        <label for="first-name" class="block text-sm font-medium text-gray-700 mb-1">First Name :</label>
        <input
          id="first-name"
          name="firstName"
          type="text"
          placeholder="Enter first name"
          value="${contact.firstName}"
        ></input>
      </div>
      <div>
        <label for="last-name">Last Name :</label>
        <input
          id="last-name"
          name="lastName"
          type="text"
          placeholder="Enter last name"
          value="${contact.lastName}"
        ></input>
      </div>
      <div>
        <label for="email">Email :</label>
        <input
          id="email"
          name="email"
          type="text"
          placeholder="Enter email"
          value="${contact.email}"
        ></input>
      </div>
      <div>
        <label for="phone-number">Phone Number :</label>
        <input
          id="phone-number"
          name="phoneNumber"
          type="text"
          placeholder="Enter phone number"
          value="${contact.phoneNumber}"
        ></input>
      </div>
      <div>
        <label for="job-title">Job Title :</label>
        <input
          id="job-title"
          name="jobTitle"
          type="text"
          placeholder="Enter job title"
          value="${contact.company.jobTitle}"
        ></input>
      </div>
      <div>
        <label for="company-name">Company Name :</label>
        <input
          id="company-name"
          name="companyName"
          type="text"
          placeholder="Enter company name"
          value="${contact.company.name}"
        ></input>
      </div>
      <button type="submit">Save</button>
    </form>`;

  const editContactFormElement = document.getElementById("edit-contact-form");
  editContactFormElement.addEventListener("submit", function (event) {
    event.preventDefault();
    const contactFormData = new FormData(event.target);
    const contacts = loadContacts();

    const updatedContact = {
      ...contact,
      firstName: contactFormData.get("firstName") || "",
      lastName: contactFormData.get("lastName") || "",
      email: contactFormData.get("email") || "",
      phoneNumber: contactFormData.get("phoneNumber") || "",
      company: {
        name: contactFormData.get("companyName") || "",
        jobTitle: contactFormData.get("jobTitle") || "",
      },
      // Keep websiteUrl and isFavorited if available
      websiteUrl: contact.websiteUrl || "",
      isFavorited: contact.isFavorited || false,
      updatedAt: new Date(),
    };

    const updatedContacts = contacts.map((c) =>
      c.id === contact.id ? updatedContact : c
    );

    saveContacts(updatedContacts);
    renderContactById();
  });
}

function deleteContactById(id) {
  const contacts = loadContacts();

  const updatedContacts = contacts.filter(
    (contact) => contact.id !== Number(id)
  );
  saveContacts(updatedContacts);
  window.location.replace("/");
}
renderContactById();
window.addEventListener("load", renderContactById);
