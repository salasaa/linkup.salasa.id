async function getContacts() {
  // Fetch contacts from the API
  try {
    const response = await fetch(
      "https://my-json-server.typicode.com/salasaa/json-server-online/posts",
      {
        method: "GET",
      }
    );
    // condition testing
    const posts = await response.json();
    console.log(posts);
  } catch (error) {
    console.error("Error fetching contacts:", error);
  }
}

getContacts();
