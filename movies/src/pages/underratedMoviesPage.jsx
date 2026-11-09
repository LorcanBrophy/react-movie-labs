import { useQuery } from "@tanstack/react-query";
import PageTemplate from "../components/templateMovieListPage";
import { getUnderratedMovies } from "../api/tmdb-api";
import Spinner from "../components/spinner";

const UnderratedMoviesPage = () => {
  const { data: movies, isPending, isError, error } = useQuery({
    queryKey: ["underrated"],
    queryFn: () => getUnderratedMovies(),
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h2>{`Error loading underrated movies: ${error.message}`}</h2>;
  }

  return (
    <PageTemplate
      title="Most Underrated Movies"
      movies={movies}
    />
  );
};

export default UnderratedMoviesPage;