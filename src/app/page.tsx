'use client';

import { useState, useEffect } from 'react';
import MovieCard from '../components/MovieCard';
import Navbar from '../components/NavBar';
import styles from '../styles/Home.module.css';
import { Movie } from '../types/type';

const fetchMovies = async (): Promise<Movie[]> => {
  const res = await fetch('/imdb-top-250.json');
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  const movies: Movie[] = await res.json();
  movies.sort((a, b) => parseFloat(a.rating.toString()) - parseFloat(b.rating.toString()));
  return movies;
};

const Home = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [search, setSearch] = useState('');
  const [genre, setGenre] = useState('');
  const [minRating, setMinRating] = useState(0);
  const [maxRating, setMaxRating] = useState(10);
  const [year, setYear] = useState('');

  useEffect(() => {
    const fetchMoviesData = async () => {
      try {
        const moviesData = await fetchMovies();
        setMovies(moviesData);
        setFilteredMovies(moviesData);
      } catch (error) {
        console.error('Failed to fetch movies', error);
      }
    };

    fetchMoviesData();
  }, []);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(storedFavorites);
  }, []);

  const toggleFavorite = (id: string) => {
    let updatedFavorites;
    if (favorites.includes(id)) {
      updatedFavorites = favorites.filter(fav => fav !== id);
    } else {
      updatedFavorites = [...favorites, id];
    }
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  useEffect(() => {
    setFilteredMovies(
      movies.filter(movie => {
        const matchesSearch = movie.name.toLowerCase().includes(search.toLowerCase());
        const matchesGenre = genre ? movie.genre.includes(genre) : true;
        const matchesRating = movie.rating >= minRating && movie.rating <= maxRating;
        const matchesYear = year ? movie.year.toString() === year : true;
        return matchesSearch && matchesGenre && matchesRating && matchesYear;
      })
    );
  }, [search, genre, minRating, maxRating, year, movies]);

  return (
    <>
      <Navbar />
      <div className={styles.filters}>
        <input
          type="text"
          placeholder="Search by title"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.search}
        />
        <select value={genre} onChange={(e) => setGenre(e.target.value)}>
          <option value="">All Genres</option>
          {/* Add options for genres */}
          {Array.from(new Set(movies.flatMap(movie => movie.genre))).map(genre => (
            <option key={genre} value={genre}>{genre}</option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Min Rating"
          value={minRating}
          onChange={(e) => setMinRating(Number(e.target.value))}
          className={styles.rating}
        />
        <input
          type="number"
          placeholder="Max Rating"
          value={maxRating}
          onChange={(e) => setMaxRating(Number(e.target.value))}
          className={styles.rating}
        />
        <input
          type="number"
          placeholder="Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className={styles.year}
        />
      </div>
      <div className={styles.grid}>
        {filteredMovies.map(movie => (
          <MovieCard
            key={movie.imdb_url.split('/')[2]}
            movie={movie}
            isFavorite={favorites.includes(movie.name)}
            toggleFavorite={toggleFavorite}
          />
        ))}
      </div>
    </>
  );
};

export default Home;
