import { useEffect } from 'react';
import { Loader } from '../Loader';
import { ErrorMessage } from '../ErrorMessage';
import { MovieCard } from '../MovieCard';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getMoviesAsync } from '../../features/getMoviesSlice';
import { selectFilteredMovies } from '../../features/selectors';
import styles from './MovieList.module.scss';

const MovieList = () => {
  const dispatch = useAppDispatch();
  const movies = useAppSelector(selectFilteredMovies);
  const { loaded, error } = useAppSelector(state => state.allMovies);

  useEffect(() => {
    dispatch(getMoviesAsync());
  }, [dispatch]);

  if (error) return <ErrorMessage />;

  if (!loaded) return <Loader />;

  return (
    <div className={styles.movielist}>
      {movies.map((movie, index) => (
        <MovieCard key={index} movie={movie} />
      ))}
    </div>
  );
};

export default MovieList;
