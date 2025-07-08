async function getContacts() {
  // Fetch contacts from the API
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  // condition testing
  const users = await response.json();
  console.log(users);
}

getContacts();
