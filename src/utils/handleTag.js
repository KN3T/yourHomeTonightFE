const handleTag = (status) => {
  switch (status) {
    case 2:
      return { color: '#87d068', text: 'Success' };
    case 3:
      return { color: '#f50', text: 'Cancelled' };
    case 4:
      return { color: '#87d068', text: 'Paid' };
    default:
      return { color: 'magenta', text: 'Pending' };
  }
};
export default handleTag