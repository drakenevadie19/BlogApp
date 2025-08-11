//Navbar 
import { Link, useNavigate } from 'react-router-dom';

import useUser from './hooks/useUsers';

import { getAuth, signOut } from 'firebase/auth';
import { useState } from 'react';

const Navbar = () => {
    const {user} = useUser();
    const [pageRendering, setPageRendering] = useState(1);

    const [openUserTab, setOpenUserTab] = useState(false);

    const navigate = useNavigate();

    const logOut = () => {
        setOpenUserTab(false);
        const auth = getAuth();
        signOut(auth)
            .then(() => {
                navigate('/login');
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className='navbar-wrapper'>
            <nav>
                <ul className='nav-bar'>
                    <li>
                        <Link to="/" onClick={() => setPageRendering(1)} className={`${pageRendering === 1 ? 'clicked' : ''}`}>Home</Link>
                    </li>
                    <li>
                        <Link to="/articles" onClick={() => setPageRendering(3)} className={`${pageRendering === 3 ? 'clicked' : ''}`}>Article</Link>
                    </li>
                    <li>
                        <Link to="/about" onClick={() => setPageRendering(2)} className={`${pageRendering === 2 ? 'clicked' : ''}`}>About Me</Link>
                    </li>
                </ul>

                <div className='nav-right'>
                    <div></div>
                    {user
                        ? 
                            <div className='profile-wrapper' onClick={() => setOpenUserTab(true)}>
                                <img src={user.photoURL ? user.photoURL : './autoProfile.png'} className='profile-image' alt='profile' />
                                <p className='profile-name'>{user.email}</p>
                            </div>
                        : 
                            <button className='log-in-button' onClick={() => {
                                navigate('/login');
                            }}>Log In</button>
                    }
                </div>
            </nav>
            
            {openUserTab && 
                <div className='hidden-user-tab'>
                    {/* <div className='black-panel'>
                    </div> */}
                    <div className='white-panel'>
                        <button onClick={() => setOpenUserTab(false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-square" viewBox="0 0 16 16">
                                <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                            </svg>
                        </button>
                        <button className='log-out-button' onClick={logOut}>Log Out</button>
                    </div>
                </div>
            }
        </div>
    );
}

export default Navbar;