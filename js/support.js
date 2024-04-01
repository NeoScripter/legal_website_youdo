document.querySelectorAll('.expand_button').forEach(button => {
    button.addEventListener('click', function() {
        const expandedSection = this.previousElementSibling; 
        const questionDesc = this.closest('.question_description'); 
        const ellipsis = questionDesc.querySelector('p .ellipsis');

        if (expandedSection.style.maxHeight === "0px" || expandedSection.style.maxHeight === "") {
            document.querySelectorAll('.expanded').forEach(section => {
                if (section !== expandedSection) { 
                    section.style.maxHeight = "0";
                    section.style.opacity = "0";
                    
                    section.previousElementSibling.querySelector('.ellipsis').style.display = 'inline'; 
                    section.nextElementSibling.textContent = 'Читать полностью'; 
                }
            });
            ellipsis.style.display = 'none';
            this.textContent = 'Скрыть';
            expandedSection.style.maxHeight = expandedSection.scrollHeight + "px";
            expandedSection.style.opacity = "1";
        } else {
            ellipsis.style.display = 'inline';
            this.textContent = 'Читать полностью';
            expandedSection.style.maxHeight = "0";
            expandedSection.style.opacity = "0";
        }
    });
});

const arrowUp = document.querySelector('.up');
const arrowDown = document.querySelector('.down');

arrowDown.addEventListener('click', () => {
    const answerContainer = document.querySelector('.service_items_wrapper');
    const firstItem = answerContainer.querySelector('.service_item:first-child');
    const lastItem = answerContainer.querySelector('.service_item:last-child');
    
    firstItem.style.opacity = "0";

    setTimeout(() => {
        answerContainer.appendChild(firstItem);

        requestAnimationFrame(() => {
            firstItem.style.opacity = "1"; 
        });
    }, 500); 
});

arrowUp.addEventListener('click', () => {
    const answerContainer = document.querySelector('.service_items_wrapper');
    const lastItem = answerContainer.querySelector('.service_item:last-child');
    const firstItem = answerContainer.querySelector('.service_item:first-child');
    lastItem.style.opacity = "0";
    answerContainer.insertBefore(lastItem, firstItem);
    setTimeout(() => {
        lastItem.style.opacity = "1";
    }, 500);
});
