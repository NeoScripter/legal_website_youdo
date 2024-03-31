document.addEventListener("DOMContentLoaded", function() {
    let globalNewsArray = []; 

    async function fetchNews() {
        try {
            const response = await fetch('../json_files/news.json');
            const jsonData = await response.json();
            globalNewsArray = jsonData;
            displayNews(globalNewsArray);
            setupPagination(globalNewsArray);
        } catch (error) {
            console.error('Error fetching news:', error);
        }
    }

    function displayNews(newsArray) {
        const contentDiv = document.getElementById('content');
        contentDiv.innerHTML = ''; 
        const itemsPerPage = calculateItemsPerPage();
        
        for (let i = 0, pageId = 1; i < newsArray.length; i += itemsPerPage, pageId++) {
            const page = document.createElement('div');
            page.className = 'page';
            page.id = `page-${pageId}`;
            if (pageId === 1) page.classList.add('active');
            
            const endIndex = Math.min(i + itemsPerPage, newsArray.length);
            for (let j = i; j < endIndex; j++) {
                const newsPiece = document.createElement('div');
                newsPiece.className = 'news_piece';
                newsPiece.innerHTML = `${newsArray[j].title}${newsArray[j].content}`;
                page.appendChild(newsPiece);
            }

            contentDiv.appendChild(page);
        }
    }

    function setupPagination(newsArray) {
        const itemsPerPage = calculateItemsPerPage();
        const totalPages = Math.ceil(newsArray.length / itemsPerPage);
        const paginationDiv = document.getElementById('pagination');
        paginationDiv.innerHTML = ''; 

        for (let i = 1; i <= totalPages; i++) {
            const pageLink = document.createElement('a');
            pageLink.href = '#';
            pageLink.textContent = i;
            pageLink.className = 'page-link';
            pageLink.dataset.page = i;
            pageLink.addEventListener('click', function(e) {
                e.preventDefault();
                document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
                document.getElementById(`page-${i}`).classList.add('active');

                document.querySelectorAll('#pagination .page-link').forEach(link => link.classList.remove('active'));
                this.classList.add('active');
                adjustPaginationLinksVisibility(i, totalPages);
            });

            paginationDiv.appendChild(pageLink);
        }
        paginationDiv.firstChild.classList.add('active');
        adjustPaginationLinksVisibility(1, totalPages);
    }

    function calculateItemsPerPage() {
        const viewportWidth = window.innerWidth;
        let columns = viewportWidth < 676 ? 1 : viewportWidth < 998 ? 2 : 3;
        return columns * 3;
    }

    fetchNews();
});

function adjustPaginationLinksVisibility(currentPage, totalPages) {
    const paginationDiv = document.getElementById('pagination');
    const links = paginationDiv.getElementsByClassName('page-link');
    const ellipsis = document.createElement('span');
    ellipsis.textContent = '...';

    for (let link of links) {
        link.style.display = 'none';
    }

    links[0].style.display = '';

    let start = Math.max(currentPage - 2, 1);
    let end = Math.min(start + 4, totalPages - 1);

    if (currentPage < 5) {
        end = Math.min(5, totalPages - 1);
    }
    if (currentPage > totalPages - 5) {
        start = Math.max(totalPages - 5, 1);
    }

    for (let i = start; i <= end; i++) {
        links[i - 1].style.display = '';
    }

    if (totalPages > 1) {
        links[totalPages - 1].style.display = '';
    }

    paginationDiv.querySelectorAll('span').forEach(span => span.remove()); 
    if (end < totalPages - 1) {
        paginationDiv.insertBefore(ellipsis.cloneNode(true), links[totalPages - 1]);
    }

    if (start > 2) { 
        paginationDiv.insertBefore(ellipsis.cloneNode(true), links[start - 1]);
    }
}
