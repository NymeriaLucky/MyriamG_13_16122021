import ArgentBankLogo from '../assets/argentBankLogo.png';
import { Link } from 'react-router-dom';
import { useStore, useSelector, useDispatch } from 'react-redux';
import { selectUser } from '../Selectors/selector';
import { Log_out } from '../reducers/loginReducer';
import { userService } from '../services/UserService';
import { useEffect } from 'react';

export default function Header() {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    //const login = useSelector(selectLogin);
    const store = useStore();

    useEffect(() => {
        const token = localStorage.getItem('token');
        token && userService(store, token, 'POST');
    }, [store]);

    const logOut = () => {
        dispatch(Log_out());
        localStorage.removeItem('token');
    };

    return (
        <nav className="main-nav">
            <Link className="main-nav-logo" to="/">
                <img
                    className="main-nav-logo-image"
                    src={ArgentBankLogo}
                    alt="Argent Bank Logo"
                />
                <h1 className="sr-only">Argent Bank</h1>
            </Link>
            <div>
                {user.user.firstName ? (
                    <>
                        <Link className="main-nav-item" to="/profile">
                            <i className="fa fa-user-circle"></i>{' '}
                            {user.user.firstName}
                        </Link>
                        <Link className="main-nav-item" to="/" onClick={logOut}>
                            <i className="fa fa-sign-out"></i> Sign Out
                        </Link>
                    </>
                ) : (
                    <Link className="main-nav-item" to="/sign-in">
                        <i className="fa fa-user-circle"></i> Sign In
                    </Link>
                )}
            </div>
        </nav>
    );
}
