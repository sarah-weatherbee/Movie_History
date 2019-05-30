import util from '../../helpers/util';
import movieData from '../../helpers/data/movieData';

const movieStringBuilder = () => {
  movieData.getMovies().then((movies) => {
    let domString = '';
    movies.forEach((movie) => {
      domString += '<div class="col-5 mb-5">';
      domString += '<div class="card">';
      domString += `<h2>${movie.title}</h2>`;
      domString += `<h2>Rating: ${movie.movieRating}</h2>`;
      domString += `<img src="${movie.imageUrl}"/>`;
      domString += '</div>';
      domString += '</div>';
    });
    util.printToDom('movies', domString);
  }).catch(err => console.error('could not get movie', err));
};

export default { movieStringBuilder };
