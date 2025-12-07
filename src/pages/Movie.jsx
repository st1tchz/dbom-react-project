import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./Movie.css";

const apiKey = "94cc909a";
const baseUrl = "https://www.omdbapi.com/";

const Movie = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchMovie() {
      try {
        setIsLoading(true);
        setError("");

        const res = await fetch(
          `${baseUrl}?apikey=${apiKey}&i=${id}&plot=full`
        );

        const data = await res.json();
        console.log("Movie Detail Data:", data);

        if (data.Response === "True") {
          setMovie(data);
        } else {
          setError(data.error || "Movie not found.");
        }
      } catch (err) {
        console.error("Error fetching movie details.");
        setError("Something went wrong while loading the movie.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchMovie();
  }, [id]);

  function handleBack() {
    navigate(-1);
  }

  return (
    <div className="movie">
      <Navbar />
      <div className="results__bg">
        <img src="/dbom_background.png" alt="" className="results__bg--img" />
      </div>

      <div className="movie__content">
        {isLoading && <p className="movie__status">Loading movie...</p>}

        {error && !isLoading && (
          <p className="movie__status movie__status--error">{error}</p>
        )}

        {movie && !isLoading && !error && (
          <div className="movie__layout">
            <div className="movie__poster-wrapper">
              {movie.Poster && movie.Poster !== "N/A" ? (
                <img
                  src={movie.Poster}
                  alt={movie.Title}
                  className="movie__poster"
                />
              ) : (
                <div className="movie__poster--placeholder">No Image</div>
              )}
            </div>

            <div className="movie__details">
              <h1 className="movie__title">
                {movie.Title} <span>({movie.Year})</span>
              </h1>

              <p className="movie__meta">
                <span>{movie.Rated}</span> • <span>{movie.Runtime}</span> •{" "}
                <span>{movie.Genre}</span>
              </p>

              <p className="movie__rating">
                IMDb: <strong>{movie.imdbRating || "N/A"}</strong> • Metascore:{" "}
                <strong>{movie.Metascore || "N/A"}</strong>
              </p>

              <p className="movie__plot">{movie.Plot}</p>

              <p className="movie__field">
                <strong>Director:</strong> {movie.Director}
              </p>
              <p className="movie__field">
                <strong>Actors:</strong> {movie.Actors}
              </p>
              <p className="movie__field">
                <strong>Writer:</strong> {movie.Writer}
              </p>
            </div>
          </div>
        )}
        <button className="movie__back-btn" onClick={() => navigate(-1)}>
          Back to Results
        </button>
      </div>
    </div>
  );
};

export default Movie;
