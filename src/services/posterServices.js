// src/services/posterService.js

export function getPoster(posterPath, size = "w500") {
  if (!posterPath) {
    return "https://via.placeholder.com/500x750?text=No+Image";
  }
  return `https://image.tmdb.org/t/p/${size}${posterPath}`;
}
