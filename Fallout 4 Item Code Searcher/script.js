const listContainer = document.getElementById("item-list");
const searchInput = document.getElementById("search");

let items = []; // Will be filled from local JSON file

// Load data
fetch("items.json")
  .then(res => res.json())
  .then(data => {
    items = data;
    renderList(items);
  });

function renderList(data) {
  listContainer.innerHTML = "";
  data.forEach((item, index) => {
    const row = document.createElement("div");
    row.classList.add("item-row");
    row.dataset.index = index;
    row.innerHTML = `
      <div class="col">${item.name}</div>
      <div class="col code">${item.code}</div>
    `;
    listContainer.appendChild(row);
  });
}

function scrollToMatch(query) {
  const rows = document.querySelectorAll(".item-row");
  let found = false;

  rows.forEach(row => row.classList.remove("highlight"));

  for (let i = 0; i < items.length; i++) {
    const name = items[i].name.toLowerCase();
    const code = items[i].code.toLowerCase();
    if (name.includes(query) || code.includes(query)) {
      const match = document.querySelector(`.item-row[data-index='${i}']`);
      if (match) {
        match.classList.add("highlight");
        match.scrollIntoView({ behavior: "smooth", block: "center" });
        found = true;
      }
      break;
    }
  }
}

searchInput.addEventListener("input", (e) => {
  const query = e.target.value.trim().toLowerCase();
  if (query.length === 0) {
    renderList(items);
    return;
  }
  scrollToMatch(query);
});