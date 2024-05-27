'use client';

import React from 'react';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import { Movie } from '../types/type';

type MovieDetailClientProps = {
  movie: Movie;
};

const MovieDetailClient = ({ movie }: MovieDetailClientProps) => {
  return (
    <div className={styles.container}>
      <Link href="/">
        <button>Go back</button>
      </Link>
      <div className={styles.detail}>
        <img src={movie.image_url} alt={movie.name} />
        <div>
          <h1>{movie.name}</h1>
          <p>Year: {movie.year}</p>
          <p>Rating: {movie.rating}</p>
          <p>Director: {movie.directors.join(', ')}</p>
          <p>Writers: {movie.directors.join(', ')}</p>
          <p>Stars: {movie.actors.join(', ')}</p>
          <p>{movie.desc}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailClient;


