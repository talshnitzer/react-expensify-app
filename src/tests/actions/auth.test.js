import { login, logout } from '../../actions/auth';
import uuid from 'uuid';

test('should setup login action object', () => {
    const uid = uuid();
    const action = login(uid);
    expect(action).toEqual({
        type: 'LOGIN',
        uid
    });
});

test('should setup logout action object', () => {
    const action = logout();
    expect(action).toEqual({
        type: 'LOGOUT'
    });
});