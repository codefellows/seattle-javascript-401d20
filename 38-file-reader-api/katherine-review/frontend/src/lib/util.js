'use strict';

export const renderIf = (test, component) => test ? component : undefined;

export const classToggler = (options) =>
  Object.keys(options).filter(key => options[key]).join(' ');

let cookieTime = (days) => {
  let result = new Date();
  result.setTime(result.getTime() + (days * 86400000));
  return result.toUTCString();
};

export const cookieCreate = (name, value, days) => {
  let expires = days ? ` ${cookieTime(days)};` : '';
  document.cookie = `${name}=${value};${expires} path='/'`;
};

export const cookieFetchAll = () => {
  return Object.assign(...document.cookie.split(';')
    .map(cookie => {
      let [key, value] = cookie.split('=');
      return {[key.trim()]: value};
    }));
};

export const cookieFetch = (key) => {
  return cookieFetchAll()[key];
};

export const cookieDelete = (key) => {
  document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
};
