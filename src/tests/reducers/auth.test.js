import authReducer from '../../reducers/auth';
import uuid from 'uuid';

test('should set uid at login', () => {
    const action = {
        type: 'LOGIN',
        uid: uuid()
    }
    const state = authReducer(undefined,action);
    expect(state).toEqual({uid: action.uid});
});

test('should clear uid at logout', () => {
    const action = {
        type: 'LOGOUT'
    }
    const state = authReducer({uid: uuid()},action);
    expect(state).toBeFalsy;
});