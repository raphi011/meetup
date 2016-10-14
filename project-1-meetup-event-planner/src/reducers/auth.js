const auth = (state = {}, action) => {
  switch (action.type) {
    /* case 'LOGIN':
      return {
        ...state,

        events: [...state.events, {name: action.name}]
      };
    case 'LOGOUT':
      return {

      }; */
    default:
      return state;
  }
};

export default auth;
