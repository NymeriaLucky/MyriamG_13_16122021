import produce from 'immer';
import { FETCHING, RESOLVED, REJECTED } from '../services/LoginService';

// INITIAL STATE

const loginState = {
  credentials: {
    email: null,
    password: null,
  },
  status: 'void',
  token: null,
  error: null,
};

// ACTIONS CREATOR

export const setEmail = (email) => ({
  type: 'setEmail',
  payload: {
    email: email,
  },
});

export const setPassword = (password) => ({
  type: 'setPassword',
  payload: {
    password: password,
  },
});

export const Log_out = () => ({
  type: 'LogOutUser',
});

// LOGIN REDUCER

export default function loginReducer(state = loginState, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case 'setEmail': {
        const email = action.payload.email;
        return produce(state, (draft) => {
          draft.credentials.email = email;
        });
      }
      case 'setPassword': {
        const password = action.payload.password;
        return produce(state, (draft) => {
          draft.credentials.password = password;
        });
      }
      case FETCHING: {
        if (draft.status === 'void') {
          draft.status = 'pending';
          return;
        }
        if (draft.status === 'rejected') {
          draft.error = null;
          draft.status = 'pending';
          return;
        }
        if (draft.status === 'resolved') {
          draft.status = 'updating';
          return;
        }
        return;
      }
      case RESOLVED: {
        if (draft.status === 'pending' || draft.status === 'updating') {
          draft.token = action.payload;
          draft.status = 'resolved';
          return;
        }
        return;
      }
      case REJECTED: {
        if (draft.status === 'pending' || draft.status === 'updating') {
          draft.error = action.payload;
          draft.token = null;
          draft.status = 'rejected';
          return;
        }
        return;
      }
      case 'LogOutUser': {
        draft.credentials.email = null;
        draft.credentials.password = null;
        draft.status = 'void';
        draft.token = null;
        draft.error = null;
        return;
      }
      default:
        return;
    }
  });
}
