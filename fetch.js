async function getContacts() {
  // Fetch contacts from the API
  const response = await fetch(
    "https://my-json-server.typicode.com/salasaa/json-server-online"
  );
  // condition testing
  const users = await response.json();
  console.log(users);
}

getContacts();
