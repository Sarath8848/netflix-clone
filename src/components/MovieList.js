import React from "react";
import "./MovieList.css"; // Import CSS
import MovieRow from "./MovieRow"; // Create a new MovieRow component

const API_KEY = "918672a580159a8521d1cbff7b62a10c";
const BASE_URL = "https://api.themoviedb.org/3";

const categories = [
  { title: "Trending Now", url: `/trending/all/week?api_key=${API_KEY}` },
  { title: "Top Rated", url: `/movie/top_rated?api_key=${API_KEY}` },
  { title: "Upcoming", url: `/movie/upcoming?api_key=${API_KEY}` },
  { title: "Action Movies", url: `/discover/movie?api_key=${API_KEY}&with_genres=28` },
  { title: "Comedy Movies", url: `/discover/movie?api_key=${API_KEY}&with_genres=35` },
  { title: "Telugu Movies", url: `/discover/movie?api_key=${API_KEY}&with_original_language=te` },
];

const MovieList = () => {
  return (
    <div className="movie-list">
      {categories.map((category, index) => (
        <MovieRow key={index} title={category.title} fetchUrl={BASE_URL + category.url} />
      ))}
    </div>
  );
};

export default MovieList;
