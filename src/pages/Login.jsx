import { useState } from 'react';
import { useDispatch, useStore, useSelector } from 'react-redux';
import { setEmail, setPassword } from '../reducers/loginReducer';
import { selectLogin } from '../Selectors/selector';
import { loginService } from '../services/LoginService';
import { Redirect } from 'react-router-dom';
import { Loader } from '../components/Loader';

export default function Login() {
    // REDUX FUNCTIONS
    const store = useStore();
    const dispatch = useDispatch();
    const login = useSelector(selectLogin);

    // REACT LOCAL FUNCTIONS
    const [checkBox, setCheckBox] = useState(false);
    const [email, setFormEmail] = useState('');
    const [password, setFormPassword] = useState('');

    /**
     * UPDATE EMAIL AND PASSWORD IN REDUX LOGIN STATE
     *
     * THEN
     *
     * CALL PUSH SERVICE TO TRY TO CONNECT USER
     */
    const handleSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!email || !password) {
            return;
        }

        dispatch(setEmail(email));
        dispatch(setPassword(password));

        loginService(store);
    };

    // REDUX STATE
    const isLoading = login.status === 'pending';
    const error = login.error;

    return (
        <>
            <main className="main bg-dark">
                <section className="sign-in-content">
                    {isLoading ? (
                        <div className="loader-wrapper">
                            <Loader />
                        </div>
                    ) : (
                        <>
                            <i className="fa fa-user-circle sign-in-icon"></i>
                            <h1>Sign In</h1>
                            <form onSubmit={handleSubmit}>
                                <div className="input-wrapper">
                                    <label htmlFor="username">Username</label>
                                    <input
                                        type="text"
                                        id="username"
                                        onChange={(e) =>
                                            setFormEmail(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="input-wrapper">
                                    <label htmlFor="password">Password</label>
                                    <input
                                        type="password"
                                        id="password"
                                        onChange={(e) =>
                                            setFormPassword(e.target.value)
                                        }
                                    />
                                    {error && (
                                        <p className="input-alert">
                                            Merci de saisir un identifiant et
                                            mot de passe valide
                                        </p>
                                    )}
                                </div>
                                <div className="input-remember">
                                    {checkBox ? (
                                        <input
                                            type="checkbox"
                                            id="remember-me"
                                            defaultChecked
                                            onChange={() =>
                                                setCheckBox(!checkBox)
                                            }
                                        />
                                    ) : (
                                        <input
                                            type="checkbox"
                                            id="remember-me"
                                            onChange={() =>
                                                setCheckBox(!checkBox)
                                            }
                                        />
                                    )}

                                    <label htmlFor="remember-me">
                                        Remember me
                                    </label>
                                </div>
                                <button className="sign-in-button">
                                    Sign In
                                </button>
                            </form>
                        </>
                    )}
                </section>
                {login.status === 'resolved' ? (
                    <Redirect
                        to={{
                            pathname: `/profile`,
                        }}
                    />
                ) : null}
            </main>
        </>
    );
}
