
const serviceItems = document.querySelectorAll('.service_item');

serviceItems.forEach((item) => {
    item.addEventListener('click', () => {
        const closestDescription = item.closest('.service_item').querySelector('.service_description');
        closestDescription.classList.toggle('hidden');
    });
});

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
            if (carouselContainer.classList.contains('practice')) {
                console.log('Item has the class "active".');
            } else {
                console.log('Item does not have the class "active".');
            }
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


function setupCarouselControls() {
    let index = 0;
    const items = document.querySelectorAll('.carousel-item');
    const totalItems = items.length;
    const carousel = document.getElementById('carousel');
    const carouselWidth = carousel.offsetWidth;
    let divisor;
    let quotient = Math.floor(carouselWidth / 500);

    switch (quotient) {
        case 0: divisor = 1; break;
        case 1: divisor = 2; break;
        case 2: divisor = 3; break;
        default: divisor = 4; 
    }
    items.forEach(carouselItem => {
        carouselItem.style.flex = `0 0 ${100 / divisor}%`;
    });

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
        document.querySelector('.carousel-items').style.transform = `translateX(${offset / divisor}%)`;
    }
}

/* const listOfServices = document.querySelector('.services_left_subsection');

fetch('services.json')
        .then(response => response.json())
        .then(products => {
            Object.entries(services).slice(0, 10).forEach(([id, service]) => {
                const serviceItem = document.createElement('div');
                serviceItem.classList.add('service_item');
                const serviceDescription = document.createElement('div');
                serviceDescription.classList.add('service_description');
                serviceDescription.classList.add('hidden');
                serviceDescription.innerHTML = `<p>${service.name}</p><p class="product_price">${product.price}</p>`;
                serviceItem.innerHTML = `<p class="product_name">${product.name}</p><img src="${product.image}" alt="${product.name}"><p class="product_price">${product.price}</p>`;
                listOfServices.appendChild(serviceItem);
            });
        })
        .catch(error => console.error('Error loading products:', error)); */