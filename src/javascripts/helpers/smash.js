// add a property to our movie objects, 'isWatched' and 'isOnWatchList', to the movie object.
// must query for movies and user movies and then smash them together

const watchlistMovies = (movies, watchListItems) => watchListItems.map((watchListItem) => {
  // take watchListItem find the movie that goes with it and smash those 2 objects together
  const movie = movies.find(m => m.id === watchListItem.movieId);
  return Object.assign({}, movie, watchListItem);
});

export default { watchlistMovies };
