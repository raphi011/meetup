import React from 'react';

import NewEventForm from '../components/NewEventForm';

const New = ({user}) => {
  return (
    <NewEventForm user={user} />
  );
};

New.propTypes = {
  user: React.PropTypes.object
};

export default New;
