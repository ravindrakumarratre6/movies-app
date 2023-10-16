import React, { useEffect, useState } from "react";
import "./movieList.css";
import { useParams } from "react-router-dom";
import Cards from "../card/card";

const MovieList = () => {
  const [movieList, setMovieList] = useState([]);
  const [error, setError] = useState(null); // Add error state
  const { type } = useParams();

  useEffect(() => {
    getData();
  }, [type]);

  const getData = async () => {
    setError(null); // Reset error state before making the API request
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${
          type ? type : "popular"
        }?api_key=7e7c5aca22fe4eaf6dc73b447f349e7c&language=en-US`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log("data",data)
      setMovieList(data.results);
    } catch (err) {
      setError(err.message); // Set the error state in case of an error
    }
  };

  return (
    <div className="movie__list">
      <h2 className="list__title">{(type ? type : "POPULAR").toUpperCase()}</h2>
      <div className="list__cards">
        {error ? (
          <p className="error-message">{error}</p>
        ) : (
          movieList.map((movie) => <Cards key={movie.id} movie={movie} />)
        )}
      </div>
    </div>
  );
};

export default MovieList;
