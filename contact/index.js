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
  // const fullName = `${contact.firstName} ${contact.lastName}`.trim();

  if (!contact) {
    contactContainerElement.innerHTML = "<p>Contact not found</p>";
    return;
  }

  contactContainerElement.innerHTML = `
    <div class="flex">
      <div class="w-full">
        <p class="block text-md font-medium text-gray-700 ">: ${
          contact.firstName
        }</p>
        <p class="block text-md font-medium text-gray-700 ">: ${
          contact.lastName
        }</p>
        <p class="block text-md font-medium text-gray-700"> : ${
          contact.email
        }</p>
        <p class="block text-md font-medium text-gray-700"> : ${
          contact.phoneNumber
        }</p>
        <p class="block text-md font-medium text-gray-700"> : ${
          contact.company.jobTitle
        }</p>
        <p class="block text-md font-medium text-gray-700"> : ${
          contact.company.name
        }</p>
        <p class="block text-md font-medium text-gray-700"> : ${
          contact.websiteUrl
        }</p>
      </div>
      <div class="flex flex-col justify-between items-end ml-auto gap-4"> 
        <p class=" text-sm font-medium text-gray-400">created at : ${
          contact.createdAt
        }</p>
        <p class=" text-sm font-medium text-gray-400">updated at : ${
          contact.updatedAt || ""
        }</p> 
        <div class="flex gap-2"> 
          <button class="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors duration-200 flex items-center justify-center" onClick="renderEditContactFormById(${
            contact.id
          })">Edit</button>
          <button class="px-4 py-2 bg-red-200 text-red-800 rounded-md hover:bg-red-300 transition-colors duration-200 flex items-center justify-center" onClick="deleteContactById(${
            contact.id
          })">Delete</button>
        </div>
      </div>
    </div>
    `;
}

function renderEditContactFormById(id) {
  const contact = loadContactById(id);

  contactContainerElement.innerHTML = `
    <form method="post" id="edit-contact-form" class="w-full grid space-y-5">
      <div>
        <label
          for="firstName"
          class="block text-sm font-medium text-gray-700 mb-1"
          ></label
        >
        <input
          type="text"
          id="firstName"
          name="firstName"
          value="${contact.firstName}"
          class="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter first name"
          required
        />
      </div>
      <div>
        <label
          for="lastName"
          class="block text-sm font-medium text-gray-700 mb-1"
          ></label
        >
        <input
          type="text"
          id="lastName"
          name="lastName"
          value="${contact.lastName}"
          class="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter last name"
          required
        />
      </div>
      <div>
        <label
          for="email"
          class="block text-sm font-medium text-gray-700 mb-1"
          ></label
        >
        <input
          type="email"
          id="email"
          name="email"
          value="${contact.email}"
          class="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter email address"
        />
      </div>
      <div>
        <label
          for="phoneNumber"
          class="block text-sm font-medium text-gray-700 mb-1"
          ></label
        >
        <input
          type="tel"
          id="phoneNumber"
          name="phoneNumber"
          value="${contact.phoneNumber}"
          class="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter phone number"
        />
      </div>
      <div>
        <label
          for="jobTitle"
          class="block text-sm font-medium text-gray-700 mb-1"
          ></label
        >
        <input
          type="text"
          id="jobTitle"
          name="jobTitle"
          value="${contact.company.jobTitle}"
          class="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter job title"
        />
      </div>
      <div>
        <label
          for="companyName"
          class="block text-sm font-medium text-gray-700 mb-1"
          ></label
        >
        <input
          type="text"
          id="companyName"
          name="companyName"
          value="${contact.company.name}"
          class="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter company name"
        />
      </div>
      <div>
        <label
          for="websiteUrl"
          class="block text-sm font-medium text-gray-700 mb-1"
          ></label
        >
        <input
          type="text"
          id="websiteUrl"
          name="websiteUrl"
          value="${contact.websiteUrl}"
          class="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter website Url"
        />
      </div>
      <div class="flex justify-end space-x-3 mt-6">
        <a
          href="/"
          class="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors duration-200 flex items-center justify-center"
        >
          Cancel
        </a>
        <button
          type="submit"
          class="px-4 py-2 bg-green-400 text-white rounded-md hover:bg-green-500 transition-colors duration-200"
        >
          Save
        </button>
      </div>
    </form>
    `;

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
      websiteUrl: contactFormData.get("websiteUrl") || "",
      isFavorited: contactFormData.get("isFavorited") || false,
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
