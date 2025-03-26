document.addEventListener("DOMContentLoaded", function () {
    const bundles = document.querySelectorAll("input[name='bundle']");
    const totalPrice = document.getElementById("total");
    const addToCartBtn = document.querySelector(".add-to-cart");

    addToCartBtn.disabled = true; // Initially disable the Add to Cart button

    let selectedBundleDetails = {}; // Object to store bundle details

    bundles.forEach(bundle => {
        bundle.addEventListener("change", function () {
            const pairs = parseInt(this.getAttribute("data-pairs"));
            totalPrice.textContent = "DKK " + this.value + ".00";

            selectedBundleDetails = {
                price: this.value,
                pairs: pairs,
                selections: []
            };

            // Hide all dropdowns first
            document.querySelectorAll(".dropdowns").forEach(drop => {
                drop.innerHTML = "";
                drop.style.display = "none";
            });

            // Show and add dropdowns to the selected bundle
            const dropdownContainer = document.getElementById("dropdowns" + pairs);
            dropdownContainer.style.display = "block";

            // Add header row
            const headerRow = document.createElement("div");
            headerRow.classList.add("dropdown-header");
            headerRow.innerHTML = `
                <span>#</span>
                <span>Size</span>
                <span>Colour</span>
            `;
            dropdownContainer.appendChild(headerRow);

            for (let i = 1; i <= pairs; i++) {
                const dropdownPair = document.createElement("div");
                dropdownPair.classList.add("dropdown-pair");
                dropdownPair.innerHTML = `
                    <span>#${i}</span>
                    <select class="size-dropdown">
                        <option value="">Size</option>
                        <option value="S">S</option><option value="M">M</option>
                        <option value="L">L</option><option value="XL">XL</option>
                    </select>
                    <select class="color-dropdown">
                        <option value="">Colour</option>
                        <option value="Red">Red</option><option value="Blue">Blue</option>
                        <option value="Green">Green</option><option value="Black">Black</option>
                    </select>
                `;
                dropdownContainer.appendChild(dropdownPair);
            }

            // Add event listeners to dropdowns to validate selection
            dropdownContainer.querySelectorAll("select").forEach(select => {
                select.addEventListener("change", validateSelection);
            });

            validateSelection(); // Check if selection is valid on change
        });
    });

    function validateSelection() {
        const selectedBundle = document.querySelector("input[name='bundle']:checked");
        if (!selectedBundle) {
            addToCartBtn.disabled = true;
            return;
        }

        const pairs = parseInt(selectedBundle.getAttribute("data-pairs"));
        const dropdownContainer = document.getElementById("dropdowns" + pairs);
        const dropdowns = dropdownContainer.querySelectorAll("select");

        let allFilled = true;
        let selections = [];

        dropdownContainer.querySelectorAll(".dropdown-pair").forEach((pair, index) => {
            const size = pair.querySelector(".size-dropdown").value;
            const color = pair.querySelector(".color-dropdown").value;

            if (size === "" || color === "") {
                allFilled = false;
            } else {
                selections.push({ pair: index + 1, size, color });
            }
        });

        addToCartBtn.disabled = !allFilled;

        if (allFilled) {
            selectedBundleDetails.selections = selections;
            console.clear();
            console.log("Selected Bundle:", selectedBundleDetails);
        }
    }

    // Save the bundle details on click
    addToCartBtn.addEventListener("click", function () {
        if (!addToCartBtn.disabled) {
            localStorage.setItem("selectedBundle", JSON.stringify(selectedBundleDetails));
            console.log("Bundle saved:", selectedBundleDetails);
            alert("Bundle added to cart!");
        }
    });
});













