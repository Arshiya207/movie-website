// html content
function loaderComponent() {
  return `<div class="loader-container">
          <div class="loader"></div>
      </div>`;
}
function cardTypeTwo(poster, genres, year, country, title, id) {
  return `
    
        <div class="card-type-two">
            <div class="type-two-poster-container">
                <a href="movie.html?q=${id}" class="poster">
                    <img
                    src="${poster}"
                    alt="poster"
                    class="type-two-img"
                    />
                    <div class="type-two-info-overlay">
                    <span>${genres[0]}-${genres[1] ? genres[1] : ""}</span>
                    <span>${year}-${country}</span>
                    </div>
                </a>
            </div>
            <div class="type-two-title">
            <h3>${title}</h3>
            </div>
        </div>
    `;
}
//functions
function removeLoader(element) {
  const loaderContainer = element;

  loaderContainer.remove();
}
//variables
const searchToggleBtn = document.querySelector(".nav-search");
const searchBox = document.querySelector(".search-container");
const searchDismissBtn = document.querySelector(".search-button-dismiss");
const filmGenreList = document.querySelector("[data-menu-film]");
const mainTag = document.querySelector(".main");
// api calls

fetch("https://moviesapi.ir/api/v1/genres")
  .then((res) => res.json())
  .then((data) => {
    data.forEach((genreObj) => {
      filmGenreList.innerHTML += `<li><a href="#">${genreObj.name}</a></li>`;
    });
  });

async function genreMovies(genreIndex) {
  const genresApi = "https://moviesapi.ir/api/v1/genres";
  mainTag.innerHTML += loaderComponent();
  let genreCatRes = await fetch(genresApi);
  let genreCatDataArr = await genreCatRes.json();

  mainTag.innerHTML += `
      <div class="card-section">
      <h2 class="card-section-title">${genreCatDataArr[genreIndex].name}</h2>
        <div class="cards-container">
        </div>
      </div>`;
  const loaderEle = document.querySelector(".loader-container");
  const cardsContainers = document.querySelectorAll(".cards-container");
  removeLoader(loaderEle);
  let genreRes = await fetch(
    `https://moviesapi.ir/api/v1/genres/${genreIndex + 1}/movies?page=1`
  );
  let genreData = await genreRes.json();
  let moviesArray = genreData.data;

  let numberOfIteration = moviesArray.length >= 7 ? 7 : moviesArray.length;
  let containerPos = genreIndex;

  for (let i = 0; i < numberOfIteration; i++) {
    cardsContainers[containerPos].innerHTML += cardTypeTwo(
      moviesArray[i].poster,
      moviesArray[i].genres,
      moviesArray[i].year,
      moviesArray[i].country,
      moviesArray[i].title,
      moviesArray[i].id
    );
  }
}

async function generateCategory(end, start = 0) {
  for (let i = start; i < end; i++) {
    await genreMovies(i);
  }
}

generateCategory(3);

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
