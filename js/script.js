// Number of website viewers generator //
const visitorNumbers = document.querySelectorAll('.visitor_num');

function updateVisitorNumbers() {
    let savedData = sessionStorage.getItem('visitorNumberData');
    let data;

    if (savedData !== null) {
        data = JSON.parse(savedData);
        if (Date.now() - data.timestamp < 10000) {
            updateDOMElements(data.number);
            return;
        }
    }

    let number = createRandomNumber();
    let timestamp = Date.now();
    updateDOMElements(number);

    sessionStorage.setItem('visitorNumberData', JSON.stringify({number, timestamp}));
}

function updateDOMElements(number) {
    visitorNumbers.forEach(visitorNumber => {
        visitorNumber.textContent = number;
    });
}

function createRandomNumber() {
    return Math.floor(Math.random() * 10) + 2; 
}

updateVisitorNumbers();
setInterval(updateVisitorNumbers, 10000);

// Hidden lines in the services section //

const serviceItems = document.querySelectorAll('.service_item');

serviceItems.forEach((item) => {
    item.addEventListener('click', () => {
        const closestDescription = item.closest('.service_item').querySelector('.service_description');
        closestDescription.classList.toggle('hidden');
    });
});

// Code that counts how many carousel images should be displayed at a time based on the screen width

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

// Free consulation visitor imitator

let currentIndex = 0;

function showFirstNotification() {
  currentIndex = 1;
  fadeInOutNotification(currentIndex);
}

function fadeInOutNotification(index) {
  $(`.yved:nth-child(${index})`).fadeIn(200).delay(2000).fadeOut(200);
}

function cycleNotifications() {
  currentIndex++;
  if (currentIndex > 10) currentIndex = 1;
  fadeInOutNotification(currentIndex);
}

setTimeout(function() {
  showFirstNotification();
  
  setInterval(cycleNotifications, 60000);
}, 10000);


// Privacy policy

const policyWrappers = document.querySelectorAll('.policy_wrapper');
const mainContentWrappers = document.querySelectorAll('.overlay_wrapper');
const reviewsWrapper = document.querySelector('.reviews_wrapper');

document.querySelectorAll('.open_policy_btn').forEach(openButton => {
    openButton.addEventListener('click', () => {
        policyWrappers.forEach(policyWrapper => {
            policyWrapper.style.display = 'block';
        });
        mainContentWrappers.forEach(contentWrapper => {
            contentWrapper.style.display = 'none';
        });
        reviewsWrapper.style.display = 'none';
    });
});

document.querySelectorAll('.close_policy_btn').forEach(closeButton => {
    closeButton.addEventListener('click', () => {
        policyWrappers.forEach(policyWrapper => {
            policyWrapper.style.display = 'none';
        });
        mainContentWrappers.forEach(contentWrapper => {
            contentWrapper.style.display = 'block';
        });
        reviewsWrapper.style.display = 'flex';
    });
});

// Privacy policy appearing on the main page

const returnButton = document.getElementById('back_to_main_btn');
const policyOverlay = document.querySelector('.policy_overlay');
const freeConsulationButton = document.querySelector('.request_consultation');

freeConsulationButton.addEventListener('click', () => {
    policyOverlay.style.display = 'flex';
});

returnButton.addEventListener('click', () => {
    policyOverlay.style.display = 'none';
});
