import produce from 'immer';
import {
  USER_FETCHING,
  USER_RESOLVED,
  USER_REJECTED,
} from '../services/UserService';

// INITIAL STATE

const userState = {
  user_status: 'void',
  error: null,
  user: {
    firstName: null,
    lastName: null,
  },
};

// ACTIONS CREATOR

export const setFirstName = (firstName) => ({
  type: 'setFirstName',
  payload: { firstName: firstName },
});

export const setLastName = (lastName) => ({
  type: 'setLastName',
  payload: { lastName: lastName },
});

// USER REDUCER

export default function userReducer(state = userState, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case 'setFirstName': {
        const firstName = action.payload.firstName;
        return produce(state, (draft) => {
          //draft.firstName = firstName;
          draft.user.firstName = firstName;
        });
      }
      case 'setLastName': {
        const lastName = action.payload.lastName;
        return produce(state, (draft) => {
          //draft.lastName = lastName;
          draft.user.lastName = lastName;
        });
      }
      case 'LogOutUser': {
        return produce(state, (draft) => {
          draft.user.firstName = null;
          draft.user.lastName = null;
          draft.user_status = 'void';
          draft.error = null;
        });
      }
      case USER_FETCHING: {
        if (draft.user_status === 'void') {
          draft.user_status = 'pending';
          return;
        }
        if (draft.user_status === 'rejected') {
          draft.error = null;
          draft.user_status = 'pending';
          return;
        }
        if (draft.user_status === 'resolved') {
          draft.user_status = 'updating';
          return;
        }
        return;
      }
      case USER_RESOLVED: {
        if (
          draft.user_status === 'pending' ||
          draft.user_status === 'updating'
        ) {
          draft.user_status = 'resolved';
          return;
        }
        return;
      }
      case USER_REJECTED: {
        if (
          draft.user_status === 'pending' ||
          draft.user_status === 'updating'
        ) {
          draft.error = action.payload;
          //draft.firstName = null;
          draft.user.firstName = null;
          //draft.lastName = null;
          draft.user.lastName = null;
          draft.user_status = 'rejected';
          return;
        }
        return;
      }
      default:
        return;
    }
  });
}
