import firebase from 'firebase/app';
import 'firebase/auth';
import movieData from '../../helpers/data/movieData';
import util from '../../helpers/util';
import movies from '../movies/movies';


const createNewMovie = (e) => {
  e.preventDefault();
  const newMovie = {
    title: document.getElementById('title').value,
    movieRating: document.getElementById('movieRatingId').value,
    imageUrl: document.getElementById('imageUrl').value,
    uid: firebase.auth().currentUser.uid,
  };
  movieData.addMovie(newMovie)
    .then(() => {
      document.getElementById('title').value = '';
      document.getElementById('imageUrl').value = '';
      document.getElementById('movieRatingId').value = '';
      document.getElementById('movies').classList.remove('hide');
      document.getElementById('new-movie').classList.add('hide');
      movies.getMovieData();
    })
    .catch(err => console.error('no movie for you', err));
};

const newMovieButton = () => {
  document.getElementById('movies').classList.add('hide');
  document.getElementById('new-movie').classList.remove('hide');
  document.getElementById('saveNewMovie').addEventListener('click', createNewMovie);
};

const showMovies = () => {
  const domString = '<button id="add-movies-button" class="btn btn-info">Add Movie</button>';
  util.printToDom('userMovie', domString);
  document.getElementById('add-movies-button').addEventListener('click', newMovieButton);
};

export default { showMovies };
