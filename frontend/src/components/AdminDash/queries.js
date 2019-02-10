import axios from 'axios';

export const filterApplicants = filterGroups => {
  let filtersToApply = {};
  Object.entries(filterGroups).forEach(([group, { values }]) => {
    Object.entries(values).forEach(([filter, filterValue]) => {
      if (filterValue) {
        if (!filtersToApply[group]) filtersToApply[group] = {};
        filtersToApply[group][filter] = filterValue;
      }
    });
  });
  return axios.post('/api/users/filter', { data: JSON.stringify(filtersToApply) });
};
