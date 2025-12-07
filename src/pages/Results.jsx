import React from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./Results.css";

const Results = () => {
  const location = useLocation();
  const movies = location.state?.movies || [];
  const query = location.state?.query || "";
  const navigate = useNavigate();

  console.log("Results location.state:", location.state);
  console.log("Results movies:", movies);

  return (
    <div className="results">
      <Navbar />
      <div className="results__bg">
        <img src="/dbom_background.png" alt="" className="results__bg--img" />
      </div>
      <div className="results__content">
        <div className="results__grid">
          {movies.length === 0 && <p>No results found.</p>}

          {movies.map((movie) => (
            <Link
              key={movie.imdbID}
              to={`/movie/${movie.imdbID}`}
              className="results__card--link"
            >
              <div key={movie.imdbID} className="results__card">
                <div className="results__poster-wrapper">
                  {movie.Poster && movie.Poster !== "N/A" ? (
                    <img
                      src={movie.Poster}
                      alt={movie.Title}
                      className="results__poster"
                    />
                  ) : (
                    <div className="results__poster--placeholder">No Image</div>
                  )}
                </div>
                <div className="results__card-text">
                  <h3 className="results__card-title">{movie.Title}</h3>
                  <p className="results__card-year">{movie.Year}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <button
          className="results__bottom-btn results__home-btn"
          onClick={() => navigate("/")}
        >
          Home
        </button>
      </div>
    </div>
  );
};

export default Results;
