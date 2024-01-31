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
            
                <li>
                    <div className='find-article'>
                        <form className="d-flex flex-row align-self-center" role='search' onSubmit={findElement}>
                            <div>                    
                                <input class="form-control me-2" type="search" placeholder="Search" name={toFind} aria-label="Search" onChange={handleChange} />
                            </div>
                            <div>
                                <button class="btn btn-outline-success search-now" type="submit">
                                    <span className='search-word'>Search</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search search-icon" viewBox="0 0 16 16">
                                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                                    </svg>
                                </button>
                            </div>
                        </form>
                    </div>
                </li>
            
                
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
            </ul>
        </nav>
    );
}

export default Navbar;