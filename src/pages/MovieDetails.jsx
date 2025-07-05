import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchDetailsAndReviews = async () => {
      try {
        const [detailsRes, reviewsRes] = await Promise.all([
          fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`),
          fetch(`${BASE_URL}/movie/${id}/reviews?api_key=${API_KEY}`)
        ]);

        const movieData = await detailsRes.json();
        const reviewsData = await reviewsRes.json();

        setMovie(movieData);
        setReviews(reviewsData.results || []);
      } catch (error) {
        console.error('Error fetching movie data:', error);
      }
    };

    fetchDetailsAndReviews();
  }, [id]);

  if (!movie) return <p>Loading movie details...</p>;

  return (
    <div style={{ padding: '20px', minHeight: '100vh' }}>
      <button
        onClick={() => navigate(-1)}
        style={{
          marginBottom: '20px',
          padding: '10px 15px',
          backgroundColor: '#444',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer'
        }}
      >
        ← Back
      </button>

      <h2>{movie.title}</h2>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        style={{ maxWidth: '300px', borderRadius: '12px', marginBottom: '20px' }}
      />
      <p><strong>Overview:</strong> {movie.overview}</p>
      <p><strong>Release Date:</strong> {movie.release_date}</p>
      <p><strong>Runtime:</strong> {movie.runtime} minutes</p>
      <p><strong>Genres:</strong> {movie.genres.map((g) => g.name).join(', ')}</p>
      <p><strong>Rating:</strong> ⭐ {movie.vote_average} / 10</p>
      <p><strong>Budget:</strong> ${movie.budget.toLocaleString()}</p>
      <p><strong>Revenue:</strong> ${movie.revenue.toLocaleString()}</p>

      {/* 📝 Reviews Section */}
      <div style={{ marginTop: '40px' }}>
        <h3>User Reviews</h3>
        {reviews.length === 0 ? (
          <p>No reviews available.</p>
        ) : (
          reviews.slice(0, 3).map((review) => (
            <div
              key={review.id}
              style={{
                backgroundColor: '#ffffff22',
                borderRadius: '10px',
                padding: '15px',
                marginBottom: '15px',
                color: 'white'
              }}
            >
              <p><strong>{review.author}</strong>:</p>
              <p style={{ fontStyle: 'italic' }}>
                {review.content.slice(0, 250)}...
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default MovieDetails;
