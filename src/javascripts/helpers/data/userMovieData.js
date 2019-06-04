import axios from 'axios';
import apiKeys from '../apiKeys.json';

const firebaseUrl = apiKeys.firebaseKeys.databaseURL;

const getUserMovies = () => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/userMovie.json`)
    .then((results) => {
      const userMovieResults = results.data;
      const userMovies = [];
      Object.keys(userMovieResults).forEach((userMovieId) => {
        userMovieResults[userMovieId].id = userMovieId;
        userMovies.push(userMovieResults[userMovieId]);
      });
      resolve(userMovies);
    })
    .catch(err => reject(err));
});

const addMovieToWatchlist = watchlistObject => axios.post(`${firebaseUrl}/userMovies.json`, watchlistObject);


const getWatchList = userId => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/userMovies.json?orderBy="uid"&equalTo="${userId}"`)
    .then((results) => {
      const watchListResults = results.data;
      const watchListArray = [];
      Object.keys(watchListResults).forEach((watchListId) => {
        watchListResults[watchListId].id = watchListId;
        watchListArray.push(watchListResults[watchListId]);
      });
      resolve(watchListArray);
    })
    .catch(err => reject(err));
});

const addNewMovie = userMovieObject => axios.post(`${firebaseUrl}/userMovies.json`, userMovieObject);

export default {
  addNewMovie,
  getUserMovies,
  addMovieToWatchlist,
  getWatchList,
};
