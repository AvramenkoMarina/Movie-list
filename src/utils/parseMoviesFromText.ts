import { Movie } from '../types/Movie';

export const parseMoviesFromText = (text: string): Movie[] => {
  const movieBlocks = text.trim().split(/\n\s*\n/);
  return movieBlocks.map((block, index) => {
    const lines = block.split('\n');
    const movie: Movie = {
      key: index,
      title: '',
      releaseYear: 0,
      format: '',
      stars: [],
    };

    for (const line of lines) {
      if (line.startsWith('Title:')) {
        movie.title = line.replace('Title:', '').trim();
      } else if (line.startsWith('Release Year:')) {
        movie.releaseYear = Number(line.replace('Release Year:', '').trim());
      } else if (line.startsWith('Format:')) {
        movie.format = line.replace('Format:', '').trim();
      } else if (line.startsWith('Stars:')) {
        movie.stars = line
          .replace('Stars:', '')
          .split(',')
          .map(star => star.trim());
      }
    }

    return movie;
  });
};
