import firebase from 'firebase/app';
import 'firebase/auth';
import util from '../../helpers/util';
import movieData from '../../helpers/data/movieData';
import userMovieData from '../../helpers/data/userMovieData';
import SMASH from '../../helpers/smash';


const deleteWatchlistMovieEvent = (e) => {
  const watchlistMovieId = e.target.id.split('.')[1];
  userMovieData.deletWatchlistMovie(watchlistMovieId)
    .then(() => {
      getWatchListData(firebase.auth().currentUser.uid); // eslint-disable-line no-use-before-define
      document.location.reload();
    }).catch(err => console.error('no delete watchlist movie for you', err));
};

const addWatchlistEventListeners = () => {
  const watchlistDeleteButtons = document.getElementsByClassName('watchlistDeleteButton');
  for (let j = 0; j < watchlistDeleteButtons.length; j += 1) {
    watchlistDeleteButtons[j].addEventListener('click', deleteWatchlistMovieEvent);
  }
};

const watchlistMovieStringBuilder = (movies) => {
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
  addWatchlistEventListeners();
};

const getWatchListData = () => {
  movieData.getMoviesByUid().then((movies) => {
    const userId = firebase.auth().currentUser.uid;
    userMovieData.getWatchList(userId).then((watchListItems) => {
      const watchlistMovies = SMASH.watchlistMovies(movies, watchListItems);
      watchlistMovieStringBuilder(watchlistMovies);
    });
  });
};

export default { getWatchListData };
