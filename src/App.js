import React from "react";
import MovieList from "./components/MovieList";
import Navbar from "./components/Navbar";
import Banner from "./components/Banner";

function App() {
  return (
    <div>
      <Navbar />
      <Banner />
      <MovieList />
    </div>
  );
}

export default App;
