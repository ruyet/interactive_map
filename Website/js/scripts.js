// Consts for HTML elements and storing id's in variables
const mapContainer = document.getElementById("map-container");
const map = document.getElementById("map");
const svgMap = document.getElementById("svg-map");

// Setting initial values for map manipulation variables
let scale = 1;
let minScale = 1;
let isDragging = false;
let startX, startY, initialLeft, initialTop;

// ############  - - JS of Stefan - - ############

document.addEventListener("DOMContentLoaded", function () {
    const languageSwitcher = document.getElementById("language-switcher");
    const switchTo = document.getElementById("switch-to");
    const elementsToTranslate = document.querySelectorAll("[data-en]");

    function setLanguage(language) {
        elementsToTranslate.forEach(element => {
            element.textContent = element.getAttribute(`data-${language}`);
        });
        languageSwitcher.textContent = language.toUpperCase();
        switchTo.textContent = language === "en" ? "NL" : "EN";
    }

    languageSwitcher.addEventListener("click", function () {
        const currentLanguage = languageSwitcher.textContent.toLowerCase();
        const newLanguage = currentLanguage === "en" ? "nl" : "en";
        setLanguage(newLanguage);
    });

    switchTo.addEventListener("click", function () {
        const currentLanguage = languageSwitcher.textContent.toLowerCase();
        const newLanguage = currentLanguage === "en" ? "nl" : "en";
        setLanguage(newLanguage);
    });
});

// ############  - - JS of Stefan - - ############

// ############  - - JS of Ruyet - - ############
// Function to set the initial zoom level based on the container and SVG size
function initialZoom() {
    // Get the width and height of the map container
    const containerWidth = mapContainer.clientWidth;
    const containerHeight = mapContainer.clientHeight;
    // Get the natural w and h of the svg file
    const svgWidth = svgMap.naturalWidth;
    const svgHeight = svgMap.naturalHeight;
    // Setting the scale so that the SVG file fits within the container
    scale = Math.min(containerWidth / svgWidth, containerHeight / svgHeight);
    // Check if scale is 0 to avoid an invalid state and resets scale to 1 if it's 0
    if (scale === 0) {
        scale = 1;
    }
    // Min scale = calculated scale
    minScale = scale;
    // Scale the map and center it using transform
    map.style.transform = `translate(-50%, -50%) scale(${scale})`;
    map.style.left = "50%";
    map.style.top = "50%";
}
// Event Listeners for resizing and initial load
window.addEventListener("load", initialZoom);
window.addEventListener("resize", initialZoom);

// Zoom functionality using the mouse scroll wheel
mapContainer.addEventListener("wheel", (e) => {
    // Prevent default behavior
    e.preventDefault();
    // Determines the direction of the scroll and sets the zoom increment or decrement
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    // Calculates the new scale, confirm if its within allowed bounds
    const newScale = Math.min(Math.max(scale + delta, minScale), 3);
    // Update the global scale
    scale = newScale;
    // Apply the new scale on the map
    map.style.transform = `translate(-50%, -50%) scale(${newScale})`;
});

// Dragging functionality
map.addEventListener("mousedown", (e) => {
    // If mouse button is pressed, dragging becomes true
    isDragging = true;
    // Records the X and Y coordinates of the mouse at the start
    startX = e.clientX;
    startY = e.clientY;
    // Get the initial left and top position of the map
    initialLeft = map.offsetLeft;
    initialTop = map.offsetTop;
    // Change cursor to grabbing css
    map.style.cursor = "grabbing";
    // Prevents other default interactions like text selection
    e.preventDefault();
});
// Handling mouse movements while dragging
window.addEventListener("mousemove", (e) => {
    // Check if the map is currently being dragged
    if (isDragging) {
        // Calculates the change in the X and Y coordinates
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
        // Updates the left and top position of the map based on that
        map.style.left = `${initialLeft + dx}px`;
        map.style.top = `${initialTop + dy}px`;
    }
});
// Sets dragging to false when the mouse button is released
window.addEventListener("mouseup", () => {
    isDragging = false;
    map.style.cursor = "grab";
});
// ############  - - JS of Emir - - ############

// Select the large popup elements
const largePopup = document.getElementById("large-popup");
const largePopupContent = document.getElementById("large-popup-content");
const largePopupClose = document.getElementById("large-popup-close");

// Add event listener to close button to hide the large popup
largePopupClose.addEventListener("click", () => {
    largePopup.style.display = "none";
    largePopupClose.style.display = "none"; // Hide the close button
});

// Add event listener to window to hide the large popup when clicking outside of it
window.addEventListener("click", (e) => {
    if (largePopup.style.display === "block" && !largePopup.contains(e.target) && e.target !== largePopupClose) {
        largePopup.style.display = "none";
        largePopupClose.style.display = "none"; // Hide the close button
    }
});

// Add event listener to document to hide the large popup when pressing the escape key
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && largePopup.style.display === "block") {
        largePopup.style.display = "none";
        largePopupClose.style.display = "none"; // Hide the close button
    }
});

// ############  - - JS of Ruyet - - ############
// ZOOM IN/OUT FUNCTION

// Function or code inside of the function runs when DOM is fully loaded.     
document.addEventListener("DOMContentLoaded", function () {
    // Gets zoom in button by ID.
    const zoomInButton = document.getElementById("zoomIn-button");
    // Gets zoom out button by id.
    const zoomOutButton = document.getElementById("zoomOut-button");

    // Adds a click event listener to the zoom in button.
    zoomInButton.addEventListener("click", function () {
        // Increase scale by 0.1
        const newScale = Math.min(scale + 0.1, 3);
        // Update the global scale
        scale = newScale;
        // Apply the new scale on the map
        map.style.transform = `translate(-50%, -50%) scale(${newScale})`;
    });

    // Adds a click event listener to the zoom out button.
    zoomOutButton.addEventListener("click", function () {
        // Decrease scale by 0.1
        const newScale = Math.max(scale - 0.1, minScale);
        // Update the global scale
        scale = newScale;
        // Apply the new scale on the map
        map.style.transform = `translate(-50%, -50%) scale(${newScale})`;
    });
});