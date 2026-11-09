import React, { useState } from "react";

export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {


  // favorites
  const [favorites, setFavorites] = useState( [] )
  
  const addToFavorites = (movie) => {
    let newFavorites = [];
    if (!favorites.includes(movie.id)){
      newFavorites = [...favorites, movie.id];
    }
    else{
      newFavorites = [...favorites];
    }
    setFavorites(newFavorites)
  };
  
  const removeFromFavorites = (movie) => {
    setFavorites( favorites.filter(
      (mId) => mId !== movie.id
    ));
  };



  // reviews
  const [myReviews, setMyReviews] = useState( {} ) 
  
  const addReview = (movie, review) => {
    setMyReviews( {...myReviews, [movie.id]: review } )
  };
  console.log(myReviews);


  // watch later
  const [watchLater, setWatchLater] = useState([]);

  const addToWatchLater = (movie) => {
    let newWatchLater = [];
    if (!watchLater.includes(movie.id)) {
      newWatchLater = [...watchLater, movie.id];
    } else {
      newWatchLater = [...watchLater];
    }
    setWatchLater(newWatchLater);
    console.log("Watch Later:", newWatchLater);
  };


  return (
    <MoviesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        addReview,
        watchLater,  
        addToWatchLater,
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );

};

export default MoviesContextProvider;
