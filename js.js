function getFavorites() {
    const favorites = localStorage.getItem('favorites');
    return favorites ? JSON.parse(favorites) : [];
}

// Функция для сохранения избранного в localStorage
function saveFavorites(favorites) {
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

// Функция для обновления состояния кнопки избранного
function updateFavoriteButton(button, movieId) {
    const favorites = getFavorites();
    const isFavorite = favorites.includes(movieId);
    
    if (isFavorite) {
        button.classList.add('favorite-active');
        button.setAttribute('aria-label', 'Удалить из избранного');
    } else {
        button.classList.remove('favorite-active');
        button.setAttribute('aria-label', 'Добавить в избранное');
    }
}

// Инициализация состояния кнопок при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    const favoriteButtons = document.querySelectorAll('.favorite-btn');
    
    favoriteButtons.forEach(button => {
        const movieId = button.getAttribute('data-movie-id');
        updateFavoriteButton(button, movieId);
        
        // Обработчик клика на кнопку избранного
        button.addEventListener('click', function() {
            const favorites = getFavorites();
            const movieId = this.getAttribute('data-movie-id');
            const index = favorites.indexOf(movieId);
            
            if (index > -1) {
                // Удаляем из избранного
                favorites.splice(index, 1);
            } else {
                // Добавляем в избранное
                favorites.push(movieId);
            }
            
            saveFavorites(favorites);
            updateFavoriteButton(this, movieId);
        });
    });
});