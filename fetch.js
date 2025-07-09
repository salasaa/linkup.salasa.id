async function getContacts() {
  // Fetch contacts from the API
  try {
    const response = await fetch(
      "https://my-json-server.typicode.com/salasaa/json-server-online/contacts",
      {
        method: "GET",
      }
    );
    // condition testing
    const users = await response.json();
    console.log(users);
  } catch (error) {
    console.error("Error fetching contacts:", error);
  }
}

getContacts();
