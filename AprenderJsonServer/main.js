const url = 'https://api.themoviedb.org/3/discover/movie'
const token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNmQyYWY3NGM4NDlmMmQxMjMwYTZmYTg2MzcwMzgyZiIsIm5iZiI6MTcwNDk4Nzg4NC4xOTI5OTk4LCJzdWIiOiI2NWEwMGNlY2YwNjQ3YzAxMmJhNDU3MDUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.c8VeTnSBbCkhF-z1VeRMWcAbOXzQTvJCbl3-4cDziCk'
const containersMovies = document.getElementById("contendorMovies")
let movies;
const imageUrl = 'https://image.tmdb.org/t/p/original'
let currentPage = 1;
let totalPages = 1;
const PER_PAGE = 12;

const headers = {
    "authorization": `bearer ${token}`
}

fetch(url, { headers: headers})
.then(resp => resp.json())
.then(data =>console.log(data))

async function getAllMovies(page = 1) {
    const response = await fetch(`${url}?page=${page}`, { headers})

    if (!response.ok) {
        throw new Error("Error al consultar las peliculas")
    }

    const data = await response.json();

    totalPages = data.total_pages
    return data.results.slice(0, PER_PAGE);
}
function renderMovies(movies) {
    containersMovies.innerHTML = "";

    movies.forEach(element =>{
  
        containersMovies.innerHTML +=`
        <div class="p-4 bg-white border border-gray-200 hover:-translate-y-1 transition duration-300 rounded-lg shadow shadow-black/10 max-w-80">
    <img class="rounded-md max-h-40 w-full object-cover" src="${imageUrl}${element.poster_path}">
    <p class="text-gray-900 text-xl font-semibold ml-2 mt-4">
        ${element.title}
    </p>
    <p class="text-zinc-400 text-sm/6 mt-2 ml-2 mb-2">
       ${element.overview}.overview}
    <button type="button" class="bg-indigo-600 hover:bg-indigo-700 transition cursor-pointer mt-4 mb-3 ml-2 px-6 py-2 font-medium rounded-md text-white text-sm">
        Learn More
    </button>
  </div>`


    });
}

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const pageInfo = document.getElementById("pageInfo");

prevBtn.addEventListener("click", () => {
    if (currentPage > 1) loadPage(currentPage - 1);
});

nextBtn.addEventListener("click", () => {
    if (currentPage < totalPages) loadPage(currentPage +1);
});

async function loadPage(page) {
    currentPage = page;
    const movies = await getAllMovies(currentPage);
    renderMovies(movies)
    updatePaginationUI();
}

function updatePaginationUI() {
    pageInfo.textContent = `Pagina ${currentPage} de ${totalPages}`;
    prevBtn.disabled = currentPage <= 1;
    nextBtn.disabled = currentPage >= totalPages;
}

loadPage(1);