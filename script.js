let index = 0;
  const items = document.querySelectorAll('.carousel-item');
  const totalItems = items.length;

  document.querySelector('.prev').addEventListener('click', () => {
    if (index > 0) {
      index--;
    } else {
      index = totalItems - 1; 
    }
    updateCarousel();
  });

  document.querySelector('.next').addEventListener('click', () => {
    if (index < totalItems - 1) {
      index++;
    } else {
      index = 0; // Loop back to the first item
    }
    updateCarousel();
  });

  function updateCarousel() {
    const offset = index * -100;
    document.querySelector('.carousel-items').style.transform = `translateX(${offset}%)`;
  }