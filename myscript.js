const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result");
const searchMoreBtn = document.getElementById("search-more-btn");
const accesskey = "_WeS00Gwq7UA_yL2lJK4xCmg9-14F84mleDmPJDpleI";
let keyword = "";
let page = 1;

async function searchImages() {
    keyword = searchBox.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accesskey}&per_page=12`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        // If it's the first page, clear the searchResult
        if (page === 1) {
            searchResult.innerHTML = "";
        }

        const results = data.results;

        results.map((result) => {
            const image = document.createElement("img");
            image.src = result.urls.small;

            const imageLink = document.createElement("a");
            imageLink.href = result.links.html;
            imageLink.target = "_blank";
            imageLink.appendChild(image);

            searchResult.appendChild(imageLink);
        });

        searchMoreBtn.style.display = "block";
    } catch (error) {
        console.error("Error fetching images:", error);
    }
}

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    page = 1;
    searchImages();
});

searchMoreBtn.addEventListener("click", () => {
    page++;
    searchImages();
});
