import { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "@tanstack/react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from '../components/spinner'


const WatchLaterPage = () => {
  const {watchLater: movieIds } = useContext(MoviesContext);

  // Create an array of queries and run in parallel.
  const watchLaterMovieQueries = useQueries({
    queries: movieIds.map((movieId) => {
      return {
        queryKey: ['movie', { id: movieId }],
        queryFn: getMovie,
      }
    })
  });
  
  // Check if any of the parallel queries are still loading.
  const isPending = watchLaterMovieQueries.find((m) => m.isPending === true);
  if (isPending) {
    return <Spinner />;
  }

  const movies = watchLaterMovieQueries.map((q) => {
    q.data.genre_ids = q.data.genres.map(g => g.id)
    return q.data
  });

  const toDo = () => true;

  return (
    <PageTemplate
      title="Favorite Movies"
      movies={movies}
    />
  );

};

export default WatchLaterPage;
