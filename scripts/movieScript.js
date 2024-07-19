//variables
const searchToggleBtn = document.querySelector(".nav-search");
const searchBox = document.querySelector(".search-container");
const searchDismissBtn = document.querySelector(".search-button-dismiss");
const filmGenreList = document.querySelector("[data-menu-film]");
// api calls
fetch("https://moviesapi.ir/api/v1/genres")
  .then((res) => res.json())
  .then((data) => {
    data.forEach((genreObj) => {
      filmGenreList.innerHTML += `<li><a href="#">${genreObj.name}</a></li>`;
    });
   
  })
// events
document.addEventListener("click", (e) => {
    let isDropdownBtn = e.target.matches("[data-dropdown-btn]");
    if (!isDropdownBtn && e.target.closest("[data-dropdown]") != null) return;
    let currentDropdown = e.target.closest("[data-dropdown]");
    if (isDropdownBtn) {
      currentDropdown.classList.toggle("active");
    }
  
    document.querySelectorAll("[data-dropdown]").forEach((dr) => {
      if (dr == currentDropdown) return;
  
      dr.classList.remove("active");
    });
    let isSearchBtn = e.target.matches("[data-search-btn]");
    if (
      (!isSearchBtn && e.target.closest("[data-search-box]") != null) ||
      e.target.closest("[data-search-form]") != null
    )
      return;
    if (!isSearchBtn) {
      let searchBoxIsActive = document
        .querySelector(".search-container")
        .classList.contains("active");
      if (searchBoxIsActive == true) {
        document.querySelector(".search-container").classList.remove("active");
      }
    }
  });
  searchToggleBtn.addEventListener("click", (e) => {
    e.preventDefault();
    searchBox.classList.toggle("active");
    document.querySelectorAll("[data-dropdown]").forEach((dr) => {
      dr.classList.remove("active");
    });
  });
  searchDismissBtn.addEventListener("click", () => {
    searchBox.classList.remove("active");
  });
  