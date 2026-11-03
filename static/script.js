async function getRecommendations() {
    const input = document.getElementById('userInput').value;
    const resultsDiv = document.getElementById('results');
    const loader = document.getElementById('loader');

    if (!input) return alert("Tell me something about your mood!");

    loader.classList.remove('hidden');
    resultsDiv.innerHTML = '';

    try {
        const response = await fetch('/recommend', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ preferences: input })
        });

        const data = await response.json();
        loader.classList.add('hidden');

        // Check if the backend sent an error message
        if (!response.ok) {
            resultsDiv.innerHTML = `<p style="color: #c2410c; padding: 1rem;"><strong>Backend Error:</strong> ${data.error}</p>`;
            return;
        }

        // Render each movie as a rich card
        data.forEach((movie, index) => {
            resultsDiv.innerHTML += `
                <div class="movie-card">
                    <div class="movie-num">${String(index + 1).padStart(2, '0')}</div>
                    <div class="movie-title">
                        ${movie.title}
                        <span class="year">${movie.year}</span>
                    </div>
                    <div class="movie-meta">
                        <span class="genre-tag">${movie.genre}</span>
                    </div>
                    <p class="movie-reason">${movie.reason}</p>
                </div>
            `;
        });

    } catch (e) {
        loader.classList.add('hidden');
        resultsDiv.innerHTML = `<p style="color: #c2410c; padding: 1rem;">A frontend error occurred: ${e.message}</p>`;
    }
}
