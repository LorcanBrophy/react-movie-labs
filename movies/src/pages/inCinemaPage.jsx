import { useQuery } from "@tanstack/react-query";
import PageTemplate from "../components/templateMovieListPage";
import { getNowPlayingMovies } from "../api/tmdb-api";
import Spinner from "../components/spinner";

const InCinemaPage = () => {
  const { data: movies, isPending, isError, error } = useQuery({
    queryKey: ["now_playing"],
    queryFn: () => getNowPlayingMovies(),
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h2>{`Error loading now playing movies: ${error.message}`}</h2>;
  }

  return (
    <PageTemplate
      title="Movies Airing Currently"
      movies={movies}
    />
  );
};

export default InCinemaPage;