import { combineForms} from 'react-redux-form';

import eventCreate from './eventCreate';
import user from './user';


export default combineForms({
  user,
  eventCreate,
}, 'myForms');
