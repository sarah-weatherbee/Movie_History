import firebase from 'firebase/app';
import '../styles/main.scss';
import 'bootstrap';
import auth from './components/auth/auth';
import movie from './components/movies/movies';
import apiKeys from './helpers/apiKeys.json';
import MyNavbar from './components/MyNavbar/MyNavbar';
import authData from './helpers/data/authData';

const init = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  MyNavbar.navbarEvents();
  authData.checkLoginStatus();
  auth.authStringBuilder();
  movie.movieStringBuilder();
};

init();
