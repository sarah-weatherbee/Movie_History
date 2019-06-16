import firebase from 'firebase/app';
import 'firebase/auth';
import util from '../../helpers/util';
import movieData from '../../helpers/data/movieData';
import userMovieData from '../../helpers/data/userMovieData';
import SMASH from '../../helpers/smash';

const movieStringBuilder = (movies) => {
  let domString = '';
  movies.forEach((movie) => {
    domString += '<div class="col-5 mb-5">';
    domString += `<div class="card" id="${movie.id}">`;
    domString += `<h2>${movie.title}</h2>`;
    domString += `<h2>Rating: ${movie.movieRating}</h2>`;
    domString += `<img src="${movie.imageUrl}"/>`;
    domString += '<button type="button" class="btn btn-info rating">Add Rating</button>';
    domString += `<button id="delete.${movie.id}" class="btn btn-danger watchlistDeleteButton">Delete</button>`;
    domString += '</div>';
    domString += '</div>';
  });
  util.printToDom('watchlist', domString);
};

const getWatchListData = () => {
  movieData.getMoviesByUid().then((movies) => {
    const userId = firebase.auth().currentUser.uid;
    userMovieData.getWatchList(userId).then((watchListItems) => {
      const watchlistMovies = SMASH.watchlistMovies(movies, watchListItems);
      movieStringBuilder(watchlistMovies);
    });
  });
};

export default { getWatchListData };
