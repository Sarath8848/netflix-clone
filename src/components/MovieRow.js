import React, { useEffect, useState } from "react";
import YouTube from "react-youtube";
import "./MovieRow.css";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const MovieRow = ({ title, fetchUrl }) => {
  const [movies, setMovies] = useState([]);
  const [trailerId, setTrailerId] = useState(null);
  const [hoveredMovieId, setHoveredMovieId] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(fetchUrl);
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
    fetchMovies();
  }, [fetchUrl]);

  const handleMouseEnter = async (movie) => {
    setHoveredMovieId(movie.id); // Store hovered movie ID

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${process.env.REACT_APP_TMDB_API_KEY}`
      );
      const data = await response.json();
      if (data.results.length > 0) {
        setTrailerId(data.results[0].key);
      }
    } catch (error) {
      console.error("Error fetching trailer:", error);
    }
  };

  const handleMouseLeave = () => {
    setHoveredMovieId(null);
    setTrailerId(null);
  };

  return (
    <div className="movie-row">
      <h2 className="row-title">{title}</h2>
      <div className="movie-row__posters">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="movie-row__poster-container"
            onMouseEnter={() => handleMouseEnter(movie)}
            onMouseLeave={handleMouseLeave}
          >
            {hoveredMovieId === movie.id && trailerId ? (
              <YouTube videoId={trailerId} opts={{ width: "100%", height: "150px" }} />
            ) : (
              <img
                className="movie-row__poster"
                src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                alt={movie.title}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieRow;
