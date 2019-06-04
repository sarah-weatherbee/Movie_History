// import firebase from 'firebase/app';
// import 'firebase/auth';
// import util from '../../helpers/util';
// import movieData from '../../helpers/data/movieData';
// import userMovieData from '../../helpers/data/userMovieData';

// const getMovieData = () => {
//   movieData.getMovies().then((movies) => {
//     const userId = firebase.auth().currentUser.uid;
//     userMovieData.getWatchList(userId).then((watchListItems) => {
//       console.error(movies, watchListItems);
//     });
//   });
// };