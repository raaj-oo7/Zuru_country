const searchInput = document.getElementById("search");
const itemList = document.getElementById("item-list");

const countries = ["USA", "Italy", "Japan", "China", "India"];
const maxBlocks = 48; 

// Function to render the country list
function renderCountries(filter = "") {
    const countryList = document.querySelector(".app");
    countryList.innerHTML = ""; 

    const filteredCountries = countries.filter(country => country.toLowerCase().includes(filter.toLowerCase()));

    for (let i = 0; i < maxBlocks; i++) {
        if (i < filteredCountries.length) {
            const country = filteredCountries[i];

            const countryItem = document.createElement("li");
            countryItem.className = "country";

            const image = document.createElement("img");
            image.src = '/image/country.png';

            // Append the image to the country item
            countryItem.appendChild(image);

            // Add event listener to edit country name using input
            countryItem.addEventListener("click", () => {
                const allCountries = document.querySelectorAll(".country");
                allCountries.forEach(item => item.classList.remove("active"));

                countryItem.classList.add("active");
            });

            const countryText = document.createTextNode(country);
            countryItem.appendChild(countryText);

            // Append the country item to the country list
            countryList.appendChild(countryItem);
        } else {
            // Add empty blocks 
            const emptyBlock = document.createElement("li");
            emptyBlock.className = "country empty";
            countryList.appendChild(emptyBlock);
        }
    }
}

// Initial rendering
renderCountries();

// Add a new country
const newButton = document.getElementById("new-button");
newButton.addEventListener("click", () => {
    if (countries.length < maxBlocks) {
        countries.push("New_Country");
        renderCountries(searchInput.value);
    }
    console.log(countries)
});

// Delete a country
const deleteButton = document.getElementById("delete-button");
deleteButton.addEventListener("click", () => {
    const selectedCountry = document.querySelector(".country.active");
    if (selectedCountry) {
        const countryName = selectedCountry.textContent;
        const index = countries.indexOf(countryName);
        if (index !== -1) {
            countries.splice(index, 1);
            renderCountries(searchInput.value);
        }
    }
});

// Add a click event listener to highlight the selected country
document.querySelectorAll(".country").forEach(country => {
    country.addEventListener("click", () => {
        document.querySelectorAll(".country").forEach(c => c.classList.remove("active"));
        country.classList.add("active");
    });
});

// Highlight the first country
function highlightFirstElement() {
    const firstCountry = document.querySelector(".country");
    if (firstCountry) {
        firstCountry.classList.add("highlighted");
    }
}

highlightFirstElement();

// Add an input event listener to the search box
searchInput.addEventListener("input", () => {
    renderCountries(searchInput.value);
});

