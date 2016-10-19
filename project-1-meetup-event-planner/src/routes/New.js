import React from 'react';

import NewEventForm from '../components/NewEventForm';

const New = ({user}) => {
  return (
    <div className="mdl-grid" >
      <div className="mdl-cell mdl-cell--12-col">
        <NewEventForm user={user} showSubmitButton={true} />
      </div>
    </div>
  );
};

export default New;
