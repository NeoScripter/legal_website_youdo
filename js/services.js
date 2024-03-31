// Code that makes the sections gradually appear and disappear

const serviceItems = document.querySelectorAll('.service_item');

serviceItems.forEach((item) => {
    item.addEventListener('click', () => {
        const closestDescription = item.closest('.service_item').querySelector('.service_description');
        if (getComputedStyle(closestDescription).height === "0px") {
            closestDescription.style.display = 'block';
            const height = closestDescription.scrollHeight + "px";
            
            closestDescription.style.height = "0";
            closestDescription.style.opacity = "0";
            requestAnimationFrame(() => {
                closestDescription.style.height = height;
                closestDescription.style.opacity = "1";
            });
        } else {
            closestDescription.style.height = "0";
            closestDescription.style.opacity = "0";
            setTimeout(() => {
                closestDescription.style.display = 'none';
            }, 500);
        }
    });
});