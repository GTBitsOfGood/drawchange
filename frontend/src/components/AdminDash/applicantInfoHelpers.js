export const statusToColorMap = {
  got_initial_email: 'warning',
  responded_to_email: 'warning',
  admitted: 'success',
  denied: 'danger'
};

const defaultStatus = {
  get: function(target, name) {
    return target.hasOwnProperty(name) ? target[name] : 'Admitted';
  }
};

const defaultRole = {
  get: function(target, name) {
    return target.hasOwnProperty(name) ? target[name] : 'Volunteer';
  }
};

export const statuses = new Proxy(
  {
    admitted: 'Admitted',
    denied: 'Denied',
    got_initial_email: 'Got Initial Email',
    responded_to_email: 'Responded To Email'
  },
  defaultStatus
);

export const roles = new Proxy(
  {
    admin: 'Administrator',
    manager: 'Manager',
    volunteer: 'Volunteer'
  },
  defaultRole
);

export const getStatusColor = status => statusToColorMap[status] || 'success';

export const getStatusLabel = key => {
  const words = key.split('_');
  const capitalizedWords = words.map(word => `${word[0].toUpperCase()}${word.slice(1)}`);
  return capitalizedWords.join(' ');
};
