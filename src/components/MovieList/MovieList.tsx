// src/components/MovieList/MovieList.tsx
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { MovieCard } from '../MovieCard';
import styles from './MovieList.module.scss';
import { parseMoviesFromText } from '../../utils/parseMoviesFromText';
import { addManyMovies } from '../../features/getMoviesSlice';
import { selectFilteredMovies } from '../../features/selectors';
import { UploadedFile } from '../../types/UploadedFile';
import { Loader } from '../Loader';
import { ErrorMessage } from '../ErrorMessage';
import { FileUploader } from '../FileUpload';

const MovieList = () => {
  const dispatch = useAppDispatch();
  const movies = useAppSelector(selectFilteredMovies);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleFileUpload = (files: UploadedFile[]) => {
    setIsLoading(true);
    setError(false);

    try {
      const allParsedMovies = files.flatMap(file => parseMoviesFromText(file.content));
      dispatch(addManyMovies(allParsedMovies));
    } catch (err) {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <FileUploader onFilesUpload={handleFileUpload} />
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      <div className={styles.movielist}>
        {movies.map((movie, index) => (
          <MovieCard key={index} movie={movie} />
        ))}
      </div>
    </>
  );
};

export default MovieList;
