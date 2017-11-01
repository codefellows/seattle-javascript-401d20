export const validateProfile = (profile) => {
  if(!profile)
    throw new Error('profile required');
  let {username, email, bio, owner} = profile;
  if(!username || !email ||! bio || !owner)
    throw new Error('__VALIDATION_ERROR__ invalid profile');
};

export default (state=null, {type, payload}) => {
  switch(type){
  case 'CLIENT_PROFILE_SET':
    validateProfile(payload);
    return payload;
  case 'TOKEN_REMOVE':
    return null;
  default:
    return state;
  }
};
