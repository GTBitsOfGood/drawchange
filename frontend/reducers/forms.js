import { combineForms} from 'react-redux-form';

import eventCreate from './eventCreate';


export default combineForms({
  eventCreate,
}, 'myForms');