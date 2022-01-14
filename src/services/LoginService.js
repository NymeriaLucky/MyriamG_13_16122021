import { selectLogin } from '../Selectors/selector';
import TokenMapper from '../mappings/tokenMapper';

export const FETCHING = 'login/fetching';
export const RESOLVED = 'login/resolved';
export const REJECTED = 'login/rejected';

// FETCHING  ACTIONS
const loginFetching = () => ({ type: FETCHING });
const loginResolved = (token) => ({ type: RESOLVED, payload: token });
const loginRejected = (error) => ({ type: REJECTED, payload: error });

export async function loginService(store) {
    const status = selectLogin(store.getState()).status;
    const email = selectLogin(store.getState()).credentials.email;
    const password = selectLogin(store.getState()).credentials.password;
    if (status === 'pending' || status === 'updating') {
        return;
    }
    store.dispatch(loginFetching());
    try {
        const response = await fetch(
            'http://localhost:3001/api/v1/user/login',
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            }
        );
        const json = await response.json();
        const token = TokenMapper.convertToToken(json).token;
        store.dispatch(loginResolved(token));
        localStorage.setItem('token', token);
    } catch (error) {
        console.log(error.message);
        store.dispatch(loginRejected(error.message));
    }
}
