// Get references to DOM elements
const createFormElement = document.getElementById("createContactForm");

// Event listener for "Create Contact" form submission
createFormElement.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(createFormElement);

  // Example: split fullname if needed, or just use as is
  const newContact = {
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

  // TODO: Add contact to localStorage

  alert("Contact saved successfully!");
  // window.location.href = "/";
});
