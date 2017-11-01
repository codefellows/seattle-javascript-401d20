export default store => next => action => {
  try {
    console.log('__ACTION__', action);
    let result = next(action);
    console.log('__STATE__', store.getState());
    return result;
  } catch(error) {
    console.error('__VALIDATION_ERROR__', error);
    action.error = error;
    return action;
  }
};
