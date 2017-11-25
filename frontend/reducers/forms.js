import { combineForms} from 'react-redux-form';

import user from './user';


export default combineForms({
  user,
}, 'myForms');
