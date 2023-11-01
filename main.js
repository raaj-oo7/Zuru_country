const searchInput = document.getElementById("search");

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
            image.src = '/images/country.png';

            // Append the image to the country item
            countryItem.appendChild(image);

            const input = document.createElement("input");
            input.className = "countryName"
            input.type = "text";
            input.value = country;

            // Add event listener to handle input click and stop propagation
            input.addEventListener("click", (e) => {
                e.stopPropagation();
            });

            // Add event listener to handle input change
            input.addEventListener("change", (e) => {
                const newValue = e.target.value;
                const index = countries.indexOf(country);
                if (index !== -1) {
                    countries[index] = newValue;
                }
                renderCountries(searchInput.value);
            });

            // Append the input field to the country item
            countryItem.appendChild(input);

            // Add an event listener to highlight the country when clicked
            countryItem.addEventListener("click", () => {
                document.querySelectorAll(".country").forEach(c => c.classList.remove("active"));
                countryItem.classList.add("active");
            });

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
        const countryName = selectedCountry.querySelector(".countryName").value;
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