import axios from 'axios';
import apiKeys from '../apiKeys.json';

const firebaseUrl = apiKeys.firebaseKeys.databaseURL;

const getMoviesByUid = () => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/movies.json`)
    .then((results) => {
      const movieResults = results.data;
      const moviesArray = [];
      Object.keys(movieResults).forEach((movieId) => {
        movieResults[movieId].id = movieId;
        moviesArray.push(movieResults[movieId]);
      });
      resolve(moviesArray);
    })
    .catch(err => reject(err));
});

const addMovie = movieObject => axios.post(`${firebaseUrl}/movies.json`, movieObject);

const deleteMovie = movieId => axios.delete(`${firebaseUrl}/movies/${movieId}.json`);

export default { getMoviesByUid, addMovie, deleteMovie };
