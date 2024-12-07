/* Slideshow */
// For Phones slide
let currentSlideIndex1 = 0;
const slide1 = document.querySelector('.slide');
const totalCards1 = document.querySelectorAll('.slide .image-card').length;
const visibleCards = 5;
const cardWidth = 170;

// For Laptops slide
let currentSlideIndex2 = 0;
const slide2 = document.querySelector('.slide2');
const totalCards2 = document.querySelectorAll('.slide2 .image-card2').length;

// Function to move the slide (Reusable for Phones and Laptops)
function moveSlide(slide, currentIndex, totalCards, direction) {
currentIndex += direction;

if (currentIndex < 0) {
currentIndex = totalCards - visibleCards; // Wrap around to the end
} else if (currentIndex > totalCards - visibleCards) {
currentIndex = 0; // Wrap around to the beginning
}

const offset = -currentIndex * cardWidth;
slide.style.transform = `translateX(${offset}px)`;
return currentIndex; // Return the updated index
}

// Event listeners for Phones section
document.querySelector('.prev1').addEventListener('click', () => {
currentSlideIndex1 = moveSlide(slide1, currentSlideIndex1, totalCards1, -1);
});

document.querySelector('.next1').addEventListener('click', () => {
currentSlideIndex1 = moveSlide(slide1, currentSlideIndex1, totalCards1, 1);
});

// Event listeners for Laptops section
document.querySelector('.prev2').addEventListener('click', () => {
currentSlideIndex2 = moveSlide(slide2, currentSlideIndex2, totalCards2, -1);
});

document.querySelector('.next2').addEventListener('click', () => {
currentSlideIndex2 = moveSlide(slide2, currentSlideIndex2, totalCards2, 1);
});

// Back to Top Button
const backToTopButton = document.getElementById('backToTop');

// Show button when user scrolls down
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        backToTopButton.style.display = 'block';
    } else {
        backToTopButton.style.display = 'none';
    }
});

// Scroll to top when button is clicked
backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

function searchProducts(event) {
  event.preventDefault(); // Prevent form submission

  const query = document.getElementById('search-input').value.toLowerCase(); // Get search query
  const products = document.querySelectorAll('.image-card, .image-card2'); // Select all products in both sections

  products.forEach(product => {
      const productName = product.querySelector('p').textContent.toLowerCase(); // Get the name from the <p> tag

      // Check if the product name matches the query
      if (productName.includes(query)) {
          product.style.display = ''; // Show the product if it matches
      } else {
          product.style.display = 'none'; // Hide the product if it doesn't match
      }
  });
}
