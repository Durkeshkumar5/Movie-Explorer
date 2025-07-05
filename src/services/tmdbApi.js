const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export async function fetchPopularMovies() {
  try {
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
    const data = await response.json();
    console.log("Fetched movies:", data.results);
    return data.results;
  } catch (error) {
    console.error('Fetch Error:', error);
    return [];
  }
}

export async function searchMovies(query) {
  try {
    const response = await fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
    );
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Search Error:', error);
    return [];
  }
}

export async function fetchGenres() {
  try {
    const res = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
    const data = await res.json();
    return data.genres; // array of { id, name }
  } catch (error) {
    console.error('Genre fetch error:', error);
    return [];
  }
}

export async function fetchMoviesByGenre(genreId) {
  try {
    const res = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`);
    const data = await res.json();
    return data.results;
  } catch (error) {
    console.error('Movies by genre fetch error:', error);
    return [];
  }
}


