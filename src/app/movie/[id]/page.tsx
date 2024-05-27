import { GetStaticPaths, GetStaticProps } from 'next';
import MovieDetailClient from '../../../components/MovieDetailClient';
import { Movie } from '../../../types/type';
import { useRouter } from 'next/router';

type MovieDetailProps = {
  params: {
    id: string;
  };
};

const fetchMovies = async (): Promise<Movie[]> => {
  const res = await fetch('http://localhost:3000/imdb-top-250.json');
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
};

const MovieDetail = async ({ params }: MovieDetailProps) => {
  const movies = await fetchMovies();
  const movieId = params.id;
  const movie = movies.find(m => m.imdb_url.split('/')[2] === movieId);

  if (!movie) {
    return <div>Movie not found</div>;
  }

  return <MovieDetailClient movie={movie} />;
};

export async function generateStaticParams() {
  const movies = await fetchMovies();

  return movies.map(movie => ({
    id: movie.imdb_url.split('/')[2],
  }));
}

export default MovieDetail;
