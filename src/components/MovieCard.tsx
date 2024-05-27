'use client';

import React from 'react';
import Link from 'next/link';
import { FaStar, FaHeart } from 'react-icons/fa';
import styles from '../styles/MovieCard.module.css';
import { Movie } from '../types/type';

type MovieCardProps = {
  movie: Movie;
  isFavorite: boolean;
  toggleFavorite: (id: string) => void;
};

const MovieCard: React.FC<MovieCardProps> = ({ movie, isFavorite, toggleFavorite }) => {
  if (!movie.name) {
    return null;
  }

  const movieId = movie.imdb_url.split('/')[2];

  return (
    <div className={styles.card}>
      <Link href={`/movie/${movieId}`}>
        <img src={movie.thumb_url} alt={movie.name} className={styles.poster} />
        <div className={styles.overlay}>
          <h2>{movie.name}</h2>
          <p>{movie.year}</p>
          <p>
            <FaStar /> {movie.rating}
          </p>
        </div>
      </Link>
      <button className={`${styles.favoriteButton} ${isFavorite ? styles.favorited : ''}`} onClick={() => toggleFavorite(movie.name)}>
        <FaHeart />
      </button>
    </div>
  );
};

export default MovieCard;
