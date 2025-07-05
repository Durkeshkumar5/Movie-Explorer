import { Link } from 'react-router-dom';

function MovieCard({ movie }) {
  return (
    <Link
      to={`/movie/${movie.id}`}
      style={{
        textDecoration: 'none',
        color: 'inherit',
        margin: '10px',
      }}
    >
      <div
        style={{
          width: '200px',
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.05)';
          e.currentTarget.style.boxShadow = '0 8px 40px rgba(0,0,0,0.3)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 4px 30px rgba(0,0,0,0.1)';
        }}
      >
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          style={{
            width: '100%',
            height: '300px',
            objectFit: 'cover',
          }}
        />
        <div style={{ padding: '10px' }}>
          <h3 style={{ fontSize: '1rem', marginBottom: '5px' }}>{movie.title}</h3>
          <p style={{ fontSize: '0.8rem', opacity: 0.8 }}>
            ⭐ {movie.vote_average.toFixed(1)} / 10
          </p>
        </div>
      </div>
    </Link>
  );
}

export default MovieCard;
