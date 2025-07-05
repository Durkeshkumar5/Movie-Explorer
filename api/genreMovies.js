export default async function handler(req, res) {
  const { genreId } = req.query;

  try {
    const API_KEY = process.env.TMDB_API_KEY;
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`;
    const response = await fetch(url);
    const data = await response.json();

    res.status(200).json(data.results);
  } catch (error) {
    console.error("Genre movies fetch error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
