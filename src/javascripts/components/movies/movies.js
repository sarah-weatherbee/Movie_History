import firebase from 'firebase/app';
import 'firebase/auth';
import util from '../../helpers/util';
import movieData from '../../helpers/data/movieData';
import userMovieData from '../../helpers/data/userMovieData';


const addToWatchlist = (e) => {
  e.preventDefault();
  const card = e.target.closest('.card');
  const newWatchListItem = {
    uid: firebase.auth().currentUser.uid,
    movieId: card.id,
    isWatched: false,
    rating: '',
  };
  userMovieData.addMovieToWatchlist(newWatchListItem);
};
const addWatchListListeners = () => {
  const buttons = document.querySelectorAll('.watchList');
  buttons.forEach((button) => {
    button.addEventListener('click', addToWatchlist);
  });
};


const movieStringBuilder = (movies) => {
  let domString = '';
  movies.forEach((movie) => {
    domString += '<div class="col-5 mb-5">';
    domString += `<div class="card" id="${movie.id}">`;
    domString += `<h2>${movie.title}</h2>`;
    domString += `<h2>Rating: ${movie.movieRating}</h2>`;
    domString += `<img src="${movie.imageUrl}"/>`;
    domString += '<button type="button" class="btn btn-primary watchList">Add to Watchlist</button>';
    domString += '<button type="button" class="btn btn-info rating">Add Rating</button>';
    domString += '</div>';
    domString += '</div>';
  });
  util.printToDom('movies', domString);
  addWatchListListeners();
};

const getMovieData = () => {
  movieData.getMovies().then((movies) => {
    movieStringBuilder(movies);
  }).catch(err => console.error(err));
};

export default { getMovieData };
