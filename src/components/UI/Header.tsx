import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    const handleNavigate = (path) => {
        navigate(path);
    };
    return (
        <>
            <nav>
                <ul className='bg-red-200'>

                    <li>
                        <span onClick={() => handleNavigate('/')}>Home</span>
                    </li>
                    <li>
                        <span onClick={() => handleNavigate('/map')}>Map</span>
                    </li>
                    <li>
                        <span onClick={() => handleNavigate('/weather')}>Weather</span>
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default Header;