export default async function handler(req, res) {
  try {
    const API_KEY = process.env.TMDB_API_KEY;

    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
    );

    if (!response.ok) {
      return res.status(response.status).json({ error: 'Failed to fetch popular movies' });
    }

    const data = await response.json();

    // Return just the movie list
    res.status(200).json(data.results);
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
