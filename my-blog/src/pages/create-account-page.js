import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// import from Firebase: 
import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth';

const CreateAccountPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [error, setError] = useState('');

    const navigate = useNavigate();

    //Implement Firebase here for signing up
    const createAccount = async () => {
        try {
            if (password !== confirmPassword) {
                setError('Password not match!');
                return; //if password not match, return => make user redo signing up
            } 

            await createUserWithEmailAndPassword(getAuth(), email, password); // => now we should have a new user
            navigate('/articles'); // After signing up, routing to the articles page
            // => Upvote and Comments are available for us
        } catch (e) {
            setError(e.message);
        }
    }

    return (
        <>
        <h1>Create a new account</h1>
        {error && <p className="error">{error}</p>}
        <input
            placeholder="Your email address"
            value={email}
            onChange={e => setEmail(e.target.value)} />
        <input
            type="password"
            placeholder="Your password"
            value={password}
            onChange={e => setPassword(e.target.value)} />
        <input
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)} />
        <button onClick={createAccount}>Sign up</button>

        <Link to="/login">Already have an account? Log in here!</Link>
        </>
    );
}

export default CreateAccountPage;