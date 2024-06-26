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
        const carousel = document.querySelector('.carousel-items');
        const lastItem = carousel.querySelector('.carousel-item:last-child');
        const firstItem = carousel.querySelector('.carousel-item:first-child');
        carousel.removeChild(lastItem);
        carousel.insertBefore(lastItem, firstItem);
    });

    document.querySelector('.next').addEventListener('click', () => {
        const firstItem = document.querySelector('.carousel-item');
        const carousel = document.querySelector('.carousel-items');
        carousel.removeChild(firstItem);
        carousel.appendChild(firstItem);
    });
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

async function fetchHtmlContent() {
    const paths = ['../json_files/policy.html', 'json_files/policy.html'];
    for (const path of paths) {
        try {
            const response = await fetch(path);
            if (response.ok) {
                const htmlContent = await response.text();
                document.querySelector('.policy_wrapper').innerHTML = htmlContent;
                setPolicyElements();
                return; 
            }
        } catch (error) {
            console.error(`Error fetching HTML content from ${path}:`, error);
        }
    }
    console.error('All paths failed to load HTML content.');
}

fetchHtmlContent();

function setPolicyElements() {
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
    
}
