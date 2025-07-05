import { useEffect, useState } from 'react';
import {
  fetchPopularMovies,
  searchMovies,
  fetchGenres,
  fetchMoviesByGenre
} from './services/tmdbApi';
import MovieCard from './components/MovieCard';

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');

  useEffect(() => {
    fetchPopularMovies().then(setMovies);
    fetchGenres().then(setGenres);
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '' && !selectedGenre) {
      fetchPopularMovies().then(setMovies);
    }
  }, [searchTerm, selectedGenre]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchTerm.trim() === '') return;

    setLoading(true);
    const results = await searchMovies(searchTerm);
    setMovies(results);
    setLoading(false);
  };

  const handleGenreChange = async (e) => {
    const genreId = e.target.value;
    setSelectedGenre(genreId);

    if (genreId) {
      const genreMovies = await fetchMoviesByGenre(genreId);
      setMovies(genreMovies);
    } else {
      fetchPopularMovies().then(setMovies);
    }
  };

  return (
    <div style={{ padding: '20px', minHeight: '100vh', width: '100%' }}>
      <h1>🎬 Movie Explorer</h1>

      {/* 🔍 Search Form */}
      <form onSubmit={handleSearch} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Search movies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: '10px',
            fontSize: '1rem',
            width: '300px',
            marginRight: '10px',
            borderRadius: '6px',
            border: '1px solid #ccc'
          }}
        />
        <button type="submit">Search</button>
      </form>

      {/* 🎯 Genre Dropdown */}
      <div style={{ marginBottom: '20px' }}>
        <select
          value={selectedGenre}
          onChange={handleGenreChange}
          style={{
            padding: '10px',
            borderRadius: '6px',
            fontSize: '1rem',
            width: '200px'
          }}
        >
          <option value="">🎯 All Genres</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
      </div>

      {/* 🎞 Movie Cards or Loading */}
      {loading ? (
        <p>Loading movies...</p>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          {movies.length > 0 ? (
            movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
          ) : (
            <p>No movies found.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
