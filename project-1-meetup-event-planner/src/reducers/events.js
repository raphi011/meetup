const events = (state = [], action) => {
  switch (action.type) {
    case 'ADD_EVENT':
      return [
        ...state, {name: action.name}
      ];
    case 'LOAD_EVENTS':
      return {

      };
    default:
      return state;
  }
};

export default events;
