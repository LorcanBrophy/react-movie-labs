import { useQuery } from "@tanstack/react-query";
import PageTemplate from "../components/templateMovieListPage";
import { getTopRatedMovies } from "../api/tmdb-api";
import Spinner from "../components/spinner";

const TopRatedMoviesPage = () => {
  const { data: movies, isPending, isError, error } = useQuery({
    queryKey: ["top_rated"],
    queryFn: () => getTopRatedMovies(),
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h2>{`Error loading top rated movies: ${error.message}`}</h2>;
  }

  return (
    <PageTemplate
      title="Top Rated Movies"
      movies={movies}
    />
  );
};

export default TopRatedMoviesPage;