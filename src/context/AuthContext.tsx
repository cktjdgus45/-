import { createContext, createRef, useCallback, useContext, useEffect, useImperativeHandle, useMemo, useState } from 'react';
import React from 'react';
import AuthService from '../service/auth';
import Login from '../pages/Login.tsx';
import { IAuthorizedUser } from '../types';


export const AuthContext = createContext({});

const contextRef = createRef();

interface IAuthProviderProps {
    authService: AuthService;
    children: React.ReactNode;
    authErrorEventBus: AuthErrorEventBus;
}

export const AuthProvider = ({ authService, children, authErrorEventBus }: IAuthProviderProps) => {
    const [user, setUser] = useState<IAuthorizedUser | undefined>(undefined);

    useImperativeHandle(contextRef, () => (user ? user.token : undefined));

    useEffect(() => {
        authErrorEventBus.listen((err) => {
            console.error(err);
            setUser(undefined);
        })
    }, [authErrorEventBus]);

    useEffect(() => {
        authService.me().then(setUser).catch(console.error);
    }, [authService]);

    const signUp = useCallback(
        async (username, password, name, email, url) =>
            authService.signup(username, password, name, email, url)
                .then((user) => setUser(user)), [authService]
    );
    const login = useCallback(
        async (username, password) =>
            authService.login(username, password).then((user) => setUser(user))
        , [authService]
    );
    const logout = useCallback(
        async () => authService.logout().then(() => setUser(undefined)) //callback memoizaion. 재선언 방지.
        , [authService]
    );

    const context = useMemo( // what i want to send data 
        () => ({
            user, // == user: user
            signUp, // ==signUp : signUp , 각자 각각 독립되게 변할때 각자만 변함.
            login,
            logout
        })
        , [user, signUp, login, logout]
    );
    console.log(user);
    return (
        <AuthContext.Provider value={context}>
            {user ? (
                children
            ) : (
                <>
                    <Login onSignUp={signUp} onLogin={login} />
                </>
            )
            }
        </AuthContext.Provider>
    )
}

export class AuthErrorEventBus {
    callback;
    listen(callback) {
        this.callback = callback;
    }
    notify(error) {
        this.callback(error);
    }
}

export default AuthContext;
export const fetchToken = () => contextRef.current;
export const useAuth = () => useContext(AuthContext);