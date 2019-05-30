import firebase from 'firebase/app';
import '../styles/main.scss';
import 'bootstrap';
import auth from './components/auth/auth';
import MyNavbar from './components/MyNavbar/MyNavbar';
import authData from './helpers/data/authData';
import apiKeys from './helpers/apiKeys.json';

const init = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  MyNavbar.navbarEvents();
  authData.checkLoginStatus();
  auth.authStringBuilder();
};

init();
