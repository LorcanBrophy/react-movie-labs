import { useQuery } from "@tanstack/react-query";
import PageTemplate from "../components/templateMovieListPage";
import { getUpcomingMovies } from "../api/tmdb-api";
import AddToWatchLater from "../components/cardIcons/addToWatchLater";
import Spinner from "../components/spinner";

const UpcomingMoviesPage = () => {
  const { data: movies, isPending, isError, error } = useQuery({
    queryKey: ["upcoming"],
    queryFn: () => getUpcomingMovies(),
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h2>{`Error loading upcoming movies: ${error.message}`}</h2>;
  }

  return (
    <PageTemplate
      title="Upcoming Movies"
      movies={movies}
      action={(movie) => <AddToWatchLater movie={movie} />}
    />
  );
};

export default UpcomingMoviesPage;