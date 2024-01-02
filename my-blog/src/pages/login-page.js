import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// import from Firebase: 
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';

const LoginPage = () => {
    //create an email and password states
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // When user input a non-existing email, or incorrect password, we will display an error
    //  => this state will be used to track for errors.
    const [error, setError] = useState('');

    const navigate = useNavigate();
 
    //Login Function => Call when click the log In button 
    const logIn = async () => {
        // call signInWithEmailAndPassword function with email and password 
        // For Firenbase function, first arfument is Firebase Auth reference => getAuth()
        //  next arguments are email and passwords
        // Nest it to a try catch => whenever there are errors with logging in, display error
        try {
            await signInWithEmailAndPassword(getAuth(), email, password);
            // If logging in is successful, we will route to the home page
            navigate('/articles')
        } catch (e) {
            setError(e.message)
        }
    }

    return (
        <>
            <h1>Log In</h1>
            {/* if error exists, then we will display {error}  */}
            {error && <p className="error">{error}</p>}
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Your Email Address" /> 
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Your Password" />
            {/* 
                We will use Firebase Auth here 
                => import 2 things 
            
            */}
            <button onClick={logIn}>Log In</button> <br />
            <p>Does not have account yet?</p><Link to="/create-account">Create One</Link>
        </>
    )
}

export default LoginPage;