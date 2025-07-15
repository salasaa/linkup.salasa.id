// // Get references to DOM elements
const createFormElement = document.getElementById("createContactForm");

// Event listener for "Create Contact" form submission
createFormElement.addEventListener("submit", async (event) => {
  event.preventDefault(); // prevent page refresh

  const formData = new FormData(createFormElement);
  // // Convert FormData to object using Object.fromEntries and map to desired structure
  // const formDataInput = Object.fromEntries(formData.entries());

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

  alert("Contact saved successfully!"); // Replace with a better modal UI
  // window.location.href = "/"; // Redirect to the main page
});
