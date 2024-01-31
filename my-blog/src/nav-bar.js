//Navbar 
import { Link, useNavigate } from 'react-router-dom';

import useUser from './hooks/useUsers';

import { getAuth, signOut } from 'firebase/auth';
import { useState } from 'react';

const Navbar = () => {
    const [toFind, setToFind] = useState("No Thing"); 
    const {user} = useUser();

    const navigate = useNavigate();

    const handleChange = (e) => {
        setToFind(e.target.value);
    }

    const findElement = () => {
        navigate(`/find-articles/${toFind}`);
    }

    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
                <li>
                    <Link to="/articles">Article</Link>
                </li>
            </ul>
            <div className='find-article'>
                <form className='d-flex' role='search' onSubmit={findElement}>
                    <input class="form-control me-2" type="search" placeholder="Search" name={toFind} aria-label="Search" onChange={handleChange} />
                    <button class="btn btn-outline-success" type="submit">Search</button>
                </form>
                {/* <p>{toFind}</p> */}
            </div>
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