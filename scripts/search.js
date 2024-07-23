// html content
function loaderComponent() {
  return `<div class="loader-container">
            <div class="loader"></div>
        </div>`;
}
function notFound(){
    return `
          <div class="result-not-found">
            
        </div>
    `
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
                      <span>${genres[0]}${genres[1] ?`-${genres[1]}`:""}</span>
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
//variables
const movieShelf = document.querySelector(".movie-shelf");
const resultTextEle = document.querySelector(".search-result-text");
// api call
async function searchCall(searchString, page = 1) {
  const searchParams = new URLSearchParams({ search: searchString });
  const encodedString = encodeURIComponent(searchParams.get("search"));
  const searchURL = `https://moviesapi.ir/api/v1/movies?q=${encodedString}&page=${page}`;
  resultTextEle.textContent = "searching...";
  movieShelf.innerHTML += loaderComponent();
  const res = await fetch(searchURL);
  const data = await res.json();
  const movieList = data.data;
  const loaderContainer = document.querySelector(".loader-container");
  loaderContainer.remove();
  if(movieList.length!=0){
    movieShelf.classList.remove("movie-shelf-not-found")
    resultTextEle.textContent="movie:"
    movieShelf.innerHTML += cardTypeTwo(
        movieList[0].poster,
        movieList[0].genres,
        movieList[0].year,
        movieList[0].country,
        movieList[0].title,
        movieList[0].id
      );
  }else{
    resultTextEle.textContent="movie not found"
    movieShelf.classList.add("movie-shelf-not-found")
    movieShelf.innerHTML+=notFound()
  }

  
 


}

// window load event
window.addEventListener("load", () => {
  const href = window.location.href;
  const url = new URL(href);
  const usp = new URLSearchParams(url.searchParams);
  const userSearchedValue = usp.get("search");
  searchCall(userSearchedValue);
});
