export default async function handler(req, res) {
  try {
    const API_KEY = process.env.TMDB_API_KEY;
    const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`);
    const data = await response.json();

    res.status(200).json(data.genres);
  } catch (error) {
    console.error("Genres fetch error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
