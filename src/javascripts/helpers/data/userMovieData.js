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

const addUserMovie = watchlistObject => axios.post(`${firebaseUrl}/userMovies.json`, watchlistObject);

const deletWatchlistMovie = userMovieId => axios.delete(`${firebaseUrl}/userMovies/${userMovieId}.json`);

const getWatchList = userId => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/userMovies.json?orderBy="uid"&equalTo="${userId}"`)
    .then((results) => {
      const watchListResults = results.data;
      const watchListArray = [];
      Object.keys(watchListResults).forEach((watchListId) => {
        watchListResults[watchListId].id = watchListId;
        if (!watchListResults[watchListId].isWatched) {
          watchListArray.push(watchListResults[watchListId]);
        }
      });
      resolve(watchListArray);
    })
    .catch(err => reject(err));
});

const addNewMovie = userMovieObject => axios.post(`${firebaseUrl}/userMovies.json`, userMovieObject);

export default {
  deletWatchlistMovie,
  addNewMovie,
  getUserMovies,
  addUserMovie,
  getWatchList,
};
