import { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@mui/material/IconButton";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";

const AddToWatchLater = ({ movie }) => {

  const context = useContext(MoviesContext);

  const handleAddToWatchLater = (e) => {
    e.preventDefault();
    context.addToWatchLater(movie);
  };
  
  return (
    <IconButton aria-label="add to playlist" onClick={handleAddToWatchLater}>
      <PlaylistAddIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default AddToWatchLater;