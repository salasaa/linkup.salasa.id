// Get references to DOM elements
// const createContactBtn = document.getElementById("createContactBtn");
const contactListView = document.getElementById("contactListView");
const createContactView = document.getElementById("createContactView");
const cancelCreateBtn = document.getElementById("cancelCreateBtn");
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
// createContactForm.addEventListener("submit", (event) => {
//   event.preventDefault(); // Prevent page refresh
//   // Here you can add logic to save contact data
//   const formData = new FormData(createContactForm);
//   const newContact = {};
//   for (let [key, value] of formData.entries()) {
//     newContact[key] = value;
//   }
//   console.log("New Contact Data:", newContact);

// After saving, return to the contact list view
// createContactView.classList.add("hidden");
// contactListView.classList.remove("hidden");
// createContactForm.reset(); // Reset form after submission
// Using alert temporarily, replace with custom modal
// IMPORTANT: Do NOT use alert() or confirm() in production code for Canvas.
// Use a custom modal UI instead.
// alert("Contact saved successfully!");
// });

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
});

console.log("New Contact Data:", newContact);
saveContacts(newContact);
alert("Contact saved successfully!"); // Replace with a better modal UI
window.location.href = "/"; // Redirect to the main page
renderContacts();

// --- logic for save new contact ---
// Saving contact data to localStorage
// let contacts = JSON.parse(localStorage.getItem("contacts")) || [];
// contacts.push(newContact);
// localStorage.setItem("contacts", JSON.stringify(contacts));
// --- End Logic ---

// Redirect back to the main page after saving
//   alert("Contact saved successfully!"); // Replace with a better modal UI
//   window.location.href = "/"; // Redirect to the main page
// });

/**
 * Toggles the favorite status of a contact by changing the star icon.
//  * @param {HTMLElement} starElement
 */
// function toggleFavorite(starElement) {
//   if (starElement.classList.contains("fas")) {
//     // If currently filled star, change to outline
//     starElement.classList.remove("fas", "text-yellow-500");
//     starElement.classList.add("far");
//   } else {
//     // If currently outline star, change to filled and yellow
//     starElement.classList.remove("far");
//     starElement.classList.add("fas", "text-yellow-500");
//   }
//   // In a real application, you would also update the contact's favorite status in your data here.
//   console.log(
//     "Star clicked! Current state:",
//     starElement.classList.contains("fas") ? "Favorite" : "Not Favorite"
//   );
// }
