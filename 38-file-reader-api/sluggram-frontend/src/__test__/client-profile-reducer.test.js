import reducer from '../reducer/client-profile.js'

describe('clientProfile reducer', () => {
  test('the intial state shuld be null', () => {
    let state = reducer(undefined, {type: ''})
    expect(null).toEqual(null)
  })

  test('should set the proile', () => {
    let action  = {
      type: 'CLIENT_PROFILE_SET', 
      payload: {
        username: 'slug', 
        email: 'slug@slug.com',
        bio: 'slime is heaven',
        _id: '123',
        owner: 'abc',
      }
    }
    let state = reducer(undefined, action)
    expect(state).toEqual(action.payload)
  })

  test('should fail with no payload', () => {
    let shouldFail = () => {
      reducer(undefined, {type: 'CLIENT_PROFILE_SET'})
    }
    expect(shouldFail).toThrow('profile required')
  })

  test('should fail with invalid payload', () => {
    let shouldFail = () => {
      reducer(undefined, {
        type: 'CLIENT_PROFILE_SET',
        payload: {},
      })
    }
    expect(shouldFail).toThrow('__VALIDATION_ERROR__ invalid profile')
  })

  test('should return null on TOKEN_REMOVE', () => {
    let state = reducer('hello world', {type: 'TOKEN_REMOVE'})
    expect(state).toEqual(null)
  })

  test('should return the state', () => {
    let state = reducer('hello world', {type: ''})
    expect(state).toEqual('hello world')
  })
})
