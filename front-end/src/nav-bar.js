//Navbar 
import { Link, useNavigate } from 'react-router-dom';

import useUser from './hooks/useUsers';

import { getAuth, signOut } from 'firebase/auth';
import { useState } from 'react';

const Navbar = () => {
    const {user} = useUser();
    const [pageRendering, setPageRendering] = useState(1);

    const navigate = useNavigate();

    return (
        <nav>
            <ul className='nav-bar'>
                <li>
                    <Link to="/" onClick={() => setPageRendering(1)} className={`${pageRendering === 1 ? 'clicked' : ''}`}>Home</Link>
                </li>
                <li>
                    <Link to="/about" onClick={() => setPageRendering(2)} className={`${pageRendering === 2 ? 'clicked' : ''}`}>About</Link>
                </li>
                <li>
                    <Link to="/articles" onClick={() => setPageRendering(3)} className={`${pageRendering === 3 ? 'clicked' : ''}`}>Article</Link>
                </li>
            </ul>

            <div className='nav-right'>
                {user
                    ? <button onClick={ () => {
                        signOut(getAuth());
                    }}>Log Out</button>
                    : <button onClick={() => {
                        navigate('/login');
                    }}>Log In</button>
                }
            </div>
        </nav>
    );
}

export default Navbar;