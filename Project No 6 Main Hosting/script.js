document.addEventListener('DOMContentLoaded', () => {
    const viewMoreBtn = document.getElementById('view-more-btn');
    const hiddenCards = document.querySelectorAll('.explore__card.hidden');

    viewMoreBtn.addEventListener('click', () => {
        hiddenCards.forEach(card => {
            if (card.classList.contains('hidden')) {
                card.classList.remove('hidden');
                viewMoreBtn.textContent = 'View Less';
            } else {
                card.classList.add('hidden');
                viewMoreBtn.textContent = 'View All Categories';
            }
        });
    });
});
