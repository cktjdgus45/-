import { useState } from 'react';
import { useAuth } from '../../../context/AuthContext.tsx';

const useAuthEvent = ({ onSignUp, onLogin, authState }) => {
    const { username, password, passwordCheck, name, email, url } = authState;
    const { error: { error } } = useAuth();
    const [signup, setSignup] = useState(false);
    const [loading, setLoading] = useState(false);
    const onSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        try {
            if (signup) {
                await onSignUp(username, password, passwordCheck, name, email, url);
            } else {
                await onLogin(username, password);
            }
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false);
        }
    };
    return { signup, setSignup, onSubmit, error, loading };
}

export default useAuthEvent;