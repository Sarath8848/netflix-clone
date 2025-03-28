import React, { useEffect, useState } from "react";
import axios from "axios";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
import "./Banner.css";

const API_KEY = "918672a580159a8521d1cbff7b62a10c";
const BASE_URL = "https://api.themoviedb.org/3";

const Banner = () => {
  const [movie, setMovie] = useState(null);
  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
        const randomMovie = response.data.results[Math.floor(Math.random() * response.data.results.length)];
        setMovie(randomMovie);
      } catch (error) {
        console.error("Error fetching banner movie:", error);
      }
    };
    fetchMovie();
  }, []);

  const handlePlayClick = () => {
    if (trailerUrl) {
      setTrailerUrl(""); // Close trailer if it's already open
    } else {
      movieTrailer(movie?.title || movie?.name || movie?.original_name)
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => console.error("Error finding trailer:", error));
    }
  };

  const handleCloseTrailer = () => {
    setTrailerUrl(""); // Close the YouTube player
  };

  if (!movie) return null; // Don't render anything if no movie is loaded

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">{movie.title || movie.name}</h1>
        <div className="banner__buttons">
          <button className="banner__button" onClick={handlePlayClick}>
            Play
          </button>
          <button className="banner__button">My List</button>
        </div>
        <h2 className="banner__description">{movie.overview}</h2>
      </div>
      <div className="banner__fadeBottom"></div>

      {/* Show YouTube trailer if trailerUrl is set */}
      {trailerUrl && (
        <div className="trailer-container">
          <button className="close-button" onClick={handleCloseTrailer}>
            ✖
          </button>
          <YouTube videoId={trailerUrl} opts={{ width: "100%", height: "390", playerVars: { autoplay: 1 } }} />
        </div>
      )}
    </header>
  );
};

export default Banner;
