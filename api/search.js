export default async function handler(req, res) {
  const { query } = req.query;

  try {
    const API_KEY = process.env.TMDB_API_KEY;
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`;
    const response = await fetch(url);
    const data = await response.json();

    res.status(200).json(data.results);
  } catch (error) {
    console.error("Search fetch error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
