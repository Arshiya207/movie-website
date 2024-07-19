//html content
function movieAdditionalInfo(plot, actores, writers) {
  return `
       <div class="movie-additional-info-container">
              <div class="movie-plot">
                    <h3>plot</h3>
                    <p>${plot}</p>
              </div>
              <div class="movie-actores">
                <h3>actores</h3>
                <p>${actores}</p>
              </div>
              <div class="movie-writers">
                <h3>writers</h3>
                <p>${writers}</p>
              </div>
        </div> 
  `;
}
function movieInfo(img, poster, title, imdbScore, director, yearOfRelease) {
  return `
      <img
        src="${img}"
        alt="main page image"
        class="main-page-img"
      />
      <div class="movie-info-container">
        <div class="movie-info-wrapper">
          <div class="movie-info-poster">
            <img
              src="${poster}"
              alt="poster"
              class="movie-info-poster-img"
            />
          </div>
          <div class="movie-info">
            <h1 class="movie-info-title">${title}</h1>
            <p class="movie-info-imdb">IMDB ${imdbScore}/10</p>
            <p class="movie-info-director">${director}</p>
            <p class="movie-info-year">${yearOfRelease}</p>
            <button class="movie-info-watch-later tex-icon"><i class="bi bi-floppy"></i> add to your list</button>
          </div>
        </div>
      </div>
  `;
}
//variables
const searchToggleBtn = document.querySelector(".nav-search");
const searchBox = document.querySelector(".search-container");
const searchDismissBtn = document.querySelector(".search-button-dismiss");
const filmGenreList = document.querySelector("[data-menu-film]");
const mainEle = document.querySelector(".main");
const pageHeaderEle = document.querySelector(".page-header");
const loadingContainer = document.querySelectorAll(".loader-container");
// api calls
fetch("https://moviesapi.ir/api/v1/genres")
  .then((res) => res.json())
  .then((data) => {
    data.forEach((genreObj) => {
      filmGenreList.innerHTML += `<li><a href="#">${genreObj.name}</a></li>`;
    });
  });
async function getMovieDetails(movieId) {
  const url = `https://moviesapi.ir/api/v1/movies/${movieId}`;
  const res = await fetch(url);
  const data = await res.json();
  const img =
    "images" in data ? data.images[0] : `images/coffee-beans-7126154.jpg`;
  loadingContainer[0].classList.add("loader--hidden");
  loadingContainer[1].classList.add("loader--hidden");
  loadingContainer[0].addEventListener("transitionend", (e) => {
    if (e.propertyName == "opacity") {
      loadingContainer[0].remove();
      pageHeaderEle.classList.remove("loading");
      pageHeaderEle.innerHTML += movieInfo(
        img,
        data.poster,
        data.title,
        data.imdb_rating,
        data.director,
        data.released
      );
    }
  });

  loadingContainer[1].addEventListener("transitionend", (e) => {
    if (e.propertyName == "opacity") {
      loadingContainer[1].remove();
      mainEle.innerHTML += movieAdditionalInfo(
        data.plot,
        data.actors,
        data.writer
      );
    }
  });
}
// event for page load

window.addEventListener("load", () => {
  const href = window.location.href;
  const URLSearch = new URL(href).searchParams;
  const searchParams = new URLSearchParams(URLSearch).entries();
  const searchParamsArray = Array.from(searchParams);
  getMovieDetails(searchParamsArray[0][1]);
});
//code block for dropdowns and search box
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
//code block for dropdowns and search box
