import axios from 'axios';

export const filterApplicants = filterGroups => {
  let filtersToApply = {};
  const query = Object.entries(filterGroups).reduce((queryString, [group, { values }]) => {
    const dateRanges = [];
    Object.entries(values).forEach(([filter, filterValue]) => {
      if (filterValue) {
        if (group === 'date') {
          var tod = new Date();
          var fromd = new Date();
          switch (filter) {
            case 'past_month':
              if (fromd.getMonth() === 0) {
                fromd.setMonth(11);
                fromd.setFullYear(fromd.getFullYear() - 1);
              } else {
                fromd.setMonth(fromd.getMonth() - 1);
              }
              fromd.setHours(0, 0, 0, 0);
              break;
            case 'past_6_months':
              if (fromd.getMonth() < 6) {
                fromd.setFullYear(fromd.getFullYear() - 1);
                fromd.setMonth(11 - (5 - fromd.getMonth()));
              } else {
                fromd.setMonth(fromd.getMonth() - 6);
              }
              fromd.setHours(0, 0, 0, 0);
              break;

            case 'from_current_year':
              fromd.setMonth(0);
              fromd.setDate(1);
              fromd.setHours(0, 0, 0, 0);
              break;
            case 'from_one_year_ago':
              fromd.setFullYear(fromd.getFullYear() - 1);
              tod.setFullYear(tod.getFullYear() - 1);
              fromd.setHours(0, 0, 0, 0);
              fromd.setMonth(0);
              fromd.setDate(1);
              tod.setMonth(11);
              tod.setDate(31);
              tod.setHours(23, 59, 59, 1000);
              break;
            case 'from_two_years_ago':
              fromd.setFullYear(fromd.getFullYear() - 2);
              tod.setFullYear(tod.getFullYear() - 2);
              fromd.setHours(0, 0, 0, 0);
              fromd.setMonth(0);
              fromd.setDate(1);
              tod.setMonth(11);
              tod.setDate(31);
              tod.setHours(23, 59, 59, 1000);
              break;
            case 'older':
              fromd.setFullYear(2000);
              tod.setFullYear(fromd.getFullYear() - 3);
              tod.setMonth(11);
              tod.setDate(31);
              tod.setHours(23, 59, 59, 1000);
              break;
            default:
              break;
          }
          dateRanges.push({ from: fromd, to: tod });
        }

        if (!filtersToApply[group]) filtersToApply[group] = {};
        filtersToApply[group][filter] = filterValue;
      }
    });
    if (group === 'date') {
      filtersToApply[group] = dateRanges;
    }
    if (!filtersToApply[group]) {
      return queryString;
    } else {
      return `${queryString}${group}=${JSON.stringify(filtersToApply[group])}&`;
    }
  }, '');
  return axios.get('/api/users?' + query);
};

export const fetchMoreApplicants = lastPaginationId =>
  axios.get(`/api/users?${lastPaginationId ? 'lastPaginationId=' + lastPaginationId : ''}`);

export const fetchUserManagementData = lastPaginationId =>
  axios.get(
    `/api/users/managementData?${lastPaginationId ? 'lastPaginationId=' + lastPaginationId : ''}`
  );

export const fetchUserCount = () => axios.get('/api/users/count');

export const updateApplicantStatus = (email, status) =>
  axios.post(`/api/users/updateStatus?email=${email}&status=${status}`);

export const updateApplicantComments = (email, comments) =>
  axios.post(`/api/users/updateComments?email=${email}&comments=${comments}`);

export const updateApplicantRole = (email, role) =>
  axios.post(`/api/users/updateRole?email=${email}&role=${role}`);

export const searchApplicants = (textinput, searchType) => {
  return axios.get('/api/users/searchByContent', {
    params: { searchquery: textinput, searchtype: searchType }
  });
};
