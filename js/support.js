document.querySelectorAll('.expand_button').forEach(button => {
    button.addEventListener('click', function() {
        const expandedSection = this.previousElementSibling;
        const questionDesc = this.closest('.question_description');
        const ellipsis = questionDesc.querySelector('p .ellipsis');

        if (expandedSection.style.maxHeight === "0px" || expandedSection.style.maxHeight === "") {
            ellipsis.style.display = 'none';
            button.textContent = 'Скрыть';
            expandedSection.style.maxHeight = expandedSection.scrollHeight + "px";
            expandedSection.style.opacity = "1";
        } else {
            ellipsis.style.display = 'inline';
            button.textContent = 'Читать полностью';
            expandedSection.style.maxHeight = "0";
            expandedSection.style.opacity = "0";
        }
    });
});
