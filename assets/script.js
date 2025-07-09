// Get references to DOM elements
const createContactBtn = document.getElementById("createContactBtn");
const createContactView = document.getElementById("createContactView");
const cancelCreateBtn = document.getElementById("cancelCreateBtn");
const createContactForm = document.getElementById("createContactForm");

// Event listener for "Create contact" button
createContactBtn.addEventListener("click", () => {
  contactListElement.classList.add("hidden"); // Hide contact list view
  createContactView.classList.remove("hidden"); // Show form view
});

// Event listener for "Cancel" button on "Create Contact" form
cancelCreateBtn.addEventListener("click", () => {
  createContactView.classList.add("hidden"); // Hide form view
  contactListElement.classList.remove("hidden"); // Show contact list view again
  createContactForm.reset(); // Reset the form
});

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
  contactListElement.classList.remove("hidden");
  createContactForm.reset(); // Reset form after submission
  // Using alert temporarily, replace with custom modal
  // IMPORTANT: Do NOT use alert() or confirm() in production code for Canvas.
  // Use a custom modal UI instead.
  alert("Contact saved successfully!");
});

// Get references to DOM elements
const createContactForm = document.getElementById("createContactForm");

// Event listener for "Create Contact" form submission
createContactForm.addEventListener("submit", (event) => {
  event.preventDefault(); // Mencegah refresh halaman

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
  window.location.href = "index.html"; // Redirect to the main page
});
