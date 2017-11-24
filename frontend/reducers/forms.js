import { combineForms} from 'react-redux-form';

const initialUserState = {
  email: '',
  password: '',
  first_name: '',
  last_name: '',
  phone_number: '',
  date_of_birth: Date.now(),
  street_address: '',
  city: '',
  state: '',
  zip_code: '',
  volunteer_availability: {
    weekday_mornings: false,
    weekday_afternoons: false,
    weekday_evenings: false,
    weekend_mornings: false,
    weekend_afternoons: false,
    weekend_evenings: false,
  },
  skills_interests: {
    admin_in_office: false,
    admin_virtual: false,
    atlanta_shelter: false,
    orlando_shelter: false,
    graphic_web_design: false,
    special_events: false,
    grant_writing: false,
    writing_editing: false,
    social_media: false,
    fundraising: false,
    finance: false,
    office_maintenance_housekeeping: false,
    international_projects: false,
    volunteer_coordination: false,
    outreach: false,
  }
};

export default combineForms({
  user: initialUserState,
}, 'myForms');
