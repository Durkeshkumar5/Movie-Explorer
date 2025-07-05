export async function fetchPopularMovies() {
  const res = await fetch('/api/popular');
  return await res.json();
}

export async function searchMovies(query) {
  const res = await fetch(`/api/search?query=${encodeURIComponent(query)}`);
  return await res.json();
}

export async function fetchGenres() {
  const res = await fetch('/api/genres');
  return await res.json();
}

export async function fetchMoviesByGenre(genreId) {
  const res = await fetch(`/api/genreMovies?genreId=${genreId}`);
  return await res.json();
}
