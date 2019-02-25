export const statusToColorMap = {
  got_initial_email: 'warning',
  responded_to_email: 'warning',
  admitted: 'success',
  denied: 'danger'
};

export const statuses = {
  admitted: 'Admitted',
  denied: 'Denied',
  got_initial_email: 'Got Initial Email',
  responded_to_email: 'Responded To Email'
};

export const getStatusColor = status => statusToColorMap[status];

export const getStatusLabel = key => {
  const words = key.split('_');
  const capitalizedWords = words.map(word => `${word[0].toUpperCase()}${word.slice(1)}`);
  return capitalizedWords.join(' ');
};
