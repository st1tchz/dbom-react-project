import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import Navbar from "../components/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const apiKey = "94cc909a";
const baseUrl = "https://www.omdbapi.com/";

const Home = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  async function handleSearch(e) {
    e.preventDefault();
    if (!query.trim()) return;

    try {
      const res = await fetch(
        `${baseUrl}?apikey=${apiKey}&s=${encodeURIComponent(query)}`
      );
      const data = await res.json();
      console.log("OMDB raw data:", data);

      if (data.Response === "True" && Array.isArray(data.Search)) {
        const allBasicResults = data.Search;

        const detailedResults = await Promise.all(
          allBasicResults.map(async (movie) => {
            const detailsRes = await fetch(
              `${baseUrl}?apikey=${apiKey}&i=${movie.imdbID}`
            );
            return await detailsRes.json();
          })
        );

        const sorted = detailedResults.sort((a, b) => {
          const scoreA = parseInt(a.Metascore) || 0;
          const scoreB = parseInt(b.Metascore) || 0;
          return scoreB - scoreA;
        });

        const top6 = sorted.slice(0, 6);

        console.log("Top 6 by metascore:", top6);

        navigate("/results", {
          state: { movies: top6, query },
        });
      } else {
        navigate("/results", {
          state: { movies: [], query },
        });
      }
    } catch (err) {
      console.error("Error fetching movies", err);
      navigate("/results", {
        state: { movies: [], query },
      });
    }
  }

  return (
    <div className="home">
      <Navbar />
      <div className="home__img--wrapper">
        <img src="/dbom_background.png" alt="" className="home__img" />
      </div>
      <div className="home__content">
        <div className="home__content--box">
            <h1 className="home__title">
                <span className="red">Data</span>base of Online Movies
            </h1>
          <h2 className="home__para">
            Search thousands of movies instantly and we'll drop a <b className="red">D</b><b>BOM</b> with the 6
            most popular results
          </h2>
          <form className="searchbar__wrapper" onSubmit={handleSearch}>
            <div className="searchbar__container">
              <input
                type="text"
                className="searchbar"
                placeholder="Search by Movie Title or Keyword..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button type="submit" className="searchbar__icon--btn">
                <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  className="searchbar__icon"
                />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;
