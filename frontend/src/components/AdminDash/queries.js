import axios from 'axios';

export const filterApplicants = filterGroups => {
  let filtersToApply = {};
  const query = Object.entries(filterGroups).reduce((queryString, [group, { values }]) => {
    Object.entries(values).forEach(([filter, filterValue]) => {
      if (filterValue) {
        console.log(filterValue);
        if (!filtersToApply[group]) filtersToApply[group] = {};
        filtersToApply[group][filter] = filterValue;
      }
    });
    if (!filtersToApply[group]) {
      return queryString;
    } else {
      return `${queryString}${group}=${JSON.stringify(filtersToApply[group])}&`;
    }
  }, '');
  return axios.get('/api/users?' + query);
};

export const fetchApplicants = () => axios.get('/api/users');

export const updateApplicantStatus = (email, status) =>
  axios.post(`/api/users/updateStatus?email=${email}&status=${status}`);

export const updateApplicantComments = (email, comments) =>
  axios.post(`/api/users/updateComments?email=${email}&comments=${comments}`);

export const searchApplicants = textinput => {
  return axios.get('/api/users/searchByContent', {
    params: { searchquery: textinput }
  });
};
