import firebase from 'firebase/app';
import '../styles/main.scss';
import 'bootstrap';
import auth from './components/auth/auth';
import movie from './components/movies/movies';
import apiKeys from './helpers/apiKeys.json';

const init = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  auth.authStringBuilder();
  movie.movieStringBuilder();
};

init();
