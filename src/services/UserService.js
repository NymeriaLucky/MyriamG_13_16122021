import { setFirstName, setLastName } from '../reducers/userReducer';
import { selectUser } from '../Selectors/selector';
import UserMapper from '../mappings/userMapper';

export const USER_FETCHING = 'user/fetching';
export const USER_RESOLVED = 'user/resolved';
export const USER_REJECTED = 'user/rejected';

// FETCHING ACTIONS
const userFetching = () => ({ type: USER_FETCHING });
const userResolved = () => ({ type: USER_RESOLVED });
const userRejected = (error) => ({ type: USER_REJECTED, payload: error });

export async function userService(store, token, method) {
    const status = selectUser(store.getState()).user_status;
    const firstName = selectUser(store.getState()).user.firstName;
    const lastName = selectUser(store.getState()).user.lastName;
    if (status === 'pending' || status === 'updating') {
        return;
    }
    store.dispatch(userFetching());
    try {
        const response = await fetch(
            'http://localhost:3001/api/v1/user/profile',
            {
                method: method,
                headers: {
                    Accept: 'application/json',
                    Authorization: 'Bearer ' + token,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    firstName: firstName,
                    lastName: lastName,
                }),
            }
        );
        const json = await response.json();
        store.dispatch(userResolved());
        if (method === 'POST') {
            store.dispatch(
                setFirstName(UserMapper.convertToUser(json).firstName)
            );
            store.dispatch(
                setLastName(UserMapper.convertToUser(json).lastName)
            );
        }
    } catch (error) {
        console.log(error.message);
        store.dispatch(userRejected(error.message));
    }
}
