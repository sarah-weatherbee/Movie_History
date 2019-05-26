import util from '../../helpers/util';
import googleImage from './google-login-button.png';

const authStringBuilder = () => {
  const domString = 'auth';
  util.printToDom('auth', domString);
};

export default { authStringBuilder };
