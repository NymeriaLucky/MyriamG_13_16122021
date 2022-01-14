import { useEffect, useState } from 'react';
import { useStore, useSelector, useDispatch } from 'react-redux';
import { selectUser, selectLogin } from '../Selectors/selector';
import { userService } from '../services/UserService';
import { setFirstName, setLastName } from '../reducers/userReducer';
import { Redirect } from 'react-router-dom';

export default function Profile() {
  // REDUX FUNCTIONS
  const store = useStore();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const login = useSelector(selectLogin);
  const token = selectLogin(store.getState()).token;

  // REACT LOCAL FUNCTIONS
  const [editProfile, setEditor] = useState(false);
  const [newFirstName, setNewFirstName] = useState('');
  const [newLastName, setNewLastName] = useState('');

  // REGEX
  const regexName = /^[a-zA-Z]+[a-zA-Z'-]?[a-zA-Z]+$/;

  /**
   * RECOVERING USER DETAILS WITH USER SERVICE
   */
  useEffect(() => {
    token && userService(store, token, 'POST');
  }, [store, token]);

  /**
   * REGEX TEST TO SECURE THE UPDATE OF REDUX USER STATE
   *
   * THEN
   *
   * CALL PUT SERVICE TO UPDATE USER IDENTITY
   */
  const editNav = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (regexName.test(newFirstName) && newFirstName !== user.user.firstName) {
      dispatch(setFirstName(newFirstName));
    }
    if (regexName.test(newLastName) && newLastName !== user.user.LastName) {
      dispatch(setLastName(newLastName));
    }
    userService(store, token, 'PUT');
    setEditor(false);
  };

  return (
    <>
      {login.status === 'resolved' || user.user.firstName ? (
        <>
          {user.user_status === 'resolved' && (
            <>
              <main className="main bg-dark">
                <div className="header">
                  {editProfile ? (
                    <>
                      <h1>Welcome back</h1>
                      <form onSubmit={editNav}>
                        <div className="user-input">
                          <input
                            className="user-input-editor"
                            type="text"
                            id="username"
                            placeholder={user.user.firstName}
                            onChange={(e) => setNewFirstName(e.target.value)}
                          />
                          <input
                            className="user-input-editor"
                            type="text"
                            id="lastname"
                            placeholder={user.user.lastName}
                            onChange={(e) => setNewLastName(e.target.value)}
                          />
                        </div>
                        <div className="user-button">
                          <button className="user-edit-button" type="submit">
                            Save
                          </button>
                          <button
                            className="user-edit-button"
                            onClick={() => setEditor(false)}
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    </>
                  ) : (
                    <>
                      <h1>
                        Welcome back
                        <br />
                        {user.user.firstName} {user.user.lastName}
                      </h1>
                      <button
                        className="edit-button"
                        onClick={() => setEditor(true)}
                      >
                        Edit Name
                      </button>
                    </>
                  )}
                </div>
                <h2 className="sr-only">Accounts</h2>
                <section className="account">
                  <div className="account-content-wrapper">
                    <h3 className="account-title">
                      Argent Bank Checking (x8349)
                    </h3>
                    <p className="account-amount">$2,082.79</p>
                    <p className="account-amount-description">
                      Available Balance
                    </p>
                  </div>
                  <div className="account-content-wrapper cta">
                    <button className="transaction-button">
                      View transactions
                    </button>
                  </div>
                </section>
                <section className="account">
                  <div className="account-content-wrapper">
                    <h3 className="account-title">
                      Argent Bank Savings (x6712)
                    </h3>
                    <p className="account-amount">$10,928.42</p>
                    <p className="account-amount-description">
                      Available Balance
                    </p>
                  </div>
                  <div className="account-content-wrapper cta">
                    <button className="transaction-button">
                      View transactions
                    </button>
                  </div>
                </section>
                <section className="account">
                  <div className="account-content-wrapper">
                    <h3 className="account-title">
                      Argent Bank Credit Card (x8349)
                    </h3>
                    <p className="account-amount">$184.30</p>
                    <p className="account-amount-description">
                      Current Balance
                    </p>
                  </div>
                  <div className="account-content-wrapper cta">
                    <button className="transaction-button">
                      View transactions
                    </button>
                  </div>
                </section>
              </main>
            </>
          )}
        </>
      ) : (
        <Redirect
          to={{
            pathname: `/`,
          }}
        />
      )}
    </>
  );
}
