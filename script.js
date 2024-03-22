

  document.addEventListener('DOMContentLoaded', function() {
    const carouselContainer = document.getElementById('carousel');
    const images = [];

    for (let i = 1; i < 50; i++) {
        const newPathToImage = `assets/carousel/image${i}.jpg`;
        images.push(newPathToImage);
    }

    function loadImage(src) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = () => reject(new Error(`Failed to load image at ${src}`));
            img.src = src;
        });
    }
    
    async function processImagesSequentially(images) {
        for (let src of images) {
            try {
                console.log(src);
                const img = await loadImage(src); 
                const imageWrapper = document.createElement('div');
                imageWrapper.classList.add('carousel-item');
                imageWrapper.appendChild(img);
                carouselContainer.appendChild(imageWrapper);
            } catch (error) {
                console.error(error);
                setupCarouselControls();
                break; 
            }
        }
    }
    
    processImagesSequentially(images);
});

function setupCarouselControls() {
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
            index = 0; 
        }
        updateCarousel();
    });
    function updateCarousel() {
        const offset = index * -100;
        document.querySelector('.carousel-items').style.transform = `translateX(${offset}%)`;
    }
}