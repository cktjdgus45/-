import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.tsx';

const useProfileRouting = () => {
    const navigate = useNavigate();
    const { username } = useParams();
    const authHandler = useAuth();

    useEffect(() => {
        const user = authHandler.user?.user;
        if (user && user.username !== username) {
            navigate('/dogWorld');
        }
    }, [authHandler.user?.user, navigate, username]);

    return { authHandler };
};

export default useProfileRouting;
