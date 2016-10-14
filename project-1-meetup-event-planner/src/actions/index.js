export const addEvent = name => {
  return (
  {
    type: 'ADD_EVENT',
    name
  }
  );
};

export const loadEvents = () => {
  return (
  {
    type: 'LOAD_EVENTS'
  }
  );
};

export const register = (name, email, password, birthday) => {
  return (
  {
    type: 'REGISTER',
    name,
    email,
    password,
    birthday
  }
  );
};

export const login = (email, password) => {
  return (
  {
    type: 'LOGIN',
    email,
    password
  }
  );
};
