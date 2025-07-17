document.addEventListener("DOMContentLoaded", () => {
  const searchForm = document.getElementById("search-form");
  if (searchForm) {
    searchForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const searchInput = document.getElementById("search-input");
      const query = searchInput.value;

      // Redirect to the index page with the search query
      window.location.href = `/?q=${encodeURIComponent(query)}`;
      // Pastikan Anda menggunakan domain dan port yang benar
    });

    // Optional: Populate search input with current query
    const urlParams = new URLSearchParams(window.location.search);
    const currentQuery = urlParams.get("q");
    const searchInput = document.getElementById("search-input");
    if (currentQuery && searchInput) {
      searchInput.value = currentQuery;
    }
  }

  // Panggil renderContacts() HANYA jika ini adalah halaman indeks,
  // atau jika Anda ingin halaman contact juga menampilkan daftar hasil.
  // Jika hanya halaman indeks yang menampilkan daftar:
  if (
    window.location.pathname === "/" ||
    window.location.pathname === "/index.html"
  ) {
    if (typeof renderContacts === "function") {
      renderContacts();
    }
  }
});
