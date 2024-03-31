document.addEventListener("DOMContentLoaded", function() {
    /* function fillNewsPage() {
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
    } */


    document.querySelector('.page').classList.add('active');

    const links = document.querySelectorAll('.page-link');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const page = this.getAttribute('data-page');
            const activePage = document.querySelector('.page.active');
            if (activePage) activePage.classList.remove('active');
            
            const newActivePage = document.getElementById(`page-${page}`);
            newActivePage.classList.add('active');

            document.querySelector('#pagination a.active')?.classList.remove('active');
            this.classList.add('active');
        });
    });
});
