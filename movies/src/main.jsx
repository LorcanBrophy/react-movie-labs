import { createRoot } from "react-dom/client";
import { useState, useMemo } from "react";                         // <-- added
import { BrowserRouter, Route, Navigate, Routes } from "react-router";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import FavoriteMoviesPage from "./pages/favouriteMoviesPage";
import MovieReviewPage from "./pages/movieReviewPage";
import SiteHeader from './components/siteHeader'
import UpcomingMoviesPage from "./pages/upcomingMoviesPage";
import MoviesContextProvider from "./contexts/moviesContext";
import AddMovieReviewPage from './pages/addMovieReviewPage';
import TopRatedMoviesPage from "./pages/topRatedMoviesPage";
import InCinemaPage from "./pages/inCinemaPage";
import UnderratedMoviesPage from "./pages/underratedMoviesPage";
import WatchLaterPage from "./pages/watchLaterPage";

import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000,
      refetchOnWindowFocus: false
    },
  },
});

const getTheme = (mode) =>
  createTheme({
    palette: {
      mode,
      primary: { main: "#6c63ff" },
      secondary: { main: "#ff6584" },
      ...(mode === "dark" && {
        background: { default: "#121212", paper: "#1e1e1e" },
      }),
    },
    typography: {
      fontFamily: '"Inter", "Roboto", sans-serif',
      h3: { fontWeight: 700 },
    },
    shape: { borderRadius: 12 },
  });

const App = () => {
  const [mode, setMode] = useState("light");
  const theme = useMemo(() => getTheme(mode), [mode]);
  const toggleMode = () => setMode((m) => (m === "light" ? "dark" : "light"));

  return (
    <ThemeProvider theme={theme}>                             {/* <-- added */}
      <CssBaseline />                                         {/* <-- added */}
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <SiteHeader mode={mode} toggleMode={toggleMode} />  {/* <-- props */}
          <MoviesContextProvider>
            <Routes>
              <Route path="/movies/favorites" element={<FavoriteMoviesPage />} />
              <Route path="/movies/upcoming" element={<UpcomingMoviesPage />} />
              <Route path="/reviews/:id" element={<MovieReviewPage />} />
              <Route path="/movies/:id" element={<MoviePage />} />
              <Route path="/" element={<HomePage />} />
              <Route path="*" element={<Navigate to="/" />} />
              <Route path="/reviews/form" element={<AddMovieReviewPage />} />
              <Route path="/movies/top_rated" element={<TopRatedMoviesPage />} />
              <Route path="/movies/now_playing" element={<InCinemaPage />} />
              <Route path="/movies/underrated" element={<UnderratedMoviesPage />} />
              <Route path="/movies/watch_later" element={<WatchLaterPage />} />
            </Routes>
          </MoviesContextProvider>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ThemeProvider>
  );
};

const rootElement = createRoot(document.getElementById("root"));
rootElement.render(<App />);