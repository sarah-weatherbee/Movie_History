import firebase from 'firebase/app';
import 'firebase/auth';
import util from '../../helpers/util';
import movieData from '../../helpers/data/movieData';
import userMovieData from '../../helpers/data/userMovieData';
import watchList from '../watchlist/watchlist';

const addToWatchlist = (e) => {
  e.preventDefault();
  const card = e.target.closest('.card');
  const newWatchListItem = {
    uid: firebase.auth().currentUser.uid,
    movieId: card.id,
    isWatched: false,
    rating: '',
  };
  userMovieData.addUserMovie(newWatchListItem)
    .then(() => watchList.getWatchListData())
    .catch(err => console.error(err));
};

const addRating = (e) => {
  e.preventDefault();
  const card = e.target.closest('.card');
  console.error(card);
  const userRating = {
    uid: firebase.auth().currentUser.uid,
    movieId: card.id,
    isWatched: true,
    rating: '5',
  };
  userMovieData.addUserMovie(userRating)
    .then()
    .catch(err => console.error(err));
};

const deleteMovieEvent = (e) => {
  console.error('hi');
  // const movieByUid = movieData.getMoviesByUid();
  const movieId = e.target.id.split('.')[1];
  movieData.deleteMovie(movieId)
    .then(() => {
      getMovies(firebase.auth().currentUser.uid); // eslint-disable-line no-use-before-define
      document.location.reload();
    }).catch(err => console.error('no delete movie for you', err));
};

const addEventListeners = () => {
  const watchlistButtons = document.querySelectorAll('.watchList');
  watchlistButtons.forEach((button) => {
    button.addEventListener('click', addToWatchlist);
  });
  const addRatingButtons = document.querySelectorAll('.rating');
  addRatingButtons.forEach((button) => {
    button.addEventListener('click', addRating);
  });
  const deleteButtons = document.getElementsByClassName('deleteButton');
  for (let i = 0; i < deleteButtons.length; i += 1) {
    deleteButtons[i].addEventListener('click', deleteMovieEvent);
  }
};

const movieStringBuilder = (movies) => {
  let domString = '';
  movies.forEach((movie) => {
    domString += '<div class="col-5 mb-5">';
    domString += `<div class="card" id="${movie.id}">`;
    domString += `<h2>${movie.title}</h2>`;
    domString += `<h2>Rating: ${movie.movieRating}</h2>`;
    domString += `<img src="${movie.imageUrl}"/>`;
    domString += '<button type="button" class="btn btn-primary watchList">Add to my watchlist</button>';
    domString += '<button type="button" class="btn btn-info rating">Add Rating</button>';
    domString += `<button id="delete.${movie.id}" class="btn btn-danger deleteButton">Delete</button>`;
    domString += '</div>';
    domString += '</div>';
  });
  util.printToDom('movies', domString);
  addEventListeners();
};

const getMovies = (uid) => {
  movieData.getMoviesByUid(uid)
    .then(() => {
    })
    .catch(err => console.error('no movies from moviesData', err));
};

const getMovieData = (uid) => {
  movieData.getMoviesByUid(uid)
    .then((movies) => {
      movieStringBuilder(movies);
    }).catch(err => console.error(err));
};

export default { getMovieData };
