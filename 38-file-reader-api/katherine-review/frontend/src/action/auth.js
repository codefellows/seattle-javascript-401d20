import {cookieDelete} from '../lib/util.js';
import superagent from 'superagent';

export const tokenSet = (token) => ({
  type: 'TOKEN_SET',
  payload: token,
});

export const tokenRemove = () => ({
  type: 'TOKEN_REMOVE',
});

export const logout = () => {
  cookieDelete('X-Sluggram-Token');
  return tokenRemove();
};

export const signup = (user) => (store) => {
  return superagent.post(`${__API_URL__}/auth`)
  .send(user)
  .withCredentials()
  .then(res => {
    return store.dispatch(tokenSet(res.body.token));
  });
};

export const login = (user) => (store) => {
  return superagent.get(`${__API_URL__}/auth`)
  .auth(user.username, user.password)
  .withCredentials()
  .then(res => {
    console.log('test');
    console.log('res: ', {res});
    return store.dispatch(tokenSet(res.body.token));
  });
};
