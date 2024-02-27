import { useState } from 'react';

const useAuthState = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [url, setURL] = useState('');
    const onChange = (event) => {
        const {
            target: { name, value },
        } = event;
        const validateTextLimit = (inputValue, maxLength) => {
            return inputValue.length <= maxLength ? inputValue : inputValue.slice(0, maxLength);
        };
        switch (name) {
            case 'username':
                return setUsername(validateTextLimit(value, 20));
            case 'password':
                return setPassword(validateTextLimit(value, 30));
            case 'passwordCheck':
                return setPasswordCheck(validateTextLimit(value, 30));
            case 'name':
                return setName(validateTextLimit(value, 20));
            case 'email':
                return setEmail(validateTextLimit(value, 40));
            case 'url':
                return setURL(validateTextLimit(value ?? "", 140));
            default:
        }
    };
    return { username, password, passwordCheck, name, email, url, onChange };
}

export default useAuthState;